import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './WeekDots.css';

export interface WeekDotsProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Seven booleans, oldest day first. `true` fills the dot in --ornie-done;
   * `false` stays a quiet --ornie-track dot (a miss is just quiet, R-5).
   */
  values: boolean[];
  /**
   * Index of today (0–6). Today's dot gets a thin --ornie-done ring;
   * dots after it render as dashed outlines (the future, not a miss).
   */
  todayIndex?: number;
  /** Accessible name. @default '{done} of {total} days this week' */
  label?: string;
}

/**
 * WeekDots — seven quiet dots of habit history. Done fills, misses stay
 * quiet, today is ringed, the future is dashed. The API cannot express a
 * streak count (R-5): habits are "resumed", never "broken".
 * See WeekDots.prompt.md.
 * Screens: 2a habit card, 2j habit rows, D:Habits, 1n summary (COVERAGE_MATRIX).
 */
export const WeekDots = forwardRef<HTMLSpanElement, WeekDotsProps>(function WeekDots(
  { values, todayIndex, label, className, ...rest },
  ref,
) {
  const done = values.filter(Boolean).length;
  return (
    <span
      ref={ref}
      role="img"
      aria-label={label ?? `${done} of ${values.length} days this week`}
      className={cx('ornie-weekdots', className)}
      {...rest}
    >
      {values.map((filled, i) => {
        const future = todayIndex !== undefined && i > todayIndex;
        return (
          <span
            key={i}
            className={cx(
              'ornie-weekdots__dot',
              filled && !future && 'ornie-weekdots__dot--done',
              todayIndex === i && 'ornie-weekdots__dot--today',
              future && 'ornie-weekdots__dot--future',
            )}
          />
        );
      })}
    </span>
  );
});
