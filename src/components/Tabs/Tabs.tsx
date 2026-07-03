import { useId, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type TabsVariant = 'underline' | 'pills';

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
  /** Initial active index (uncontrolled). @default 0 */
  defaultIndex?: number;
  onChange?: (index: number) => void;
  /** @default 'underline' */
  variant?: TabsVariant;
}

export function Tabs({
  items,
  index,
  defaultIndex = 0,
  onChange,
  variant = 'underline',
  className,
  ...rest
}: TabsProps) {
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
    <div className={cx('ornie-tabs', `ornie-tabs--${variant}`, className)} {...rest}>
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
}
