# Hybrid hash+route navigation model

## Status

Accepted

## Date

2026-07-08

## Context

The header nav (`src/components/layout-shell.tsx`) originally scrolled to in-page anchors only (`#about`, `#skills`, `#projects`, `#experience`, `#education`, `#contact`) via a single `handleNavClick` handler that either smooth-scrolls (on `/`) or navigates to `/#id` (from elsewhere). Adding two real pages — `/journey` and `/how-i-build` (T7/T8) — meant the nav had to carry both scroll targets and route targets in one list without breaking either.

## Decision

`navItems` (`layout-shell.tsx:21-34`) is a discriminated union:

```ts
type NavItem =
  | { label: string; kind: 'hash'; id: string }
  | { label: string; kind: 'route'; to: string };
```

Order: About, Skills, Projects, Experience, Education, Journey (`kind: 'route'`), How I Build (`kind: 'route'`), Contact — 8 items total, in both the desktop bar (`layout-shell.tsx:100-142`) and the mobile `Sheet` (`:172-200`).

Rendering branches on `item.kind`:
- `hash` items render an `<a href="/#id">` with `onClick={(e) => { e.preventDefault(); handleNavClick(id); }}` — unchanged behavior, scrolls on `/`, navigates to `/#id` from other routes.
- `route` items render a react-router `<Link to>` and **bypass `handleNavClick` entirely** — calling `preventDefault()` on a route link would stop the navigation and leave the user on `/#id` instead of the target page, so the two code paths must stay separate rather than being unified behind one handler.

8 items forced width mitigations on the desktop bar: `space-x-4 lg:space-x-6` (was wider spacing) and `text-[13px] lg:text-sm` (was a single fixed size), verified at 768/834/1024px per the plan's acceptance criteria.

## Consequences

- Adding a future route-backed nav item is a one-line addition to `navItems`; adding a future in-page section is likewise one line, with no handler changes needed.
- The two branches are a known duplication risk: any future change to hover/active styling has to be applied to both the `hash` and `route` render paths (and again in the mobile `Sheet` copy of the same logic) or they'll drift.
- If an item count beyond 8 is ever needed, the plan's fallback is collapsing the two route items into the existing `Dropdown` primitive as a "More" menu — deliberately not adopted now since 8 items fit at all three measured breakpoints.
