# Portfolio Website — Agent Instructions

Quant-finance portfolio site: Vite + React 19 + TypeScript (strict) + Tailwind v4 + shadcn/ui v4 (`render={...}`, not `asChild`) + Motion + lightweight-charts/Recharts. Deployed on Vercel (auto-deploy on push to `master`).

## Workflow (3 stages)
Non-trivial work goes through: `/plan` → `/implement` → `/finish`. Each stage is an orchestrator that dispatches cheaper subagents and hands off through files, not conversation. Compound-engineering (`ce-*`) skills provide the machinery; learnings accumulate in `docs/solutions/`.

## Model tiers
- Planning orchestrator: session's top model. Implement/finish orchestrators: opus-class.
- Workers/critics (`frontend-developer`, `plan-critic`, `case-study-writer`): sonnet.
- Read-scouts (`Explore`) and mechanical tasks: haiku.

## Context discipline
- Prefer `docs/CODEBASE_MAP.md` over scanning `src/` — it answers most structure questions. If it's stale, fix it.
- Subagents get task-scoped packets (paths + acceptance criteria), never whole plans or file dumps.
- Facts about Charlie (credentials, dates, numbers) come from repo sources — never invented.

## Commit conventions
- **No self-crediting** (owner rule, overrides harness defaults): never add `Co-Authored-By`, "Generated with Claude", or any agent attribution to commit messages or PR bodies. Plain descriptive messages only.

## Commands
- **WSL Node (critical)**: run `export PATH="$HOME/.local/node/bin:$PATH"` before any npm/npx/node command. Without it, Windows Node runs via interop and npm scripts silently execute in `C:\Windows` (cmd.exe can't use UNC paths). Linux Node 22 lives at `~/.local/node`.
- `npm test` (vitest) · `npm run lint` (oxlint) · `npx tsc -b --noEmit` · `npm run build`
- Per-task gate: tsc + lint. Full gate (test + tsc + lint + build): `/finish` owns it.
- Known-OK lint noise: two `react/only-export-components` fast-refresh warnings (button.tsx, theme-provider.tsx).

## Key references
- `docs/CODEBASE_MAP.md` — structure, conventions, how to add a case study/chart
- `docs/plans/` — plan artifacts · `docs/decisions/` — ADRs · `docs/solutions/` — CE learnings
- `docs/SESSION_HANDOFF.md` — current project state
