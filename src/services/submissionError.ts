/** An error whose message is safe and meaningful to show to the user. */
export class SubmissionError extends Error {
  readonly userMessage: string;

  constructor(userMessage: string, options?: { cause?: unknown }) {
    super(userMessage, options);
    this.name = 'SubmissionError';
    this.userMessage = userMessage;
  }
}

