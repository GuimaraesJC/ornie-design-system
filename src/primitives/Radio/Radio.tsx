import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label rendered next to the circle. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cx('ornie-radio', disabled && 'ornie-radio--disabled', className)}>
      <input ref={ref} type="radio" className="ornie-radio__input" disabled={disabled} {...rest} />
      <span className="ornie-radio__circle" aria-hidden="true" />
      {(label || description) && (
        <span className="ornie-radio__text">
          {label && <span className="ornie-radio__label">{label}</span>}
          {description && <span className="ornie-radio__description">{description}</span>}
        </span>
      )}
    </label>
  );
});
