import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Bubble content. */
  content: ReactNode;
  /** @default 'top' */
  placement?: TooltipPlacement;
  /** The trigger the tooltip describes (shown on hover/focus). */
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  return (
    <span
      className={cx('ornie-tooltip', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      aria-describedby={visible ? id : undefined}
    >
      {children}
      {visible && (
        <span
          id={id}
          role="tooltip"
          className={cx('ornie-tooltip__bubble', `ornie-tooltip__bubble--${placement}`)}
        >
          {content}
        </span>
      )}
    </span>
  );
}
