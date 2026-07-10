import { Children, forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './MetaLine.css';

export interface MetaLineProps extends HTMLAttributes<HTMLSpanElement> {}

/**
 * MetaLine — the 11.5px metadata run under a row title: time · project ·
 * tags · estimate · repeat. Pass fragments as children; separators are
 * inserted between them. See MetaLine.prompt.md.
 * Screens: TaskRow everywhere, NoteRow recipes, 2e timeline (COVERAGE_MATRIX).
 */
export const MetaLine = forwardRef<HTMLSpanElement, MetaLineProps>(function MetaLine(
  { className, children, ...rest },
  ref,
) {
  // Children.toArray drops null/undefined/booleans; empty strings still slip through.
  const items = Children.toArray(children).filter((child) => child !== '');
  return (
    <span ref={ref} className={cx('ornie-metaline', className)} {...rest}>
      {items.map((item, i) => (
        // Index keys are fine: the run is display-only and rerenders wholesale.
        // eslint-disable-next-line react/no-array-index-key
        <span key={i} className="ornie-metaline__item">
          {i > 0 && (
            <span className="ornie-metaline__sep" aria-hidden="true">
              ·
            </span>
          )}
          {item}
        </span>
      ))}
    </span>
  );
});
