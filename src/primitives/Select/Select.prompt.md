# Select

> Screens: 1l task detail fields (project, repeat), D:settings. Tier: primitives. Since 0.1.0; `leading` slot since 0.2.0.

A native `<select>` wearing the shared field skin: project pickers, repeat rules, settings choices. The options popup is the operating system's — free keyboard support, free screen-reader semantics, free mobile wheels.

**A custom listbox is a non-goal** until a real need appears (option icons, grouped previews, type-ahead over hundreds of rows). Native gets accessibility for free; a lookalike listbox costs a swipe-through of ARIA authoring practices and usually ends up worse on phones. If a screen seems to need one, flag it against the ledger first.

**Use when** the user picks exactly one option from a known, shortish list.
**Don't use for** 2–4 visible exclusive choices (SegmentedControl, Phase 2), multi-select or tag picking (ChipGroup), navigation, or free text with suggestions (that's an app-side composition).

## API notes

- Sizes: `sm` 32 / `md` 40 / `lg` 48 (px) — same scale as Input.
- Options: pass `options` (`{ value, label, disabled? }[]`) or `<option>` children — not both.
- `placeholder` renders a hidden disabled empty option and dims the value until a real choice is made (uncontrolled usage).
- `leading` is decorative (`aria-hidden`, no clicks): an `<Icon>` at the field's 16px glyph measure. The chevron on the right is built in — leave the trailing edge alone.
- `error` takes the message itself (ReactNode) — replaces `hint`, sets `aria-invalid`, wires `aria-describedby`.
- Everything native passes through to the `<select>`; `ref` forwards to it too.

## Examples

```jsx
// 1l — project field
<Select label="Project" leading={<Icon name="folder" />} options={projects} value={projectId} onChange={(e) => setProjectId(e.target.value)} />

// D:settings — week start
<Select label="Week starts on" size="sm" defaultValue="mon">
  <option value="mon">Monday</option>
  <option value="sun">Sunday</option>
</Select>

// Unchosen yet — quiet placeholder, no red until the user actually submits
<Select label="Repeat" placeholder="Never" options={repeatRules} />
```

## Calm rules

- An empty select is not an error; show `placeholder` and wait. Validation speaks only after a submit attempt, in one plain sentence.
- The chevron never animates, the field never glows; opening the picker is the OS's moment, not ours.
- Option labels are plain daily words ("No project", "Never"), not jargon ("null", "N/A").
