# PROMPTS.md — paste-ready instructions for Claude Code

One phase per session. Paste the kickoff first; then each phase prompt in its own session. Between sessions: review the diff, run the audits, commit.

---

## Kickoff (paste once, first session)

```
You are working on the @ornie/react design system repo. A complete upgrade kit
is in ds-upgrade-kit/.

Read, in order, completely:
1. ds-upgrade-kit/CLAUDE.md            — binding rules for this repo
2. ds-upgrade-kit/API_CONVENTIONS.md   — how every component behaves
3. ds-upgrade-kit/COMPONENT_ROADMAP.md — what to build, in 5 phases
4. ds-upgrade-kit/templates/COMPONENT_TEMPLATE.md

Reference material (read as needed, never modify):
- ds-upgrade-kit/reference/SPECS.md — measured values from the final app designs
- ds-upgrade-kit/reference/Ornie Mobile Final.dc.html and Ornie App Final.dc.html
  — the final mockups as code; lift exact values from their inline styles
- ds-upgrade-kit/reference/DECISIONS.md — the locked decision ledger (D-01…D-68)
- ds-upgrade-kit/reference/NAMING.md — the naming lexicon

Then: map the actual repo layout (ls, read package.json, find tokens.json and
the component folders), report any mismatch with CLAUDE.md's expected map, and
STOP for my confirmation before writing anything.

Rules that override your defaults: vanilla CSS + BEM only (no Tailwind in this
repo); semantic tokens only, no hex; no dark-mode selectors in component CSS;
no outer margins; controlled components; no new dependencies except the
sanctioned icon source; every component ships all five files (impl, css, d.ts,
prompt.md, both-themes variant grid).
```

---

## Phase 0 — Rails

```
Execute Phase 0 of ds-upgrade-kit/COMPONENT_ROADMAP.md exactly:

1. Add the new semantic tokens to tokens.json (both themes) per the Phase 0
   table; regenerate CSS custom properties, Tokens.swift, Tokens.kt. Take
   light/dark values from the --dm-* bridge blocks in the reference mockups'
   <style> sections; run the contrast audit and adjust only failing pairs.
2. Add motion tokens (durations + easings) with the prefers-reduced-motion
   collapse implemented once in the token layer.
3. Create audit scripts and wire into CI + package scripts:
   audit:tokens (no hex / no un-commented raw scales / no theme selectors in
   components/**.css), audit:contrast (AA on all semantic pairs, both themes),
   audit:a11y (axe over every variant grid).
4. Create tier folders primitives/ patterns/ shells/; move the 12 existing
   components (all → primitives/); preserve every public export path and the
   window.OrnieReact global shape exactly.
5. Fix any violations the audits find in the existing 12 components.
6. Update the DarkMode foundations card to sample the new tokens.
7. Changeset (patch/minor as appropriate). Run all audits + build. Report.

Do not start Phase 1.
```

---

## Phase 1 — Primitives

```
Execute Phase 1 of ds-upgrade-kit/COMPONENT_ROADMAP.md: upgrade the 12
existing primitives and add IconButton, Icon (+ the ~44-glyph curated set per
the Phase 0 icon decision), Kbd, Chip, Spinner, ProgressRing, Divider, Link.

For every component: follow API_CONVENTIONS.md and the roadmap's API sketch;
lift exact sizes/colors from reference/SPECS.md and the mockup inline styles;
ship all five files including the both-themes variant grid; meet the ten-point
definition of done in CLAUDE.md.

Add an Icons gallery card to foundations. Keep existing props
backward-compatible; deprecate per the policy, never break.

Finish with: audits green, build green, changeset written, a summary table of
components × what changed. Do not start Phase 2.
```

---

## Phase 2 — Patterns (the task language)

```
Execute Phase 2 of ds-upgrade-kit/COMPONENT_ROADMAP.md: TaskCheck, TaskRow,
MetaLine, ProjectDot, ListSection, ListRow (+ documented recipes: settings /
person / note / module rows — recipes in prompt.md, NOT new components),
DateGroupHeader, FormField, SearchField, SegmentedControl, ChipGroup,
EmptyState, Toast (+ useToast + ToastHost), DayRing.

TaskRow and TaskCheck are the most-used components in the product: match card
2a in reference/Ornie Mobile Final.dc.html pixel-for-pixel in phone density
and the desktop mockup's rows in desktop density. Remember: there is no
overdue state and nothing red — states are default/done/waiting/resurfaced.

All five files each, both-themes grids, audits green, changeset. Do not start
Phase 3.
```

---

## Phase 3 — Shells

```
Execute Phase 3 of ds-upgrade-kit/COMPONENT_ROADMAP.md: Sheet, Dock,
SidebarNav, TopBar, PanelDrawer, CommandOverlay, PageHeader, TriageCard.

Dimensions are locked by reference/SPECS.md (dock 84 / capture button 54 ø
lifted −26 with 4px ring; sidebar 264/60; top bar 52; panel 372; overlays
540/560). Overlay behavior per API_CONVENTIONS §6 (focus trap, Esc, scrim,
reduced-motion fallbacks). Gestures and search logic stay app-side — shells
expose slots and callbacks only.

All five files each, both-themes grids, audits green, changeset. Do not start
Phase 4.
```

---

## Phase 4 — Content, vault, release 0.2.0

```
Execute Phase 4 of ds-upgrade-kit/COMPONENT_ROADMAP.md: Prose, WikiLink,
WeekDots (no streak-count API — it must be inexpressible), SealBadge,
RedactedBars, StepDots.

Then the release pass:
1. Walk ds-upgrade-kit/COVERAGE_MATRIX.md top to bottom; for every screen
   confirm each mapped component exists and its variant grid covers that
   usage. Fix gaps; report anything that stays [app]-side.
2. Foundations: add Motion reference card; refresh Icons + DarkMode cards.
3. Fold ds-upgrade-kit/INTEGRATORS.md into the public README/docs.
4. Full audit suite + build + all variant grids reviewed in both themes.
5. Changeset → version 0.2.0, update the bundle metadata header, publish to
   the public mirror per the repo's release process.

Deliver: release notes draft (grouped by tier) + the coverage report.
```

---

## Review prompt (any time, e.g. after each phase)

```
Audit the last phase's work against ds-upgrade-kit/CLAUDE.md's ten-point
definition of done and API_CONVENTIONS.md. Check every new/changed component:
list violations with file:line, fix them, re-run audits. Then diff each
component's rendered variant grid against the matching elements in the
reference mockups and report visual mismatches with exact values (theirs vs
yours).
```
