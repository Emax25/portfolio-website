# Session Handoff — Portfolio Website (2026-07-03)

> Written for the next agent. Read this before making changes.

## Live site

| Item | Value |
|------|--------|
| **Production URL** | https://portfolio-website-xi-smoky-53.vercel.app/ |
| **GitHub repo** | https://github.com/Emax25/portfolio-website |
| **Local app root** | `portfolio/` (inside workspace `Portfolio Website/`) |
| **Default branch** | `master` |
| **Hosting** | Vercel Hobby (free, personal/non-commercial) |
| **Resume PDF** | `portfolio/public/resume.pdf` (copied from `Resume - Charlie Carvajal.pdf` in workspace root) |

Vercel auto-deploys on push to `master`. Project name on Vercel may differ from repo name (user kept default `portfolio-website-*` subdomain rather than `charlie-carvajal.vercel.app`).

---

## What was built (orchestrated pipeline)

A full quant-finance portfolio was implemented from `PROJECT_CONTEXT.md` and the plan at `.cursor/plans/quant_portfolio_website_plan_637b696c.plan.md`.

### Stack (locked — do not change without owner approval)

- Vite 8 + React 19 + TypeScript strict
- Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui v4 on `@base-ui/react` (**no `asChild`** — use `render={...}` or `buttonVariants()` on links)
- Motion (`motion/react`)
- React Router v7
- TradingView Lightweight Charts v5 (`chart.addSeries(AreaSeries, …)`)
- Recharts
- oxlint (`npm run lint`)

### Architecture

```
portfolio/src/
├── content/          # All copy — typed data modules (source of truth for UI text)
│   ├── profile.ts, experience.ts, education.ts, skills.ts, honors.ts
│   ├── types.ts
│   └── projects/     # One file per case study + index.ts registry
├── components/
│   ├── sections/     # Home page sections
│   ├── charts/       # Lazy-loaded chart components
│   ├── layout-shell.tsx, theme-provider.tsx
│   └── ui/           # shadcn components
├── data/             # Illustrative chart JSON + loaders.ts
└── pages/            # home, project-detail (lazy), not-found
```

- **Home:** anchored sections `#about`, `#skills`, `#projects`, `#experience`, `#education`, `#contact`
- **Case studies:** `/projects/pmcmc-insider-detection`, `/projects/intraday-trading-system`, `/projects/aladdin-crypto-scam-nlp`
- **Theme:** dark default, light/dark toggle, `localStorage`, inline anti-FOUT script in `index.html`

### Content guardrails (non-negotiable)

- All facts must trace to `PROJECT_CONTEXT.md` — **never fabricate** employers, dates, or metrics.
- **No** phone, GPA, headshot, EmailJS/contact form on the site.
- CME challenge (410%, 2nd/616) is a **Hero/Honors stat**, not a case study.
- Chart JSON in `src/data/` is **illustrative** (`"illustrative": true`); UI shows an "Illustrative Data" badge.
- PMCMC quantitative results allowed: **0.96 AUC** (synthetic), **0.88 posterior** (real wallet). Aladdin has **no** accuracy metrics.

### Subagent content audit (orchestrator corrections)

An orchestrator pass removed subagent embellishments before deploy:

- Invented job locations (e.g. "New York, NY (Remote)" on Cantor) — removed where not in PROJECT_CONTEXT
- Unsupported claims (Aladdin "low latency/real-time", fabricated honor years/descriptions)
- Hero "Fall 2026 availability" badge — softened to "Open to quantitative finance roles / M.S. expected Dec 2026"
- Contact section note that mentioned withholding phone/GPA — removed
- Experience bullets tightened to PROJECT_CONTEXT wording

### Performance

- `ProjectDetail` route is `React.lazy` — charts not in home bundle.
- Charts use `IntersectionObserver` + per-chart `React.lazy` in `ProjectChart.tsx` (viewport-deferred).
- Lighthouse (production build, local): home **96** perf / **100** a11y; case-study page **95** / **100**.

### Git history (as of handoff)

