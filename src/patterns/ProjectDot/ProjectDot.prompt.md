# ProjectDot

> Screens: MetaLine runs (2a/2e), D:sidebar projects, 1r/1s project lists. Tier: patterns. Since 0.2.0.

6px round identity dot in one of five muted project colors (`--ornie-project-river/moss/clay/fur/rust` — semantic aliases so themes can retarget, D-61), with an optional label that inherits the surrounding type.

**Use when** a project needs a compact visual identity: metadata runs, sidebar items, project pickers.
**Don't use for** people (that's Avatar's tone system — rust is excluded there; projects may use it), status signalling, or unread markers.

## API notes

- `color` is one of the five fixed names; there is deliberately no arbitrary-color prop — identity stays muted and theme-ownable.
- `label` renders after the dot and truncates; without it the dot is purely decorative (`aria-hidden`) — make sure adjacent text names the project.
- Inherits `font-size`/`color` from context: 11.5px muted inside MetaLine, 13.5px in the sidebar.

## Examples

```jsx
<MetaLine>
  <span>9:00</span>
  <ProjectDot color="clay" label="Kitchen reno" />
</MetaLine>

// Sidebar item (Phase 3 SidebarNav composes this)
<ProjectDot color="river" label="Companion app" />
```

## Calm rules

- Five muted mids, fixed. No saturated custom colors, no color-as-status.
- The dot never pulses or gains badges; it identifies, it doesn't notify.
