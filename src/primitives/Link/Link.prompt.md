# Link

> Screens: D:settings, docs surfaces (D:mobile companion / SDK view), empty-state help lines. Tier: primitives. Since 0.2.0.

The text link: river ink with a quiet underline that firms up on hover. It lives inside sentences — settings explanations, docs, the one help line under an empty state.

**Use when** a phrase inside text navigates somewhere: "how sync works", "manage devices", an SDK reference.
**Don't use for** primary or standalone actions — a verb on its own line is a Button (`ghost` for quiet ones), never a Link. Not for navigation chrome (Tabs, SidebarNav) or wiki references (WikiLink, Phase 4, builds on this).

## API notes

- Always renders an `<a>`, and forwards its ref to the anchor. Without `href` it still renders an `<a>` (unfocusable, no pointer affordance beyond styling) — if you find yourself reaching for `onClick` without `href`, you want `<Button variant="ghost">`.
- `variant="accent"` (default): `--ornie-accent-text` ink, underline in `--ornie-accent-subtle-border` at rest, full-ink underline + deeper ink on hover.
- `variant="muted"`: `--ornie-text-muted` ink for secondary help lines; hover raises it to `--ornie-text`.
- Type is inherited — Link never sets font size or family, so it sits in any copy without re-declaring type.
- All native anchor attributes pass through (`target`, `rel`, `download`, …). External links should pair `target="_blank"` with `rel="noreferrer"` at the call site.

## Examples

```jsx
// Settings explanation
<p>
  Your workspace syncs when you are online. See <Link href="/docs/sync">how sync works</Link>.
</p>

// Empty-state help line — muted so it never competes with the primary action
<Link variant="muted" href="/docs/projects">Learn how projects work</Link>

// SDK docs surface
<Link href="https://ornie.app/docs/api" target="_blank" rel="noreferrer">API reference</Link>
```

## Calm rules

- The underline is the affordance; links never bold themselves or change size on hover.
- One accent link per paragraph is plenty — a wall of river ink stops reading as calm text.
- Link copy is the destination, plainly: "how sync works", never "click here".
