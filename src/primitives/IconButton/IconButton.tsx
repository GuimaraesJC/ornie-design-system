import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './IconButton.css';

export type IconButtonSize = 32 | 40 | 44;
export type IconButtonVariant = 'ghost' | 'outline' | 'filled';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible name — REQUIRED. An icon-only control has no text, so the
   * button itself must carry the label ("Ask Ornie", "Close", "Skip").
   */
  'aria-label': string;
  /**
   * Visual voice. `ghost` = transparent with a quiet hover wash;
   * `outline` = 1px bordered circle on surface (the Ask sparkle treatment);
   * `filled` = accent. @default 'ghost'
   */
  variant?: IconButtonVariant;
  /** Exact box in px: 32 / 40 / 44. Sizes 32/40 get ≥44px hit-slop on touch. @default 40 */
  size?: IconButtonSize;
  /** Exactly one `<Icon>` (20px default box). It is decorative — the label lives on the button. */
  children: ReactNode;
}

/**
 * IconButton — icon-only circular button. Ghost for toolbars and top-bar
 * actions, outline for the Ask sparkle, filled for the rare accent action.
 * See IconButton.prompt.md. Screens: 2a header sparkle, sheet close ×,
 * 2c triage skip, 1q editor toolbar, D:top bar.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'ghost', size = 40, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx('ornie-icon-btn', `ornie-icon-btn--${variant}`, `ornie-icon-btn--${size}`, className)}
      {...rest}
    >
      <span className="ornie-icon-btn__glyph" aria-hidden="true">
        {children}
      </span>
    </button>
  );
});
