import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './Switch.css';

export type SwitchSize = 'sm' | 'md';
export type SwitchLabelPlacement = 'start' | 'end';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'role'> {
  /** Label rendered beside the track. Bare switches (no label) need `aria-label`. */
  label?: ReactNode;
  /** Secondary line under the label (13px, muted). Wired to `aria-describedby`. */
  description?: ReactNode;
  /**
   * Where the text block sits relative to the track. `'start'` (default) puts
   * the text first and the control on the right — the settings-row layout.
   * `'end'` puts the control first.
   * @default 'start'
   */
  labelPlacement?: SwitchLabelPlacement;
  /** Track size. @default 'md' */
  size?: SwitchSize;
}

/**
 * Switch — an instant-effect on/off toggle. See Switch.prompt.md.
 * Screens: 1v settings, D:settings, Burrow auto-seal, 2n module rows
 * (COVERAGE_MATRIX).
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    description,
    labelPlacement = 'start',
    size = 'md',
    className,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const descId = description ? `${autoId}-desc` : undefined;

  const track = (
    <span className="ornie-switch__track" aria-hidden="true">
      <span className="ornie-switch__thumb" />
    </span>
  );
  const text = (label || description) && (
    <span className="ornie-switch__text">
      {label && <span className="ornie-switch__label">{label}</span>}
      {description && (
        <span id={descId} className="ornie-switch__description">
          {description}
        </span>
      )}
    </span>
  );

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
        aria-describedby={cx(ariaDescribedBy, descId) || undefined}
        {...rest}
      />
      {labelPlacement === 'start' ? (
        <>
          {text}
          {track}
        </>
      ) : (
        <>
          {track}
          {text}
        </>
      )}
    </label>
  );
});
