import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './ProjectDot.css';

export type ProjectColor = 'river' | 'moss' | 'clay' | 'fur' | 'rust';

export interface ProjectDotProps extends HTMLAttributes<HTMLSpanElement> {
  /** Identity color from the fixed muted set (semantic --ornie-project-* tokens). @default 'river' */
  color?: ProjectColor;
  /** Optional project name rendered after the dot (inherits the surrounding type). */
  label?: string;
}

/**
 * ProjectDot — 6px round identity dot for projects. See ProjectDot.prompt.md.
 * Screens: MetaLine runs, D:sidebar projects, 1r/1s (COVERAGE_MATRIX).
 */
export const ProjectDot = forwardRef<HTMLSpanElement, ProjectDotProps>(function ProjectDot(
  { color = 'river', label, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx('ornie-projectdot', className)} {...rest}>
      <span className={`ornie-projectdot__dot ornie-projectdot__dot--${color}`} aria-hidden="true" />
      {label && <span className="ornie-projectdot__label">{label}</span>}
    </span>
  );
});
