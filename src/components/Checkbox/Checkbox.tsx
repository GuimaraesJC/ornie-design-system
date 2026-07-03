import { forwardRef, useEffect, useRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label rendered next to the box. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Mixed state (e.g. a "select all" over a partial selection). */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, className, disabled, ...rest },
  ref,
) {
  const inner = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cx('ornie-check', disabled && 'ornie-check--disabled', className)}>
      <input
        ref={(el) => {
          inner.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        type="checkbox"
        className="ornie-check__input"
        disabled={disabled}
        {...rest}
      />
      <span className="ornie-check__box" aria-hidden="true">
        <svg className="ornie-check__check" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.5L4.8 8.8L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg className="ornie-check__dash" viewBox="0 0 12 12" fill="none">
          <path d="M3 6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      {(label || description) && (
        <span className="ornie-check__text">
          {label && <span className="ornie-check__label">{label}</span>}
          {description && <span className="ornie-check__description">{description}</span>}
        </span>
      )}
    </label>
  );
});
