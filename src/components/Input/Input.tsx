import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the input. */
  label?: ReactNode;
  /** Helper text rendered below the input. */
  hint?: ReactNode;
  /** Error message; replaces the hint and switches the field to its error state. */
  error?: ReactNode;
  /** Control height. @default 'md' */
  size?: InputSize;
  /** Decorative icon inside the input, leading edge. */
  iconStart?: ReactNode;
  /** Decorative icon inside the input, trailing edge. */
  iconEnd?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, size = 'md', iconStart, iconEnd, className, id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = hint || error ? `${inputId}-desc` : undefined;
  return (
    <div
      className={cx(
        'ornie-field',
        `ornie-field--${size}`,
        disabled && 'ornie-field--disabled',
        !!error && 'ornie-field--error',
        !!iconStart && 'ornie-field--icon-start',
        !!iconEnd && 'ornie-field--icon-end',
        className,
      )}
    >
      {label && (
        <label className="ornie-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="ornie-field__control">
        {iconStart && (
          <span className="ornie-field__icon ornie-field__icon--start" aria-hidden="true">
            {iconStart}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className="ornie-input"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={descId}
          {...rest}
        />
        {iconEnd && (
          <span className="ornie-field__icon ornie-field__icon--end" aria-hidden="true">
            {iconEnd}
          </span>
        )}
      </div>
      {(error || hint) && (
        <div id={descId} className={cx('ornie-field__desc', !!error && 'ornie-field__desc--error')}>
          {error ?? hint}
        </div>
      )}
    </div>
  );
});
