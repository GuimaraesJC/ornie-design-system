import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './StepDots.css';

export interface StepDotsProps extends HTMLAttributes<HTMLDivElement> {
  /** Total number of steps. */
  count: number;
  /** Zero-based index of the current step; that dot elongates into a pill. */
  active: number;
  /** Accessible name. @default 'Step {active + 1} of {count}' */
  label?: string;
}

/**
 * StepDots — quiet onboarding progress: n dots, the active one stretched
 * into an accent pill. An indicator, not a nav — the dots are not buttons;
 * moving between steps belongs to the flow's own controls.
 * See StepDots.prompt.md.
 * Screens: D:onboarding, first-run mobile (COVERAGE_MATRIX).
 */
export const StepDots = forwardRef<HTMLDivElement, StepDotsProps>(function StepDots(
  { count, active, label, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label ?? `Step ${active + 1} of ${count}`}
      className={cx('ornie-stepdots', className)}
      {...rest}
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={cx('ornie-stepdots__dot', i === active && 'ornie-stepdots__dot--active')} />
      ))}
    </div>
  );
});
