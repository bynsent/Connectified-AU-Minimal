# Project Guidelines

## Stack
- Vite 6 + React 19 + TypeScript 5.8 (`moduleResolution: bundler`, `jsx: react-jsx`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Routing: `react-router-dom` v7; SEO: `react-helmet-async`; animation: `motion`, `gsap`, `lenis`
- Express server ([server.js](../server.js)) serves `dist/` and proxies `/api/*` (e.g. Monday.com)
- Deployed as a Docker container (Azure Container Apps) — see [Dockerfile](../Dockerfile), [azure-pipelines.yaml](../azure-pipelines.yaml)

## Build and Test
- `npm run dev` — dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run lint` — type-check (`tsc --noEmit`); run after every change

## Core Principles
- Apply **SOLID** and **DRY** — see [typescript-vite.instructions.md](instructions/typescript-vite.instructions.md)
- **Modular development**: separate app shell, pages, features, shared components, hooks, services, config, types and assets with one-way dependencies — see [project-structure.instructions.md](instructions/project-structure.instructions.md)
- **Configuration over hard-coding**: URLs, IDs, ports, feature flags, contact details, third-party keys, timeouts and limits must come from environment variables via a typed config module — see [env-config.instructions.md](instructions/env-config.instructions.md)
- Never commit secrets. Every new variable must be added to [.env.example](../.env.example) with a comment.

## Conventions
- New route components go in `src/pages/`, business modules in `src/features/<feature>/`; legacy `src/components/*Page.tsx` are migrated when touched
- URL-referenced images live under `public/images/<section>/` (`/images/...`); images imported in code live in `src/assets/`
- Use the `@/` alias for imports from the project root
