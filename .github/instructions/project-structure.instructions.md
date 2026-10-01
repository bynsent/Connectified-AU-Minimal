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
  features/               # self-contained business modules
    <feature>/            # e.g. watch-guardian, bpo, contact-form, sim-signup
      components/         # UI used only by this feature
      hooks/              # feature-specific hooks
      services/           # feature API calls
      data/               # feature content/constants
      types.ts            # feature types
      index.ts            # public API: the ONLY entry point for other modules
  components/             # shared, feature-agnostic UI
    ui/                   # primitives: Button, Card, Input, Modal
    layout/               # Header, Footer, Section, Container
    seo/                  # SEO/Helmet wrappers
  hooks/                  # shared hooks (useScrollAnimation, useMediaQuery)
  services/               # shared API client (http wrapper, error handling)
  config/                 # env.ts, constants.ts, routes.ts
  types/                  # shared domain types
  utils/                  # pure, framework-free helpers
  assets/                 # files imported in code (hashed by Vite)
    images/ icons/ fonts/
  styles/                 # global CSS, Tailwind theme/tokens
public/                   # files referenced by URL, copied as-is (favicons, robots.txt, docs, large images)
  images/<section>/
```
Create only folders the code actually needs. Migrate existing `src/components/*Page.tsx` into `src/pages/` + `src/features/` incrementally, when a file is touched for other work.

## Placement Rules
- **Used by one feature** → inside that feature. **Used by 2+ features** → promote to `components/`, `hooks/`, `services/`, `utils/` or `types/`
- **Pages** contain routing concerns, SEO and composition only — no fetch calls, no large markup blocks, no business logic
- **Shared components** know nothing about features or business data; they receive everything via props
- **Services** are plain TS modules (no React); **hooks** adapt services to React state
- **utils** are pure functions with no side effects or React imports
- **Assets**: import from `src/assets/` when the build should hash/optimise them; use `public/` only for files needing a stable URL. Never mix the two for the same file
- **Styles**: Tailwind classes in components; global styles and theme tokens only in `src/styles/`

## Dependency Direction
```
app → pages → features → shared (components, hooks, services, utils, config, types)
```
- Imports flow **one way only**; shared modules never import from `features/`, `pages/` or `app/`
- Features do **not** import from other features. Share via a shared module or compose them in a page
- Import a feature only through its `index.ts` (`@/src/features/contact-form`), never deep paths (`.../contact-form/components/Field`)
- No circular imports

## File Conventions
- One component per file; filename = component name in PascalCase (`HeroSection.tsx`)
- Hooks: `useXxx.ts`; services: `xxxService.ts`; types: `types.ts`; constants/data: camelCase `.ts`
- Feature folders in kebab-case (`watch-guardian`)
- Colocate related files (component, its sub-components, its test) in the same folder
- Use the `@/` alias for cross-module imports; relative imports only within the same module
- Barrel `index.ts` only at module boundaries (features, `components/ui`), not in every folder
