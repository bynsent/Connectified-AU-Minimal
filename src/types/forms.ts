import type { MondayId } from './monday';

// ─── Submission lifecycle ────────────────────────────────────────────────────

export type SubmitState =
  | { readonly status: 'idle' }
  | { readonly status: 'submitting' }
  | { readonly status: 'success' }
  | { readonly status: 'error'; readonly error: string };

/** Returns a user-facing error message, or `null` when the values are valid. */
export type FormValidator<TValues> = (values: TValues) => string | null;

/** Performs the submission; must honour the abort signal. */
export type FormSubmitter<TValues> = (values: TValues, signal: AbortSignal) => Promise<void>;

export interface FormSubmission<TValues> {
  readonly state: SubmitState;
  readonly isSubmitting: boolean;
  readonly isSubmitted: boolean;
  readonly error: string | null;
  readonly submit: (values: TValues) => Promise<void>;
  readonly reset: () => void;
}

// ─── Contact page ────────────────────────────────────────────────────────────

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  timeline: string;
}

export interface ContactEnquiry extends ContactFormValues {
  readonly service: string;
}

// ─── SIM signup ──────────────────────────────────────────────────────────────

export interface SimSignupFormValues {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  tosAgreed: boolean;
}

// ─── SIM activation / cancellation ticket ────────────────────────────────────

export type SimRequestType = 'Activate' | 'Cancel';

export interface SimTicketFormValues {
  fullName: string;
  email: string;
  iccids: string[];
  requestType: SimRequestType | '';
  simKit: string;
  requestDate: string;
  cancellationReason: string;
  tosAgreed: boolean;
}

// ─── Generic lead form (MondayForm) ──────────────────────────────────────────

export interface LeadFormValues {
  name: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  service: string;
  comments: string;
}

export interface LeadFormColumnIds {
  readonly email: string;
  readonly phone: string;
  readonly country: string;
  readonly industry: string;
  readonly service: string;
  readonly comments: string;
  readonly status: string;
  readonly date: string;
}

export type ServiceColumnType = 'text' | 'dropdown';

/** Where and how a lead form writes to Monday. */
export interface LeadFormTarget {
  readonly boardId: MondayId;
  readonly columnIds: LeadFormColumnIds;
  readonly serviceColumnType: ServiceColumnType;
}

