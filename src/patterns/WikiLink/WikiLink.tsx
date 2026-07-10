import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './WikiLink.css';

export interface WikiLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The target note does not exist yet: dashed `--ornie-accent-subtle-border`
   * edge on a transparent wash — an invitation, not an error. Following the
   * link creates the note (app-side).
   * @default false
   */
  unresolved?: boolean;
}

/**
 * WikiLink — the [[note]] pill inside rendered note and journal content.
 * Always renders an `<a>` and forwards its ref to it; `href` is optional
 * (the app wires navigation, including create-on-follow for unresolved links).
 * Type is inherited from the surrounding text, so the pill sits in any copy.
 * See WikiLink.prompt.md. Screens: 1p/1q, 2l journal, 2m Pages, D:Notes, D:Journal.
 */
export const WikiLink = forwardRef<HTMLAnchorElement, WikiLinkProps>(function WikiLink(
  { unresolved, className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx('ornie-wikilink', unresolved && 'ornie-wikilink--unresolved', className)}
      {...rest}
    >
      {children}
    </a>
  );
});
