---
description: "Rules for exposing configurable values as environment variables in Vite client and Express server code. Use when adding config, URLs, API keys, ports, feature flags, or editing vite.config.ts, server.js, .env files."
applyTo: "{vite.config.ts,server.js,src/config/**,.env*,Dockerfile,azure-pipelines.yaml}"
---

# Environment-Driven Configuration

## What Must Be Configurable
Expose as environment variables (with safe defaults where non-secret):
- API base URLs, endpoints, board/form IDs, webhook URLs
- Ports, hosts, CORS origins, timeouts, retry counts, rate limits, page sizes
- Feature flags (`VITE_FEATURE_*`)
- Contact details, analytics/tracking IDs, site URL used for SEO/canonical links
- Any value that differs between local, staging and production

## Client vs Server
| Kind | Prefix | Access | Visible to browser |
|------|--------|--------|--------------------|
| Public client config | `VITE_` | `import.meta.env.VITE_*` | **Yes** — inlined at build time |
| Server-only / secrets | none | `process.env.*` in `server.js` | No |

- **Secrets must never use the `VITE_` prefix** or be injected via `define` in `vite.config.ts`
- `VITE_*` values are fixed at **build time**; changing them requires a rebuild. Server vars are read at **runtime**

## Client: Single Typed Config Module
All client access goes through `src/config/env.ts` — no `import.meta.env` elsewhere.

```ts
// src/config/env.ts
const read = (key: keyof ImportMetaEnv, fallback?: string): string => {
  const value = import.meta.env[key] ?? fallback;
  if (value === undefined || value === '') throw new Error(`Missing env var: ${key}`);
  return value;
};

export const env = {
  apiBaseUrl: read('VITE_API_BASE_URL', '/api'),
  siteUrl: read('VITE_SITE_URL', 'https://connectified.com.au'),
  features: {
    chat: import.meta.env.VITE_FEATURE_CHAT === 'true',
  },
} as const;
```

Declare types in `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_FEATURE_CHAT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Server: Validate at Startup
In `server.js`, read all `process.env` values once into a config object at the top, apply defaults, and fail fast if required secrets are missing:

```js
const config = {
  port: Number(process.env.PORT ?? 8080),
  mondayApiToken: process.env.MONDAY_API_TOKEN,
};
if (!config.mondayApiToken) throw new Error('MONDAY_API_TOKEN is required');
```

## Checklist for Every New Variable
1. Add to `.env.example` with a comment (purpose, required/optional, example value — never a real secret)
2. Add type to `ImportMetaEnv` (client) or the server config object
3. Read via the config module only
4. Wire into deployment: build arg (`VITE_*`) in `Dockerfile`/pipeline, or runtime secret on Azure Container App (server vars)
5. Parse types explicitly (`Number(...)`, `=== 'true'`) — env values are always strings
