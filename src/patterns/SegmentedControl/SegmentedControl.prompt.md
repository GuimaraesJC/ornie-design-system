# SegmentedControl

> Screens: 1v/D:settings appearance (Light/Dark/System), 1l task detail energy, 1u Ask sheet + D:Ask panel local/cloud, 2e scope, density toggles. Tier: patterns. Since 0.2.0.

A pill track for 2–4 exclusive options where every choice stays visible. One option is always selected (the app decides the initial value); picking is instant, no confirm step.

**Use when** the user flips between a few equivalent modes of the same thing: appearance, density, scope, local/cloud.
**Don't use for** navigation between content views (Tabs owns that — the boundary: Tabs switch *what you're looking at*, SegmentedControl switches *how one thing behaves*), more than 4 options (Select), non-exclusive picks (ChipGroup multi), or on/off (Switch). More than 4 options renders without crashing, but it is out of spec — reach for Select.

## API notes

- Controlled only: `value` + `onChange(value)`. There is no uncontrolled mode.
- `options: Array<{ value, label, disabled? }>` — labels are ReactNode (text, or icon + text); disabled options render dimmed and are skipped by keyboard.
- Radio semantics: `role="radiogroup"` root with `role="radio"` buttons and `aria-checked`. Give the group a name via `aria-label` (or `aria-labelledby` to a visible label).
- Keyboard: one tab stop (the selected option, roving tabindex). Arrow keys move focus **and** select (the radio pattern — Left/Up previous, Right/Down next, wrapping); Home/End jump to first/last enabled option.
- Sizes: `md` (default) 28px inner height, 13px labels; `sm` 24px inner height, 12px labels. Both get an invisible ≥44px vertical hit-slop on coarse pointers.
- No sliding thumb. The selected item itself swaps to `--ornie-surface` + hairline + `--ornie-shadow-sm` with a `--ornie-duration-quick` transition — a translate animation would need per-item measurement and would draw the eye; the quiet swap is the calm choice.

## Examples

```jsx
// Settings — appearance (1v, D:settings)
<SegmentedControl
  aria-label="Appearance"
  options={[
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ]}
  value={theme}
  onChange={setTheme}
/>

// Ask — where the model runs (1u, D:Ask panel)
<SegmentedControl
  size="sm"
  aria-label="Ask model"
  options={[
    { value: 'local', label: 'Local' },
    { value: 'cloud', label: 'Cloud' },
  ]}
  value={askMode}
  onChange={setAskMode}
/>

// Task detail — energy (1l); a disabled option stays visible but unpickable
<SegmentedControl
  aria-label="Energy"
  options={[
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High', disabled: !estimated },
  ]}
  value={energy}
  onChange={setEnergy}
/>
```

## Calm rules

- Selection is a quiet surface swap — nothing slides, pulses, or bounces across the track.
- Options are plain daily words ("Light", "Week", "Local"), never jargon or abbreviations that need decoding.
- No counts or badges inside options; a segmented control states modes, it doesn't score them.
