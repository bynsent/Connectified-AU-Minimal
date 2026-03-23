/**
 * SEO.tsx
 * -------
 * Drop this into any page component to set per-page <title>,
 * <meta description>, Open Graph and canonical URL.
 *
 * SETUP (one-time):
 *   npm install react-helmet-async
 *
 *   In main.tsx, wrap <App> with <HelmetProvider>:
 *     import { HelmetProvider } from 'react-helmet-async';
 *     <HelmetProvider><App /></HelmetProvider>
 *
 * USAGE in any page:
 *   import SEO from './SEO';
 *   <SEO
 *     title="Networking Hardware — Teltonika, Cradlepoint, Milesight | Connectified"
 *     description="Authorised Australian supplier of industrial 4G/5G routers and IoT gateways..."
 *     path="/networking-hardware"
 *   />
 */

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  /** URL path e.g. "/networking-hardware" — used to build canonical + og:url */
  path?: string;
  /** Optional OG image override — defaults to the site-wide og-default.jpg */
  ogImage?: string;
  /** Set true on campaign/demo pages that should not be indexed */
  noIndex?: boolean;
}

const BASE_URL = 'https://connectified.com.au';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`;

export default function SEO({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SEOProps) {
  const canonical = `${BASE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />
      }
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:type"        content="website" />

      {/* Twitter/X */}
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
}
