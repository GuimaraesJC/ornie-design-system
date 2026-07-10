import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { deprecate } from '../../lib/deprecate';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. One `primary` per view; `danger` only for destructive confirmation. @default 'primary' */
  variant?: ButtonVariant;
  /** sm 32 / md 40 / lg 48 (px height). lg is the mobile sheet primary. @default 'md' */
  size?: ButtonSize;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Overlay a spinner, lock the width, and disable interaction (`aria-busy`). */
  loading?: boolean;
  /** Accessible name while `loading` hides the label. @default 'Loading' */
  loadingLabel?: string;
  /** Slot rendered before the label, e.g. an `<Icon>`. Decorative — the label names the action. */
  leading?: ReactNode;
  /** Slot rendered after the label, e.g. an `<Icon>`. Decorative — the label names the action. */
  trailing?: ReactNode;
  /** @deprecated Use `leading`; removed in 0.3.0. */
  iconStart?: ReactNode;
  /** @deprecated Use `trailing`; removed in 0.3.0. */
  iconEnd?: ReactNode;
}

/**
 * Button — the labelled action. See Button.prompt.md.
 * Screens: everywhere (2b, 1l, 1n, D:capture, D:settings).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth,
    loading,
    loadingLabel = 'Loading',
    leading,
    trailing,
    iconStart,
    iconEnd,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  if (iconStart !== undefined) {
    deprecate('Button.iconStart', 'Button.iconStart is deprecated, use leading; removed in 0.3.0');
  }
  if (iconEnd !== undefined) {
    deprecate('Button.iconEnd', 'Button.iconEnd is deprecated, use trailing; removed in 0.3.0');
  }
  const lead = leading ?? iconStart;
  const trail = trailing ?? iconEnd;

  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        'ornie-btn',
        `ornie-btn--${variant}`,
        `ornie-btn--${size}`,
        fullWidth && 'ornie-btn--full',
        loading && 'ornie-btn--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="ornie-btn__spinner" aria-hidden="true" />}
      {loading && <span className="ornie-btn__loading-label">{loadingLabel}</span>}
      {lead && (
        <span className="ornie-btn__leading" aria-hidden="true">
          {lead}
        </span>
      )}
      <span className="ornie-btn__label">{children}</span>
      {trail && (
        <span className="ornie-btn__trailing" aria-hidden="true">
          {trail}
        </span>
      )}
    </button>
  );
});
