import { submitSimTicket, validateSimTicket } from '@/src/services/forms/simTicketService';
import type { FormSubmission, SimTicketFormValues } from '@/src/types/forms';
import { useFormSubmission } from './useFormSubmission';

/** Submits a SIM activation/cancellation ticket (item + one subitem per ICCID). */
export const useSimTicket = (): FormSubmission<SimTicketFormValues> =>
  useFormSubmission({ validate: validateSimTicket, submit: submitSimTicket });

