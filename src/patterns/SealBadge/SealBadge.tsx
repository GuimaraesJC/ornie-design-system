import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../primitives/Icon/Icon';
import './SealBadge.css';

export interface SealBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Appends the quiet explanation "skips Ask · webhooks · search" after the
   * pill, in --ornie-text-subtle. One line; use where there is room (Burrow
   * open view, task detail).
   */
  detail?: boolean;
  /** Pill text (i18n). @default 'Sealed' */
  label?: string;
}

/**
 * SealBadge — the Burrow chip: a 10px lock + "Sealed" in a quiet accent
 * wash. Static and non-interactive; it states a fact, it doesn't guard one.
 * See SealBadge.prompt.md.
 * Screens: Burrow entries (hub §04), 1l vaulted tasks, 2l/D:Journal (COVERAGE_MATRIX).
 */
export const SealBadge = forwardRef<HTMLSpanElement, SealBadgeProps>(function SealBadge(
  { detail, label = 'Sealed', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('ornie-sealbadge', detail && 'ornie-sealbadge--detail', className)}
      {...rest}
    >
      <span className="ornie-sealbadge__pill">
        <Icon name="lock" size={16} className="ornie-sealbadge__glyph" />
        {label}
      </span>
      {detail && <span className="ornie-sealbadge__detail">skips Ask · webhooks · search</span>}
    </span>
  );
});
