import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './TaskCheck.css';

export type TaskCheckSize = 'sm' | 'md';

export interface TaskCheckProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'aria-label'> {
  /** Completion state (controlled). */
  checked: boolean;
  /** Called with the next state on tap/Space/Enter. */
  onChange: (next: boolean) => void;
  /** Names the task for assistive tech — usually the row title. Required. */
  'aria-label': string;
  /** md 23px (phone) / sm 20px (desktop density). @default 'md' */
  size?: TaskCheckSize;
}

/**
 * TaskCheck — the completion circle (23px ø, 2px stroke). A button with
 * checkbox semantics; the check draws in over --ornie-duration-gentle and is
 * instant under reduced motion. See TaskCheck.prompt.md.
 * Screens: every task row (2a/2e–2h, 1l, 1s, D:everywhere) (COVERAGE_MATRIX).
 */
export const TaskCheck = forwardRef<HTMLButtonElement, TaskCheckProps>(function TaskCheck(
  { checked, onChange, size = 'md', className, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cx(
        'ornie-taskcheck',
        `ornie-taskcheck--${size}`,
        checked && 'ornie-taskcheck--checked',
        className,
      )}
      {...rest}
    >
      <svg className="ornie-taskcheck__glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polyline className="ornie-taskcheck__check" points="20 6 9 17 4 12" />
      </svg>
    </button>
  );
});
