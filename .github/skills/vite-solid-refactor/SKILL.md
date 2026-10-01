---
name: vite-solid-refactor
description: "Refactor or build Vite + React + TypeScript features using typed object models, hook-based API calls and state management, SOLID, DRY and modular structure. Use when asked to refactor a page/component, separate API or state logic into hooks, model domain/API objects, modularize code, remove duplication, split a large component, or review code for SOLID/DRY violations."
---

# SOLID + DRY Refactor / Feature Workflow

Rules live in [typescript-vite.instructions.md](../../instructions/typescript-vite.instructions.md). This skill is the step-by-step process.

## 1. Analyse
For the target file(s) list:
- Responsibilities mixed in one unit (data fetching, state, layout, animation, config) → **SRP** violations
- Branches on page/type names (`if (variant === ...)`) that grow with each new case → **OCP** violations
- Wrappers that drop native props → **LSP** violations
- Props interfaces with many unused fields → **ISP** violations
- Direct use of `fetch`, `import.meta.env`, `localStorage`, `window` inside components → **DIP** violations
- Components calling API services directly or coordinating request/loading/error state themselves → extract a typed React-facing custom hook
- Non-trivial or reusable stateful behaviour embedded in rendering components → extract a custom hook; leave trivial presentation-only state local when a hook would only add indirection
- Untyped or inline object shapes for domain entities, forms, and API payloads → named feature or shared types
- Markup, logic, data or literals repeated in 2+ places → **DRY** violations (search sibling `*Page.tsx` files)

Present findings as a short table before changing code.

## 2. Plan the Target Structure
Map every extracted piece to its location using [project-structure.instructions.md](../../instructions/project-structure.instructions.md):
- Feature-only code → `src/features/<feature>/` (exposed via its `index.ts`)
- Code shared by 2+ features → `src/components/`, `src/hooks/`, `src/services/`, `src/utils/`, `src/types/`
- Route component → `src/pages/<Name>Page.tsx`
- Imported assets → `src/assets/`; URL-referenced assets → `public/`

Only create folders that the refactor actually needs.

## 3. Refactor Incrementally
1. Extract config/literals → `src/config` (use the `vite-externalize-config` skill for env vars)
2. Model domain entities, form values, and API request/response DTOs → `<feature>/types.ts` (or `src/types/` only when genuinely shared); map DTOs to domain/UI models when they differ
3. Extract content → `<feature>/data/*.ts` using the named types
4. Extract API transport → `<feature>/services/*.ts` (React-free, typed, boundary-validated, and accepting dependencies as params)
5. Extract API orchestration and reusable/non-trivial stateful logic → `<feature>/hooks/use*.ts`; hooks call services and expose typed data, status, errors, and actions while handling cleanup and stale requests
6. Extract repeated markup → `src/components/ui|layout/*.tsx` with small, focused props; forward native props via `React.ComponentProps<'el'>` and `...rest`
7. Expose the feature through `<feature>/index.ts`; move the page to `src/pages/` and compose the above; keep behaviour and visuals identical
8. Replace other duplicated call sites with the new shared pieces

Run `npm run lint` after each step.

## 4. Verify
- `npm run lint` and `npm run build` pass
- No behaviour or visual change (check affected routes in `npm run dev`)
- No new `any`, no direct `import.meta.env` outside `src/config`, and meaningful object shapes use named types
- No component directly calls `fetch` or an API service; API request state and actions are exposed through typed custom hooks
- No deep or cross-feature imports; shared modules don't import from `features/` or `pages/`
- Every effect that registers listeners/animations returns a cleanup
