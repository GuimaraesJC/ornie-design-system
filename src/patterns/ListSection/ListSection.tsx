import { forwardRef, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './ListSection.css';

export type ListSectionSurface = 'plain' | 'card';
export type ListSectionLabelAs = 'div' | 'h2' | 'h3' | 'h4';

export interface ListSectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Section title — 10.5px caps, bold, +1px tracking, `--ornie-text-muted`.
   * The uppercase transform is CSS; pass plain words ("On this phone").
   */
  label?: ReactNode;
  /**
   * Quiet slot at the end of the header line: a count `<Badge>` or a small
   * ghost action. Never an alarm — counts are informational (D-01).
   */
  trailing?: ReactNode;
  /**
   * `plain` (default) keeps rows on the page background; `card` puts them on
   * `--ornie-surface` with a `--ornie-border-subtle` hairline and radius-lg
   * (the flat-card settings look, 1v). In `card`, give rows `padded` so their
   * content insets 16px from the card edge.
   * @default 'plain'
   */
  surface?: ListSectionSurface;
  /**
   * Element for the label. Defaults to a plain `div` (list screens usually
   * carry their own heading); pass `h2`–`h4` when the section label IS the
   * heading for that stretch of the page. Styling is identical either way.
   * @default 'div'
   */
  as?: ListSectionLabelAs;
}

/**
 * ListSection — a labelled run of rows that owns its hairline separators
 * (1px `--ornie-track` between children — consumers never hand-place
 * Dividers inside it). See ListSection.prompt.md.
 * Screens: 2a Today, 2e–2h list views, 1r/1s projects, 1t Browse,
 * 1v Settings, 2m Pages, Burrow, D:everywhere (COVERAGE_MATRIX).
 */
export const ListSection = forwardRef<HTMLElement, ListSectionProps>(function ListSection(
  { label, trailing, surface = 'plain', as: LabelTag = 'div', className, children, ...rest },
  ref,
) {
  const labelId = useId();

  return (
    <section
      ref={ref}
      className={cx('ornie-listsection', surface === 'card' && 'ornie-listsection--card', className)}
      aria-labelledby={label ? labelId : undefined}
      {...rest}
    >
      {(label || trailing) && (
        <div className="ornie-listsection__header">
          {label && (
            <LabelTag id={labelId} className="ornie-listsection__label">
              {label}
            </LabelTag>
          )}
          {trailing && <div className="ornie-listsection__trailing">{trailing}</div>}
        </div>
      )}
      <div className="ornie-listsection__rows">{children}</div>
    </section>
  );
});
