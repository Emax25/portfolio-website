---
name: plan
description: "Stage 1 of this repo's workflow: write an implementation-ready plan. Doc-first orchestrator — reads agent references only, dispatches cheap scouts for code facts and a critic for architecture/doc-gap review, then drives /ce-plan. Use when starting any feature or change bigger than a quick fix."
user-invocable: true
argument-hint: "[feature / change description, or path to a requirements doc]"
---

# /plan — Write the Implementation Plan (Stage 1 of 3)

You are the **planning orchestrator**. You run on the session's most capable model, so your context is expensive: think, consolidate, decide, and delegate reading. The plan you produce is the ONLY context `/implement` gets — decisions not written into it are lost.

## Context contract (strict)

**You MAY read directly** (agent references only):
- `docs/CODEBASE_MAP.md` — always, first
- `docs/solutions/` — grep filenames/frontmatter, read only entries relevant to this task
- `docs/decisions/` — relevant ADRs only
- `docs/plans/` — only a plan being resumed/enriched
- Files the user explicitly named in the request

**You MUST NOT read `src/` yourself** unless a scout's answer is ambiguous and one targeted read settles it (say so when you do). Every code question goes to a scout.

## Model tiers
- Orchestrator (you): session model — reasoning, tradeoffs, writing the plan
- Scouts: `Explore` agent, `model: haiku` — code facts, current-state questions
- Critic: `plan-critic` agent, `model: sonnet` — architecture + doc-gap review

## Workflow

1. **Ground.** Read `CODEBASE_MAP.md`; pull relevant `docs/solutions/` learnings and ADRs by title. Restate the goal in 2-3 sentences to the user.

2. **Scout (only if needed).** If the map + docs leave open code questions, batch them into 1-2 parallel `Explore` scouts (haiku). Give each scout *specific questions* ("does ChartKind support X? what props does ProjectChart pass?"), not "explore the area". Scouts return conclusions, not file dumps.

3. **Draft via CE.** Invoke the `compound-engineering:ce-plan` skill with the request plus your gathered context. Let it produce the unified plan artifact in `docs/plans/` (`ce-unified-plan/v1`, `implementation-ready`). Plans must decompose into tasks small enough for a sonnet worker: each task names its files, its acceptance criteria, and which subagent should do it (`frontend-developer` for UI/charts, general for the rest).

4. **Critique.** Spawn `plan-critic` (sonnet) on the plan file. Pass it only: the plan path + one paragraph of intent. Fold blockers/should-fixes back into the plan yourself; note dismissed findings and why.

5. **Hand off.** Tell the user: plan path, task count, open risks, and that `/implement` picks it up automatically (it auto-discovers the latest implementation-ready plan).

## Cost rules
- Never paste whole files into scout or critic prompts — pass paths.
- Don't re-derive what `CODEBASE_MAP.md` already states; if the map is wrong, flag it for `/finish` to fix.
- One scouting round, then commit. Endless exploration is a smell that the request needs a user decision, not more reading — ask.
