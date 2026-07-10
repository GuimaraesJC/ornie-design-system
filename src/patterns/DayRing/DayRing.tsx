import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { ProgressRing } from '../../primitives/ProgressRing/ProgressRing';
import './DayRing.css';

export interface DayRingProps extends HTMLAttributes<HTMLDivElement> {
  /** Tasks completed today. */
  done: number;
  /** Tasks planned today. 0 = a resting day (otter-dot center, empty ring). */
  planned: number;
  /** Accessible name. @default '{done} of {planned} done today' */
  label?: string;
}

/**
 * DayRing — the header ritual object: a 46px ProgressRing with the remaining
 * count (or a quiet otter-dot on empty days) in the center. Never turns red,
 * never counts streaks — a missed day just starts at 0, "resumed" (R-5).
 * See DayRing.prompt.md.
 * Screens: 2a/2d headers, D:top bar, 1n summary (COVERAGE_MATRIX).
 */
export const DayRing = forwardRef<HTMLDivElement, DayRingProps>(function DayRing(
  { done, planned, label, className, ...rest },
  ref,
) {
  const value = planned > 0 ? Math.min(done / planned, 1) : 0;
  const remaining = Math.max(planned - done, 0);
  return (
    <div ref={ref} className={cx('ornie-dayring', className)} {...rest}>
      <ProgressRing size={46} value={value} label={label ?? `${done} of ${planned} done today`}>
        {planned > 0 ? (
          <span className="ornie-dayring__count">{remaining}</span>
        ) : (
          <span className="ornie-dayring__rest" aria-hidden="true" />
        )}
      </ProgressRing>
    </div>
  );
});
