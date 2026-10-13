import { SIM_SIGNUP_BOARD } from '@/src/config/monday';
import { dateColumn } from '@/src/services/monday/columnValues';
import { createMondayItem } from '@/src/services/monday/mondayService';
import type { SimSignupFormValues } from '@/src/types/forms';
import { cleanText, isValidEmail, toNumericPhone, todayIsoDate } from '@/src/utils/validation';

export const validateSimSignup = (values: SimSignupFormValues): string | null => {
  if (!isValidEmail(values.email)) return 'Please enter a valid email address.';
  if (!values.tosAgreed) return 'You must agree to the Terms of Service to proceed.';
  return null;
};

export const submitSimSignup = async (values: SimSignupFormValues, signal: AbortSignal): Promise<void> => {
  const { columns } = SIM_SIGNUP_BOARD;
  await createMondayItem(
    {
      boardId: SIM_SIGNUP_BOARD.boardId,
      itemName: cleanText(values.fullName, 200),
      columnValues: {
        [columns.dateReceived]: dateColumn(todayIsoDate()),
        [columns.company]: cleanText(values.company, 200),
        [columns.email]: cleanText(values.email, 254),
        [columns.phone]: toNumericPhone(values.phone),
      },
    },
    signal,
  );
};

