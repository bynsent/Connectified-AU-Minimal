import { CONTACT_BOARD } from '@/src/config/monday';
import { dateColumn, statusColumn } from '@/src/services/monday/columnValues';
import { createMondayItem } from '@/src/services/monday/mondayService';
import type { ContactEnquiry } from '@/src/types/forms';
import { cleanText, isValidEmail, toNumericPhone, todayIsoDate } from '@/src/utils/validation';

export const validateContactEnquiry = (values: ContactEnquiry): string | null => {
  if (!values.service) return 'Please select a service area';
  if (!isValidEmail(values.email)) return 'Please enter a valid email address.';
  return null;
};

export const submitContactEnquiry = async (values: ContactEnquiry, signal: AbortSignal): Promise<void> => {
  const { columns } = CONTACT_BOARD;
  await createMondayItem(
    {
      boardId: CONTACT_BOARD.boardId,
      itemName: cleanText(`${values.firstName} ${values.lastName}`, 200),
      columnValues: {
        [columns.status]: statusColumn('New'),
        [columns.dateReceived]: dateColumn(todayIsoDate()),
        [columns.service]: cleanText(values.service, 200),
        [columns.jobTitle]: cleanText(values.jobTitle, 200),
        [columns.company]: cleanText(values.company, 200),
        [columns.email]: cleanText(values.email, 254),
        [columns.phone]: toNumericPhone(values.phone),
        [columns.message]: cleanText(values.message),
        [columns.timeline]: cleanText(values.timeline, 100),
      },
    },
    signal,
  );
};

