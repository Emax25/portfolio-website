---
name: finish
description: "Stage 3 of this repo's workflow: the finish pipeline. Tests + debug, simplify, multi-agent code review, docs update, and learning capture — run after /implement completes."
user-invocable: true
argument-hint: "[plan path — blank uses the latest plan + current diff vs master]"
---

# /finish — Finish Pipeline (Stage 3 of 3)

You are the **finish orchestrator**. Scope = the current change, not the repo: work from `git diff master...HEAD` (or the working tree) plus the plan file. Fix-forward; don't redesign what review didn't flag.

## Context contract (strict)
- Read: the diff, the plan file, and files the pipeline steps flag
- `docs/CODEBASE_MAP.md`: only the sections you may need to update in step 4
- Do NOT reload the implementation conversation or unrelated `src/`

## Model tiers
- Orchestrator (you): opus-class session
- Test writer / debugger: `claude` (sonnet); `frontend-developer` (sonnet) for component/chart test subjects
- Mechanical checks and doc edits: haiku

## Pipeline (in order)

1. **Tests.** Identify changed logic worth testing — data transforms and loaders (`src/data`), utilities (`src/lib`), content-registry integrity (`src/content`), chart-prep logic. Spawn a sonnet worker to write Vitest tests (happy path + one edge case each; component smoke tests only where cheap). This is a portfolio site: target regression safety on data/logic, not exhaustive UI coverage. Then run the full gate: `npm test && npx tsc -b --noEmit && npm run lint && npm run build`.

2. **Debug.** Gate failures: obvious → fix via a sonnet worker with the error + relevant file; gnarly/open-ended → invoke `compound-engineering:ce-debug`. Re-run the gate until green.

3. **Simplify, then review.** Invoke `compound-engineering:ce-simplify-code` on the diff, then `compound-engineering:ce-code-review` (multi-agent review against the plan). Apply Critical/Important findings via sonnet workers; list skipped suggestions with reasons. Re-run the gate after fixes.

4. **Docs.** Update only what this change invalidated: affected `docs/CODEBASE_MAP.md` sections, `docs/SESSION_HANDOFF.md` state, README if user-facing setup changed. If the work embodied an architectural decision, spawn `plan-critic` (sonnet) to write a short ADR in `docs/decisions/` (sequential numbering).

5. **Compound.** If anything was non-obvious — a bug with a reusable fix, a convention discovered, a gotcha — invoke `compound-engineering:ce-compound` so the next `/plan` starts smarter. Skip when there's genuinely nothing durable.

6. **Report.** Green/red status of every gate command, review findings applied vs skipped, docs touched, learnings captured. Recommend commit message; commit/push only if the user asked.

## Cost rules
- Steps 1-3 operate on the diff; never hand a worker the whole repo.
- One ce-code-review round + one fix pass; if review keeps finding blockers after that, stop and report — that's a plan problem, not a polish problem.
