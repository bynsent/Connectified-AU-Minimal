import { SUPPORT_EMAIL } from '@/src/config/constants';
import { SIM_TICKET_BOARD } from '@/src/config/monday';
import { dateColumn, labelsColumn } from '@/src/services/monday/columnValues';
import { createMondayItem, createMondaySubitem } from '@/src/services/monday/mondayService';
import { SubmissionError } from '@/src/services/submissionError';
import type { SimTicketFormValues } from '@/src/types/forms';
import type { MondayColumnValue } from '@/src/types/monday';
import { cleanText, isValidEmail, isValidIccid } from '@/src/utils/validation';

export const validateSimTicket = (values: SimTicketFormValues): string | null => {
  if (!isValidEmail(values.email)) return 'Please enter a valid email address.';
  if (!values.iccids.every(isValidIccid)) return 'All ICCIDs must be 19 or 20 digits.';
  if (!values.requestType) return 'Please select Activate or Cancel.';
  if (!values.simKit) return 'Please select a SIM Kit.';
  if (!values.requestDate) {
    return `Please select a ${values.requestType === 'Activate' ? 'activation' : 'cancellation'} date.`;
  }
  if (!values.tosAgreed) return 'You must agree to the Terms of Service to proceed.';
  return null;
};

/**
 * Creates the ticket item, then one subitem per ICCID.
 * Partial failure is reported explicitly so the user does not resubmit (which would duplicate the ticket).
 */
export const submitSimTicket = async (values: SimTicketFormValues, signal: AbortSignal): Promise<void> => {
  const { columns } = SIM_TICKET_BOARD;
  const columnValues: Record<string, MondayColumnValue> = {
    [columns.email]: cleanText(values.email, 254),
    [columns.requestType]: labelsColumn(values.requestType),
    [columns.simKit]: labelsColumn(values.simKit),
    [columns.requestDate]: dateColumn(values.requestDate),
  };
  if (values.requestType === 'Cancel' && values.cancellationReason) {
    columnValues[columns.cancellationReason] = cleanText(values.cancellationReason);
  }

  const parentItemId = await createMondayItem(
    { boardId: SIM_TICKET_BOARD.boardId, itemName: cleanText(values.fullName, 200), columnValues },
    signal,
  );

  const results = await Promise.allSettled(
    values.iccids.map((iccid) => createMondaySubitem({ parentItemId, itemName: iccid }, signal)),
  );

  const failedIccids = values.iccids.filter((_, i) => results[i]?.status === 'rejected');
  if (failedIccids.length > 0) {
    throw new SubmissionError(
      `Your request was received, but ${failedIccids.length} ICCID(s) could not be attached. ` +
        `Please do not resubmit — email ${SUPPORT_EMAIL} with: ${failedIccids.join(', ')}`,
    );
  }
};

