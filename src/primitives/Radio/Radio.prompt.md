# Radio + RadioGroup

> Screens: D:settings, theme picker. Tier: primitives. Since 0.2.0.

One choice among a few, all visible. Radio is the single circle; RadioGroup is the labelled fieldset that wires a set of them together. The theme picker and desktop settings choices are the canonical consumers.

**Use when** 2–6 exclusive options should all be readable at once (settings choices, plan pickers).
**Don't use for** independent on/off options (Checkbox), instant-effect toggles (Switch), compact 2–4-way controls inline with content (SegmentedControl, Phase 2), or long option lists (Select).

## API notes

- Native `<input type="radio">` under the skin; arrow keys move selection within a same-`name` set for free.
- **RadioGroup is controlled**: `value` + `onChange(value, event)`. It renders a real `<fieldset>` (reset styles) with the `label` as `<legend>`, plus `role="radiogroup"` + `aria-labelledby`; `description` is wired via `aria-describedby`.
- `name` on the group flows to every child Radio via context (auto-generated if omitted — you only need it for real form posts). A child's own `name`/`checked`/`onChange` win over the group's when set.
- Standalone `<Radio>` (outside a group) behaves exactly as before — wire `name`/`checked`/`onChange` yourself.
- `orientation="horizontal"` flows options in a wrapping row; vertical (default) is the settings-list layout. Spacing is flex `gap` — no margins.
- Radio `description` renders the muted 13px line and is announced via `aria-describedby`.
- On coarse pointers the 18px circle gets an invisible ≥44px hit-slop; the whole label is always clickable.

## Examples

```jsx
// Theme picker (D:settings)
<RadioGroup label="Appearance" value={theme} onChange={setTheme}>
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
  <Radio value="system" label="System" />
</RadioGroup>

// Options with helper lines
<RadioGroup
  label="Start my day on"
  description="Where Ornie opens each morning."
  value={start}
  onChange={setStart}
>
  <Radio value="today" label="Today" description="Tasks and events for the current day." />
  <Radio value="inbox" label="Inbox" description="Everything captured and not yet sorted." />
</RadioGroup>

// Compact horizontal pair
<RadioGroup label="Density" orientation="horizontal" value={density} onChange={setDensity}>
  <Radio value="phone" label="Comfortable" />
  <Radio value="desktop" label="Compact" />
</RadioGroup>
```

## Calm rules

- Selection is a quiet accent fill and a small dot — no rings expanding, no springs.
- Every option is equally weighted; no option is visually pushed (no "recommended" glow).
- Group labels and descriptions are plain sentences: no exclamation marks, no urgency.
- No red options. Destructive choices belong to Button `danger` inside a confirm, not a radio.
