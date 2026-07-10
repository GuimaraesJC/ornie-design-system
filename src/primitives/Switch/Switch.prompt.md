# Switch

> Screens: 1v settings, D:settings, Burrow auto-seal, 2n module rows. Tier: primitives. Since 0.2.0.

The instant on/off toggle. Flipping it takes effect now — no save button, no submit. Settings rows, module toggles, Burrow auto-seal.

**Use when** an option applies the moment it is flipped.
**Don't use for** choices a form submits later (Checkbox), exclusive options (Radio/RadioGroup, SegmentedControl), or anything with more than two states.

## API notes

- Native `<input type="checkbox" role="switch">` under the skin — controlled via `checked` + `onChange`.
- `label` (15px, `--ornie-text`) and `description` (13px, `--ornie-text-muted`) render as a text block; `description` is wired to the input via `aria-describedby`.
- `labelPlacement="start"` is the **default**: text first, control on the right — the settings-row layout. The text block flexes, so `style={{ width: '100%' }}` (or a stretching parent) pushes the track flush right. `labelPlacement="end"` puts the control first for dense inline uses.
- The whole thing is one `<label>`: clicking anywhere — text or track — toggles.
- Bare mode (no `label`) still works and must carry `aria-label`.
- Sizes: `md` 42×24 / `sm` 34×20. On coarse pointers the track gets an invisible ≥44px hit-slop.

## Examples

```jsx
// Settings row (D:settings, 1v) — text left, control right, full width
<Switch
  label="Auto-seal"
  description="Seal the Burrow after 15 minutes of inactivity."
  checked={autoSeal}
  onChange={(e) => setAutoSeal(e.target.checked)}
  style={{ width: '100%' }}
/>

// Module row toggle (2n) — compact, no description
<Switch size="sm" label="Calendar" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />

// Bare switch inside a ListRow that already renders the text
<Switch aria-label="Calendar module" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
```

## Calm rules

- The thumb glides (`--ornie-duration-gentle`); it never springs, bounces, or overshoots. Reduced motion collapses the glide via the token layer.
- Off is a neutral track, not a warning: no red, no alarm iconography.
- Flipping a switch never triggers celebratory motion or sounds.
- Descriptions state what the option does, plainly — no exclamation marks, no nudging copy.
