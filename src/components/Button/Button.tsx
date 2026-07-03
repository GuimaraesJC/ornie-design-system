import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default 'primary' */
  variant?: ButtonVariant;
  /** Control height. @default 'md' */
  size?: ButtonSize;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Replace the label with a spinner and disable interaction. */
  loading?: boolean;
  /** Element rendered before the label, e.g. an icon. */
  iconStart?: ReactNode;
  /** Element rendered after the label, e.g. an icon. */
  iconEnd?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth,
    loading,
    iconStart,
    iconEnd,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
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
      {...rest}
    >
      {loading && <span className="ornie-btn__spinner" aria-hidden="true" />}
      {iconStart && <span className="ornie-btn__icon">{iconStart}</span>}
      <span className="ornie-btn__label">{children}</span>
      {iconEnd && <span className="ornie-btn__icon">{iconEnd}</span>}
    </button>
  );
});
