# CLAUDE.md — @ornie/react design system repo

You are working on **@ornie/react**, the public design system of Ornie — a calm, A(u)DHD-first personal productivity platform. This file is binding for all AI-assisted work in this repo. Companions in `ds-upgrade-kit/`: `COMPONENT_ROADMAP.md` (what to build), `API_CONVENTIONS.md` (how every component behaves), `COVERAGE_MATRIX.md` (why each component exists), `PROMPTS.md` (session scripts), `templates/COMPONENT_TEMPLATE.md` (file skeletons), `reference/` (final app mockups + specs + decision ledger).

## What this library is

- The **single source of UI** for the Ornie app (web PWA, Tauri desktop, Capacitor mobile). The app repo composes these components with Tailwind-v4-on-tokens layout glue (D-60); it must never need to rebuild a control this library should own.
- A **public package** (D-05): external people build companion tools with it. API changes are semver-governed; strangers read these docs.
- A **token pipeline** (D-44): `tokens.json` is the single source of truth → generated CSS custom properties + `Tokens.swift` + `Tokens.kt`. Native slivers consume tokens only, never components.

## Non-negotiables (from the locked ledger — see reference/DECISIONS.md)

1. **Calm is a hard requirement, not a style preference (D-01).** Muted colors, low elevation, no attention-grabbing motion, no red guilt mechanics. Overdue is never red. Nothing pulses, bounces, or counts at the user.
2. **Vanilla CSS + BEM inside this repo (D-60).** No Tailwind, no CSS-in-JS, no build-tool leakage into the published package. (Tailwind lives in the *app* repo only, locked to these tokens.)
3. **Semantic tokens only in component CSS (D-44/D-61/D-67).** Never hex. Raw palette scales (`--ornie-river-*`, `--ornie-sand-*`, …) only when no semantic token fits, with a `/* layer1: why */` comment. This is CI-enforced (Phase 0 audit script). It is also what makes user themes possible later: themes are token-overlay packages (D-61) — a component that reads raw scales breaks under every theme.
4. **Dark mode is free or the tokens are wrong (D-67).** `data-ornie-theme="dark"` flips semantic tokens; components contain **zero** dark-specific rules. If a component looks wrong in dark, fix or add a semantic token in `tokens.json` — never write `[data-ornie-theme="dark"] .ornie-x { … }` in component CSS.
5. **Plain daily nouns (D-40, reference/NAMING.md).** Component names a non-designer understands: `Sheet`, `Dock`, `Chip`, `TaskRow`. No `BottomDrawer2`, no `FABContainer`. The only themed noun in the whole product is Burrow (the vault) — and that's app copy, not a component name.
6. **Accessibility floor:** WCAG AA contrast on every token pair in both themes (CI-audited); every interactive component fully keyboard-operable; visible focus (`--ornie-focus-ring`); hit targets ≥44px on touch sizes; `prefers-reduced-motion` collapses all motion to near-zero via the motion tokens — no component defines its own durations.

## Repo map

Verify with `ls` before assuming — layout may drift. Expected shape:

```
tokens.json                  ← SINGLE SOURCE OF TRUTH for all tokens
tokens/ or styles/           ← generated CSS custom properties (do not hand-edit generated files)
styles.css                   ← the one stylesheet entry (@imports tokens, fonts, component CSS)
components/
  foundations/<Name>/        ← living reference components (ColorPalette, TypeScale, DarkMode, …)
  primitives/<Name>/         ← single-purpose controls (Button, Input, Chip, …)      [tier introduced by this kit]
  patterns/<Name>/           ← small compositions (TaskRow, FormField, Toast, …)     [tier introduced by this kit]
  shells/<Name>/             ← app chrome (Sheet, Dock, SidebarNav, CommandOverlay…) [tier introduced by this kit]
fonts/                       ← Manrope @font-face
```

Each component folder contains: `<Name>.jsx` (or .tsx), `<Name>.css`, `<Name>.prompt.md`, `<Name>.d.ts`, `<Name>.html` (variant grid, **light and dark side by side**). All five are required — a component without its docs artifacts is not done. Skeletons: `ds-upgrade-kit/templates/COMPONENT_TEMPLATE.md`.

**Tier migration note:** existing components currently live under `components/components/`. Phase 0 moves them into the tier folders. Public API must not break: `window.OrnieReact.*` globals and package exports stay flat (`OrnieReact.Button`, not `OrnieReact.primitives.Button`); keep re-exports so no import path changes for consumers.

## The component definition of done (all ten, every time)

1. API follows `API_CONVENTIONS.md` (slots, controlled state, forwardRef, no outer margins, className/style/rest passthrough).
2. CSS is BEM under a single `.ornie-<name>` block, semantic tokens only, passes the token audit.
3. Looks correct in **both themes** with zero dark-specific CSS — verified in the variant grid.
4. Keyboard + screen-reader story implemented and documented in `.prompt.md`.
5. Reduced motion honored (uses motion tokens only).
6. Variant grid `.html` renders every variant × state, light and dark side by side.
7. `.prompt.md` written: what it's for, when NOT to use it, composition examples, calm rules.
8. `.d.ts` complete and exact.
9. Exported from the package index + `window.OrnieReact`, listed in the bundle metadata header.
10. Traceable: cite which mockup screens use it (from `COVERAGE_MATRIX.md`) in the `.prompt.md` header.

## Working rules

- **One roadmap phase per session** (see PROMPTS.md). Finish the phase's checklist before touching the next.
- **Read the mockup source, not screenshots**: `ds-upgrade-kit/reference/Ornie Mobile Final.dc.html` and `Ornie App Final.dc.html` contain the exact inline styles the app was designed with. Lift values from there and `reference/SPECS.md`; do not re-derive by eye. (These files won't render styled inside this repo — read them as code.)
- **Token changes go to `tokens.json` first**, then regenerate CSS/Swift/Kotlin. Never hand-add a custom property to a generated file.
- **No new dependencies** without an explicit decision. The package ships React components + CSS; keep it dependency-light (icons are the one sanctioned addition — see roadmap Phase 1).
- **Changesets** for every user-visible change; target version for this kit's full roadmap: **0.2.0** (additive minor). Breaking changes require a deprecation cycle: warn one minor, remove the next.
- Component state: controlled-only for anything meaningful (`open`/`onClose`, `value`/`onChange`, `checked`/`onChange`). Internal state is allowed only for ephemera (hover, focus-visible, press).
- **The DS ships parts; the app ships screens.** Do not add flow components (onboarding, focus session, close-the-day, Ask conversation). If a roadmap item feels like a screen, split it into shells + patterns.

## Anti-patterns — reject on sight

- Hex colors, raw-scale usage without a comment, dark-mode selectors in component CSS.
- Outer margins on any component root (spacing belongs to the parent — flex/grid `gap`).
- Boolean explosions (`isLarge`, `hasIcon`) where a `size`/slot API is right.
- Entrance animations, spinners-by-default, badge counts that shout (red dots), streak/gamification affordances of any kind (R-5: language is "resumed", never "broken").
- Emoji in UI, placeholder lorem in docs, jargon names.
- A component that exists only for one screen with no second consumer in `COVERAGE_MATRIX.md` — inline it in the app instead.
