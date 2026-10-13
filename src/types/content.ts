import type { NavigationTarget } from './navigation';
import type { Theme } from './theme';

/** Animated statistic shown in page stat strips. */
export interface StatItem {
  readonly num: string;
  readonly suffix?: string;
  readonly label: string;
}

export interface StatCounterProps extends StatItem {
  readonly theme: Theme;
}

/** Question/answer pair shown in FAQ accordions. */
export interface FaqEntry {
  readonly q: string;
  readonly a: string;
}

export interface FaqItemProps extends FaqEntry {
  readonly theme: Theme;
}

/** Link to a related product variant page (e.g. "Also in this series"). */
export interface ProductVariantLink {
  readonly label: string;
  readonly color: string;
  readonly page: NavigationTarget;
}

/** Service card linking to a detail route (e.g. BPO service offerings). */
export interface ServiceOffering {
  readonly id: string;
  /** Detail page: a page id or absolute route path. */
  readonly path: NavigationTarget;
  readonly cat: string;
  readonly name: string;
  readonly tagline: string;
  readonly desc: string;
  readonly accent: string;
  readonly resps: readonly string[];
}

