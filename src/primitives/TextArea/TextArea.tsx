import { forwardRef, useId } from 'react';
import type { ReactNode, TextareaHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './TextArea.css';

export type TextAreaSize = 'sm' | 'md' | 'lg';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Field label rendered above the textarea. */
  label?: ReactNode;
  /** Helper text rendered below the textarea. */
  hint?: ReactNode;
  /** Error message; replaces the hint and switches the field to its error state. */
  error?: ReactNode;
  /**
   * Padding/type scale matching Input: sm 13px text / md 15px / lg 16px.
   * Height is content-driven — use the native `rows` prop. @default 'md'
   */
  size?: TextAreaSize;
}

/**
 * TextArea — multi-line sibling of Input on the same field skin (a separate
 * component, not a `multiline` prop). `rows` and all native textarea
 * attributes pass through; `ref` forwards to the `<textarea>`.
 * See TextArea.prompt.md. Screens: 1l notes field, 1p/1q notes, journal entry.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, size = 'md', className, id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const descId = hint || error ? `${textareaId}-desc` : undefined;
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
        <label className="ornie-field__label" htmlFor={textareaId}>
          {label}
        </label>
      )}
      <div className="ornie-field__control">
        <textarea
          ref={ref}
          id={textareaId}
          className={cx('ornie-textarea', `ornie-textarea--${size}`, !!error && 'ornie-textarea--error')}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={descId}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <div id={descId} className={cx('ornie-field__desc', !!error && 'ornie-field__desc--error')}>
          {error ?? hint}
        </div>
      )}
    </div>
  );
});
