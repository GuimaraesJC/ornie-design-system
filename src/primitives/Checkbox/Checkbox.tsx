import { forwardRef, useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './Checkbox.css';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label rendered next to the box. Bare boxes (no label) need `aria-label`. */
  label?: ReactNode;
  /** Secondary line under the label (13px, muted). Wired to `aria-describedby`. */
  description?: ReactNode;
  /**
   * Mixed state (e.g. a "select all" over a partial selection). Set on the
   * native input, so assistive tech reads `aria-checked="mixed"` for free.
   * Visual is the dash. Purely presentational — `checked` stays the source
   * of truth for form value.
   */
  indeterminate?: boolean;
}

/**
 * Checkbox — settings options and checklist fields. See Checkbox.prompt.md.
 * Screens: D:settings, 1l checklist fields (COVERAGE_MATRIX).
 *
 * NOT for task completion — that is TaskCheck (Phase 2), the 23px circle.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    description,
    indeterminate = false,
    className,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const inner = useRef<HTMLInputElement | null>(null);
  const autoId = useId();
  const descId = description ? `${autoId}-desc` : undefined;

  // Re-applied every render: a user click clears the native flag, so a
  // controlled parent that keeps `indeterminate` needs it restored even when
  // the prop itself did not change.
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  });

  return (
    <label className={cx('ornie-check', disabled && 'ornie-check--disabled', className)}>
      <input
        ref={(el) => {
          inner.current = el;
          if (el) el.indeterminate = indeterminate;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        type="checkbox"
        className="ornie-check__input"
        disabled={disabled}
        aria-describedby={cx(ariaDescribedBy, descId) || undefined}
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
          {description && (
            <span id={descId} className="ornie-check__description">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});
