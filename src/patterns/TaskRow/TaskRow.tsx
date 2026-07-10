import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Badge } from '../../primitives/Badge/Badge';
import { TaskCheck } from '../TaskCheck/TaskCheck';
import './TaskRow.css';

export type TaskRowState = 'default' | 'done' | 'waiting' | 'resurfaced';
export type TaskRowDensity = 'phone' | 'desktop';

export interface TaskRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The task title (15px/medium). */
  title: ReactNode;
  /**
   * Visual state. 'done' strikes the title in --ornie-done; 'waiting' =
   * blocked on a person (person chip goes in `meta`); 'resurfaced' = gentle
   * return (R-3), quiet accent chip. There is NO "overdue" state — no red.
   * @default 'default'
   */
  state?: TaskRowState;
  /** phone = 12px vertical padding, 23px check · desktop = 8px, 20px check. @default 'phone' */
  density?: TaskRowDensity;
  /** Metadata run under the title — usually a <MetaLine>. */
  meta?: ReactNode;
  /** Trailing slot: chevron, drag handle, SealBadge. */
  trailing?: ReactNode;
  /** Completion toggle for the TaskCheck. Omit to render the row without a check. */
  onToggle?: (next: boolean) => void;
  /** Accessible name for the check. Defaults to the title when it is a string. */
  checkLabel?: string;
  /** Opens the task (detail sheet/panel) — makes the content area a button. */
  onOpen?: () => void;
  /** Chip copy for state="resurfaced". @default 'back for a look' */
  resurfacedLabel?: string;
}

/**
 * TaskRow — one task in a list: TaskCheck · title · MetaLine · trailing.
 * The most-used component in Ornie. See TaskRow.prompt.md.
 * Screens: 2a/2e–2h, 1s, D:Today/Inbox/Upcoming/Logbook (COVERAGE_MATRIX).
 */
export const TaskRow = forwardRef<HTMLDivElement, TaskRowProps>(function TaskRow(
  {
    title,
    state = 'default',
    density = 'phone',
    meta,
    trailing,
    onToggle,
    checkLabel,
    onOpen,
    resurfacedLabel = 'back for a look',
    className,
    ...rest
  },
  ref,
) {
  const label = checkLabel ?? (typeof title === 'string' ? title : 'task');
  const content = (
    <>
      <span className="ornie-taskrow__title">
        <span className="ornie-taskrow__title-text">{title}</span>
        {state === 'resurfaced' && (
          <Badge size="sm" variant="accent" className="ornie-taskrow__resurfaced">
            {resurfacedLabel}
          </Badge>
        )}
      </span>
      {meta && <span className="ornie-taskrow__meta">{meta}</span>}
    </>
  );

  return (
    <div
      ref={ref}
      className={cx(
        'ornie-taskrow',
        `ornie-taskrow--${density}`,
        state !== 'default' && `ornie-taskrow--${state}`,
        className,
      )}
      {...rest}
    >
      {onToggle && (
        <TaskCheck
          className="ornie-taskrow__check"
          size={density === 'desktop' ? 'sm' : 'md'}
          checked={state === 'done'}
          onChange={onToggle}
          aria-label={label}
        />
      )}
      {onOpen ? (
        <button type="button" className="ornie-taskrow__content ornie-taskrow__content--button" onClick={onOpen}>
          {content}
        </button>
      ) : (
        <span className="ornie-taskrow__content">{content}</span>
      )}
      {trailing && <span className="ornie-taskrow__trailing">{trailing}</span>}
    </div>
  );
});
