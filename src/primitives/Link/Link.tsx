import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './Link.css';

export type LinkVariant = 'accent' | 'muted';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * `accent` — river ink, the standard text link.
   * `muted` — quiet secondary link (help lines, footnotes), text-muted ink.
   * @default 'accent'
   */
  variant?: LinkVariant;
}

/**
 * Link — the text link. Always renders an `<a>`, even without `href`
 * (button-like actions belong to Button ghost, not Link).
 * See Link.prompt.md. Screens: D:settings, docs surfaces, empty-state help lines.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = 'accent', className, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} className={cx('ornie-link', `ornie-link--${variant}`, className)} {...rest}>
      {children}
    </a>
  );
});
