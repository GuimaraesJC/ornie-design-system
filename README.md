# Ornie Design System — @ornie/react

Ornie is a calm, natural React design system on the **Riverbed** theme — platypus
habitat: warm taupe neutrals (earth), a muted river-teal accent (water), fur brown as
the identity thread, Manrope type, soft radii. Status colors are deliberately muted;
nothing on screen shouts.

## About Ornie

Ornie (from *Ornithorhynchus*, the platypus) is a personal life-OS in the making: tasks,
projects, notes (Markdown), contacts & relationships, inbox, Notion-style pages, habit
tracking, journaling, and dashboards — one place for everything. Its defining principle
is **extensibility**: rather than shipping a module for every tool, Ornie lets users
build their own modules, components, and integrations so their world stays inside the app.

The target audience is **A(u)DHD users**, which drives the design system's rules:

- Clean, low-stimulation surfaces; muted palette, low elevation, generous whitespace.
- No alarm colors — lateness is never red ("resurfaced", not "overdue"); no streaks,
  badges-of-shame, or confetti. The APIs deliberately cannot express them.
- `prefers-reduced-motion` collapses all motion in the token layer — components never
  write that media query themselves.
- Clear affordances: actions are the one teal element in a field of earth tones.
- WCAG AA contrast on every token pair in both themes, CI-audited.

## Usage

```tsx
import { PageHeader, DayRing, ListSection, TaskRow, MetaLine, ProjectDot } from '@ornie/react';
import '@ornie/react/styles.css';

export function Today() {
  return (
    <div className="ornie-app">
      <PageHeader variant="greeting" kicker="THURSDAY, JULY 10" trailing={<DayRing done={2} planned={5} />}>
        Good morning, Jean
      </PageHeader>
      <ListSection label="Today" surface="card">
        <TaskRow
          title="Email design feedback to Sam"
          onToggle={complete}
          meta={<MetaLine><span>9:00</span><ProjectDot color="moss" label="Garden project" /></MetaLine>}
        />
      </ListSection>
    </div>
  );
}
```

`.ornie-app` on the page root applies the Ornie page background, ink color, and type
defaults. Dark mode: add `data-ornie-theme="dark"` to any subtree — that attribute is
the whole mechanism; every component re-themes through the tokens.

## What's stable (for external builders)

- Semver. Component props (`.d.ts`) and **semantic token names** are the public
  contract — additive minors; deprecations warn one minor before removal.
- Raw palette scales (`--ornie-river-*`, `--ornie-sand-*`, …) are Layer 1 internals —
  present but not contract. Build on semantic tokens (`--ornie-surface`,
  `--ornie-accent`, `--ornie-hover`, …) and your UI survives every future theme (user
  themes are token-overlay packages, WCAG-validated).
- `ornie-*` class names are internal BEM vocabulary — never target them; use props
  and tokens.
- Native surfaces (widgets, watch faces) consume **tokens only**: `tokens/Tokens.swift`
  and `tokens/Tokens.kt` are generated from the same `tokens.json`. There are no
  native components.

## Calm rules (please keep them)

One primary button per view · no red for lateness · counts inform, never alarm ·
motion only in response to the user, via the motion tokens · notifications batch,
never drip · copy names what *is* ("Inbox is clear"), no exclamation marks.

## Architecture

- **Tokens** — `tokens.json` is the single source of truth. `pnpm tokens` generates
  `src/styles/tokens.css` (Layer 1 primitives + Layer 2 semantic roles, light and dark
  blocks) plus `Tokens.swift`/`Tokens.kt`. Components consume only Layer 2; dark mode
  is a token override under `[data-ornie-theme='dark']` with zero dark-specific
  component CSS (CI-enforced).
- **Tiers** — `src/foundations` (living token reference cards) · `src/primitives`
  (one job, one control) · `src/patterns` (small compositions) · `src/shells`
  (app chrome). Package exports stay flat: `OrnieReact.Button`, not
  `OrnieReact.primitives.Button`.
- **Per component** (all required): `<Name>.tsx` · `<Name>.css` (BEM, semantic tokens
  only) · `<Name>.stories.tsx` · `<Name>.prompt.md` (what it's for, when not to use
  it, composition examples, calm rules) · `<Name>.html` (variant grid rendering every
  variant × state, light and dark side by side — the axe target).
- **Styling** — vanilla CSS, one BEM block per component, bundled into
  `dist/styles.css`. No Tailwind, no CSS-in-JS.
- **Fonts** — Manrope variable (SIL OFL), vendored. **Icons** — 46 glyphs curated
  from Lucide (ISC) at build time, stroke 1.9, plain nouns; no runtime dependency.

## Development

Uses pnpm and nvm (node version pinned in `.nvmrc`).

```sh
nvm use && pnpm install
pnpm storybook        # component workbench at :6006
pnpm build            # dist/ — JS (esm+cjs), d.ts, styles.css, fonts, grid bundle
pnpm typecheck
pnpm tokens           # regenerate tokens.css + Tokens.swift + Tokens.kt from tokens.json
pnpm icons            # regenerate the icon set from the curation map
pnpm audit:all        # audit:tokens (no hex/raw-scale/theme-selector) +
                      # audit:contrast (WCAG AA, both themes) +
                      # audit:a11y (axe over every variant grid)
```

CI runs typecheck, tokens-in-sync, build, and all three audits on every push.

## Components (0.2.0)

**Foundations** — ColorPalette · TypeScale · SpacingScale · RadiusScale · Elevation ·
DarkMode · Icons · Motion

**Primitives** — Button · IconButton · Input · TextArea · Select · Checkbox · Radio ·
RadioGroup · Switch · Badge · Avatar · Card · Modal · Tooltip · Tabs · Icon (+46 named
glyphs) · Kbd · Chip · Spinner · ProgressRing · Divider · Link

**Patterns** — TaskCheck · TaskRow · MetaLine · ProjectDot · DayRing · ListSection ·
ListRow · DateGroupHeader · FormField · SearchField · SegmentedControl · ChipGroup ·
EmptyState · Toast (+ ToastProvider/ToastHost/useToast) · Prose · WikiLink · WeekDots ·
SealBadge · RedactedBars · StepDots

**Shells** — Sheet · Dock · SidebarNav (+ SidebarGroup/SidebarItem) · TopBar ·
PanelDrawer · CommandOverlay · PageHeader · TriageCard

Each component's `.prompt.md` documents when to use it, when not to, and its calm
rules — start there.
