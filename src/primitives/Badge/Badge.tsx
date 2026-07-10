import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { deprecate } from '../../lib/deprecate';
import './Badge.css';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Color role. Count badges are informational: they default to `neutral`,
   * `accent` is opt-in, and `danger` is not available with `count`
   * (it renders as neutral — counts never shout, D-01).
   * @default 'neutral'
   */
  variant?: BadgeVariant;
  /** @default 'md' */
  size?: BadgeSize;
  /** Show a leading status dot. */
  dot?: boolean;
  /**
   * Count mode: renders the number instead of `children` (tabular numerals,
   * round pill at one digit). `0` renders nothing — an empty badge is silence.
   */
  count?: number;
  /** Cap for `count` display; anything above renders as "`max`+". @default 99 */
  max?: number;
}

/**
 * Badge — static status or a quiet count (Chip is tappable, Badge is not).
 * See Badge.prompt.md. Screens: D:sidebar, 2n modules, dock inbox count.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', size = 'md', dot, count, max = 99, className, children, ...rest },
  ref,
) {
  const isCount = count !== undefined;
  let resolvedVariant = variant;
  if (isCount && variant === 'danger') {
    deprecate(
      'Badge.count.danger',
      'Badge count with variant="danger" is not supported — counts are informational and never alarm-colored (D-01); rendering as neutral. This fallback is removed in 0.3.0.',
    );
    resolvedVariant = 'neutral';
  }

  if (isCount && count === 0) return null;

  return (
    <span
      ref={ref}
      className={cx(
        'ornie-badge',
        `ornie-badge--${resolvedVariant}`,
        `ornie-badge--${size}`,
        isCount && 'ornie-badge--count',
        className,
      )}
      {...rest}
    >
      {dot && <span className="ornie-badge__dot" aria-hidden="true" />}
      {isCount ? (count! > max ? `${max}+` : String(count)) : children}
    </span>
  );
});
