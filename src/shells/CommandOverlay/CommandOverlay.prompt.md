# CommandOverlay

> Screens: D:quick-capture (⌘K, 540), D:quick-find (⌘/, 560). Phones use Sheet instead. Tier: shells. Since 0.2.0.

The desktop ⌘K / ⌘/ surface: a top-pinned Modal (composes `Modal placement="top" flush`) made of an input row (leading glyph · borderless input · optional Kbd), a results area, and a footer bar of Kbd hints. It provides roving selection and listbox semantics — and deliberately **no search logic**: the app queries SQLite and passes filtered `items` (D-23).

**Use when** a desktop keyboard flow needs capture (⌘K) or jump-anywhere (⌘/).
**Don't use for** phones (Sheet — thumb-reachable), confirmations or forms (Modal), or in-page filtering (SearchField).

## API notes

- Controlled twice over: `open` + `onClose` for the surface, `value` + `onChange` for the input. The global shortcut (⌘K in-app, ⌥Space via Tauri) is the app's.
- `width` in px: **540** quick capture (default), **560** Quick Find (SPECS: desktop overlays).
- `icon`: `plus` for capture, `search` for find (default). `trailing` takes the shortcut Kbd — decorative, hidden from assistive tech.
- Results: pass `children` (any content — parse chips, ListRow recipes) **or** manage a list with `items` + `getKey` + `renderItem(item, active)` + `onSelect`. Managed mode wires `role="combobox"` on the input, `aria-activedescendant`, and a `listbox` of options; ↑/↓ rove (wrapping), ↵ selects, hover roves too. With managed `items`, `children` becomes the empty message.
- `renderItem` rows should own their inset — `ListRow density="desktop" padded` is the house recipe; the active row gets the `--ornie-selected` wash.
- `footer` defaults to the standard hints ("↑↓ navigate · ↵ open · esc close"); pass custom content (capture uses "↵ lands in Inbox") or `null` to remove the bar.
- The dialog needs a name: pass `aria-label` ("Quick capture" / "Quick Find") — there is no visible title.
- The ref lands on the `<input>`, which is focused on open. `dismissible` and `container` pass through to Modal (`container` is for embedding/grids only).
- The input is a bare styled `<input>`, not the Input primitive: the field skin (border, ground, min-heights) can't be unstyled from outside without cross-component selectors, which are banned.

## Examples

```jsx
// D:quick-capture — ⌘K, 540. Parse chips render as children (app-side).
<CommandOverlay open={capturing} onClose={close} aria-label="Quick capture"
  value={draft} onChange={setDraft} placeholder="What's on your mind?"
  icon="plus" trailing={<Kbd keys={['⌘','K']} />}
  footer={<span className="ornie-command-overlay__hint"><Kbd>↵</Kbd> lands in Inbox</span>}>
  <ParseChips entities={parsed} />
</CommandOverlay>

// D:quick-find — ⌘/, 560, managed results. The app filters; DS renders.
<CommandOverlay open={finding} onClose={close} aria-label="Quick Find"
  value={q} onChange={setQ} placeholder="Jump anywhere, do anything…"
  icon="search" width={560} trailing={<Kbd keys={['⌘','/']} />}
  items={results} getKey={(r) => r.id} onSelect={openResult}
  renderItem={(r) => <ListRow title={r.label} leading={<ProjectDot color={r.tone} />}
    trailing={r.kind} density="desktop" padded />}>
  <EmptyHint>Nothing matches — press ⌘K to capture it instead.</EmptyHint>
</CommandOverlay>
```

## Calm rules

- Opens only in response to the user's shortcut or click; the entrance is Modal's quiet fade.
- No spinners while the app queries — local SQLite answers render as they arrive (D-23); an empty moment is just empty.
- The empty message points forward without scolding: "Nothing matches — press ⌘K to capture it instead."
