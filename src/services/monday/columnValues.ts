import type {
  MondayColumnValues,
  MondayDateValue,
  MondayLabelsValue,
  MondayStatusValue,
} from '@/src/types/monday';

export const dateColumn = (date: string): MondayDateValue => ({ date });

export const labelsColumn = (...labels: string[]): MondayLabelsValue => ({ labels });

export const statusColumn = (label: string): MondayStatusValue => ({ label });

export const serializeColumnValues = (values: MondayColumnValues): string => JSON.stringify(values);

