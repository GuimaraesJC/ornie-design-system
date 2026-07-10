import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './DateGroupHeader.css';

export interface DateGroupHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The formatted label ("Friday, July 3", "Tomorrow · Saturday"). The DS
   * does not format dates — the app passes the string (rules in
   * DateGroupHeader.prompt.md). Caps come from CSS.
   */
  children: ReactNode;
  /** Quiet muted run after the kicker — usually a count. Never alarm-colored. */
  trailing?: ReactNode;
  /**
   * Sticks to the top of the scroll container on `--ornie-bg`, so rows
   * scroll under it. Adds its own small vertical padding for the pinned
   * state (the one exception to parents-own-spacing, documented).
   */
  sticky?: boolean;
}

/**
 * DateGroupHeader — the "FRIDAY, JULY 3" kicker that opens a date group:
 * 11px caps, `--ornie-accent-text`, bold, +1px tracking.
 * See DateGroupHeader.prompt.md. Screens: 2e Upcoming, 2h Logbook,
 * 1o notes list, 2l Journal, D:upcoming/logbook (COVERAGE_MATRIX).
 */
export const DateGroupHeader = forwardRef<HTMLDivElement, DateGroupHeaderProps>(function DateGroupHeader(
  { trailing, sticky, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('ornie-dategroupheader', sticky && 'ornie-dategroupheader--sticky', className)}
      {...rest}
    >
      <span className="ornie-dategroupheader__label">{children}</span>
      {trailing && <span className="ornie-dategroupheader__trailing">{trailing}</span>}
    </div>
  );
});
