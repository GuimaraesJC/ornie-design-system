# design-sync notes — @ornie/react

## Repo facts
- Own-source repo (package not in node_modules): converter needs `--entry dist/index.js`; `--node-modules ./node_modules`.
- `buildCmd: pnpm run build` (tsup + esbuild CSS). pnpm + nvm (node 24 via `.nvmrc`); never npm for the repo itself (`.ds-sync/` converter deps are the isolated exception).
- Storybook 8 (react-vite) at repo root `.storybook/`; reference build lives at `.design-sync/sb-reference` (gitignored, rebuild with `npx storybook build -c .storybook -o .design-sync/sb-reference` whenever src or stories change).
- `.storybook/preview.tsx` decorator wraps stories in `<div className="ornie-app">` — auto-bundled into preview-decorators; no `cfg.provider` needed (pure-CSS theming, no JS provider).
- No remote assets anywhere: Avatar's image story uses an inline data-URI SVG by design, all fonts vendored (Manrope woff2 in `src/fonts/`). The `[ASSETS_BLOCKED]` canary has nothing to bite on in this repo.

## Fixes applied (first full sync, 2026-07-03)
- `[GRID_OVERFLOW]` wide stories → `cardMode: "column"` for Card, Radio, Switch, Tabs.
- Modal: `createPortal(document.body)` leaves `#storybook-root` empty, so the harness reports `sb-error: no storybook root content` for the two `open: true` stories (Confirmation, With Form) — they DO render in live storybook, the root-scoped capture just can't see them. Skipped both (`cfg.overrides.Modal.skip`); card is `cardMode: "single"` + `primaryStory: "Interactive"` (closed state, opens on click in the live card). Open-modal fidelity was verified manually outside the harness (see Re-sync risks).
- Button has 9 stories; compare's default cap is 6 → tail (Loading, Disabled, Full Width) captured with `--max-stories 9` and graded. Expect `[STORY_CAP]` to reprint on driver runs — grades persist, not a problem.
- Tooltip bubbles are hover-only: both panels show rest state (trigger buttons). Verified rest state matches; bubble styling is exercised nowhere in compare.

## Re-sync risks
- **Modal's open-modal rendering is outside the compare oracle** (skipped stories). If Modal.css or Modal.tsx changes, re-verify manually: serve `ds-bundle` and screenshot `components/components/Modal/Modal.html?story=Confirmation` vs the live storybook page for `components-modal--confirmation` (full-page shot, not root-scoped).
- Tooltip bubble styling (`.ornie-tooltip__bubble`) is likewise unverified by compare (hover-only). If Tooltip.css changes, eyeball the bubble manually.
- Button stories beyond the default cap re-verify only if `--max-stories 9` is passed on a scoped compare after Button story/source changes.
- `conventions.md` names real tokens/props (validated 2026-07-03 against the build: `.ornie-app`, Layer-2 `--ornie-*` set, Card/Badge/Avatar props). If components or tokens are renamed, re-run that validation — the header rots silently otherwise.
- sb-reference and dist must move together: rebuild both when src changes, or `[REFERENCE_STALE?]` grades against the old design.
