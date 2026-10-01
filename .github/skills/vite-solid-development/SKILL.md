---
name: vite-solid-development
description: "Build new or refactor existing Vite + React + TypeScript code (features, modules, pages, components, hooks, services, GraphQL operations) using typed object models, hook-based API calls and state management, SOLID, DRY and modular structure. Use when asked to create a new feature/module/page/component/hook/service, add a form or API integration, add a GraphQL query or mutation, refactor a page/component, separate API or state logic into hooks, model domain/API objects, remove duplication, split a large component, or review code for SOLID/DRY violations."
---

# SOLID + DRY Development Workflow (New Code and Refactors)

Rules live in:
- [typescript-vite.instructions.md](../../instructions/typescript-vite.instructions.md) — typing, SOLID, DRY, React
- [project-structure.instructions.md](../../instructions/project-structure.instructions.md) — placement and import direction
- [graphql.instructions.md](../../instructions/graphql.instructions.md) — GraphQL operations, client, nginx proxy
- [env-config.instructions.md](../../instructions/env-config.instructions.md) — configuration (use the `vite-externalize-config` skill for env vars)

There is **no Node/Express server**: the app is a static build served by nginx, which also reverse-proxies `/api/monday`. Never add `server.js`.

**Installing dependencies**: always install through the internal Artifactory registry, never the public npm registry:
```powershell
npm install <package> --registry https://artifactory.sunlifecorp.com/artifactory/api/npm/npm-all/
```
Use the same `--registry` flag for `npm install` / `npm ci` without a package name.

Pick **A** for new code, **B** for existing code; both finish with **C**.

---

## A. Creating a New Feature, Module or Component

### A1. Reuse Before Building
Search before writing anything new:
- `src/components/ui|layout/` for an existing primitive (Button, Card, Section, form Field)
- `src/hooks/` for existing stateful logic (`useFormSubmission`, form-specific submit hooks, scroll animation, media query)
- `src/services/` for the GraphQL client and Monday helpers (`createMondayItem`, column-value builders)
- `src/types/` for existing domain/DTO/state types (`SubmitState`, `MondayBoardConfig`, `Theme`)
- `src/config/` and `src/utils/` for constants, board IDs and validation helpers
- Sibling `src/components/*Page.tsx` for markup/logic the new code would duplicate — extract on real duplication

### A2. Classify and Place

| Building | Location | Notes |
|---|---|---|
| Route / page | `src/pages/<Name>Page.tsx` | Lazy-loaded; SEO + composition only |
| Business UI (form, signup, product section) | `src/features/<kebab-name>/components/` | Public API via `index.ts` only |
| Feature-agnostic UI primitive | `src/components/ui/` | Props only, no business data |
| Layout piece (Header, Footer, Section) | `src/components/layout/` | |
| **Any custom hook** | **`src/hooks/useXxx.ts`** | Never in a feature folder or component file |
| **Any shared type / DTO / form model / state union** | **`src/types/<domain>.ts`** | Never in a feature folder |
| API transport / GraphQL operation | `src/services/graphqlClient.ts`, `src/services/<provider>/` | React-free |
| Per-form validate + submit | `src/services/forms/<name>Service.ts` | React-free |
| Static content lists | `src/features/<feature>/data/*.ts` | Typed via `src/types/` |
| Config / constants / board IDs | `src/config/` | Never `import.meta.env` elsewhere |
| Pure helpers | `src/utils/` | No React, no side effects |
| Imported assets / URL assets | `src/assets/` / `public/images/<section>/` | |

### A3. Design Contracts First
Before writing JSX, write the types in `src/types/`:
1. Domain/UI models and form values
2. API request/response DTOs (`XxxVariables` / `XxxResult`) — separate from domain models when shapes differ
3. Hook return type, with state as a discriminated union (`SubmitState`)
4. Component props — small and focused (ISP); wrappers extend `React.ComponentProps<'el'>` (LSP)
5. Extension points: variants via config objects/arrays or composition, not `if (type === ...)` branches (OCP)

### A4. Build Bottom-Up
1. **Config** — IDs, contact details, timeouts → `src/config/` (typed constants; env var only if it truly varies per environment)
2. **Types** — from A3, in `src/types/`
3. **Utils** — pure helpers in `src/utils/`
4. **Service** — React-free, typed, boundary-validated; accepts `AbortSignal`. For GraphQL: `defineOperation` with a type guard in `src/services/<provider>/operations.ts`, call through `graphqlRequest`, map DTO → domain
5. **Hook** — `src/hooks/useXxx.ts`; calls the service, exposes `{ state, submit, reset }`, handles abort/cleanup and double-submit (compose `useFormSubmission` for form submits)
6. **Components** — presentational, receive data/callbacks via props; one component per file; accessible
7. **Public API** — export only what other modules need from `src/features/<feature>/index.ts`
8. **Page** — compose the feature + shared UI; add SEO; register as a lazy route
9. **Proxy** — if a new upstream API is needed, add a `location` to `nginx.conf` **and** the matching `server.proxy` entry in `vite.config.ts`

Run `npm run lint` after each step.

---

## B. Refactoring Existing Code

### B1. Analyse
For the target file(s) list:
- Mixed responsibilities (data fetching, state, layout, animation, config) → **SRP**
- Branches on page/type names that grow per case → **OCP**
- Wrappers that drop native props → **LSP**
- Oversized props interfaces → **ISP**
- Direct `fetch`, `import.meta.env`, `localStorage`, `window` in components → **DIP**
- Components owning request/loading/error state → extract a hook into `src/hooks/`
- Inline GraphQL strings, interpolated values, unnamed operations, ignored `errors` → GraphQL violations
- Inline object shapes for entities, forms and payloads → named types in `src/types/`
- Hooks or types defined in components/feature folders → move to `src/hooks/` / `src/types/`
- Markup, logic, data or literals repeated in 2+ places → **DRY**

Present findings as a short table before changing code.

### B2. Plan the Target Structure
Map every extracted piece to its location using **A2**. Only create folders that the refactor actually needs.

### B3. Refactor Incrementally
1. Extract config/literals → `src/config/`
2. Model entities, form values, DTOs, state unions → `src/types/<domain>.ts`
3. Extract pure helpers → `src/utils/`
4. Extract API transport → `src/services/`; move GraphQL documents to named, variable-based operations through `graphqlClient`
5. Extract request lifecycle and reusable stateful logic → `src/hooks/use*.ts`
6. Extract repeated markup → `src/components/ui|layout/*.tsx`
7. Expose features via `index.ts`; move pages to `src/pages/`; keep behaviour and visuals identical
8. Replace other duplicated call sites with the new shared pieces

Run `npm run lint` after each step.

---

## C. Verify (both workflows)
- `npm run lint` and `npm run build` pass
- New code works end-to-end in `npm run dev` (happy path, validation errors, API failure, loading state); `/api/monday` goes through the Vite dev proxy
- Refactor: no behaviour or visual change on affected routes
- No `any`; no `import.meta.env` outside `src/config/env.ts`; no reference to `VITE_MONDAY_API_TOKEN` in `src/`
- All hooks in `src/hooks/`, all shared types in `src/types/`
- No component calls `fetch` or a service directly
- GraphQL: named operations, variables only, minimal selection sets, `errors` handled, no mutation auto-retry
- No deep or cross-feature imports; shared modules don't import from `features/`, `pages/` or `components/`
- Every effect that registers listeners/animations/requests returns a cleanup
- Every new variable is in `.env.example` and wired into deployment (nginx runtime var or Docker build arg)

