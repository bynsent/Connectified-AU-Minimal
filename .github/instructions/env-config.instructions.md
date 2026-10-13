---
description: "Rules for configuration and environment variables in this Vite client + nginx container. Use when adding config, URLs, API keys, ports, feature flags, or editing vite.config.ts, nginx.conf, Dockerfile, .env files."
applyTo: "{vite.config.ts,nginx.conf,src/config/**,.env*,Dockerfile,azure-pipelines.yaml}"
---

# Configuration and Environment Variables

## Runtime Model
There is **no Node server**. The container is nginx serving `dist/` and reverse-proxying `/api/monday`.

| Kind | Where defined | Read by | Visible to browser |
|------|---------------|---------|--------------------|
| Non-secret constants (board/column IDs, support email, timeouts, API path) | `src/config/*.ts` typed constants | client code | Yes |
| Public per-environment values | `VITE_*` build-time env → `src/config/env.ts` | client code | **Yes** — inlined at build |
| `VITE_MONDAY_API_TOKEN` (the only secret) | Azure Container App secret / `.env.local` | **nginx** (envsubst at container start) and **Vite dev proxy** only | **No** — never referenced from `src/` |

- The token variable name is fixed: **`VITE_MONDAY_API_TOKEN`**. Do not introduce aliases (`MONDAY_API_TOKEN`, `MONDAY_TOKEN`, ...)
- Because it has the `VITE_` prefix, Vite *could* expose it. Prevent that by:
  - never writing `import.meta.env.VITE_MONDAY_API_TOKEN` in `src/`
  - never using dynamic `import.meta.env[key]` access (it inlines the whole env object)
  - never passing it as a Docker build `ARG`/`ENV` or pipeline build variable (`.env*` files are excluded by `.dockerignore`)
  - `vite.config.ts` (`forbidSecretInBundle` plugin) fails the build if the token value appears in any emitted file
- Prefer typed constants in `src/config/` over new env vars; add a `VITE_*` var only when a value genuinely differs between environments **and** a rebuild per environment is acceptable

## Client: Typed Config Modules
- `src/config/constants.ts` — app-wide constants (support email, request timeout, user-facing fallback messages)
- `src/config/monday.ts` — Monday API path, board IDs and column IDs, typed with `MondayBoardConfig` from `src/types/monday.ts`
- `src/config/env.ts` — only if `VITE_*` vars are needed. Use **static** property access:

```ts
// src/config/env.ts
const required = (name: string, value: string | undefined, fallback?: string): string => {
  const resolved = value ?? fallback;
  if (!resolved) throw new Error(`Missing env var: ${name}`);
  return resolved;
};

export const env = {
  siteUrl: required('VITE_SITE_URL', import.meta.env.VITE_SITE_URL, 'https://connectified.com.au'),
} as const;
```
Declare each var in `src/vite-env.d.ts` (`interface ImportMetaEnv`). No `import.meta.env` outside `src/config/env.ts`.

## nginx: Runtime Substitution
- `nginx.conf` is copied to `/etc/nginx/templates/default.conf.template`; the official `nginx` image runs `envsubst` on start and writes `/etc/nginx/conf.d/default.conf`
- Only variables present in the container environment are substituted, so nginx's own `$host`, `$uri` etc. are untouched
- If `VITE_MONDAY_API_TOKEN` is missing, nginx fails to start (unknown variable) — fail fast by design
- Listen port, upstream URL, `API-Version`, rate limits and body-size caps are set in `nginx.conf`

## Checklist for Every New Variable
1. Decide: typed constant (default) vs `VITE_*` build var vs nginx runtime var
2. Add to `.env.example` with a comment (purpose, required/optional, example value — never a real secret)
3. Client vars: type in `src/vite-env.d.ts`, read only in `src/config/env.ts`, wire as Docker `ARG` + pipeline build arg
4. nginx runtime vars: reference as `${NAME}` in `nginx.conf`, set on the Azure Container App (secret ref for secrets)
5. Parse types explicitly (`Number(...)`, `=== 'true'`) — env values are always strings

