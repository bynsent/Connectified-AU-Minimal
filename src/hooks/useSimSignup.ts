import { submitSimSignup, validateSimSignup } from '@/src/services/forms/simSignupService';
import type { FormSubmission, SimSignupFormValues } from '@/src/types/forms';
import { useFormSubmission } from './useFormSubmission';

/** Submits a SIM service signup to the Monday SIM signup board. */
export const useSimSignup = (): FormSubmission<SimSignupFormValues> =>
  useFormSubmission({ validate: validateSimSignup, submit: submitSimSignup });

