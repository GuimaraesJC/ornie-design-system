import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color role. @default 'neutral' */
  variant?: BadgeVariant;
  /** @default 'md' */
  size?: BadgeSize;
  /** Show a leading status dot. */
  dot?: boolean;
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  dot,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx('ornie-badge', `ornie-badge--${variant}`, `ornie-badge--${size}`, className)}
      {...rest}
    >
      {dot && <span className="ornie-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
