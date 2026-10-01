---
description: "TypeScript/JavaScript and React best practices for this Vite project, including typed object models, hook-based API calls and state management, SOLID and DRY. Use when writing or reviewing .ts, .tsx, .js, .jsx code."
applyTo: "**/*.{ts,tsx,js,jsx,mjs,cjs}"
---

# TypeScript / JavaScript (Vite + React)

## TypeScript
- Prefer `.ts`/`.tsx` for new files; use JS only for Node entry points that must stay JS (e.g. `server.js`)
- No `any`. Use `unknown` + narrowing, generics, or precise types. No non-null `!` unless provably safe
- Use `type` imports: `import type { Foo } from './foo'` (required by `isolatedModules`)
- Prefer `interface` for object contracts that may be extended; `type` for unions/utility compositions
- Model domain entities, component props, form values, and API request/response payloads with named TypeScript types; place feature types in `src/features/<feature>/types.ts` and genuinely shared types in `src/types/`
- Keep transport DTOs distinct from domain/UI models when their shapes or semantics differ, and map between them at the service boundary
- Model state with discriminated unions (`{ status: 'idle' } | { status: 'error'; error: string }`) instead of multiple booleans
- Use `as const` + derived types for fixed lists instead of duplicating string literals
- Validate external data (API responses, env vars, form input) at the boundary before trusting its type
- Exported functions declare explicit return types

## Modern JavaScript
- ES modules only (`import`/`export`), named exports preferred over default exports (except lazy-loaded route pages)
- `const` by default, `let` when reassigned, never `var`
- `async`/`await` with `try`/`catch` over raw `.then()` chains; always handle rejected promises
- Use optional chaining `?.` and nullish coalescing `??` (not `||` when `0`/`''` are valid)
- Avoid mutation of props/state/shared objects; return new objects/arrays

## SOLID
- **S — Single Responsibility**: one component/hook/module = one reason to change. Split data fetching (hooks/services), presentation (components), and configuration (config modules). Pages > ~250 lines are a smell — extract sections
- **O — Open/Closed**: extend via props, composition (`children`, render props, slots) and config objects/arrays rather than editing internals or adding `if (page === 'x')` branches
- **L — Liskov Substitution**: wrapper components accept and forward the native props of what they wrap (`React.ComponentProps<'button'>`), so they can replace the base element
- **I — Interface Segregation**: keep props interfaces small and focused; don't pass whole objects when a component needs two fields
- **D — Dependency Inversion**: components depend on abstractions (hooks, service functions, injected callbacks), not on `fetch`, `localStorage`, or `import.meta.env` directly

## DRY
- Repeated markup across pages (hero, CTA, feature grid, card, form field) → shared component in `src/components/ui/` or `src/components/layout/`
- Repeated logic (form submit, scroll/animation setup, data fetching) → custom hook in `src/hooks/` (or `src/features/<feature>/hooks/` if feature-only)
- Repeated content (lists of features, nav links, contact info) → typed data arrays in `src/features/<feature>/data/` mapped in JSX
- Placement and import rules: see [project-structure.instructions.md](project-structure.instructions.md)
- Repeated literals (API paths, emails, phone numbers, brand colours) → constants or env-backed config, defined once
- Don't over-abstract: extract on the second/third real duplication, not speculatively

## React
- Function components + hooks only. Hooks at top level; follow `react-hooks` rules
- Components do not call `fetch` or API service functions directly. Use typed custom hooks (`useXxx`) as the React-facing API layer; hooks call services and expose data, loading/error state, and actions such as submit, retry, or refetch
- Extract reusable or non-trivial stateful behaviour into custom hooks, including API lifecycles, forms, subscriptions, and coordinated state. Keep trivial presentation-only state local when extraction would add indirection without improving reuse or separation
- Custom hooks own effect cleanup and stale-request protection (for example `AbortController`) where applicable; service modules remain React-free and perform typed transport and boundary validation
- Stable, unique `key`s (never array index for dynamic lists)
- Derive values during render instead of syncing them with `useEffect`; use effects only for external systems and always clean up (listeners, GSAP contexts, Lenis instances, timers)
- Lazy-load route pages with `React.lazy` + `Suspense` to keep the initial bundle small
- Use `useMemo`/`useCallback` only for measured or referential-equality needs
- Accessibility: semantic elements, `alt` on images, labels on inputs, keyboard-operable controls

## Vite Specifics
- Read env only via the typed config module (see env-config instructions), never `process.env` in client code
- Static assets referenced by URL go in `public/`; assets imported in code go in `src/assets/`
- Use dynamic `import()` for heavy, rarely-used libraries
- Don't use Node built-ins (`fs`, `path`) in client code

## Security
- Never place secrets in client code or `VITE_*` variables — they are inlined into the public bundle. Secrets stay server-side (`server.js`) behind a proxy route
- No `dangerouslySetInnerHTML` with untrusted data; sanitize if unavoidable
- Validate and encode all user input sent to `/api/*`; validate again on the server
- External links with `target="_blank"` must use `rel="noopener noreferrer"`
