# Learnings — /finish on feature/evolution-pages (2026-07-08)

Reusable gotchas from the finish pipeline for the 2026-07-06 feature-set plan.
Read by future `/plan` runs.

## 1. Verify environment facts live before trusting docs

`docs/SESSION_HANDOFF.md` recorded the production URL as
`portfolio-website-xi-smoky-53.vercel.app`; the plan and the new SEO meta used
`charlie-carvajal.vercel.app`. A review agent flagged every meta/sitemap URL as
a critical bug on the strength of the handoff doc. A 5-second `curl` settled it:
the Vercel project had been renamed (new URL 200, old URL 404) and the *doc* was
stale. **Rule:** when a finding rests on an environment fact (URL, project name,
deploy target) recorded in docs, verify it against live state before acting.
Update `SESSION_HANDOFF.md` whenever Vercel/hosting config changes.

## 2. Node types in tests without touching shared tsconfig

`tsconfig.app.json` sets `types: ["vite/client"]`, so `import fs from 'node:fs'`
in a test fails `tsc -b` with TS2591. Fix inside the test file only — add a
file-scoped directive at the top:

```ts
/// <reference types="node" />
```

(used in `src/content/sitemap.test.ts`). Don't add `node` to the shared tsconfig
just for a test.

## 3. Reduced-motion entrance animation is centralized now

Use `useEntranceAnimation()` from `src/lib/use-entrance-animation.ts` (built on
`useReducedMotion` from `motion/react`) for the standard page-entrance fade/rise.
Do **not** copy the old inline `window.matchMedia('(prefers-reduced-motion: …)')`
block into new pages. ~8 pre-existing components (hero, skills, experience, about,
not-found, projects section, …) still carry the old inline pattern with
`whileInView` variants — migrating them is a known cleanup candidate, not yet done.

## 4. Sitemap ↔ router sync is test-enforced

`src/content/sitemap.test.ts` fails if a project slug or static route is missing
from `public/sitemap.xml`. When adding a route or project, update the sitemap or
that test will catch it at the gate.
