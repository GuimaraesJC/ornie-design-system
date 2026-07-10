# Sheet

> Screens: 2b capture (half), 1l task detail (tall), 1u Ask on phone (tall). Tier: shells. Since 0.2.0.

The mobile overlay surface (D-68: capture is a half sheet): scrim + bottom panel with a grabber, 20px top radius, keyboard-safe bottom padding. Full dialog semantics — focus trap, Esc, scrim tap, focus return.

**Use when** a phone flow needs a focused surface over the current screen: capture, task detail, Ask.
**Don't use for** desktop (that's Modal or CommandOverlay), confirmations (Modal `sm`), or persistent panels (PanelDrawer).

## API notes

- Controlled: `open` + `onClose`. `dismissible={false}` disables Esc and scrim tap (rare — Burrow passphrase entry).
- Heights: `content` (intrinsic, ≤85dvh) · `half` (52dvh — capture) · `tall` (90dvh — detail/Ask). The body scrolls internally.
- **Keyboard-safe bottom**: padding includes `env(safe-area-inset-bottom)` + `--ornie-keyboard-inset`. The app sets `--ornie-keyboard-inset` from the keyboard APIs (visualViewport / Capacitor keyboard plugin); the DS just consumes it.
- `initialFocus` for capture-style sheets that open into an input.
- `container` portals somewhere other than `document.body` — for embedding and the variant grid; apps normally omit it (contained sheets skip the scroll lock and focus management).
- Swipe-to-dismiss is app-side; the grabber is a visual affordance only.

## Examples

```jsx
// 2b capture
const inputRef = useRef(null);
<Sheet open={capturing} onClose={stopCapture} height="half" title="Capture" initialFocus={inputRef}>
  <Input ref={inputRef} size="lg" placeholder="What's on your mind?" />
  <ChipGroup mode="single" value={target} onChange={setTarget} options={parseChips} />
</Sheet>

// 1l task detail
<Sheet open={!!task} onClose={closeDetail} height="tall" title="Task">
  {task && <TaskDetailFields task={task} />}
</Sheet>
```

## Calm rules

- One sheet at a time; a confirmation on top of a sheet is a Modal (`--ornie-z-modal` sits above `--ornie-z-sheet` for exactly this).
- Entrance is a single quiet rise + scrim fade in `--ornie-duration-gentle`; reduced motion collapses it to an appear.
- The sheet never opens itself — always a direct response to the user.
