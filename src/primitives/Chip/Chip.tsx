import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../Icon/Icon';
import './Chip.css';

export type ChipSize = 'sm' | 'md';

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onSelect'> {
  /** Selected state (controlled). Pair with `onSelect`. */
  selected?: boolean;
  /** Makes the chip a toggle button. Called on tap/Enter/Space. */
  onSelect?: () => void;
  /** Shows the × affordance. Called on its tap. */
  onRemove?: () => void;
  /** Accessible name for the × button. @default 'Remove' */
  removeLabel?: string;
  /** Icon or dot rendered before the label. */
  leading?: ReactNode;
  /** sm 24 / md 32 (px height). Touch sizes get ≥44px hit-slop. @default 'md' */
  size?: ChipSize;
}

/**
 * Chip — the interactive pill (Badge is static, Chip is tappable).
 * See Chip.prompt.md. Screens: 2b parse chips, 2c triage, 1l tags, 1u Ask.
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { selected, onSelect, onRemove, removeLabel = 'Remove', leading, size = 'md', className, children, ...rest },
  ref,
) {
  const selectable = onSelect !== undefined;
  const body = (
    <>
      {leading && (
        <span className="ornie-chip__leading" aria-hidden="true">
          {leading}
        </span>
      )}
      <span className="ornie-chip__label">{children}</span>
    </>
  );

  return (
    <span
      ref={ref}
      className={cx(
        'ornie-chip',
        `ornie-chip--${size}`,
        selected && 'ornie-chip--selected',
        selectable && 'ornie-chip--selectable',
        onRemove && 'ornie-chip--removable',
        className,
      )}
      {...rest}
    >
      {selectable ? (
        <button type="button" className="ornie-chip__action" aria-pressed={!!selected} onClick={() => onSelect()}>
          {body}
        </button>
      ) : (
        <span className="ornie-chip__action">{body}</span>
      )}
      {onRemove && (
        <button type="button" className="ornie-chip__remove" aria-label={removeLabel} onClick={() => onRemove()}>
          <Icon name="x" size={16} className="ornie-chip__remove-glyph" />
        </button>
      )}
    </span>
  );
});
