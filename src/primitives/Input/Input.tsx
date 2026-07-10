import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { deprecate } from '../../lib/deprecate';
import './Input.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the input. */
  label?: ReactNode;
  /** Helper text rendered below the input. */
  hint?: ReactNode;
  /** Error message; replaces the hint and switches the field to its error state. */
  error?: ReactNode;
  /** Control height: sm 32 / md 40 / lg 48 (px). @default 'md' */
  size?: InputSize;
  /**
   * Slot inside the field frame, leading edge — an `<Icon>` (search, lock…).
   * Decorative: hidden from assistive tech, never intercepts clicks.
   */
  leading?: ReactNode;
  /**
   * Slot inside the field frame, trailing edge — a clear `<IconButton>`, a Kbd
   * hint, a unit. Interactive children (buttons, links) receive clicks;
   * everything else lets clicks fall through to the input. Sized for one
   * compact control (~16–20px); wider content needs app-side padding.
   */
  trailing?: ReactNode;
  /** @deprecated Use `leading`. Removed in 0.3.0. */
  iconStart?: ReactNode;
  /** @deprecated Use `trailing`. Removed in 0.3.0. */
  iconEnd?: ReactNode;
}

/**
 * Input — single-line labelled text field on the shared field skin.
 * `inputMode`/`enterKeyHint`/`autoComplete` and all other native input
 * attributes pass through to the `<input>`; `ref` forwards to it too.
 * See Input.prompt.md. Screens: 2b capture, 1v settings, D:quick-capture,
 * Burrow passphrase.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    size = 'md',
    leading,
    trailing,
    iconStart,
    iconEnd,
    className,
    id,
    disabled,
    ...rest
  },
  ref,
) {
  if (iconStart !== undefined) {
    deprecate('Input.iconStart', 'Input.iconStart is deprecated, use leading; removed in 0.3.0');
  }
  if (iconEnd !== undefined) {
    deprecate('Input.iconEnd', 'Input.iconEnd is deprecated, use trailing; removed in 0.3.0');
  }
  const leadingSlot = leading ?? iconStart;
  const trailingSlot = trailing ?? iconEnd;

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
        className,
      )}
    >
      {label && (
        <label className="ornie-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div
        className={cx(
          'ornie-field__control',
          'ornie-input-shell',
          `ornie-input-shell--${size}`,
          !!leadingSlot && 'ornie-input-shell--leading',
          !!trailingSlot && 'ornie-input-shell--trailing',
        )}
      >
        {leadingSlot && (
          <span className="ornie-input-shell__leading" aria-hidden="true">
            {leadingSlot}
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
        {trailingSlot && <span className="ornie-input-shell__trailing">{trailingSlot}</span>}
      </div>
      {(error || hint) && (
        <div id={descId} className={cx('ornie-field__desc', !!error && 'ornie-field__desc--error')}>
          {error ?? hint}
        </div>
      )}
    </div>
  );
});
