import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './TopBar.css';

export interface TopBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * View title — 17px/semibold, truncates with an ellipsis. Not a heading:
   * the page's real `<h1>` lives in the content (PageHeader); this is the
   * frame's quiet view label.
   */
  title?: ReactNode;
  /** Left slot: sidebar collapse toggle IconButton, back button. */
  leading?: ReactNode;
  /** Right slot: IconButtons, DayRing, the Ask trigger. */
  trailing?: ReactNode;
  /**
   * Fades in the bottom hairline (`--ornie-border-subtle`,
   * `--ornie-duration-quick`). The app owns the scroll listener — pass
   * `scrolled={scrollTop > 0}` from the content scroll container.
   */
  scrolled?: boolean;
}

/**
 * TopBar — the desktop frame's 52px view bar, transparent over `--ornie-bg`.
 * Static: in the frame it is a flex-column sibling of the scroll container
 * (content scrolls beneath it), so it needs no position or z-index. If an
 * app makes it sticky instead, it should set `background: var(--ornie-bg)`
 * and `z-index: var(--ornie-z-dock)` itself.
 * See TopBar.prompt.md. Screens: D:all views (Frame), 2d/1z tablet
 * (COVERAGE_MATRIX).
 */
export const TopBar = forwardRef<HTMLElement, TopBarProps>(function TopBar(
  { title, leading, trailing, scrolled, className, ...rest },
  ref,
) {
  return (
    <header
      ref={ref}
      className={cx('ornie-topbar', scrolled && 'ornie-topbar--scrolled', className)}
      {...rest}
    >
      {leading && <div className="ornie-topbar__leading">{leading}</div>}
      <div className="ornie-topbar__title">{title}</div>
      {trailing && <div className="ornie-topbar__trailing">{trailing}</div>}
    </header>
  );
});
