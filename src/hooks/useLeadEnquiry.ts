import { submitLeadEnquiry, validateLeadEnquiry } from '@/src/services/forms/leadEnquiryService';
import type { FormSubmission, LeadFormTarget, LeadFormValues } from '@/src/types/forms';
import { useFormSubmission } from './useFormSubmission';

/** Submits a generic lead enquiry to the configured Monday board. */
export const useLeadEnquiry = (target: LeadFormTarget): FormSubmission<LeadFormValues> =>
  useFormSubmission({
    validate: validateLeadEnquiry,
    submit: (values, signal) => submitLeadEnquiry(target, values, signal),
  });

