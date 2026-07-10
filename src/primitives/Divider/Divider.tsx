import { forwardRef } from 'react';
import type { HTMLAttributes, Ref } from 'react';
import { cx } from '../../lib/cx';
import './Divider.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerInset = 'none' | 'md' | 'lg';

export interface DividerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** @default 'horizontal' */
  orientation?: DividerOrientation;
  /**
   * Start-edge inset so the hairline aligns with row content:
   * `none` 0 · `md` 16px (list-row horizontal padding) · `lg` 24px
   * (card / sheet padding). Horizontal insets from the left, vertical from
   * the top. @default 'none'
   */
  inset?: DividerInset;
}

/**
 * Divider — the 1px hairline rule (`--ornie-border-subtle`).
 * Horizontal renders a real `<hr>`; vertical renders
 * `<div role="separator" aria-orientation="vertical">`.
 * See Divider.prompt.md. Screens: 1l task detail, list rows everywhere.
 */
export const Divider = forwardRef<HTMLElement, DividerProps>(function Divider(
  { orientation = 'horizontal', inset = 'none', className, ...rest },
  ref,
) {
  const classes = cx(
    'ornie-divider',
    `ornie-divider--${orientation}`,
    inset !== 'none' && `ornie-divider--inset-${inset}`,
    className,
  );
  if (orientation === 'vertical') {
    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        className={classes}
        {...rest}
      />
    );
  }
  return <hr ref={ref as Ref<HTMLHRElement>} className={classes} {...rest} />;
});
