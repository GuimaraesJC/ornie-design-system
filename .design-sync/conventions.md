# Ornie conventions (read before building)

Ornie is a calm, low-stimulus design system ("Riverbed" theme) built for A(u)DHD users: muted river-teal accents, warm sand neutrals, deliberately quiet status colors. Nothing on screen should shout — avoid saturated colors, dense layouts, and attention-grabbing motion in anything you build with it.

## Page setup

Put `className="ornie-app"` on your page root. It sets the Manrope font, page background (`--ornie-bg`), and ink color. Components style themselves and work without it, but without the wrapper your page frame has the wrong font and background:

```jsx
<div className="ornie-app" style={{ minHeight: '100vh', padding: 'var(--ornie-space-8)' }}>
  …your UI…
</div>
```

Theming is pure CSS — no JS provider or React context is required. (The bundle also exports `OrnieApp`, a thin convenience wrapper that renders exactly `<div className="ornie-app">` — the preview cards use it and it's equivalent, but `className="ornie-app"` is the canonical form that ships in `@ornie/react`; prefer it in code you intend to hand to engineers.)

## Dark mode

Add `data-ornie-theme="dark"` to the page root (usually the same element as `ornie-app`) — every component re-themes through the tokens, no prop changes:

```jsx
<div className="ornie-app" data-ornie-theme="dark" style={{ minHeight: '100vh' }}>
  …your UI…
</div>
```

- The attribute is the ONLY trigger (no OS auto-follow — predictability is a feature here). It works on any subtree, so you can embed a dark panel in a light page.
- Dark keeps the same accent/danger button fills as light and dims everything else to deep warm browns — never pure black. All pairs are contrast-verified.
- Native controls (select dropdowns, scrollbars) follow automatically via `color-scheme`.
- Don't hand-pick "dark colors": the same semantic tokens (`--ornie-bg`, `--ornie-surface`, `--ornie-text`, …) resolve correctly in both themes. If you hardcode a hex, it will be wrong in one of them.
- See the `DarkMode` card in the Foundations group for a live sampler.

## Styling idiom: component props + tokens, never hand-written `ornie-*` classes

Components carry their own styles and are configured by props (`variant`, `size`, `shape`, …) — read each component's `.prompt.md` and `.d.ts` for the exact API. The `ornie-*` class names you'll see in the compiled CSS are the components' internal BEM vocabulary; do not compose them by hand.

For your own layout glue (wrappers, grids, spacing), write inline styles or plain CSS using the semantic tokens (Layer 2) — not raw palette values:

- Surfaces & text: `--ornie-bg`, `--ornie-surface`, `--ornie-surface-sunken`, `--ornie-border`, `--ornie-border-subtle`, `--ornie-text`, `--ornie-text-muted`, `--ornie-text-subtle`
- Accent: `--ornie-accent`, `--ornie-accent-hover`, `--ornie-accent-subtle`, `--ornie-accent-text`
- Status (muted by design): `--ornie-success`, `--ornie-warning`, `--ornie-danger` + `-subtle`/`-text` variants
- Spacing (4px grid): `--ornie-space-1` … `--ornie-space-16`; radii: `--ornie-radius-xs|sm|md|lg|full` (12px `md` for controls, 16px `lg` for cards/modals)
- Type: `--ornie-font-sans`, `--ornie-text-xs` … `--ornie-text-4xl`, `--ornie-weight-regular|medium|semibold|bold`
- Elevation: `--ornie-shadow-sm|md|lg` (warm-tinted, low — prefer borders over heavy shadows)

Raw palette scales (`--ornie-river-*`, `--ornie-sand-*`, `--ornie-fur-*`, `--ornie-moss-*`, `--ornie-clay-*`, `--ornie-rust-*`) exist in the stylesheet but are Layer 1 — reach for them only when no semantic token fits.

## Where the truth lives

`styles.css` imports everything (tokens, Manrope `@font-face`, component CSS). Token names and values: read the compiled `_ds_bundle.css`. Per-component APIs and composition examples: `components/components/<Name>/<Name>.prompt.md`.

The **Foundations** group holds living reference components you can also render inside style-guide pages: `ColorPalette` (scales + semantic roles), `TypeScale`, `SpacingScale`, `RadiusScale`, `Elevation`, and `DarkMode` (the dark-theme sampler).

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
