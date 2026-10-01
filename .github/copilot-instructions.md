# Project Guidelines

## Stack
- Vite 6 + React 19 + TypeScript 5.8 (`moduleResolution: bundler`, `jsx: react-jsx`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Routing: `react-router-dom` v7; SEO: `react-helmet-async`; animation: `motion`, `gsap`, `lenis`
- Static SPA served by **nginx** ([nginx.conf](../nginx.conf)). nginx also reverse-proxies `/api/monday` to Monday.com and injects the API token at runtime. There is **no Node/Express server** — do not add one
- Local dev: the Vite dev server proxies `/api/monday` the same way (`server.proxy` in [vite.config.ts](../vite.config.ts))
- Deployed as an nginx Docker container (Azure Container Apps) — see [Dockerfile](../Dockerfile), [azure-pipelines.yaml](../azure-pipelines.yaml)

## Build and Test
- **Installing packages**: always use the internal Artifactory registry:
  `npm install <package> --registry https://artifactory.sunlifecorp.com/artifactory/api/npm/npm-all/`
  (also for a plain `npm install` / `npm ci`: append `--registry https://artifactory.sunlifecorp.com/artifactory/api/npm/npm-all/`). Never install from the public npm registry
- `npm run dev` — dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run lint` — type-check (`tsc --noEmit`); run after every change

## Core Principles
These apply equally to **new code** (features, modules, pages, components, hooks, services) and to **refactors** of existing code.
- Apply **SOLID** and **DRY** — see [typescript-vite.instructions.md](instructions/typescript-vite.instructions.md)
- **Modular development**: separate app shell, pages, features, shared components, hooks, services, config, types and assets with one-way dependencies — see [project-structure.instructions.md](instructions/project-structure.instructions.md)
- **All hooks live in `src/hooks/`** and **all types live in `src/types/`** — never inside feature folders
- **Typed contracts first**: define domain models, props, form values and API DTOs as named types in `src/types/` before implementing
- **Layered data access**: component → hook (`src/hooks/`) → service (`src/services/`) → shared `graphqlClient` → `/api/*` (nginx reverse proxy). Components never call `fetch` or services directly
- **GraphQL**: named operations defined once, variables only (never string interpolation), minimal selection sets, `errors` handled, token injected by nginx — see [graphql.instructions.md](instructions/graphql.instructions.md)
- **Configuration over hard-coding**: URLs, IDs, contact details, timeouts and limits come from typed config in `src/config/` — see [env-config.instructions.md](instructions/env-config.instructions.md)
- The only secret is `VITE_MONDAY_API_TOKEN`. It is consumed **only by nginx (runtime) and the Vite dev proxy** — never referenced from `src/`, never passed as a Docker build arg
- Never commit secrets. Every variable must be listed in [.env.example](../.env.example) with a comment.

## Skills
- `vite-solid-development` — workflow for **creating** new features/modules/components and for **refactoring** existing ones
- `vite-externalize-config` — workflow for moving hard-coded values to typed config / env

## Conventions
- New route components go in `src/pages/`, business UI in `src/features/<feature>/`; never add new `src/components/*Page.tsx` files — legacy ones are migrated when touched
- Before creating a component, hook or service, search `src/hooks/`, `src/services/`, `src/types/` and `src/components/` for an existing one to reuse or extend
- GraphQL documents live in `src/services/<provider>/operations.ts`; all requests go through `src/services/graphqlClient.ts`
- URL-referenced images live under `public/images/<section>/` (`/images/...`); images imported in code live in `src/assets/`
- Use the `@/` alias for imports from the project root

