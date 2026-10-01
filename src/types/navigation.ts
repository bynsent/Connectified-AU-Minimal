import type { Theme } from './theme';

/** Absolute app route path, e.g. `/bpo/admin`. */
export type RoutePath = `/${string}`;

/** Logical page identifiers used by in-page links; resolved to a `RoutePath` via `PAGE_ROUTES`. */
export type PageId =
  | 'home'
  | 'about'
  | 'contact'
  | 'devices'
  | 'networking-hardware'
  | 'networking-software'
  | 'wearables'
  | 'watch-guardian'
  | 'wg-health'
  | 'wg-assist'
  | 'watcharmour'
  | 'q-view'
  | 'bpo'
  | 'bpo-cases'
  | 'bpo-admin'
  | 'bpo-hr'
  | 'bpo-accounting'
  | 'bpo-it'
  | 'prof-services'
  | 'prof-cases'
  | 'managed-services'
  | 'managed-support'
  | 'managed-cases'
  | 'sim-signup'
  | 'sim-ticket';

/** Anything a page may navigate to: a logical page id or an absolute route path. */
export type NavigationTarget = PageId | RoutePath;

/** Navigates to a page id or absolute route path. */
export type NavigateFn = (target: NavigationTarget) => void;

/** In-page link to another page. */
export interface PageLink {
  readonly label: string;
  readonly target: NavigationTarget;
}

/** Props every themed route page receives. */
export interface ThemedPageProps {
  readonly theme: Theme;
}

/** Page with a back action (campaign/form pages without in-page navigation). */
export interface BackNavigablePageProps extends ThemedPageProps {
  readonly onBack: () => void;
}

/** Page that can navigate to other routes but has no back action. */
export interface NavigablePageProps extends ThemedPageProps {
  readonly onNavigate: NavigateFn;
}

/** Standard route page: themed, with back and navigate actions. */
export interface PageProps extends BackNavigablePageProps, NavigablePageProps {}

// ─── Main menu ───────────────────────────────────────────────────────────────

export interface MenuLink {
  readonly label: string;
  readonly path: RoutePath;
}

export interface MenuSubItem extends MenuLink {
  readonly nested?: readonly MenuLink[];
}

export type MenuItemId = 'devices' | 'bpo' | 'professional' | 'managed' | 'sim' | 'about' | 'shop' | 'contact';

export interface MenuItem {
  readonly id: MenuItemId;
  readonly title: string;
  readonly subItems: readonly MenuSubItem[];
  /** Direct target for items without sub-items. */
  readonly path?: RoutePath;
  /** External URL opened in a new tab instead of routing. */
  readonly externalUrl?: string;
}

// ─── Home page pillars ───────────────────────────────────────────────────────

export type PillarId = 'devices' | 'bpo' | 'professional' | 'managed' | 'shop';

export interface HomePillar {
  readonly id: PillarId;
  readonly title: string;
  readonly headline: string;
  readonly subheadline: string;
  readonly description: string;
  readonly color: string;
  readonly image: string;
  readonly cta: string;
  /** Primary CTA destination: an internal route or an external URL. */
  readonly ctaTarget: { readonly kind: 'route'; readonly path: RoutePath } | { readonly kind: 'external'; readonly url: string };
  readonly secondaryCta?: string;
  readonly secondaryCtaPage?: RoutePath;
}

