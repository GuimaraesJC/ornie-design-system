# MetaLine

> Screens: TaskRow everywhere (2a/2e–2h), note-row recipes (1o), 2e timeline, habit rows. Tier: patterns. Since 0.2.0.

The 11.5px metadata run under a row title: time · project · tags · estimate · repeat glyph. Children-based — pass fragments in display order and MetaLine inserts the `·` separators, keeps everything on one line, and truncates the tail.

**Use when** a row needs a quiet second line of facts.
**Don't use for** body copy, descriptions, or anything the user must read to act — metadata is glanceable, not essential.

## API notes

- Conditional children are safe: `null`/`false`/empty strings are dropped and never leave a dangling separator.
- Ink is `--ornie-text-muted` (the mockups' `text-subtle` fails WCAG AA at this size in dark — sanctioned adjustment).
- Icons inside fragments render at 12px; keep one icon per fragment, leading.
- Truncation is tail-first: the last fragment ellipsizes, earlier ones hold — put the most important fact first (time, then project).

## Examples

```jsx
<MetaLine>
  <span>9:00</span>
  <ProjectDot color="moss" label="Garden project" />
  <span>25m</span>
</MetaLine>

<MetaLine>
  {task.due && <span>{formatDue(task.due)}</span>}
  {task.project && <ProjectDot color={task.project.color} label={task.project.name} />}
  {task.repeat && <span><IconRepeat size={16} /> {task.repeat}</span>}
</MetaLine>
```

## Calm rules

- Facts, not judgments: "9:00", never "due in 2 hours!".
- No red, no warning inks — dates are stated plainly whatever they are.
