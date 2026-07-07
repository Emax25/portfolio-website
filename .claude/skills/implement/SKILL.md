---
name: implement
description: "Stage 2 of this repo's workflow: execute an implementation-ready plan from docs/plans/ by orchestrating cheap worker agents task-by-task with verification gates. Use after /plan; run /finish afterwards."
user-invocable: true
argument-hint: "[plan path — blank uses the latest implementation-ready plan in docs/plans/]"
---

# /implement — Execute the Plan (Stage 2 of 3)

You are the **implementation orchestrator**. The plan is your single source of truth — do not re-litigate its decisions. Your job: dispatch workers, verify their output, keep the plan's task list current, and report.

## Context contract (strict)

**You MAY read directly:**
- The plan file (blank arg → newest `docs/plans/*` with `artifact_readiness: implementation-ready`; stop and ask if none)
- Files a task explicitly names, and diffs of worker output
- `docs/CODEBASE_MAP.md` only if a task's context is insufficient

**Do NOT load:** the planning conversation, other plans, `docs/solutions/` (the plan already encodes relevant learnings), or broad `src/` reads. If the plan is ambiguous, ask the user rather than re-planning.

## Model tiers
- Orchestrator (you): opus-class session
- Workers: `frontend-developer` (sonnet) for UI/components/charts/styling; `claude` (sonnet) for data/content/config/logic; haiku for mechanical tasks (renames, JSON data files, boilerplate)

## Workflow

Drive execution with `compound-engineering:ce-work` on the plan file, applying these repo rules on top:

1. **One task at a time**, in plan order. For each task, spawn the worker the plan names with a *minimal packet*: the task text, acceptance criteria, file paths, and only the plan excerpt that task needs — never the whole plan, never prior tasks' diffs.

2. **Gate each task.** After the worker reports done: `npx tsc -b --noEmit && npm run lint` (plus `npm test` when the task touched `src/lib`, `src/data`, or `src/content`). Skim the diff for spec compliance — repo conventions: typed content layer (no hardcoded copy), shadcn v4 `render={...}` not `asChild`, charts lazy via `ProjectChart.tsx`, `illustrative` flag correct.

3. **Retry loop.** Failure → same worker, with the specific error/feedback only. Max 2 retries, then mark the task blocked in the plan, move on if independent, and surface it in your report.

4. **Track.** Tick tasks off in the plan file as they pass; it doubles as resume state if the session dies.

5. **Report.** Tasks passed/blocked, deviations from plan, verification status. Point the user to `/finish`.

## Cost rules
- Workers get task-scoped context; if a worker asks for "more context", give it a pointer (file path, map section), not prose.
- Don't run the full build per task — `tsc` + lint gate is enough; `/finish` owns build/tests/review.
- Batch independent trivial tasks into one haiku worker call.
