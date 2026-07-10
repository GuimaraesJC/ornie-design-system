import { Children, cloneElement, forwardRef, isValidElement, useId } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './FormField.css';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Field label, 13px semibold. Always visible — never placeholder-only. */
  label: ReactNode;
  /** Helper line under the control (13px, muted). */
  help?: ReactNode;
  /**
   * Error message; replaces `help` when present. Plain words, no exclamation
   * marks ("Passphrase needs at least 8 characters"). Sets `aria-invalid` on
   * a single control child and wires `aria-describedby`.
   */
  error?: ReactNode;
  /**
   * Renders a quiet "required" hint after the label (plain word, muted — no
   * asterisk). Purely visual: set `required` on the control itself too.
   */
  required?: boolean;
  /**
   * Force group semantics (`role="group"` + `aria-labelledby`) instead of
   * `<label htmlFor>`. Automatic when `children` is more than one element
   * (checkbox groups); set it explicitly when the single child is a composite
   * control that is not labelable (SegmentedControl, custom widgets).
   */
  group?: boolean;
  /**
   * The control(s). Single-child contract: when `children` is exactly one
   * element (and `group` is not set), it is cloned to inject `id`,
   * `aria-describedby` and `aria-invalid` — an existing `id` on the child is
   * kept and used for `htmlFor`. Multiple children get group semantics on the
   * FormField root instead, with no injection.
   */
  children: ReactNode;
}

/**
 * FormField — label + any control + help/error line, with the ARIA wiring
 * done for you. For composing controls that don't carry their own label
 * (Checkbox groups, SegmentedControl, custom widgets). A single Input,
 * Select or TextArea should use its own `label`/`hint`/`error` props instead.
 * See FormField.prompt.md. Screens: 1l task detail fields, 1v settings,
 * D:settings, Burrow setup.
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { label, help, error, required = false, group, className, children, ...rest },
  ref,
) {
  const autoId = useId();
  const items = Children.toArray(children);
  const singleChild =
    !group && items.length === 1 && isValidElement(items[0])
      ? (items[0] as ReactElement<Record<string, unknown>>)
      : null;
  const grouped = singleChild === null;

  const labelId = `${autoId}-label`;
  const descId = help || error ? `${autoId}-desc` : undefined;
  const controlId = singleChild ? ((singleChild.props.id as string | undefined) ?? `${autoId}-control`) : undefined;

  const control = singleChild
    ? cloneElement(singleChild, {
        id: controlId,
        'aria-describedby':
          cx(singleChild.props['aria-describedby'] as string | undefined, descId) || undefined,
        'aria-invalid': error ? true : (singleChild.props['aria-invalid'] as boolean | undefined),
      })
    : children;

  const labelBody = (
    <>
      {label}
      {required && <span className="ornie-formfield__required">required</span>}
    </>
  );

  return (
    <div
      ref={ref}
      className={cx('ornie-formfield', !!error && 'ornie-formfield--error', className)}
      role={grouped ? 'group' : undefined}
      aria-labelledby={grouped ? labelId : undefined}
      aria-describedby={grouped ? descId : undefined}
      {...rest}
    >
      {grouped ? (
        <span id={labelId} className="ornie-formfield__label">
          {labelBody}
        </span>
      ) : (
        <label className="ornie-formfield__label" htmlFor={controlId}>
          {labelBody}
        </label>
      )}
      <div className="ornie-formfield__control">{control}</div>
      {(error || help) && (
        <div
          id={descId}
          className={cx('ornie-formfield__desc', !!error && 'ornie-formfield__desc--error')}
        >
          {error ?? help}
        </div>
      )}
    </div>
  );
});
