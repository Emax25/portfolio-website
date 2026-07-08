# Gitignore pattern for personal source documents

## Status

Accepted

## Date

2026-07-08

## Context

The repo (`charlie-carvajal.vercel.app`) is public. Two owner-provided source documents needed to feed content into the site without ever being committed:
- A transcript PDF, used (T17) to extract and curate B.S. core coursework into `education.ts`.
- A `results/` folder (T16), containing PMCMC posterior data — including a `pg_wallet_ranking.csv` with real wallet addresses and per-iteration chain pickles, one of which (`pg_halfprod.pkl`) is 488 MB.

Both needed to exist locally (dropped at repo root / cloned in) before the corresponding task could run, which meant the ignore rule had to be in place *before* the files landed — otherwise a single `git add` mistake would commit a personal document or a 488 MB binary with real wallet addresses to a public repo.

## Decision

Root-anchored patterns were added to `.gitignore` ahead of the files' arrival, not after:

```
# Private documents & local data — public repo, never commit
/*transcript*.pdf
/*Transcript*.pdf
/processed/
/results/
```

- `/*transcript*.pdf` and `/*Transcript*.pdf` (T0, root-anchored so only root-level transcript files match, case variants covered) were merged to `master` before the transcript PDF was ever dropped into the working tree.
- `/results/` was owner-requested and added to `master`'s `.gitignore` as part of T16 (`/results/` had existed on the feature branch already but not on `master`) once it became clear `results/` held real wallet addresses and the oversized pickle — closing the gap before further work touched that folder from `master`.
- Facts extracted from these gitignored sources never enter the repo raw: they go through an owner-approval step and land only as curated values inside typed content modules (`src/content/education.ts` courses list; `src/data/pmcmc-posterior.json` anonymized posterior points, wallet IDs never included).

## Consequences

- `git check-ignore` against the real filenames was required as an acceptance gate (T0, T17) before any file was allowed to touch the working tree — ignore-first, drop-second, not the reverse.
- Because the patterns are root-anchored, a transcript-named file placed in a subdirectory would *not* be ignored; this is intentional (owner only ever drops these at repo root) but worth remembering if the drop location changes.
- `/processed/` and `/results/` are broad directory ignores, so any future file placed under those paths is automatically excluded — convenient, but means genuinely public files must not be placed there by mistake.
- This pattern (ignore-first, owner-approval-then-typed-module) is the template for any future owner-source document (e.g. additional transcripts, other private datasets) feeding site content.
