import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './EmptyState.css';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Decorative glyph above the title — typically an `<Icon>`. Rendered at
   * 24px in `--ornie-text-subtle` (a graphic, so subtle is allowed).
   */
  icon?: ReactNode;
  /**
   * Names what *is*, plainly: "Inbox is clear", "Trash is empty".
   * 15px semibold in `--ornie-text`. Never scolds, no exclamation marks.
   */
  title: ReactNode;
  /**
   * Optional single action — one `<Button>`, typically `secondary` or
   * `ghost`. An empty state offers at most one next step.
   */
  action?: ReactNode;
}

/**
 * EmptyState — the calm "nothing here" block for any list's empty case.
 * `children` is the one-sentence body (13px, `--ornie-text-muted`).
 * See EmptyState.prompt.md. Screens: 2f/2g, 2h, 2i, 2n, D:Today(evening),
 * D:trash, D:logbook-empty.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, action, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('ornie-empty-state', className)} {...rest}>
      {icon && (
        <span className="ornie-empty-state__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <p className="ornie-empty-state__title">{title}</p>
      {children != null && <p className="ornie-empty-state__body">{children}</p>}
      {action && <div className="ornie-empty-state__action">{action}</div>}
    </div>
  );
});
