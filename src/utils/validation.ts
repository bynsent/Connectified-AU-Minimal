/** Email format used by all forms (also used as the `<input pattern>` via `.source`). */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(value);

/** Keeps only characters allowed while typing a phone number. */
export const sanitizePhoneInput = (value: string): string => value.replace(/[^\d+\s\-()]/g, '');

/** Strips formatting so the phone fits a Monday numeric column. */
export const toNumericPhone = (value: string): string => value.replace(/[^\d+]/g, '');

export const ICCID_MIN_LENGTH = 19;
export const ICCID_MAX_LENGTH = 20;

export const sanitizeIccidInput = (value: string): string =>
  value.replace(/\D/g, '').slice(0, ICCID_MAX_LENGTH);

export const isValidIccid = (value: string): boolean =>
  value.length >= ICCID_MIN_LENGTH && value.length <= ICCID_MAX_LENGTH;

/** Today's date as YYYY-MM-DD (UTC, matching previous behaviour). */
export const todayIsoDate = (): string => new Date().toISOString().slice(0, 10);

/** Trims and length-limits free text before it leaves the browser. */
export const cleanText = (value: string, maxLength = 2000): string => value.trim().slice(0, maxLength);

