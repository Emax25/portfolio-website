# Codebase Map

> Agent reference for this repo. `/plan` reads this **instead of scanning `src/`**.
> Maintained by `/finish` (update the affected section whenever structure, routes,
> content conventions, or tooling change). Generated 2026-07-06.

## Architecture & Routing

### Directory layout
- **src/pages/** — route page components (Home, ProjectDetail, NotFound)
- **src/components/**
  - `ui/` — shadcn/ui primitives (Card, Badge, Button, Sheet, Dropdown, Separator)
  - `sections/` — Home-only sections (Hero, About, Skills, Projects, Experience, Education, Contact)
  - `charts/` — lazy-loaded charts (EquityCurveChart, ReturnsDistributionChart, PosteriorProbabilityChart, ConfusionMatrixChart)
  - core: `layout-shell.tsx`, `root-layout.tsx`, `theme-provider.tsx`
- **src/content/** — typed content layer: `types.ts` (interfaces), `projects/` (registry). Source of truth for all copy — no hardcoded strings in components; facts trace to `PROJECT_CONTEXT.md`.
- **src/data/** — static chart data (JSON) + `loaders.ts`
- **src/lib/** — utility helpers (`utils.ts`: `cn`)

### Routing (React Router v7)
- `/` → Home (7 sections, hash-based scroll nav: `/#projects`, `/#about`, …)
- `/projects/:slug` → ProjectDetail (lazy-loaded; 404 if slug not in registry)
- `*` → NotFound
- Tree: BrowserRouter → ThemeProvider → RootLayout (Outlet + LayoutShell)

### Lazy-loading / code-splitting
- ProjectDetail via `React.lazy()` + Suspense skeleton
- Each chart is its own chunk, lazy-loaded in `ProjectChart.tsx`
- `useNearViewport` hook (IntersectionObserver) defers chart mount/download until ~200px above viewport

### Load-bearing files
| File | Why it matters |
|------|----------------|
| `src/App.tsx` | Routes, lazy ProjectDetail, providers, Suspense fallback |
| `src/components/layout-shell.tsx` | Global nav, theme toggle, hash scroll, mobile menu |
| `src/pages/project-detail.tsx` | Renders narrative/metrics/charts from registry |
| `src/components/charts/ProjectChart.tsx` | ChartKind → component router, lazy loading, viewport detection |
| `src/content/projects/index.ts` | Central project registry; single source of slugs |
| `src/content/types.ts` | Project, ChartSpec, Profile interfaces |
| `src/data/loaders.ts` | Typed loaders + `getChartData()` switch |

## Content, Data & Charts

- **Case studies**: TypeScript objects in `src/content/projects/` implementing `Project`. Three exist: `intraday-trading-system`, `aladdin-crypto-scam-nlp`, `pmcmc-insider-detection`. Each holds metadata (slug, title, year, tags), narrative (problem[], approach[], results[]), key metrics, and a `charts` array referencing data by `dataSrc`.
- **Data files**: `src/data/*.json`, shape `{ illustrative: boolean, data: T[] }`. Typed interfaces in `loaders.ts` (`EquityPoint`, `DistributionPoint`, `PosteriorPoint`, `ConfusionPoint`). `illustrative: true` renders an "Illustrative Data" badge — set `false` only for real results.
- **Chart libraries**: lightweight-charts v5 for finance time-series (EquityCurveChart, AreaSeries, theme-aware, ResizeObserver); Recharts v3 for declarative charts (distribution, line, confusion matrix) via ResponsiveContainer. `ChartContainer.tsx` is the Card wrapper with the illustrative badge.
- **Adding a case study**: (1) `src/content/projects/<slug>.ts`; (2) export in `index.ts`; (3) `src/data/<dataSrc>.json`; (4) loader fn + case in `getChartData()`; (5) `ChartSpec` entry in the project's charts array; (6) new chart component only if no existing `ChartKind` fits, plus routing in `ProjectChart.tsx`.

## Build, Styling & Deploy

- **Build**: Vite 8 + `@vitejs/plugin-react` + `@tailwindcss/vite`; alias `@` → `./src`; default chunking. Scripts: `dev`, `build` (`tsc -b && vite build`), `lint` (oxlint), `preview`, `test` (vitest).
- **TypeScript**: strict; `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`; ES2023; bundler resolution (app).
- **Styling**: Tailwind v4, no config file — theme in `src/index.css` via `@theme inline` (oklch tokens, light/dark scales, radius, chart color vars). Geist Variable font. Dark mode: class-based `.dark`, localStorage-backed, anti-FOUT inline script in `index.html`.
- **shadcn/ui v4 on `@base-ui/react`** — no `asChild`; use `render={...}`.
- **Lint**: oxlint (react, typescript, oxc plugins); `react/rules-of-hooks` = error.
- **Deploy**: Vercel Hobby, auto-deploy on push to `master`; `vercel.json` has one SPA rewrite (`/(.*) → /index.html`). Prod: https://portfolio-website-xi-smoky-53.vercel.app/
- **Performance baseline**: Lighthouse home 96 perf / 100 a11y — don't regress; keep charts below the fold lazy.
- **Resume**: replace `public/resume.pdf` in place (filename preserved).
