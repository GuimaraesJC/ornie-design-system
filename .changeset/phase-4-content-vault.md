---
"@ornie/react": minor
---

Phase 4 — content, vault, release pass. 6 new components + foundations + docs.

**Content.** `Prose` (reading typography for rendered notes/journal: h1–h3 on the type scale, 15/1.65 body, calm lists/quotes/code; bare anchors get Link's voice via `a:not([class])` — classed components keep their own; no max-width, width is the app's; renderers must set `tabindex="0"` on `pre` for keyboard scrolling), `WikiLink` (the [[link]] pill: accent-subtle wash, radius-full, wraps as rounded fragments; `unresolved` = dashed border, an invitation — never an error).

**Vault & progress.** `SealBadge` (lock + "Sealed" chip; `detail` variant lists what sealing skips), `RedactedBars` (deterministic-per-`seed` concealment bars — deliberately NOT a skeleton loader, no shimmer ever), `WeekDots` (7 habit dots: done fill, quiet misses, ringed today, dashed futures — **the API cannot express a streak count, R-5**), `StepDots` (onboarding dots, active elongates to a pill on `--ornie-duration-gentle`).

**Foundations.** New `Motion` reference card (the whole vocabulary: two durations, two eases, one spin — and the reduced-motion story); `DarkMode` sampler extended with the 0.2.0 task language (TaskRow, MetaLine, ProjectDot, Chips, Kbd).

**Release pass.** Coverage matrix re-walked top to bottom: every mockup element maps to a component or an explicit app-side note (one flagged follow-up: a large ProgressRing size for the app-composed focus screens). README rewritten as the public integrator doc (stability contract, theming contract, calm rules, native token targets).
