---
description: "TypeScript/JavaScript and React best practices for this Vite project, including typed object models, hook-based API calls and state management, SOLID and DRY. Use when creating new modules/components, refactoring, or reviewing .ts, .tsx, .js, .jsx code."
applyTo: "**/*.{ts,tsx,js,jsx,mjs,cjs}"
---

# TypeScript / JavaScript (Vite + React)

These rules apply to **new code and refactors alike**. For API work also follow [graphql.instructions.md](graphql.instructions.md). Step-by-step workflow: `vite-solid-development` skill.

## TypeScript
- Use `.ts`/`.tsx` for all source files. There is no Node server in this project
- No `any`. Use `unknown` + narrowing, generics, or precise types. No non-null `!` unless provably safe
- Use `type` imports: `import type { Foo } from '@/src/types/foo'` (required by `isolatedModules`)
- Prefer `interface` for object contracts that may be extended; `type` for unions/utility compositions
- Model domain entities, shared props, form values, and API request/response payloads with named types in **`src/types/<domain>.ts`** — not in feature folders, hooks or services
- Keep transport DTOs distinct from domain/UI models when their shapes or semantics differ, and map between them in the service
- Model state with discriminated unions (`{ status: 'idle' } | { status: 'error'; error: string }`) instead of multiple booleans
- Use `as const` + derived types for fixed lists instead of duplicating string literals
- Validate external data (API responses, form input) at the boundary before trusting its type
- Exported functions declare explicit return types

## Modern JavaScript
- ES modules only (`import`/`export`), named exports preferred over default exports (except lazy-loaded route pages and legacy page components)
- `const` by default, `let` when reassigned, never `var`
- `async`/`await` with `try`/`catch` over raw `.then()` chains; always handle rejected promises
- Use optional chaining `?.` and nullish coalescing `??` (not `||` when `0`/`''` are valid)
- Avoid mutation of props/state/shared objects; return new objects/arrays

## SOLID
- **S — Single Responsibility**: one component/hook/module = one reason to change. Split data fetching (hooks/services), presentation (components), and configuration (config modules). Pages > ~250 lines are a smell — extract sections
- **O — Open/Closed**: extend via props, composition (`children`, render props, slots) and config objects/arrays rather than editing internals or adding `if (page === 'x')` branches
- **L — Liskov Substitution**: wrapper components accept and forward the native props of what they wrap (`React.ComponentProps<'button'>`)
- **I — Interface Segregation**: keep props interfaces small and focused; don't pass whole objects when a component needs two fields
- **D — Dependency Inversion**: components depend on abstractions (hooks, injected callbacks), not on `fetch`, `localStorage`, or `import.meta.env` directly

## DRY
- Repeated markup across pages (hero, CTA, feature grid, card, form field) → shared component in `src/components/ui/` or `src/components/layout/`
- Repeated logic (form submit, scroll/animation setup, data fetching) → custom hook in **`src/hooks/`**
- Repeated pure helpers (email/phone validation, date formatting) → `src/utils/`
- Repeated content (lists of features, nav links, contact info) → typed data arrays in `src/features/<feature>/data/`, typed via `src/types/`
- Repeated literals (API paths, emails, phone numbers, board IDs) → `src/config/`, defined once
- Placement and import rules: see [project-structure.instructions.md](project-structure.instructions.md)
- Don't over-abstract: extract on the second/third real duplication, not speculatively

## React
- Function components + hooks only. Hooks at top level; follow `react-hooks` rules
- Components do not call `fetch` or service functions directly. Use typed custom hooks from `src/hooks/` as the React-facing API layer; hooks call services and expose data, request state and actions (`submit`, `reset`, `refetch`)
- Every custom hook lives in `src/hooks/useXxx.ts`. Keep trivial presentation-only state local (`useState` in the component) when extraction would add indirection without improving reuse or separation
- Hooks own effect cleanup and stale-request protection (`AbortController`); services remain React-free
- Stable, unique `key`s (never array index for dynamic lists)
- Derive values during render instead of syncing them with `useEffect`; use effects only for external systems and always clean up (listeners, GSAP contexts, Lenis instances, timers)
- Lazy-load route pages with `React.lazy` + `Suspense`
- Use `useMemo`/`useCallback` only for measured or referential-equality needs
- Accessibility: semantic elements, `alt` on images, labels on inputs, keyboard-operable controls

## Dependencies
- Install packages only via the internal Artifactory registry: `npm install <package> --registry https://artifactory.sunlifecorp.com/artifactory/api/npm/npm-all/` (same flag for `npm install` / `npm ci`)
- Prefer existing dependencies before adding new ones

## Vite Specifics
- Read env only via `src/config/env.ts` with static `import.meta.env.VITE_X` access — never dynamic `import.meta.env[key]`, never `process.env` in client code
- Static assets referenced by URL go in `public/`; assets imported in code go in `src/assets/`
- Use dynamic `import()` for heavy, rarely-used libraries
- Don't use Node built-ins (`fs`, `path`) in client code

## Security
- Never reference secrets in client code. `VITE_MONDAY_API_TOKEN` is consumed only by nginx and the Vite dev proxy; never `import.meta.env.VITE_MONDAY_API_TOKEN` in `src/`
- Never use `define` in `vite.config.ts` to inject secrets
- No `dangerouslySetInnerHTML` with untrusted data; sanitize if unavoidable
- Validate and trim all user input before sending it to `/api/*`
- External links with `target="_blank"` must use `rel="noopener noreferrer"`

