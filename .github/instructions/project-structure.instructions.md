---
description: "Modular project structure for this Vite + React app: where components, features, hooks, services, assets, config and types belong, and import/dependency rules between modules. Use when creating, moving or organising files, adding a feature/page/component, or placing images, fonts and styles."
applyTo: "src/**"
---

# Modular Project Structure

## Target Layout
```
src/
  main.tsx                # bootstrap only
  app/                    # App shell: App.tsx, router/routes, providers, layouts
  pages/                  # route-level components: thin, compose features + shared UI
  features/               # self-contained business UI modules
    <feature>/            # e.g. watch-guardian, bpo, contact-form, sim-signup
      components/         # UI used only by this feature
      data/               # feature content/constants (typed with src/types)
      index.ts            # public API: the ONLY entry point for other modules
  components/             # shared, feature-agnostic UI
    ui/                   # primitives: Button, Card, Input, Modal
    layout/               # Header, Footer, Section, Container
    seo/                  # SEO/Helmet wrappers
  hooks/                  # ALL custom hooks (useXxx.ts) — shared and feature-specific
  services/               # ALL API code (React-free)
    graphqlClient.ts      # the only GraphQL transport
    monday/               # Monday operations, item/subitem helpers, column builders
    forms/                # per-form validate + submit functions
  types/                  # ALL TypeScript types, one file per domain (monday.ts, forms.ts, graphql.ts, theme.ts)
  config/                 # constants.ts, monday.ts (board/column ids), env.ts (only if VITE_* vars are added)
  utils/                  # pure, framework-free helpers
  assets/                 # files imported in code (hashed by Vite)
    images/ icons/ fonts/
  styles/                 # global CSS, Tailwind theme/tokens
public/                   # files referenced by URL, copied as-is (favicons, robots.txt, docs, large images)
  images/<section>/
```
Create only folders the code actually needs. Migrate existing `src/components/*Page.tsx` into `src/pages/` + `src/features/` incrementally, when a file is touched for other work.

## Placement Rules
- **Hooks** → always `src/hooks/useXxx.ts`, even if only one feature uses it. Never define a custom hook inside a component file or a feature folder
- **Types** → always `src/types/<domain>.ts` (domain models, shared props, form values, API DTOs, state unions). A component's own props interface may stay in its file only if no other file needs it
- **Services** → always `src/services/` (grouped by provider/domain). Plain TS, no React
- **UI used by one feature** → inside that feature. **Used by 2+ features** → promote to `components/`
- **Pages** contain routing concerns, SEO and composition only — no fetch calls, no large markup blocks, no business logic
- **Shared components** know nothing about features or business data; they receive everything via props
- **utils** are pure functions with no side effects or React imports
- **Assets**: import from `src/assets/` when the build should hash/optimise them; use `public/` only for files needing a stable URL. Never mix the two for the same file
- **Styles**: Tailwind classes in components; global styles and theme tokens only in `src/styles/`

## Dependency Direction
```
app → pages → features / components → hooks → services → (config, types, utils)
```
- Imports flow **one way only**; `hooks`, `services`, `config`, `types`, `utils` never import from `features/`, `pages/`, `app/` or `components/`
- `types/` imports only from other `types/` files
- Features do **not** import from other features. Share via a shared module or compose them in a page
- Import a feature only through its `index.ts` (`@/src/features/contact-form`), never deep paths
- No circular imports

## File Conventions
- One component per file; filename = component name in PascalCase (`HeroSection.tsx`)
- Hooks: `src/hooks/useXxx.ts`; services: `src/services/<domain>/xxxService.ts`; GraphQL operations: `src/services/<provider>/operations.ts`; types: `src/types/<domain>.ts`; constants/data: camelCase `.ts`
- Feature folders in kebab-case (`watch-guardian`)
- Use the `@/` alias for cross-module imports; relative imports only within the same folder
- Barrel `index.ts` only at module boundaries (features, `components/ui`), not in every folder

