import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../primitives/Icon/Icon';
import type { IconName } from '../../primitives/Icon/Icon';
import { Badge } from '../../primitives/Badge/Badge';
import './Dock.css';

export interface DockItem {
  /** Glyph name, or a custom node. */
  icon: IconName | ReactNode;
  /** 10.5px label under the icon — also the accessible name. */
  label: string;
  active?: boolean;
  onSelect: () => void;
  /** Quiet neutral count (0 renders nothing — Badge's rule). */
  badge?: number;
}

export interface DockProps extends HTMLAttributes<HTMLElement> {
  /** Up to 4 items; the capture button takes the center slot (5 slots total, SPECS). */
  items: DockItem[];
  /** The raised center capture button. */
  capture?: { onPress: () => void; label?: string };
}

/**
 * Dock — the phone bottom navigation (SPECS: 84px on surface-sunken, raised
 * 54px capture at −26px with a 4px bg ring). Safe-area aware. The app owns
 * fixing it to the viewport bottom; the Dock is just the bar.
 * See Dock.prompt.md. Screens: every phone screen (2a…) (COVERAGE_MATRIX).
 */
export const Dock = forwardRef<HTMLElement, DockProps>(function Dock(
  { items, capture, className, ...rest },
  ref,
) {
  const mid = Math.ceil(items.length / 2);
  const renderItem = (item: DockItem, i: number) => (
    <button
      key={i}
      type="button"
      className={cx('ornie-dock__item', item.active && 'ornie-dock__item--active')}
      aria-current={item.active ? 'page' : undefined}
      onClick={item.onSelect}
    >
      <span className="ornie-dock__icon">
        {typeof item.icon === 'string' ? <Icon name={item.icon as IconName} size={24} /> : item.icon}
        {item.badge !== undefined && <Badge size="sm" count={item.badge} className="ornie-dock__badge" />}
      </span>
      <span className="ornie-dock__label">{item.label}</span>
    </button>
  );

  return (
    <nav ref={ref} className={cx('ornie-dock', className)} aria-label="Dock" {...rest}>
      {items.slice(0, mid).map(renderItem)}
      {capture && (
        <span className="ornie-dock__capture-slot">
          <button
            type="button"
            className="ornie-dock__capture"
            aria-label={capture.label ?? 'Capture'}
            onClick={capture.onPress}
          >
            <Icon name="plus" size={24} />
          </button>
        </span>
      )}
      {items.slice(mid).map((item, i) => renderItem(item, mid + i))}
    </nav>
  );
});
