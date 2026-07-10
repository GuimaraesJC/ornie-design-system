import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './PageHeader.css';

export type PageHeaderVariant = 'greeting' | 'view';
export type PageHeaderHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * `greeting` = the warm Today-header voice (2a "Good afternoon, Alex");
   * `view` = a plain section title ("Upcoming", "Inbox"). Same screen-title
   * scale (25px/bold/−0.5px, per the mockups); greeting sits a touch tighter.
   * @default 'view'
   */
  variant?: PageHeaderVariant;
  /** 11px caps accent line above the title — a date ("Friday, July 3") or section name. */
  kicker?: ReactNode;
  /** Quiet 13px line under the title ("3 things for today"). */
  subtitle?: ReactNode;
  /** Right-aligned cluster: DayRing, Ask sparkle IconButton, view controls. */
  trailing?: ReactNode;
  /** Heading element for the title. @default 'h1' */
  as?: PageHeaderHeadingLevel;
  /** The title text itself. */
  children: ReactNode;
}

/**
 * PageHeader — the greeting/title block that opens every screen: optional
 * kicker, one heading, an optional trailing cluster, an optional subtitle.
 * Not an overlay; render it at the top of the content column.
 * See PageHeader.prompt.md.
 * Screens: 2a Today, all phone list screens (2c, 1r, 1t…), 1n close-day,
 * D:Today, D:content headers (COVERAGE_MATRIX).
 */
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { variant = 'view', kicker, subtitle, trailing, as = 'h1', className, children, ...rest },
  ref,
) {
  const Heading = as;
  return (
    <header
      ref={ref}
      className={cx('ornie-page-header', `ornie-page-header--${variant}`, className)}
      {...rest}
    >
      {kicker != null && <div className="ornie-page-header__kicker">{kicker}</div>}
      <div className="ornie-page-header__row">
        <Heading className="ornie-page-header__title">{children}</Heading>
        {trailing != null && <div className="ornie-page-header__trailing">{trailing}</div>}
      </div>
      {subtitle != null && <p className="ornie-page-header__subtitle">{subtitle}</p>}
    </header>
  );
});
