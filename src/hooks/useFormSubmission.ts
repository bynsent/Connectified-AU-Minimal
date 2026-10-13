import { useEffect, useRef, useState } from 'react';
import { SUBMIT_FAILURE_MESSAGE } from '@/src/config/constants';
import { GraphQLRequestError } from '@/src/services/graphqlClient';
import { SubmissionError } from '@/src/services/submissionError';
import type { FormSubmission, FormSubmitter, FormValidator, SubmitState } from '@/src/types/forms';

interface UseFormSubmissionOptions<TValues> {
  readonly validate?: FormValidator<TValues>;
  readonly submit: FormSubmitter<TValues>;
}

const toUserMessage = (error: unknown): string =>
  error instanceof SubmissionError ? error.userMessage : SUBMIT_FAILURE_MESSAGE;

const logFailure = (error: unknown): void => {
  // Never log submitted values – they contain personal data.
  if (error instanceof GraphQLRequestError) {
    console.error('Form submission failed', {
      operation: error.operationName,
      kind: error.kind,
      status: error.status,
      codes: error.codes,
    });
  } else {
    console.error('Form submission failed', error instanceof Error ? error.name : 'unknown');
  }
};

/**
 * Generic submit lifecycle: validation, double-submit guard, abort on unmount,
 * and a discriminated-union state. Mutations are never retried automatically.
 */
export const useFormSubmission = <TValues,>({
  validate,
  submit,
}: UseFormSubmissionOptions<TValues>): FormSubmission<TValues> => {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const run = async (values: TValues): Promise<void> => {
    if (controllerRef.current) return; // a request is already in flight

    const validationError = validate?.(values) ?? null;
    if (validationError) {
      setState({ status: 'error', error: validationError });
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: 'submitting' });

    try {
      await submit(values, controller.signal);
      if (!controller.signal.aborted) setState({ status: 'success' });
    } catch (error) {
      if (controller.signal.aborted) return;
      logFailure(error);
      setState({ status: 'error', error: toUserMessage(error) });
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  };

  const reset = (): void => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setState({ status: 'idle' });
  };

  return {
    state,
    isSubmitting: state.status === 'submitting',
    isSubmitted: state.status === 'success',
    error: state.status === 'error' ? state.error : null,
    submit: run,
    reset,
  };
};

