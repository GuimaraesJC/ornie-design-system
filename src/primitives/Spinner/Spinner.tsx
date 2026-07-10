import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './Spinner.css';

export type SpinnerSize = 14 | 18 | 24;

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Ring diameter in px: 14 (inline text) / 18 (controls) / 24 (panels). @default 18 */
  size?: SpinnerSize;
  /** Accessible name, announced via `role="status"`. @default 'Loading' */
  label?: string;
}

/**
 * Spinner — the quiet indeterminate ring. The ONE sanctioned continuous
 * motion in Ornie: it spins via `--ornie-duration-spin` and pauses (never
 * speeds up) under reduced motion via `--ornie-spin-state`.
 *
 * No full-page spinner exists in Ornie (D-23: local reads are instant) —
 * use only for Button loading and sync / cloud-Ask pending.
 * See Spinner.prompt.md. Screens: TopBar sync (cross-cutting), Button.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 18, label = 'Loading', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx('ornie-spinner', `ornie-spinner--${size}`, className)}
      {...rest}
    />
  );
});
