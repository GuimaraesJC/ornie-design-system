import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../primitives/Icon/Icon';
import './ListRow.css';

export type ListRowDensity = 'phone' | 'desktop';

export interface ListRowProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Main line — 15px `--ornie-text`, medium. */
  title: ReactNode;
  /** Second line — 13px `--ornie-text-muted`, single-line truncate. */
  description?: ReactNode;
  /** Slot before the text block: Icon, Avatar, ProjectDot, TaskCheck. */
  leading?: ReactNode;
  /** Slot after the text block: value text, Badge, Switch, Kbd. */
  trailing?: ReactNode;
  /** min-height 44 (`phone`) / 36 (`desktop`). @default 'phone' */
  density?: ListRowDensity;
  /** Trailing chevron-right in `--ornie-text-muted`, after any `trailing`. */
  chevron?: boolean;
  /**
   * Hover wash (`--ornie-hover`) + focus ring; with `onClick` the row renders
   * as a `<button>`, with `href` as an `<a>` — same pattern as Card. Don't
   * combine with interactive `trailing` content (a Switch is its own control;
   * keep such rows non-interactive).
   */
  interactive?: boolean;
  /**
   * 16px horizontal padding. Off by default — the parent owns the inset —
   * on for rows inside `ListSection surface="card"` (1v settings groups).
   */
  padded?: boolean;
  /** Renders the row as an `<a>`. Pair with `interactive`. */
  href?: string;
}

/**
 * ListRow — the generic row: anything listed that is not a task.
 * See ListRow.prompt.md for the four recipes (settings, person, note,
 * module). Screens: 1o notes, 1t Browse, 1v settings, 2i trash, 2j habits,
 * 2k people, 2n modules, Burrow settings, D:settings (COVERAGE_MATRIX).
 */
export const ListRow = forwardRef<HTMLElement, ListRowProps>(function ListRow(
  {
    title,
    description,
    leading,
    trailing,
    density = 'phone',
    chevron,
    interactive,
    padded,
    href,
    onClick,
    className,
    ...rest
  },
  ref,
) {
  const classes = cx(
    'ornie-listrow',
    `ornie-listrow--${density}`,
    interactive && 'ornie-listrow--interactive',
    padded && 'ornie-listrow--padded',
    className,
  );

  const body = (
    <>
      {leading && <span className="ornie-listrow__leading">{leading}</span>}
      <span className="ornie-listrow__body">
        <span className="ornie-listrow__title">{title}</span>
        {description && <span className="ornie-listrow__description">{description}</span>}
      </span>
      {trailing && <span className="ornie-listrow__trailing">{trailing}</span>}
      {chevron && <Icon name="chevron-right" size={16} className="ornie-listrow__chevron" />}
    </>
  );

  if (href !== undefined) {
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} className={classes} href={href} onClick={onClick} {...rest}>
        {body}
      </a>
    );
  }

  if (interactive && onClick !== undefined) {
    return (
      <button ref={ref as Ref<HTMLButtonElement>} type="button" className={classes} onClick={onClick} {...rest}>
        {body}
      </button>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={classes} onClick={onClick} {...rest}>
      {body}
    </div>
  );
});
