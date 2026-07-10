import { forwardRef, useId } from 'react';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Field label rendered above the select. */
  label?: ReactNode;
  /** Helper text rendered below the select. */
  hint?: ReactNode;
  /** Error message; replaces the hint and switches the field to its error state. */
  error?: ReactNode;
  /** Control height. @default 'md' */
  size?: SelectSize;
  /** Options to render; alternatively pass <option> elements as children. */
  options?: SelectOption[];
  /** Placeholder shown while nothing is selected (uncontrolled usage). */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hint,
    error,
    size = 'md',
    options,
    placeholder,
    className,
    id,
    disabled,
    children,
    defaultValue,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const descId = hint || error ? `${selectId}-desc` : undefined;
  const resolvedDefault =
    defaultValue === undefined && rest.value === undefined && placeholder ? '' : defaultValue;
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
        <label className="ornie-field__label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className="ornie-field__control">
        <select
          ref={ref}
          id={selectId}
          className="ornie-select"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={descId}
          defaultValue={resolvedDefault}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
        <span className="ornie-field__chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {(error || hint) && (
        <div id={descId} className={cx('ornie-field__desc', !!error && 'ornie-field__desc--error')}>
          {error ?? hint}
        </div>
      )}
    </div>
  );
});
