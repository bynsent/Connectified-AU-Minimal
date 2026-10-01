---
name: vite-solid-refactor
description: "Refactor or build Vite + React + TypeScript features applying SOLID, DRY and modular structure. Use when asked to refactor a page/component, modularize code, reorganize folders into features/components/assets, remove duplication across pages, split a large component, create reusable components/hooks, or review code for SOLID/DRY violations."
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
2. Extract content → `<feature>/data/*.ts` with exported types
3. Extract API calls → `<feature>/services/*.ts` (pure, typed, accept dependencies as params)
4. Extract stateful logic → `<feature>/hooks/use*.ts`
5. Extract repeated markup → `src/components/ui|layout/*.tsx` with small, focused props; forward native props via `React.ComponentProps<'el'>` and `...rest`
6. Expose the feature through `<feature>/index.ts`; move the page to `src/pages/` and compose the above; keep behaviour and visuals identical
7. Replace other duplicated call sites with the new shared pieces

Run `npm run lint` after each step.

## 4. Verify
- `npm run lint` and `npm run build` pass
- No behaviour or visual change (check affected routes in `npm run dev`)
- No new `any`, no direct `import.meta.env` outside `src/config`
- No deep or cross-feature imports; shared modules don't import from `features/` or `pages/`
- Every effect that registers listeners/animations returns a cleanup
