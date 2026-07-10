import { forwardRef, useRef } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './SegmentedControl.css';

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 2–4 exclusive options. More than 4 renders but is out of spec —
   * use Select or Tabs instead (see SegmentedControl.prompt.md).
   */
  options: SegmentedControlOption[];
  /** Selected option value (controlled). */
  value: string;
  /** Called with the newly selected option's value. */
  onChange: (value: string) => void;
  /** sm 24px inner height, 12px labels / md 28px inner height, 13px labels. @default 'md' */
  size?: SegmentedControlSize;
}

/**
 * SegmentedControl — 2–4 exclusive options on a sunken pill track.
 * Radiogroup semantics: arrow keys move focus AND select. See
 * SegmentedControl.prompt.md. Screens: 1v/D:settings appearance,
 * 1l energy, 1u/D:Ask local/cloud, 2e scope, density toggles.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { options, value, onChange, size = 'md', className, ...rest },
  ref,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const enabled = options.map((option, i) => (option.disabled ? -1 : i)).filter((i) => i >= 0);
  const selectedIndex = options.findIndex((option) => option.value === value);
  // Roving tabindex: the selected radio is the group's single tab stop
  // (first enabled option when nothing valid is selected).
  const tabbable = selectedIndex >= 0 && !options[selectedIndex].disabled ? selectedIndex : (enabled[0] ?? -1);

  const select = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    if (option.value !== value) onChange(option.value);
    rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (enabled.length === 0) return;
    let next: number;
    if (event.key === 'Home') next = enabled[0];
    else if (event.key === 'End') next = enabled[enabled.length - 1];
    else {
      const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
      const position = enabled.indexOf(tabbable);
      next = enabled[(position + direction + enabled.length) % enabled.length];
    }
    select(next);
  };

  return (
    <div
      {...rest}
      ref={setRef}
      role="radiogroup"
      className={cx('ornie-segmented', `ornie-segmented--${size}`, className)}
      onKeyDown={onKeyDown}
    >
      {options.map((option, i) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          tabIndex={i === tabbable ? 0 : -1}
          disabled={option.disabled}
          className={cx('ornie-segmented__option', option.value === value && 'ornie-segmented__option--selected')}
          onClick={() => select(i)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});
