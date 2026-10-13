import type { PageId } from './navigation';

export type WearableCategory = 'workplace' | 'healthcare' | 'agedcare' | 'personal';

/** Category filter including the "show everything" option. */
export type WearableCategoryFilter = 'all' | WearableCategory;

export interface ComparisonRow {
  readonly label: string;
  readonly val: string;
}

/** Wearable safety product shown on the wearables catalogue page. */
export interface WearableProduct {
  readonly id: string;
  /** Detail page of the product. */
  readonly pageId: PageId;
  readonly cat: WearableCategory;
  readonly name: string;
  readonly tagline: string;
  readonly eyebrow: string;
  readonly desc: string;
  readonly accent: string;
  readonly bgImage: string | null;
  readonly industries: readonly string[];
  /** Rendered as the wide spotlight card. */
  readonly spotlight?: boolean;
  readonly compare?: readonly ComparisonRow[];
  readonly features?: readonly string[];
}

