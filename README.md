# Charlie Carvajal — Quant Finance Portfolio

Personal portfolio website showcasing quantitative finance projects, experience, and education. Built with Vite, React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui, Motion, TradingView Lightweight Charts, and Recharts. Deployed on Vercel.

## Development

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Content system

All site copy lives in typed data modules under `src/content/` — no facts are hard-coded in components:

| File | Contents |
|------|----------|
| `src/content/profile.ts` | Name, positioning line, bio, contact links |
| `src/content/experience.ts` | Roles (`featured: true` appear on the timeline; others in the "Earlier experience" strip) |
| `src/content/education.ts` | Degrees + coursework |
| `src/content/skills.ts` | Skill groups |
| `src/content/honors.ts` | Honors & certifications |
| `src/content/projects/` | One file per project case study |

### Adding a new project

1. Create `src/content/projects/<slug>.ts` exporting a `Project` (see `src/content/types.ts` for the interface).
2. Register it in `src/content/projects/index.ts`.
3. If it has charts, add a JSON dataset in `src/data/` and map its `dataSrc` key in `src/data/loaders.ts`.

The home-page grid and the `/projects/<slug>` route are derived automatically from the registry.

### Swapping in real chart data

The current datasets in `src/data/*.json` are **illustrative placeholders** flagged with `"illustrative": true`, which renders an "Illustrative Data" badge on each chart. To replace one with real results:

1. Export your real series in the same shape as the existing JSON file.
2. Replace the file contents and set `"illustrative": false`.
3. In the project's content file, set `illustrative: false` on the matching `ChartSpec` — the badge disappears.

### Updating the résumé

Replace `public/resume.pdf` with the new PDF (keep the filename).
