import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './ProgressRing.css';

export type ProgressRingSize = 16 | 24 | 46;

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress, 0–1. Values outside the range are clamped. */
  value: number;
  /** Exact box in px: 16 (project mini-ring) / 24 / 46 (DayRing base). @default 24 */
  size?: ProgressRingSize;
  /** Any CSS color for the unfilled track. @default 'var(--ornie-track)' */
  trackColor?: string;
  /** Accessible name for the progressbar. @default 'Progress' */
  label?: string;
  /** Center slot, rendered inside the inner disc. Only sensible at size 46. */
  children?: ReactNode;
}

/**
 * ProgressRing — determinate conic ring: accent fill over a quiet track,
 * inner surface disc making it a ring. Base of DayRing (Phase 2); the 16px
 * size is the project mini-ring. Never red, never streaks (R-5).
 * See ProgressRing.prompt.md. Screens: D:sidebar projects, 1r, 2c triage
 * footer, 2a header (as DayRing).
 */
export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(function ProgressRing(
  { value, size = 24, trackColor, label = 'Progress', className, style, children, ...rest },
  ref,
) {
  const clamped = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
  return (
    <div
      ref={ref}
      className={cx('ornie-progress-ring', `ornie-progress-ring--${size}`, className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={clamped}
      aria-label={label}
      {...rest}
      style={
        {
          '--ornie-progress-ring-value': clamped,
          ...(trackColor ? { '--ornie-progress-ring-track': trackColor } : null),
          ...style,
        } as CSSProperties
      }
    >
      <span className="ornie-progress-ring__disc">{children}</span>
    </div>
  );
});
