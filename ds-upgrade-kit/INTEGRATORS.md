# INTEGRATORS.md — building on @ornie/react (external builders)

Content for the public repo README / docs site (Starlight, D-65). Audience: people building companion tools, importers, module dashboards, or themes around Ornie.

## Consuming the library

- **npm**: `npm i @ornie/react` — ESM + types. Import components (`import { Button } from '@ornie/react'`) and the stylesheet (`@ornie/react/styles.css`).
- **Browser bundle**: `_ds_bundle.js` + `styles.css` → everything on `window.OrnieReact`. Good for prototypes and no-build tools.
- React 19 peer. Manrope ships in the package (`fonts/`); also on Google Fonts.

## What's stable

- Semver. Component props in `.d.ts` and **semantic token names** are the public contract — additive minors, deprecation warnings one minor before any removal.
- Raw palette scales (`--ornie-river-*`, `--ornie-sand-*`, …) are **Layer 1 internals**: present but not contract. Build on semantic tokens (`--ornie-surface`, `--ornie-accent`, `--ornie-hover`, …) and your UI survives every future theme.
- `ornie-*` class names are internal BEM vocabulary — never target them; use props and tokens.

## Theming contract

- Dark mode: put `data-ornie-theme="dark"` on any subtree. That attribute is the only mechanism; components re-theme via tokens automatically. Never hardcode hex next to Ornie components — it will be wrong in one theme.
- User themes (roadmapped, D-61) are token-overlay packages validated for WCAG AA. If you only used semantic tokens, your integration inherits every theme for free — that's the deal.

## Calm rules (please keep them)

Ornie's audience is A(u)DHD users; the design system is quiet on purpose. When you build on it: one primary button per view · no red for lateness ("resurfaced", not "overdue") · no streaks, badges-of-shame, or confetti · motion respects `prefers-reduced-motion` (free if you use the motion tokens) · notifications batch, never drip.

## Native (Swift/Kotlin)

Widgets, watch faces, and other native surfaces consume **tokens only**: `Tokens.swift` / `Tokens.kt` are generated from the same `tokens.json` (D-44). There are no native components — match the specs in the component `.prompt.md` files when hand-building native UI.

## Example: a companion tool card

```jsx
import { Card, ListSection, TaskRow, MetaLine, ProjectDot, Badge } from '@ornie/react';
import '@ornie/react/styles.css';

<div className="ornie-app" data-ornie-theme={prefersDark ? 'dark' : undefined}>
  <Card variant="elevated" padding="md">
    <ListSection label="Waiting on you" trailing={<Badge count={2} />}>
      <TaskRow title="Review PR #412" meta={<MetaLine><ProjectDot label="ornie-sdk" /> · 2d</MetaLine>} />
      <TaskRow title="Sign the DPA" state="resurfaced" />
    </ListSection>
  </Card>
</div>
```

## Data & modules

UI is this package; **data** is the public REST `/v1` + webhooks + MCP tools (see the SDK docs). Modules are manifest + external endpoint — they never run code inside Ornie (D-31); module *pages* are declared via the block schema in `@ornie/core` (D-62). This library is how you make your external surfaces feel at home next to Ornie.
