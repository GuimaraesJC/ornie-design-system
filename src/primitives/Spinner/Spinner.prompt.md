# Spinner

> Screens: TopBar sync pending (cross-cutting state, D-23), Button loading. Tier: primitives. Since 0.2.0.

The quiet indeterminate ring: a 2px currentColor circle with one transparent quarter, turning at the sanctioned pace. This is the only continuous motion in the whole system, and it exists for exactly two situations.

**No full-page spinner exists in Ornie.** Local reads are instant (D-23) — views render from local SQLite live queries, so a screen never waits on a spinner. Use Spinner only for **Button loading** and **sync / cloud-Ask pending**. If you are reaching for a page- or list-level spinner, the design is wrong, not the component.

**Use when** a cloud round-trip is genuinely in flight: a committing Button, the TopBar sync indicator, a pending cloud-Ask reply.
**Don't use for** local data (it's already there), skeletons or perceived-performance theater, empty states (EmptyState), or determinate progress (ProgressRing).

## API notes

- `size`: `14` (inline with text) / `18` (default, control-sized) / `24` (panel-level pending). No larger size exists on purpose.
- `label` (default `'Loading'`) names the ring for assistive tech via `role="status"` + `aria-label`. Give it a real name in context: `label="Sync in progress"`.
- Ink defaults to `--ornie-text-subtle` (a ≥3:1 non-text graphic). It draws in `currentColor`, so a parent that sets `color` recolors it — that is how Button's loading state matches its label ink.
- Motion comes only from the tokens: `--ornie-duration-spin` for the period, `animation-play-state: var(--ornie-spin-state)` so reduced motion **pauses** the ring — it never collapses to a 1ms blur. Never re-implement this rotation elsewhere; compose this component.

## Examples

```jsx
// TopBar trailing slot while a cloud op is pending — never a page blocker
<Spinner size={14} label="Sync in progress" />

// Panel-level cloud-Ask pending
<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ornie-space-2)' }}>
  <Spinner size={24} label="Waiting for Ask" />
</div>

// Inheriting ink from the parent (how Button loading works)
<span style={{ color: 'var(--ornie-text-on-accent)' }}>
  <Spinner size={18} label="Saving" />
</span>
```

## Calm rules

- One spinner visible per surface, ever. Two rings turning is noise.
- The ring turns at `--ornie-duration-spin` — never faster; urgency is not a speed setting.
- Under `prefers-reduced-motion` the ring pauses in place; the pending state stays legible without motion.
- No accompanying copy like "Hang tight!" — if text is needed, it is plain: "Syncing".
