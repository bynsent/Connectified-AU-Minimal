---
name: vite-externalize-config
description: "Find hard-coded configuration in a Vite/React + nginx codebase and move it to typed config modules or environment variables. Use when asked to externalize config, extract env vars, remove hard-coded URLs/IDs/keys, make settings configurable, or audit secrets exposed in the client bundle."
---

# Externalize Configuration

Follow [env-config.instructions.md](../../instructions/env-config.instructions.md) for the rules. This skill is the workflow. There is **no Node server** — runtime configuration is done by nginx (envsubst templates).

**Installing dependencies**: if a package is needed, install it only via the internal Artifactory registry:
```powershell
npm install <package> --registry https://artifactory.sunlifecorp.com/artifactory/api/npm/npm-all/
```

## 1. Audit
Search the codebase for hard-coded values:
- URLs: `https?://`, `/api/`
- Emails / phones: `@[a-z]+\.`, `\+?61`, `tel:`, `mailto:`
- IDs / keys / tokens: `[Kk]ey`, `[Tt]oken`, `[Ss]ecret`, `[Ii]d\s*[:=]\s*['"]?\d{5,}`
- Timeouts / limits: `\b\d{3,5}\b` near `timeout`, `limit`, `delay`
- Env access outside config: `import.meta.env` (anywhere but `src/config/env.ts`), dynamic `import.meta.env[`, `process.env` in `src/`
- Secrets leaking to the client: any reference to `VITE_MONDAY_API_TOKEN` in `src/`, `define:` in `vite.config.ts`, `ARG`/`ENV` for secrets in `Dockerfile`
- GraphQL settings: upstream URL and `API-Version` (belong in `nginx.conf` + `vite.config.ts` proxy), board/group/column IDs (belong in `src/config/monday.ts`)

Produce a table: value, file/line, target (constant / `VITE_*` / nginx runtime var), secret or public, default.

## 2. Classify
- **Secret** → nginx runtime variable only (the Monday token is always `VITE_MONDAY_API_TOKEN`); referenced as `${VITE_MONDAY_API_TOKEN}` in `nginx.conf` and via `loadEnv` in the `vite.config.ts` dev proxy. Never in `src/`
- **Public, varies per environment and rebuild is acceptable** → `VITE_*` var read in `src/config/env.ts`
- **Non-secret constant** (board IDs, column IDs, support email, timeouts) → typed constant in `src/config/constants.ts` or `src/config/monday.ts`

## 3. Implement
1. Constants → `src/config/*.ts`, typed with interfaces from `src/types/`
2. Client env vars → `src/config/env.ts` + `src/vite-env.d.ts` using [env.ts.template](./assets/env.ts.template) (static `import.meta.env.VITE_X` access only)
3. nginx runtime vars → `${NAME}` in `nginx.conf`; set on the Azure Container App (secret reference for secrets)
4. Replace each hard-coded value with the config import
5. Remove any `define: { 'process.env.X': ... }` entries injecting secrets
6. Update `.env.example` with every variable, a comment, and a placeholder
7. `VITE_*` build vars → `ARG`/`ENV` in the Dockerfile build stage + pipeline build args. Secrets → never build args

## 4. Verify
- `npm run lint` passes
- `npm run build` then search `dist/` for the token value and the string `VITE_MONDAY_API_TOKEN` — must find none
- `docker run -e VITE_MONDAY_API_TOKEN=test <image>` starts; `/etc/nginx/conf.d/default.conf` contains the substituted header

