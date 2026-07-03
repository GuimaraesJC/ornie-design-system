import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'role'> {
  /** Label rendered next to the switch. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Track size. @default 'md' */
  size?: SwitchSize;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, size = 'md', className, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={cx(
        'ornie-switch',
        `ornie-switch--${size}`,
        disabled && 'ornie-switch--disabled',
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className="ornie-switch__input"
        disabled={disabled}
        {...rest}
      />
      <span className="ornie-switch__track" aria-hidden="true">
        <span className="ornie-switch__thumb" />
      </span>
      {(label || description) && (
        <span className="ornie-switch__text">
          {label && <span className="ornie-switch__label">{label}</span>}
          {description && <span className="ornie-switch__description">{description}</span>}
        </span>
      )}
    </label>
  );
});
