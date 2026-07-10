import { forwardRef, useId, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { deprecate } from '../../lib/deprecate';
import './Tabs.css';

export type TabsVariant = 'underline' | 'pills';
export type TabsSize = 'sm' | 'md';

export interface TabItem {
  label: ReactNode;
  /** Panel shown while this tab is active. */
  content?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  /** Controlled active index. */
  index?: number;
  /**
   * Initial active index (uncontrolled).
   * @deprecated Controlled only (API_CONVENTIONS §3) — use `index` + `onChange`; removed in 0.3.0.
   */
  defaultIndex?: number;
  onChange?: (index: number) => void;
  /** @default 'underline' */
  variant?: TabsVariant;
  /** md = default; sm = tighter paddings + 13px labels (dense chrome). @default 'md' */
  size?: TabsSize;
}

/**
 * Tabs — switch between content views. See Tabs.prompt.md.
 * Screens: 2n modules hub, D:Modules hub / GitHub / Calendar (COVERAGE_MATRIX).
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    items,
    index,
    defaultIndex = 0,
    onChange,
    variant = 'underline',
    size = 'md',
    className,
    ...rest
  },
  ref,
) {
  if (defaultIndex !== 0) {
    deprecate('Tabs.defaultIndex', 'Tabs.defaultIndex is deprecated (controlled only) — use index + onChange; removed in 0.3.0');
  }
  const [internal, setInternal] = useState(defaultIndex);
  const current = index ?? internal;
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const select = (next: number) => {
    if (items[next]?.disabled) return;
    setInternal(next);
    onChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const enabled = items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0);
    if (enabled.length === 0) return;
    let next: number;
    if (event.key === 'Home') next = enabled[0];
    else if (event.key === 'End') next = enabled[enabled.length - 1];
    else {
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const position = enabled.indexOf(current);
      next = enabled[(position + direction + enabled.length) % enabled.length];
    }
    select(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div
      ref={ref}
      className={cx('ornie-tabs', `ornie-tabs--${variant}`, `ornie-tabs--${size}`, className)}
      {...rest}
    >
      <div className="ornie-tabs__list" role="tablist" ref={listRef} onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === current}
            aria-controls={item.content != null ? `${baseId}-panel-${i}` : undefined}
            tabIndex={i === current ? 0 : -1}
            disabled={item.disabled}
            className={cx('ornie-tabs__tab', i === current && 'ornie-tabs__tab--active')}
            onClick={() => select(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) =>
        item.content != null ? (
          <div
            key={i}
            role="tabpanel"
            id={`${baseId}-panel-${i}`}
            aria-labelledby={`${baseId}-tab-${i}`}
            hidden={i !== current}
            className="ornie-tabs__panel"
          >
            {item.content}
          </div>
        ) : null,
      )}
    </div>
  );
});
