import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Card } from '../../primitives/Card/Card';
import { Icon } from '../../primitives/Icon/Icon';
import { ProgressRing } from '../../primitives/ProgressRing/ProgressRing';
import { ChipGroup } from '../../patterns/ChipGroup/ChipGroup';
import { MetaLine } from '../../patterns/MetaLine/MetaLine';
import './TriageCard.css';

export interface TriageTarget {
  value: string;
  label: ReactNode;
  /** Icon or ProjectDot rendered before the label (Chip `leading`, decorative). */
  leading?: ReactNode;
}

export interface TriageProgress {
  /** Items already sorted this session. */
  current: number;
  /** Items in the queue this session. */
  total: number;
}

export interface TriageCardProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The captured text, exactly as the user typed it. Multi-line is fine. */
  text: ReactNode;
  /** Where it came from — MetaLine fragments, e.g. `['via share sheet', '2h ago']`. */
  source?: ReactNode;
  /** The decide targets (Today · This week · Someday · project…). */
  targets: TriageTarget[];
  /**
   * Called once with the picked target's value — one decision per card; the
   * app files the item, shows the undo Toast (D-50) and advances the queue.
   */
  onDecide: (value: string) => void;
  /** Session progress for the quiet "3 of 7" footer with its 16px ring. */
  progress?: TriageProgress;
  /**
   * Shows the quiet "or swipe the card →" affordance (2c legend). Visual
   * only — the swipe gesture itself is app-side; chips are the visible path.
   * @default false
   */
  swipeHint?: boolean;
  /** Accessible name for the target ChipGroup. @default 'File to' */
  targetsLabel?: string;
}

/**
 * TriageCard — the inbox triage unit (D-68): one captured thing, its source,
 * a single-pick ChipGroup of homes, and a quiet progress footer. Composes
 * Card (spine, elevated) + MetaLine + ChipGroup + ProgressRing. Not an
 * overlay — render it in the content column, one card at a time.
 * See TriageCard.prompt.md. Screens: 2c Triage, D:Inbox triage mode
 * (COVERAGE_MATRIX).
 */
export const TriageCard = forwardRef<HTMLElement, TriageCardProps>(function TriageCard(
  {
    text,
    source,
    targets,
    onDecide,
    progress,
    swipeHint = false,
    targetsLabel = 'File to',
    className,
    ...rest
  },
  ref,
) {
  const hasFooter = progress !== undefined || swipeHint;
  const ringValue =
    progress && progress.total > 0 ? Math.min(Math.max(progress.current / progress.total, 0), 1) : 0;

  return (
    <Card
      ref={ref}
      variant="elevated"
      spine
      padding="none"
      className={cx('ornie-triage-card', className)}
      {...rest}
    >
      <div className="ornie-triage-card__capture">
        <div className="ornie-triage-card__text">{text}</div>
        {source != null && <MetaLine className="ornie-triage-card__source">{source}</MetaLine>}
      </div>
      <ChipGroup
        className="ornie-triage-card__targets"
        mode="single"
        value={null}
        onChange={(next) => {
          if (next !== null) onDecide(next);
        }}
        options={targets}
        aria-label={targetsLabel}
      />
      {hasFooter && (
        <div className="ornie-triage-card__footer">
          {progress && (
            <span className="ornie-triage-card__progress">
              <ProgressRing
                size={16}
                value={ringValue}
                label={`${progress.current} of ${progress.total} sorted`}
              />
              {/* The ring's progressbar already announces the numbers. */}
              <span className="ornie-triage-card__count" aria-hidden="true">
                {progress.current} of {progress.total}
              </span>
            </span>
          )}
          {swipeHint && (
            /* Pointer-only shortcut — hidden from AT; chips are the accessible path. */
            <span className="ornie-triage-card__hint" aria-hidden="true">
              or swipe the card
              <Icon name="chevron-right" size={16} className="ornie-triage-card__hint-glyph" />
            </span>
          )}
        </div>
      )}
    </Card>
  );
});
