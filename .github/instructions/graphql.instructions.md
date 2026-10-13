---
description: "GraphQL best practices for this Vite + React app (Monday.com API via the nginx /api/monday reverse proxy): operation definitions, variables, typing, error handling, request lifecycle in hooks, and nginx proxy hardening. Use when writing, reviewing or refactoring GraphQL queries/mutations, API services, data hooks, or the /api proxy in nginx.conf / vite.config.ts."
applyTo: "{nginx.conf,vite.config.ts,src/services/**,src/hooks/**,src/types/**,**/*.graphql}"
---

# GraphQL

## Architecture (layers, one direction)
```
component → hook (src/hooks/useXxx) → service (src/services/forms|monday) → src/services/graphqlClient → /api/monday (nginx) → https://api.monday.com/v2
```
- The browser **never** calls a third-party GraphQL endpoint directly and never holds its token. nginx (production) and the Vite dev-server proxy (local) attach the `Authorization` and `API-Version` headers
- **No Node/Express proxy.** Do not add `server.js` or any backend just to forward GraphQL
- One shared, React-free transport: `src/services/graphqlClient.ts` exposing `graphqlRequest(endpoint, operation, variables, options)`. No other module builds GraphQL `fetch` calls
- Provider helpers (operations, `createMondayItem`, column-value builders) live in `src/services/monday/`; per-form validate/submit functions in `src/services/forms/`; hooks in `src/hooks/` own request state; components only call hooks

## Operations
- Define each operation **once** as a named constant in `src/services/<provider>/operations.ts`. Never inline query strings in components or hooks
- Always give operations a unique PascalCase name (`mutation CreateItem`), used for logging
- **Always use variables.** Never interpolate values (user input, IDs, JSON) into the query string
- Pass JSON scalars (e.g. Monday `column_values`) as a variable built with `JSON.stringify(...)` from a typed object
- Select only the fields the UI uses (often just `{ id }` for mutations)
- Declare variable types precisely (`ID!`, `String!`, `JSON!`)
- Multi-step flows (create item → create subitems) are orchestrated in a **service function** with explicit partial-failure handling, never in a component

## Typing
- All DTO / variables types live in `src/types/<provider>.ts` (e.g. `src/types/monday.ts`); generic GraphQL types in `src/types/graphql.ts`
- Bind types and a runtime type guard to the document so callers get inference and boundary validation:

```ts
// src/services/monday/operations.ts
import { defineOperation } from '@/src/services/graphqlClient';
import type { CreateItemResult, CreateItemVariables } from '@/src/types/monday';

export const CREATE_ITEM = defineOperation<CreateItemResult, CreateItemVariables>(
  'CreateItem',
  /* GraphQL */ `
    mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) { id }
    }
  `,
  isCreateItemResult,
);
```
- Map DTOs to domain models in the service when shapes differ

## Error Handling
- GraphQL often returns HTTP 200 with an `errors` array. Treat as failure when: network error, timeout, non-2xx status, non-empty `errors`, or `data` failing the type guard
- `graphqlClient` throws `GraphQLRequestError` with `kind: 'network' | 'timeout' | 'http' | 'graphql' | 'invalid-response' | 'aborted'`; hooks map it to a `SubmitState`
- Log operation name, kind and error codes only — never variables (they contain personal data). Show users a friendly message with the support email from `src/config/constants.ts`
- Never auto-retry **mutations**. Retry idempotent queries only, with backoff; respect Monday rate/complexity limits (HTTP 429, `ComplexityException`)

## Request Lifecycle (hooks in `src/hooks/`)
- Hooks expose `{ state, submit, reset }` with `state` typed as `SubmitState` (`idle | submitting | success | error`) from `src/types/forms.ts`
- Pass an `AbortSignal` to the service; abort on unmount; ignore results of aborted requests
- Block double submission while a request is in flight
- Request timeout comes from `src/config/constants.ts`, not a literal in the hook/service

## nginx Proxy (`nginx.conf`)
- `nginx.conf` is an **envsubst template** (copied to `/etc/nginx/templates/default.conf.template`); the official nginx image substitutes `${VITE_MONDAY_API_TOKEN}` at container start. The token is never in the image or the JS bundle
- `location = /api/monday` only: `limit_except POST`, `client_max_body_size` cap, `limit_req` rate limit, `proxy_pass_request_headers off` (don't forward client headers/cookies), explicit `Authorization`, `API-Version`, `Content-Type` headers, upstream timeouts, `Cache-Control: no-store`
- Any other `/api/*` path returns 404 — the proxy must not be an open relay
- nginx cannot inspect GraphQL bodies without njs; keep the set of operations small and documented in `src/services/<provider>/operations.ts`. If operation allowlisting becomes necessary, add an njs body check rather than a Node server
- Mirror the same headers in the Vite dev proxy (`vite.config.ts` → `server.proxy['/api/monday']`)

## Security
- `VITE_MONDAY_API_TOKEN` is a runtime secret for nginx only. Never reference it in `src/`, never pass it as a Docker `ARG`/build env, never use dynamic `import.meta.env[key]` access (that inlines every `VITE_*` var present at build time)
- Treat all form input as untrusted: trim, length-limit and validate before sending
- Board/column IDs are non-secret config → `src/config/monday.ts`

