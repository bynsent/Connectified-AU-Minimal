/** Event pushed to the Google Tag Manager data layer. */
export interface DataLayerEvent {
  readonly event: string;
  readonly [key: string]: unknown;
}

declare global {
  interface Window {
    /** Injected by the GTM snippet in index.html; absent when GTM is blocked. */
    dataLayer?: DataLayerEvent[];
  }
}

