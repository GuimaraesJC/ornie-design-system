import { createContext, forwardRef, useContext, useId, useMemo } from 'react';
import type { ChangeEvent, FieldsetHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './Radio.css';

/* ------------------------------------------------------------------ */
/* Group context                                                       */
/* ------------------------------------------------------------------ */

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/* ------------------------------------------------------------------ */
/* Radio                                                               */
/* ------------------------------------------------------------------ */

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label rendered next to the circle. Bare circles (no label) need `aria-label`. */
  label?: ReactNode;
  /** Secondary line under the label (13px, muted). Wired to `aria-describedby`. */
  description?: ReactNode;
}

/**
 * Radio — one exclusive option. See Radio.prompt.md.
 * Screens: D:settings, theme picker (COVERAGE_MATRIX).
 *
 * Inside a `<RadioGroup>`, `name`, `checked` and `onChange` are read from the
 * group; the radio's own props win when set. Standalone usage is unchanged.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    description,
    className,
    disabled,
    name,
    value,
    checked,
    onChange,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const descId = description ? `${autoId}-desc` : undefined;

  const groupName = name ?? group?.name;
  const groupChecked =
    checked ?? (group && value !== undefined ? group.value === String(value) : undefined);
  const groupHandler = group?.onChange;
  const groupOnChange =
    onChange ??
    (groupHandler && value !== undefined
      ? (event: ChangeEvent<HTMLInputElement>) => groupHandler(String(value), event)
      : undefined);

  return (
    <label className={cx('ornie-radio', disabled && 'ornie-radio--disabled', className)}>
      <input
        ref={ref}
        type="radio"
        className="ornie-radio__input"
        disabled={disabled}
        name={groupName}
        value={value}
        checked={groupChecked}
        onChange={groupOnChange}
        aria-describedby={cx(ariaDescribedBy, descId) || undefined}
        {...rest}
      />
      <span className="ornie-radio__circle" aria-hidden="true" />
      {(label || description) && (
        <span className="ornie-radio__text">
          {label && <span className="ornie-radio__label">{label}</span>}
          {description && (
            <span id={descId} className="ornie-radio__description">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

/* ------------------------------------------------------------------ */
/* RadioGroup                                                          */
/* ------------------------------------------------------------------ */

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Shared input name wired to all child Radios. Auto-generated when omitted. */
  name?: string;
  /** Selected radio's `value` (controlled). Pair with `onChange`. */
  value?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Option flow. Vertical is the default settings-list layout. @default 'vertical' */
  orientation?: RadioGroupOrientation;
  /** Group label, rendered as the fieldset's `<legend>`. */
  label?: ReactNode;
  /** Muted line under the label. Wired to `aria-describedby` on the group. */
  description?: ReactNode;
}

/**
 * RadioGroup — a labelled fieldset of exclusive options. See Radio.prompt.md.
 * Screens: D:settings, theme picker (COVERAGE_MATRIX).
 *
 * Real `<fieldset>`/`<legend>` with reset styles plus `role="radiogroup"` +
 * `aria-labelledby`/`aria-describedby`. Arrow keys move selection between the
 * radios (native same-name behaviour).
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  {
    name,
    value,
    onChange,
    orientation = 'vertical',
    label,
    description,
    className,
    children,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const groupName = name ?? `${autoId}-radios`;
  const labelId = label ? `${autoId}-label` : undefined;
  const descId = description ? `${autoId}-desc` : undefined;

  const context = useMemo<RadioGroupContextValue>(
    () => ({ name: groupName, value, onChange }),
    [groupName, value, onChange],
  );

  return (
    <fieldset
      ref={ref}
      role="radiogroup"
      className={cx(
        'ornie-radiogroup',
        orientation === 'horizontal' && 'ornie-radiogroup--horizontal',
        className,
      )}
      aria-labelledby={cx(ariaLabelledBy, labelId) || undefined}
      aria-describedby={cx(ariaDescribedBy, descId) || undefined}
      {...rest}
    >
      {label && (
        <legend id={labelId} className="ornie-radiogroup__label">
          {label}
        </legend>
      )}
      {description && (
        <span id={descId} className="ornie-radiogroup__description">
          {description}
        </span>
      )}
      <div className="ornie-radiogroup__options">
        <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
      </div>
    </fieldset>
  );
});
