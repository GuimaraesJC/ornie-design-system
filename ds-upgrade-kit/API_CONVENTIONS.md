# API_CONVENTIONS.md — how every @ornie/react component behaves

These conventions make the library composable. They are checked in review; several are CI-enforced. When a convention and a mockup disagree, flag it — don't silently pick.

## 1 · Composition contract

- **No outer margins, ever.** A component's root has zero external margin; parents own spacing via flex/grid `gap`. (This is the single biggest composability rule.)
- **Slots over booleans.** Optional regions are ReactNode props: `leading`, `trailing`, `header`, `footer`, `children`. Never `hasIcon`/`iconName` pairs when a slot works.
- **Children pass through.** Text-bearing components take `children`, not a `label` string prop (exception: `aria-label` on icon-only controls).
- **Recipes over variants-of-variants.** When a pattern is "ListRow arranged a certain way", document it as a recipe in `.prompt.md` — do not mint a new component per arrangement.
- **Width is the parent's.** Components are `width: 100%` of their container or intrinsic; no component hardcodes page-level widths (shell dimensions like Dock 84 / SidebarNav 264 are the component's own box, which is different).

## 2 · Prop grammar

- `variant` = visual voice (`primary/secondary/ghost/danger`, `flat/elevated/sunken`).
- `size` = t-shirt scale (`sm/md/lg`), mapped to exact px in CSS, documented in `.d.ts` comments.
- `density` = information tightness (`phone/desktop`) — only on list-family components.
- State props are plain: `selected`, `disabled`, `loading`, `open`, `checked`, `value`.
- Callbacks: `on<Event>` (`onSelect`, `onDecide`, `onClose`, `onRemove`). Payload first, event second where both exist.
- Booleans default false; the zero-props render must be the calm default.

## 3 · State: controlled only

Anything meaningful is controlled: `open`+`onClose` (Modal, Sheet, PanelDrawer, CommandOverlay), `value`+`onChange` (inputs, SegmentedControl, ChipGroup), `checked`+`onChange` (Checkbox, Switch, TaskCheck). No `defaultOpen`-style uncontrolled modes at 0.2.0 — one way to do things. Internal state is only ephemera (hover, press, focus-visible, toast timers).

## 4 · DOM & refs

- `forwardRef` to the primary interactive element (or root for containers).
- `className` and `style` merge onto the root; rest-props spread to the root; `data-*`/`aria-*` pass verbatim.
- Semantic elements first: real `<button>`, `<a>` (when `href`), `<select>`, `<input>`. Card with `onClick` renders `<button>`; with `href` renders `<a>`.
- Portals: Modal, Sheet, PanelDrawer(overlay), Tooltip, Toast — z-index from `--ornie-z-*` tokens only.

## 5 · CSS rules (CI-enforced)

- One BEM block per component: `.ornie-sheet`, `.ornie-sheet__grabber`, `.ornie-sheet--tall`. No cross-component selectors; no descendant styling of another component's internals.
- **Semantic tokens only.** Raw scales need `/* layer1: <reason> */`. Hex is forbidden (audit fails the build).
- **No `[data-ornie-theme]` selectors in component CSS** — dark comes from tokens (D-67). If dark looks wrong, the fix is in `tokens.json`.
- All motion via `--ornie-duration-*` + `--ornie-ease-*`; the token layer collapses durations under `prefers-reduced-motion`, so components never write that media query themselves.
- Focus: `:focus-visible` outline `2px solid var(--ornie-focus-ring)`, offset 2px — identical everywhere; never `outline: none` without replacement.
- Hit targets: interactive elements ≥44×44 on touch sizes — visual size may be smaller with hit-slop (`::after` expansion), e.g. Chip sm, TaskCheck.

## 6 · Accessibility floor

- Full keyboard operation; roving tab index in composite widgets (ChipGroup, CommandOverlay results, SegmentedControl).
- Overlays: focus trap, focus return on close, `Esc` closes, scrim click closes (unless `dismissible={false}`), `aria-modal` + labelled-by wiring.
- Icon-only controls require `aria-label` at the type level (compile error without it).
- Live regions: Toast host is `aria-live="polite"`; nothing in Ornie is `assertive`.
- Copy in components (empty states, errors) follows calm rules: plain words, no exclamation marks, no shame ("Inbox is clear", "resumed", never "overdue!", "streak broken").

## 7 · Docs artifacts (all five, per component)

1. `<Name>.jsx` — implementation, JSDoc'd.
2. `<Name>.css` — BEM, tokens.
3. `<Name>.d.ts` — exact types; slots typed `React.ReactNode`; unions for variants.
4. `<Name>.prompt.md` — header line citing mockup screens (from COVERAGE_MATRIX) · what it's for · **when not to use it** · 2–3 composition examples (JSX) · calm rules specific to it.
5. `<Name>.html` — variant grid: full matrix of variants × states, rendered twice — light wrapper and `data-ornie-theme="dark"` wrapper — side by side. This is the both-themes proof and the axe target.

## 8 · Versioning & deprecation (public package, D-05/D-49)

- Changesets on every user-visible change; additive = minor, fixes = patch.
- Deprecations: keep the old prop working + `console.warn` once (dev only) for one minor; remove next minor. Document in the changelog with a migration line.
- `window.OrnieReact.*` globals mirror package exports exactly; bundle metadata header lists every export.
- Never rename a component to a cleverer word. Plain nouns are the API (D-40).
