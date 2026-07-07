# Portfolio Feature Set — Evolution, New Pages, SEO/Polish, Real Data

> Status: implementation-ready (pending critic pass). On approval, copy this file to `docs/plans/` so `/implement` auto-discovers it.

## Context

The portfolio (https://charlie-carvajal.vercel.app/, Vite 8 + React 19 + TS strict + Tailwind v4 + shadcn/ui on `@base-ui/react`) is live and being sent to quant recruiters now. The owner wants: (1) "Explore Case Study" → "Explore Project"; (2) a way to show projects under active extension/reimagining (limitations, new direction, timeline — PMCMC first); (3) a dedicated "How I Build" page about AI-assisted development (Claude Code, Cursor, agents/skills) framed as engineering leverage + verification rigor; (4) B.S. core coursework (extracted from owner's transcript PDF); (5) a `/journey` long-form about page (owner writes copy); (6) approved polish: OG image + og:url/canonical + per-route titles, Vercel Analytics, content-rule cleanup, JSON-LD + sitemap; (7) previously agreed and unblocked: real per-repo GitHub links and real PMCMC posterior data.

All decisions below were resolved with the owner in a grill session — do not re-open them. Key constraints (verified): all copy lives in typed modules under `src/content/` (no literals in components; never fabricate facts); **no `asChild`** — use `render={...}` or `buttonVariants()` (pattern at `src/pages/project-detail.tsx:44-47`); new routes must be lazy; Lighthouse must stay ≥95; the GitHub repo is public so the transcript PDF must never be committed.

Subagent assignment: `frontend-developer` = UI/components/styling; `case-study-writer` = content-module copy (owner-provided sources only); `general` = meta/SEO/analytics/config/data.

## Implementation protocol (critic blocker — mandatory)

The site auto-deploys on push to `master` and recruiters are viewing it **today**. Therefore:

- **All work happens on a feature branch** (e.g. `feature/evolution-pages`). Verify on the Vercel **preview URL** per push. Merge to `master` only after the owner confirms placeholder copy is replaced or acceptable to show.
- **Exception — merge to `master` immediately** (no placeholders involved): T0 (gitignore), T15 (real repo links), T16 (real PMCMC data). These are pure improvements to the live site and run first (Phase 0.5).
- T7/T8 both edit `src/App.tsx` — sequential only, do not parallelize.

## Owner inputs (collect at implementation time)

- 3 per-repo GitHub URLs (ready per owner) — T15
- Real PMCMC posterior export, shape `{iteration, suspiciousWallet, normalWallet}` (ready) — T16
- Transcript PDF dropped at repo root **after T0 merges**; then approval of curated course list — T17
- Later (non-blocking): final copy for PMCMC retrospective/timeline, How I Build, Journey

## Phase 0 — Safety prep

**T0. Gitignore transcript pattern** — `general`
- `.gitignore`: append root-anchored `/*transcript*.pdf` + `/*Transcript*.pdf` with a "private documents — public repo" comment.
- Accept: `git check-ignore` matches dry-run names; owner may drop PDF only after this is pushed. If the real filename doesn't contain "transcript", add the exact name first.

## Phase 0.5 — Immediate wins (real content, straight to `master`)

Moved ahead of everything else per critic: inputs are ready, no dependency on T1-T14, and every day they wait the live site shows illustrative data + profile-only links to recruiters.

**T15. Real repo links** — `general` — needs 3 URLs from owner
- In each of the 3 files under `src/content/projects/`, replace `{label:'GitHub Profile', href:'https://github.com/Emax25'}` with `{label:'Code', href:<per-repo URL>}`. Accept: no `github.com/Emax25` left in `src/content/projects/`; manual click-through on all three.

**T16. Real PMCMC data** — `general` — needs export from owner
- Replace `src/data/pmcmc-posterior.json` contents keeping exact shape `{"illustrative": false, "data": [{iteration, suspiciousWallet, normalWallet}]}`; flip `illustrative: false` on the ChartSpec in `pmcmc-insider-detection.ts:44`. Loaders/tests pass unchanged (schema identical). If export >~200 rows, downsample to keep the lazy chunk small.
- Accept: badge gone on that chart only; `npm run test` green.

## Phase 1 — Types & content modules

**T1. CTA rename** — `frontend-developer`
- `src/components/sections/projects.tsx:67`: "Explore Case Study" → "Explore Project". Accept: grep for old string returns nothing.

**T2. Extend `Project` type** — `frontend-developer`
- `src/content/types.ts`: add optional `status?: 'active' | 'complete'`, `retrospective?: { limitations: string[]; nowDifferent: string[] }`, `timeline?: { date: string; title: string; description?: string }[]`. Also export (full shapes so this task is self-contained):
  ```ts
  export interface HowIBuildContent {
    intro: string[];
    philosophy: { title: string; body: string[] };
    toolchain: { name: string; role: string }[];
    workflow: { stage: string; description: string }[];
    verification: { title: string; body: string[] };
  }
  export interface JourneyContent {
    title: string;
    subtitle: string;
    sections: { id: string; heading: string; body: string[] }[];
  }
  ```
- Accept: `npm run build` passes with zero edits to existing project modules.

**T3. PMCMC evolution content (placeholders)** — `case-study-writer` (depends T2)
- `src/content/projects/pmcmc-insider-detection.ts`: add `status: 'active'`, retrospective (2-3 limitations + 2-3 nowDifferent), timeline (3-4 entries). Every string prefixed `[PLACEHOLDER — owner copy pending]`; describe the *kind* of content, invent no technical claims. Keep wallet anonymization.

**T4a. `src/content/how-i-build.ts`** — `case-study-writer`
- `HowIBuildContent = { intro: string[]; philosophy: {title, body[]}; toolchain: {name, role}[]; workflow: {stage, description}[]; verification: {title, body[]} }`. Tool names (Claude Code, Cursor, subagents, skills) are owner-stated and safe; workflow claims stay `[PLACEHOLDER]`-marked. Recruiter framing: leverage + verification discipline.

**T4b. `src/content/journey.ts`** — `case-study-writer`
- `JourneyContent = { title; subtitle; sections: {id, heading, body[]}[] }`, three placeholder sections: origin → pivot to quant → what drives me. No invented biography.

**T4c. Content-rule cleanup (verbatim move, no rewriting)** — `frontend-developer`
- Move hard-coded card copy from `src/components/sections/about.tsx:44-56` ("Foundational Philosophy", "Current Focus") into content (`profile.ts` or new `src/content/about.ts`); render from module.
- `src/components/sections/contact.tsx:35`: derive `github.com/Emax25` display string from `profile.github`. Also switch `layout-shell.tsx` footer GitHub href to `profile.github` while there.
- Accept: rendered output pixel-identical; `grep -rn "Emax25" src/components/` clean.

## Phase 2 — Nav refactor, titles, new pages

**T5. Nav refactor: hash + route items** — `frontend-developer` (before T7/T8)
- `src/components/layout-shell.tsx`: replace `navItems` (lines 26-33) with discriminated union `{label, kind:'hash', id} | {label, kind:'route', to}`. Order: About, Skills, Projects, Experience, Education, Journey (`/journey`), How I Build (`/how-i-build`), Contact.
- Both desktop (93-106) and mobile Sheet (151-164): hash items keep existing `handleNavClick`; route items render `<Link to>` (bypass handleNavClick entirely — risk #2), close sheet on click, active style via `location.pathname`.
- 8-item width mitigation: `space-x-4 lg:space-x-6`, optionally `text-[13px] lg:text-sm`; escalate to moving desktop nav breakpoint `md:` → `lg:` only if measurement at 768px demands. Last-resort fallback (owner decision was an 8-item nav — do not lead with this): the existing `Dropdown` ui primitive as a "More" menu for the two route items.
- Accept: hash nav works from `/`, `/journey`, `/how-i-build`, and `/projects/:slug` (navigates `/#id`); route nav works everywhere; no header wrap at 768/834/1024px; existing hash-scroll effects (48-66) unaffected.

**T6. `usePageTitle` hook** — `frontend-developer`
- New `src/lib/use-page-title.ts`: `useEffect` sets `document.title = title ? \`${title} | Charlie Carvajal\` : BASE_TITLE` (BASE = 'Charlie Carvajal | Quantitative Finance Portfolio', matches `index.html:8`), restores BASE on cleanup — add a comment noting this assumes one instance per route leaf (nested usage would break restoration). Apply in `home.tsx` (base), `project-detail.tsx` (`project.title`, guard undefined), `not-found.tsx` ('Page Not Found').
- Accept: vitest jsdom test for mount/unmount behavior; tab titles change per route.

**T7. `/how-i-build` page** — `frontend-developer` (depends T4a, T5, T6)
- New `src/pages/how-i-build.tsx` + lazy route in `src/App.tsx` (copy the `ProjectDetail` lazy pattern + existing Suspense fallback). Renders only from T4a module: intro → philosophy → toolchain grid (reuse `Card`/`Badge`) → workflow → verification. `usePageTitle('How I Build')`. Motion entrance mirrors `about.tsx` reduced-motion guard.
- Accept: direct URL load works; separate chunk in `dist/`; zero copy literals in component.

**T8. `/journey` page + About link** — `frontend-developer` (depends T4b, T5, T6)
- New `src/pages/journey.tsx`, same pattern, `usePageTitle('My Journey')`. In `about.tsx` after the bio paragraphs: subtle "Read my full journey →" `<Link to="/journey">`.
- Accept: loads via nav, About link, and direct URL; separate chunk.

## Phase 3 — Project evolution UI

**T9. Card badge** — `frontend-developer` (depends T2, T3)
- `src/components/sections/projects.tsx`: when `status === 'active'`, `<Badge variant="outline">` "Active Development" with pulsing dot gated by `motion-safe:animate-pulse` (static dot under reduced motion).
- Accept: badge only on PMCMC card; no layout shift on other cards.

**T10. Detail hero badge + "Project Evolution" section** — `frontend-developer` (depends T2, T3)
- `src/pages/project-detail.tsx`: hero badge next to year pill (lines 54-75). New section (optionally extracted to `src/components/project-evolution.tsx`) rendered when `retrospective || timeline`, inserted after Key Results (line ~126), before Visualizations (line 129): h2 "Project Evolution" → "Known Limitations" list → "What I'm Doing Differently" list → vertical timeline as semantic `<ol>`/`<li>` with `<time>`, left-border + dot markers, whileInView entrance with the page's existing reduced-motion guard. Fully readable with animations off; screen-reader navigable.
- Accept: appears only on PMCMC detail page, in position; ol/time semantics; no transform animation under `prefers-reduced-motion: reduce`.

## Phase 4 — SEO, meta, analytics

**T11. OG image asset** — `frontend-developer`
- New `public/og-image.png`, 1200×630, <300 KB: dark `#09090b` background (matches theme-color in `index.html:23`), name, "Quantitative Finance — M.S. Financial Mathematics, UChicago", site URL. Build SVG/HTML in scratchpad, rasterize via `@resvg/resvg-js-cli`/`sharp` (fallback: Playwright screenshot); only the PNG is committed. Owner can swap the asset later without touching meta.

**T12. Meta tags** — `general` (depends T11)
- `index.html`: add canonical + `og:url` (https://charlie-carvajal.vercel.app/), `og:image` (+width/height/alt, absolute URL), change `twitter:card` → `summary_large_image`, add `twitter:image`. Accepted limitation: SPA — all routes unfurl with the home card (no SSR meta in scope).

**T13. JSON-LD + sitemap** — `general`
- `index.html`: Person schema — every value copied from `profile.ts`/`education.ts` (name, url, email, sameAs LinkedIn/GitHub), nothing invented. `alumniOf` must be an **array built from every entry in `education.ts`** (B.S. institution included), not a single hardcoded org — an omitted fact is a wrong fact in structured data.
- New `public/sitemap.xml`: 6 URLs (`/`, `/journey`, `/how-i-build`, 3 project slugs). Append `Sitemap:` line to `public/robots.txt` (exists — verified; if somehow missing, create with `User-agent: *` / `Allow: /` first).

**T14. Vercel Analytics** — `general`
- `npm install @vercel/analytics`; render `<Analytics />` (from `@vercel/analytics/react`) inside ThemeProvider, outside Routes, in `src/App.tsx`. SPA route changes tracked automatically.

## Phase 5 — Remaining owner-input task

**T17. B.S. coursework from transcript** — `general` — needs PDF drop + list approval
- Gate: `git check-ignore` matches the dropped PDF **before anything else**. Read PDF, curate ~8-12 quant-relevant courses (math/stats/CS/physics-modeling) normalized to the M.S. entry's title style. **Pause for owner approval.** Then add `courses: [...]` to the B.S. entry in `src/content/education.ts` — `education.tsx` renders "Core Coursework" badges automatically; zero UI work.
- Accept: PDF untracked; B.S. card shows approved badges; no course invented.

## Risks

1. **Nav overflow at 768-1023px** (8 items) — mitigations in T5; measured acceptance at 3 widths.
2. **Hash vs route links** — route links must bypass `handleNavClick`/preventDefault or they break into `/#journey`.
3. **No-`asChild` trap** — workers must use `render={...}` / `buttonVariants()`.
4. **Bundle/Lighthouse ≥95** — new pages lazy (verify chunks in `dist/`); analytics is tiny but confirm no Best Practices hit; downsample T16 data if large.
5. **TS strict/oxlint** — optional-field guards (`retrospective?.…`), union narrowing on `kind`, hook deps.
6. **Public-repo leak** — T0 before PDF exists; T17 starts with check-ignore gate.
7. **Placeholder honesty** — `[PLACEHOLDER — owner copy pending]` markers are deliberately visible so a deploy never presents fabricated facts as real. Enforced structurally by the Implementation protocol: placeholder-bearing work stays on the feature branch / preview URL until owner sign-off.
8. **Unfurl is home-card-only** — accepted; no SSR in scope.

## Docs & ADR follow-ups (for `/finish`)

- Update `docs/CODEBASE_MAP.md`: Routing (+`/journey`, `/how-i-build`), Directory layout (+`use-page-title.ts`, 3 new content modules, `@vercel/analytics`, og/sitemap assets), stale production URL (now https://charlie-carvajal.vercel.app/).
- ADRs to record in `docs/decisions/`: (1) hybrid hash+route nav model replacing pure hash-scroll; (2) accepted SPA-only OG/meta limitation — all routes unfurl as the home card, no SSR; (3) gitignore pattern for non-committable personal source documents (transcript et al.).

## Verification

1. `npm run build` clean; `dist/assets/` shows separate chunks for journey, how-i-build, project-detail.
2. `npm run lint` + `npm run test` (incl. new usePageTitle test; loaders test after T16).
3. Route matrix via `npm run preview`: `/`, `/#projects` deep link, 3 project slugs direct, `/journey`, `/how-i-build`, `/nonsense` → 404; nav from every page to every section/page; mobile sheet; theme persists across routes.
4. A11y: timeline `<ol>` semantics (axe), OS `prefers-reduced-motion: reduce` → no transform animation, static badge dot; keyboard-tab through new nav/pages.
5. Tab titles per route, reset on home.
6. Lighthouse `/`, `/journey`, `/projects/pmcmc-insider-detection`: perf ≥95, a11y 100 no regressions.
7. Post-deploy: unfurl validators (opengraph.xyz / LinkedIn Post Inspector) show the 1200×630 card; sitemap URLs 200; Rich Results parses Person schema.
8. Vercel Analytics dashboard shows events after browsing 3-4 routes in production.
9. PMCMC chart: real data, no illustrative badge; other charts still badged.
