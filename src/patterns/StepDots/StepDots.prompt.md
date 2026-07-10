# StepDots

> Screens: D:onboarding, first-run mobile. Tier: patterns. Since 0.2.0.

Quiet onboarding progress: a row of small track dots, with the current step stretched into a short accent pill. It answers "where am I in this short flow?" and nothing else.

**Use when** a 2–7-step guided flow (onboarding, first-run, Burrow setup) wants a placement cue under its content.
**Don't use for** navigation — the dots are not buttons and never will be; moving between steps belongs to the flow's own Next/Back buttons. Also not for task progress (DayRing/ProgressRing), wizards with named steps (that's app layout with real headings), or paging long content.

## API notes

- `count` + `active` (zero-based). The active dot widens to an 18px pill in `--ornie-accent`; the width/background transition uses `--ornie-duration-gentle`, which the token layer collapses under reduced motion — the pill simply swaps position.
- `role="img"` with a computed `aria-label` ("Step 2 of 5") — one label, not `count` tab stops. `label` overrides it for i18n.
- It's an indicator, not an interactive widget: no `onSelect`, no focus, no hit targets. If a design asks for tappable dots, push back — short flows advance with buttons.

## Examples

```jsx
// Onboarding footer (D:onboarding)
<StepDots count={3} active={step} />

// The flow's buttons do the moving; StepDots only reflects it
<footer>
  <StepDots count={5} active={step} />
  <Button onClick={() => setStep(step + 1)}>Next</Button>
</footer>

// i18n label
<StepDots count={3} active={1} label="Passo 2 de 3" />
```

## Calm rules

- One gentle elongation per step change — nothing pulses, nothing bounces, no per-dot entrance.
- Inactive dots are plain `--ornie-track`: past and future steps look the same, no checkmarks, no "completed" scoring.
- Skipping is fine and invisible: the indicator never guilt-trips a jump to the end.
