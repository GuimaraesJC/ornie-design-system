# FormField

> Screens: 1l task detail fields, 1v settings, D:settings, Burrow setup. Tier: patterns. Since 0.2.0.

Label + any control + help/error line, with the `htmlFor`/`aria-describedby`/`aria-invalid` wiring done for you. It exists so composed controls — a Checkbox group, a SegmentedControl, a custom widget — get the same 13px semibold label and quiet message line as the built-in fields.

**Use when** you label something that doesn't carry its own label: a group of Checkboxes, a SegmentedControl, a ChipGroup, a custom control, or several related controls under one caption.
**Don't use for** a single Input, Select or TextArea — those own their `label`/`hint`/`error` props and render the identical skin; wrapping them in FormField would give the product two competing ways to do the same thing. One control, one API: control's own props for the built-in fields, FormField for everything else.

## API notes

- **Single-child contract:** exactly one element child (and no `group`) is cloned to receive `id` (generated with `useId` when the child has none — an existing `id` is kept and used for `htmlFor`), `aria-describedby` (merged with any existing value), and `aria-invalid` when `error` is set. The label is a real `<label htmlFor>`.
- **Group mode:** more than one child — or `group` set explicitly — switches to `role="group"` + `aria-labelledby`/`aria-describedby` on the FormField root, with no prop injection. Use `group` for a single composite child that isn't labelable (SegmentedControl, RadioGroup-like widgets).
- `error` (ReactNode) replaces `help` when present; ink is `--ornie-danger-text` at 13px.
- `required` renders a quiet muted "required" word after the label — no asterisk, no color alarm. It is visual only: also set `required` on the control itself.
- Children stack vertically with an 8px gap; bring your own layout wrapper for horizontal arrangements.

## Examples

```jsx
// Burrow setup — composite control, group semantics forced
<FormField
  group
  label="Auto-seal after"
  help="Burrow locks itself when the app is idle this long."
>
  <SegmentedControl
    value={delay}
    onChange={setDelay}
    options={[
      { value: '1m', label: '1 min' },
      { value: '5m', label: '5 min' },
      { value: '15m', label: '15 min' },
    ]}
  />
</FormField>

// Settings — checkbox group, wiring lands on the group root
<FormField label="Sync scope" help="Choose what this device keeps locally.">
  <Checkbox label="Tasks" checked={tasks} onChange={toggleTasks} />
  <Checkbox label="Notes" checked={notes} onChange={toggleNotes} />
</FormField>

// A custom control — id/aria-describedby/aria-invalid injected into it
<FormField label="Passphrase" required error={tooShort ? 'Passphrase needs at least 8 characters' : undefined}>
  <PassphraseMeter value={passphrase} onChange={setPassphrase} required />
</FormField>

// NOT this — Input labels itself:
// <FormField label="Capture"><Input /></FormField>   ✗
// <Input label="Capture" />                            ✓
```

## Calm rules

- Error copy is plain words that say what's needed: "Passphrase needs at least 8 characters", "Pick at least one day" — never "Invalid input!", never an exclamation mark, never blame.
- The error state is an ink change on one line. Nothing shakes, flashes, or scrolls the user around.
- Required is a quiet word, not a red asterisk. Labels never shout in caps.