```
2dfa9a4 Lazy-load chart bundles below the fold; Lighthouse perf 95+ on case-study pages
f6b9e2a Initial portfolio site: Vite + React 19 + TS strict, Tailwind v4, shadcn/ui, case studies with charts
```

(Pending local commit: resume accent fix — see below.)

---

## Changes in this conversation segment (post-deploy)

### 1. "Résumé" → "Resume" (owner preference)

**Why:** "Résumé" is French (with accent marks). Owner wants American English **"resume"** with no accents.

**Files changed:**

| File | Change |
|------|--------|
| `src/components/sections/hero.tsx` | CTA button text: `Download Résumé` → `Download Resume` |
| `README.md` | Section heading: `Updating the résumé` → `Updating the resume` |

**Already unaccented (no change needed):**

- `layout-shell.tsx` — "Resume PDF", "Resume" (footer/mobile menu)
- `download="Charlie_Carvajal_Resume.pdf"` attribute on hero link

**Not changed (outside website scope unless owner asks):**

- `PROJECT_CONTEXT.md`, `.cursor/agents/frontend-developer.md` still say "résumé" in planning docs.

### 2. Vercel Cursor plugin installed

```powershell
npx plugins add vercel/vercel-plugin --target cursor
# Confirmed with: echo y | ...
```

- Installed at **user scope** for Cursor (`vercel-plugin@vercel`).
- CLI warned "Cursor was not detected on this system" but install succeeded.
- **Owner may need to restart Cursor/agent tools** for plugin skills/MCP/hooks to load.
- Plugin repo: https://github.com/vercel/vercel-plugin

---

## Environment notes

- **Node.js** was not installed initially; orchestrator installed **Node LTS v24.18.0** via `winget install OpenJS.NodeJS.LTS`.
- **`gh auth login`** completed by owner; repo pushed with `gh repo create portfolio-website --public --source=. --remote=origin --push`.
- Vercel account created via **GitHub** (Emax25), Hobby plan.

---

## Common tasks for the next agent

### Run locally

```powershell
cd "C:\Users\charl\Documents\Applications\Portfolio Website\portfolio"
npm install
npm run dev
```

### Deploy updates

```powershell
git add -A
git commit -m "your message"
git push origin master
```

Vercel rebuilds automatically.

### Add a project

1. Add `src/content/projects/<slug>.ts` conforming to `Project` in `types.ts`.
2. Register in `src/content/projects/index.ts`.
3. Optional: add JSON in `src/data/` + wire in `loaders.ts`.

### Swap real chart data

Replace JSON in `src/data/`, set `"illustrative": false`, and set `illustrative: false` on the matching `ChartSpec` in the project content file.

### Replace resume PDF

Overwrite `public/resume.pdf` (keep filename).

---

## Verification checklist

- [ ] `npm run build` passes
- [ ] `npm run lint` passes (fast-refresh warnings in shadcn files are OK)
- [ ] Hero says **"Download Resume"** (no accents)
- [ ] `/resume.pdf` returns 200
- [ ] All three `/projects/*` routes resolve
- [ ] Charts show **Illustrative Data** badge
- [ ] No phone / GPA / contact form on site

---

## Open / deferred items

- Custom domain not configured (`.vercel.app` only).
- Vercel project slug is auto-generated (`portfolio-website-xi-smoky-53`); can rename in Vercel project settings to get `charlie-carvajal.vercel.app` if desired.
- `PROJECT_CONTEXT.md` §9 "Open Questions" still has stale unchecked items — plan decisions were resolved in the plan file, not all synced back to PROJECT_CONTEXT.
- GitHub repo links on case studies point to `https://github.com/Emax25` (profile), not per-repo URLs — intentional placeholder until owner adds real repo links.

---

## Key reference files (workspace root)

| File | Purpose |
|------|---------|
| `PROJECT_CONTEXT.md` | Factual source of truth for all site content |
| `.cursor/agents/frontend-developer.md` | Subagent spec for UI work |
| `.cursor/plans/quant_portfolio_website_plan_637b696c.plan.md` | Implementation plan + resolved decisions |
