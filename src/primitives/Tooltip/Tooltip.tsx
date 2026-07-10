import { forwardRef, useId, useState } from 'react';
import type { FocusEvent, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Kbd } from '../Kbd/Kbd';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Bubble content. */
  content: ReactNode;
  /** @default 'top' */
  placement?: TooltipPlacement;
  /**
   * Shortcut caps rendered after the label (`kbd={['⌘','/']}`), slightly
   * dimmed. Decorative — hidden from assistive tech; the shortcut must also
   * be discoverable elsewhere (settings shortcut list).
   */
  kbd?: string[];
  /**
   * Controlled visibility. Leave undefined for the default hover/focus
   * behavior; when set, hover/focus no longer toggle the bubble.
   */
  open?: boolean;
  /** The trigger the tooltip describes (shown on hover/focus). */
  children: ReactNode;
}

/**
 * Tooltip — the hover/focus label bubble on the inverse surface.
 * See Tooltip.prompt.md. Screens: D:top bar, D:sidebar rail.
 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  {
    content,
    placement = 'top',
    kbd,
    open,
    className,
    children,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const id = useId();
  const visible = open ?? hovered;
  return (
    <span
      ref={ref}
      className={cx('ornie-tooltip', className)}
      onMouseEnter={(event: MouseEvent<HTMLSpanElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event: MouseEvent<HTMLSpanElement>) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      onFocus={(event: FocusEvent<HTMLSpanElement>) => {
        setHovered(true);
        onFocus?.(event);
      }}
      onBlur={(event: FocusEvent<HTMLSpanElement>) => {
        setHovered(false);
        onBlur?.(event);
      }}
      aria-describedby={visible ? id : undefined}
      {...rest}
    >
      {children}
      {visible && (
        <span
          id={id}
          role="tooltip"
          className={cx('ornie-tooltip__bubble', `ornie-tooltip__bubble--${placement}`)}
        >
          {content}
          {kbd && (
            <span className="ornie-tooltip__kbd" aria-hidden="true">
              <Kbd keys={kbd} onInverse />
            </span>
          )}
        </span>
      )}
    </span>
  );
});
