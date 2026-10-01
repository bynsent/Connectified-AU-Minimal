import { dateColumn, labelsColumn } from '@/src/services/monday/columnValues';
import { createMondayItem } from '@/src/services/monday/mondayService';
import type { LeadFormTarget, LeadFormValues } from '@/src/types/forms';
import { cleanText, isValidEmail, toNumericPhone, todayIsoDate } from '@/src/utils/validation';

export const validateLeadEnquiry = (values: LeadFormValues): string | null =>
  isValidEmail(values.email) ? null : 'Please enter a valid email address.';

export const submitLeadEnquiry = async (
  target: LeadFormTarget,
  values: LeadFormValues,
  signal: AbortSignal,
): Promise<void> => {
  const cols = target.columnIds;
  const service = cleanText(values.service, 200);
  await createMondayItem(
    {
      boardId: target.boardId,
      itemName: cleanText(values.name, 200),
      columnValues: {
        [cols.date]: dateColumn(todayIsoDate()),
        [cols.email]: cleanText(values.email, 254),
        [cols.phone]: toNumericPhone(values.phone),
        [cols.country]: cleanText(values.country, 100),
        [cols.industry]: cleanText(values.industry, 200),
        [cols.service]: target.serviceColumnType === 'dropdown' ? labelsColumn(service) : service,
        [cols.comments]: cleanText(values.comments),
      },
    },
    signal,
  );
};

