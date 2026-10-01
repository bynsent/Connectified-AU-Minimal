import { submitContactEnquiry, validateContactEnquiry } from '@/src/services/forms/contactEnquiryService';
import type { ContactEnquiry, FormSubmission } from '@/src/types/forms';
import { useFormSubmission } from './useFormSubmission';

/** Submits the Contact page enquiry to the Monday contact board. */
export const useContactEnquiry = (): FormSubmission<ContactEnquiry> =>
  useFormSubmission({ validate: validateContactEnquiry, submit: submitContactEnquiry });

