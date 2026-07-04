# Ornie conventions (read before building)

Ornie is a calm, low-stimulus design system ("Riverbed" theme) built for A(u)DHD users: muted river-teal accents, warm sand neutrals, deliberately quiet status colors. Nothing on screen should shout — avoid saturated colors, dense layouts, and attention-grabbing motion in anything you build with it.

## Page setup

Put `className="ornie-app"` on your page root. It sets the Manrope font, page background (`--ornie-bg`), and ink color. Components style themselves and work without it, but without the wrapper your page frame has the wrong font and background:

```jsx
<div className="ornie-app" style={{ minHeight: '100vh', padding: 'var(--ornie-space-8)' }}>
  …your UI…
</div>
```

No JS provider is needed — theming is pure CSS. A future dark theme will hang off `data-ornie-theme`; today only light exists.

## Styling idiom: component props + tokens, never hand-written `ornie-*` classes

Components carry their own styles and are configured by props (`variant`, `size`, `shape`, …) — read each component's `.prompt.md` and `.d.ts` for the exact API. The `ornie-*` class names you'll see in the compiled CSS are the components' internal BEM vocabulary; do not compose them by hand.

For your own layout glue (wrappers, grids, spacing), write inline styles or plain CSS using the semantic tokens (Layer 2) — not raw palette values:

- Surfaces & text: `--ornie-bg`, `--ornie-surface`, `--ornie-surface-sunken`, `--ornie-border`, `--ornie-text`, `--ornie-text-muted`, `--ornie-text-subtle`
- Accent: `--ornie-accent`, `--ornie-accent-hover`, `--ornie-accent-subtle`, `--ornie-accent-text`
- Status (muted by design): `--ornie-success`, `--ornie-warning`, `--ornie-danger` + `-subtle`/`-text` variants
- Spacing (4px grid): `--ornie-space-1` … `--ornie-space-16`; radii: `--ornie-radius-xs|sm|md|lg|full` (12px `md` for controls, 16px `lg` for cards/modals)
- Type: `--ornie-font-sans`, `--ornie-text-xs` … `--ornie-text-4xl`, `--ornie-weight-regular|medium|semibold|bold`
- Elevation: `--ornie-shadow-sm|md|lg` (warm-tinted, low — prefer borders over heavy shadows)

Raw palette scales (`--ornie-river-*`, `--ornie-sand-*`, `--ornie-fur-*`, `--ornie-moss-*`, `--ornie-clay-*`, `--ornie-rust-*`) exist in the stylesheet but are Layer 1 — reach for them only when no semantic token fits.

## Where the truth lives

`styles.css` imports everything (tokens, Manrope `@font-face`, component CSS). Token names and values: read the compiled `_ds_bundle.css`. Per-component APIs and composition examples: `components/components/<Name>/<Name>.prompt.md`.

## Idiomatic example

```jsx
const { Card, Avatar, Badge, Button } = window.OrnieReact;

<div className="ornie-app" style={{ padding: 'var(--ornie-space-8)' }}>
  <Card variant="elevated" style={{ maxWidth: 360 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ornie-space-4)' }}>
      <Avatar name="Jean Guimarães" />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'var(--ornie-weight-semibold)' }}>Jean Guimarães</div>
        <div style={{ color: 'var(--ornie-text-muted)', fontSize: 'var(--ornie-text-sm)' }}>
          Product designer
        </div>
      </div>
      <Badge variant="success" dot>Online</Badge>
    </div>
    <div style={{ display: 'flex', gap: 'var(--ornie-space-2)', marginTop: 'var(--ornie-space-4)' }}>
      <Button>Message</Button>
      <Button variant="secondary">View profile</Button>
    </div>
  </Card>
</div>
```

## Calm rules of thumb

- One primary Button per view; `secondary`/`ghost` for everything else. `danger` only for destructive confirmation.
- Motion is minimal and respects `prefers-reduced-motion` automatically — don't add your own entrance animations.
- Modal and Tooltip render via portals and manage their own z-index (`--ornie-z-modal`, `--ornie-z-tooltip`); Modal is controlled — drive it with `open` + `onClose`.
