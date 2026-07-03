# Ornie Design System

Ornie is a calm, natural React design system on the **Riverbed** theme — platypus
habitat: warm taupe neutrals (earth), a muted river-teal accent (water), fur brown as
the identity thread, Manrope type, soft radii. Status colors are deliberately muted;
nothing on screen shouts.

## About Ornie

Ornie (from *Ornithorhynchus*, the platypus) is a personal life-OS in the making: tasks,
projects, notes (Markdown), contacts & relationships, inbox, Notion-style pages, habit
tracking, journaling, and dashboards — one place for everything. Its defining principle
is **extensibility**: rather than shipping a module for every tool, Ornie lets users
build their own modules, components, and integrations (e.g. a developer tracking pull
requests and turning them into tasks) so their world stays inside the app.

The target audience is **A(u)DHD users**, which drives the design system's rules:

- Clean, low-stimulation surfaces; muted palette, low elevation, generous whitespace.
- No alarm colors — even "danger" is a soft rust, and avatars never use it.
- `prefers-reduced-motion` collapses transitions and entrance animations.
- Clear affordances: actions are always the one teal element in a field of earth tones.

## Development

Uses pnpm and nvm (node version pinned in `.nvmrc`).

```sh
nvm use
pnpm install
pnpm storybook        # component workbench at :6006
pnpm build            # dist/ — JS (esm+cjs), d.ts, styles.css, fonts
pnpm typecheck
```

## Usage

```tsx
import { Button, Card } from '@ornie/react';
import '@ornie/react/styles.css';

export function App() {
  return (
    <div className="ornie-app">
      <Card>
        <Button>Get started</Button>
      </Card>
    </div>
  );
}
```

`.ornie-app` on the page root applies the Ornie page background, ink color, and type
defaults. Components style themselves and work without it.

## Architecture

- **Tokens** — `src/styles/tokens.css`, two layers: primitives (raw palette/scales,
  e.g. `--ornie-river-500`, `--ornie-sand-100`, `--ornie-fur-500`) and semantic roles
  (`--ornie-accent`, `--ornie-surface`, `--ornie-text-muted`, …). Components consume
  only semantic tokens, so a future dark theme is a semantic override under
  `[data-ornie-theme='dark']` — no component changes.
- **Styling** — plain CSS, BEM-ish classes prefixed `ornie-` (`.ornie-btn--primary`).
  One stylesheet per component, bundled into `dist/styles.css`.
- **Fonts** — Manrope variable (SIL OFL), vendored in `src/fonts/`, shipped in
  `dist/fonts/`.

## Components

Button · Input · Select · Checkbox · Radio · Switch · Badge · Avatar · Card · Modal ·
Tooltip · Tabs
