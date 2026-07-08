# Accepted SPA-only OG/meta limitation

## Status

Accepted

## Date

2026-07-08

## Context

T11-T13 added an OG image, Open Graph/Twitter meta tags, canonical URL, and JSON-LD `Person` schema so the portfolio unfurls well when shared (LinkedIn, Slack, Twitter/X) and parses for search rich results. The site is a client-rendered Vite SPA (`react-router-dom` `BrowserRouter`, no SSR) with all meta tags living in the single `index.html` served for every route.

## Decision

Ship the meta/OG/JSON-LD work as static tags in `index.html` only:
- `<link rel="canonical" href="https://charlie-carvajal.vercel.app/">` (`index.html:10`)
- `og:url`, `og:image` (+ width/height/alt, absolute URL), `twitter:card` = `summary_large_image`, `twitter:image` (`index.html:12-26`)
- JSON-LD `Person` schema sourced entirely from `profile.ts`/`education.ts` facts — `alumniOf` built as an array over every `education.ts` entry rather than one hardcoded org (`index.html:43-61`)

No per-route `<Helmet>`-style meta injection, no prerendering, no SSR framework migration. Every route — `/`, `/journey`, `/how-i-build`, `/projects/:slug` — unfurls with the same home-page card, title, description, and image.

Server-side rendering / static prerendering was considered and explicitly rejected for this scope: it would require a framework change (or a prerender build step) disproportionate to the immediate goal of having *any* correct unfurl card, and the plan's Phase 4 budget was for meta/analytics polish, not an architecture migration.

## Consequences

- A shared link to `/projects/pmcmc-insider-detection` or `/journey` shows the generic "Charlie Carvajal | Quantitative Finance Portfolio" card, not project- or page-specific title/image/description. This is an accepted, known limitation, not an oversight.
- `sitemap.xml` (T13) still lists all 6 real URLs and search engines can crawl/index each route's rendered content client-side; only the *social-unfurl* preview is home-card-only, not indexability.
- Revisit trigger: if per-route unfurls become important (e.g. sharing a specific project or the Journey page becomes a common recruiter action), re-open this decision and evaluate a prerendering step (e.g. `vite-plugin-ssg`-style static generation) or a minimal SSR migration — scoped separately from this plan.
