# Ornie DS Upgrade Kit

Everything Claude Code needs to grow **@ornie/react** from 12 components (v0.1.0) into the complete Ornie component library (v0.2.0) — the single UI source for the app on every platform, ready for external builders. Derived from the final all-platform layouts (2026-07-07) and the locked decision ledger v1.3.

## What's inside

| File | Purpose |
|---|---|
| `CLAUDE.md` | Binding rules for the DS repo — put at repo root (or merge into the existing one) |
| `COMPONENT_ROADMAP.md` | The build plan: token gaps, 4 tiers, ~46 components in 5 phases, each traced to mockup screens |
| `API_CONVENTIONS.md` | The composability contract every component follows |
| `COVERAGE_MATRIX.md` | Screen-by-screen proof of coverage — the QA checklist before release |
| `INTEGRATORS.md` | Public-facing docs content for external builders |
| `PROMPTS.md` | Paste-ready Claude Code prompts: kickoff + one per phase + review |
| `templates/COMPONENT_TEMPLATE.md` | The five file skeletons every component ships |
| `reference/` | Final mockups as code (mobile + desktop `.dc.html`), SPECS.md, DECISIONS.md v1.3, NAMING.md |

## Organization answer

Atomic design, renamed in plain Ornie nouns (D-40): `foundations` (tokens + living references) → `primitives` (atoms) → `patterns` (molecules) → `shells` (organisms). Flat public exports — tiers organize the repo, not the API.

## Both themes

Dark is enforced structurally, not per-component: components may only use semantic tokens (CI audit fails hex/raw-scale/theme-selectors), every variant grid renders light + dark side by side, and the contrast audit checks AA on all pairs in both themes. Phase 0 promotes the mockups' `--dm-*` bridge variables into real semantic tokens (hover, selected, track, done, inverse pair, overlay, focus ring, motion) — after that, dark mode is free for every future component and every future user theme (D-61).

## How to use it

1. Copy this folder into the design-system repo root as `ds-upgrade-kit/`.
2. `CLAUDE.md`: if the repo has none, copy `ds-upgrade-kit/CLAUDE.md` to the root. If one exists, merge — this kit's rules win on conflicts (they encode the locked ledger).
3. Open Claude Code at the repo root. Paste the **Kickoff** prompt from `PROMPTS.md`. It reads the kit, maps the repo, and stops for your confirmation.
4. Run one phase per session (`PROMPTS.md` has each): 0 rails → 1 primitives → 2 patterns → 3 shells → 4 content + release. Between sessions: review the diff, run `audit:*`, commit.
5. After 0.2.0 ships: regenerate the `_ds` bundle for the design workspace so future mockups compose the real new components, and refresh the public mirror + docs (D-49).

## Ground rules the kit encodes (from the ledger)

Vanilla CSS + BEM in this repo, Tailwind only in the app (D-60) · tokens.json → CSS/Swift/Kotlin single source (D-44) · dark = `data-ornie-theme` semantic flip only (D-67) · themes-as-token-overlays ready, AA-gated (D-61) · plain nouns (D-40) · calm is a hard requirement: no red lateness, no streaks, no shouting motion (D-01, R-3/R-5) · public package, semver + deprecation discipline (D-05/D-49).

## Deliberately out of scope

App screens/flows (focus, close-the-day, onboarding, Ask logic), gesture engines, data hooks (D-23), native components (slivers consume tokens only — D-44/D-45), charts, marketing-site UI. The DS ships parts; the app ships screens.
