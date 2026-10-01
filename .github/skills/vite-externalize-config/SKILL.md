---
name: vite-externalize-config
description: "Find hard-coded configuration in a Vite/React/Express codebase and move it to typed environment variables. Use when asked to externalize config, extract env vars, remove hard-coded URLs/IDs/keys, make settings configurable, or audit secrets exposed in the client bundle."
---

# Externalize Configuration to Environment Variables

Follow [env-config.instructions.md](../../instructions/env-config.instructions.md) for the rules. This skill is the workflow.

## 1. Audit
Search the codebase for hard-coded values:
- URLs: `https?://`, `/api/`
- Emails / phones: `@[a-z]+\.`, `\+?61`, `tel:`, `mailto:`
- IDs / keys / tokens: `[Kk]ey`, `[Tt]oken`, `[Ss]ecret`, `[Ii]d\s*[:=]\s*['"]?\d{5,}`
- Ports / timeouts / limits: `\b\d{3,5}\b` near `port`, `timeout`, `limit`, `delay`
- Direct env access outside config modules: `import.meta.env`, `process.env`
- Secrets leaking to the client: `VITE_.*(TOKEN|KEY|SECRET)`, `define:` in `vite.config.ts`

Produce a table: value, file/line, proposed variable name, client or server, secret or public, default.

## 2. Classify
- **Secret** → server-only var (no `VITE_` prefix), consumed in `server.js`, exposed to the browser only through a proxy route
- **Public, varies per environment** → `VITE_*` var with a sensible default
- **True constant** (never varies) → typed constant in `src/config/constants.ts`, not an env var

## 3. Implement
1. Create/update `src/config/env.ts` (client) and `src/vite-env.d.ts` (types) using the template in [env.ts.template](./assets/env.ts.template)
2. Create/update the top-level `config` object in `server.js`; fail fast on missing required secrets
3. Replace each hard-coded value with `env.<name>` / `config.<name>`
4. Remove any `define: { 'process.env.X': ... }` entries that inject secrets into the client
5. Update `.env.example` with every variable, a comment, and a placeholder value
6. Update `Dockerfile` (`ARG`/`ENV` for `VITE_*` build-time vars) and deployment docs for runtime secrets

## 4. Verify
- `npm run lint` passes
- `npm run build` then search `dist/` for any secret value or name — must find none
- App runs with only `.env.example` defaults (copy to `.env.local`) for non-secret values
