# Prose

> Screens: 1p/1q notes, 2l journal, 2m Pages, 1u Ask responses, D:Notes, D:Journal, D:Ask panel, D:SDK docs. Tier: patterns. Since 0.2.0.

Reading typography for rendered content. The app's renderer turns Markdown into plain elements (`h1`–`h3`, `p`, lists, quotes, code, `hr`, `a`); Prose is the wrapper that makes them read calmly — 15px/1.65 body, headings that stay on the type scale, quiet markers, sunken code. This is the **one** component whose job is styling elements it doesn't render, so element selectors live inside its block and nowhere else.

**Use when** displaying rendered note/journal/page bodies, Ask responses, or docs copy.
**Don't use for** UI chrome or layouts (it styles *content*, not screens), editors (1q shows raw Markdown as plain text — no Prose), or single lines of styled copy (just use the tokens). It sets **no max-width** — measure is the app's layout decision (desktop caps at 640px, D:Notes).

## API notes

- A `div` wrapper: `children` are the rendered elements. `forwardRef` to the root; `className`/`style`/rest merge onto it.
- No outer margins, and internal rhythm is margin-top-between-siblings only, so the first and last children sit flush — Prose composes into Cards, Sheets, and panels without trimming.
- Only **bare** anchors are styled (`a:not([class])`, with Link's exact accent declarations). Components the app interleaves — WikiLink pills, Chips — carry classes and keep their own look. Never write `.ornie-prose .ornie-x` overrides; if a component looks wrong inside Prose, fix the component.
- Headings map `#`→`h1` 20/semibold, `##`→`h2` 17/semibold, `###`→`h3` 15/semibold (sizes lifted from 1p/D:Notes, snapped to the type scale). Deeper heading levels don't exist in Ornie notes — the renderer clamps to three.
- `pre` scrolls horizontally on its own; it never widens the page. **The markdown renderer must set `tabindex="0"` on `pre`** so keyboard users can scroll code blocks (WCAG scrollable-region rule) — Prose provides the focus outline.
- Task-list items (`- [ ]`) are not Prose's: the app renders those with TaskCheck-based rows.

## Examples

```jsx
// Note read mode (1p): renderer output straight into Prose
<Prose>{renderMarkdown(note.source)}</Prose>

// Journal entry inside a Card (2l) — flush first/last children, Card owns padding
<Card>
  <Prose>
    <p>Mostly Porto. The flights thing kept sliding because it feels like a decision, not a task.</p>
  </Prose>
</Card>

// Ask response in the panel (D:Ask) — width comes from the panel, not Prose
<Prose>
  <p>Three things are waiting on Sam:</p>
  <ol>
    <li>Design feedback reply</li>
    <li>Hero CTA copy</li>
  </ol>
</Prose>
```

## Calm rules

- No font-size jumps beyond the scale: `h1` caps at `--ornie-text-xl` (20px). Big display type belongs to PageHeader, not content.
- Links carry **one signal** — river ink with a quiet underline. Never bolded-and-colored; emphasis is `strong`'s job.
- Blockquotes are a hairline edge and muted ink, not a colored callout. Nothing in a note is highlighted *at* the reader.
- Code sits on `--ornie-surface-sunken` — recessed, never boxed in loud borders or syntax-rainbowed by the DS.
