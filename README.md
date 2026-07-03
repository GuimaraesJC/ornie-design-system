# Ornie Design System

Ornie is a warm, friendly React design system on the **Ember** theme: coral accent, cream
neutrals, Manrope type, soft radii.

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
  e.g. `--ornie-ember-500`) and semantic roles (`--ornie-accent`, `--ornie-surface`,
  `--ornie-text-muted`, …). Components consume only semantic tokens, so a future dark
  theme is a semantic override under `[data-ornie-theme='dark']` — no component changes.
- **Styling** — plain CSS, BEM-ish classes prefixed `ornie-` (`.ornie-btn--primary`).
  One stylesheet per component, bundled into `dist/styles.css`.
- **Fonts** — Manrope variable (SIL OFL), vendored in `src/fonts/`, shipped in
  `dist/fonts/`.

## Components

Button · Input · Select · Checkbox · Radio · Switch · Badge · Avatar · Card · Modal ·
Tooltip · Tabs
