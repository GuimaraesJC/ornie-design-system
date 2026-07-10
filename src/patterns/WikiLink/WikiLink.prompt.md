# WikiLink

> Screens: 1p/1q notes (read/write), 2l journal, 2m Pages, D:Notes, D:Journal. Tier: patterns. Since 0.2.0.

The `[[note]]` pill: how a rendered note refers to another note. A quiet accent wash on the target's title, sitting inline in the sentence. Connections are the point of Ornie's notes — this is the affordance that makes them visible without shouting.

**Use when** rendered note/journal/page content references another note by title.
**Don't use for** ordinary hyperlinks inside copy (Link — underline, not a pill), tags or removable entities (Chip), static status (Badge), or navigation chrome (Tabs, SidebarNav). Not for the *editor* — in write mode (1q) `[[…]]` stays plain Markdown text.

## API notes

- Always renders an `<a>` and forwards its ref to it. `href` is optional — the app wires navigation. Without `href` the anchor is not keyboard-focusable; if your renderer navigates via `onClick`, give it a real `href` (router path) so keyboard and screen-reader users get a working link.
- `unresolved` — the target note doesn't exist yet: dashed 1px `--ornie-accent-subtle-border` edge on a transparent wash ("dashed marks the not-yet-real", 1p). Following it **creates the note** — that behavior is the app's; the component only looks the part.
- Type is inherited: the pill sizes itself in `em` off the surrounding text (0.875em, semibold — lifted from 1p's 12.5px pill in 14.5px body). Never set a font size on it.
- Lays out as `display: inline` with `box-decoration-break: clone`, so long titles wrap and each line fragment stays a rounded pill.
- Hover raises the wash one step (`--ornie-accent-subtle` → `--ornie-selected`); unresolved hover previews the resolved wash.
- No touch hit-slop: links inside flowing text are the standard inline-text exception to the 44px rule.
- Needs no special handling inside Prose — Prose styles only bare (classless) anchors, so the pill keeps its own look.

## Examples

```jsx
// Rendered note body (the app's markdown renderer emits these)
<Prose>
  <p>
    Type scale reference lives in <WikiLink href="/notes/moodboard-directions">Moodboard directions</WikiLink> —
    keep them in sync.
  </p>
</Prose>

// Unresolved — the target doesn't exist yet; following it creates the note
<WikiLink href="/notes/new?title=Porto%20trip%20—%20packing" unresolved>
  Porto trip — packing
</WikiLink>

// Backlink snippet in a card (inherits the smaller type around it)
<span>…quiet editorial pairs with <WikiLink href="/notes/sam-feedback">Design feedback from Sam</WikiLink>…</span>
```

## Calm rules

- Unresolved is an **invitation, not an error** — never red, never a warning icon, no "missing!" copy. The dashed edge says "not yet", quietly.
- One signal: the wash is the affordance. The pill never adds an underline, never bolds beyond its resting weight, never changes size on hover.
- The pill's text is the note's title, plainly — no glyphs, no brackets in the rendered output.
