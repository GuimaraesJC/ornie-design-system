import { forwardRef, useEffect, useRef, useState } from 'react';
import type { FocusEvent, HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Chip } from '../../primitives/Chip/Chip';
import type { ChipSize } from '../../primitives/Chip/Chip';
import './ChipGroup.css';

export type ChipGroupMode = 'single' | 'multi';

export interface ChipGroupOption {
  value: string;
  label: ReactNode;
  /** Icon or dot rendered before the label (passed to Chip's `leading`). */
  leading?: ReactNode;
  /** Renders the chip inert and dimmed; skipped by keyboard. */
  disabled?: boolean;
}

interface ChipGroupBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: ChipGroupOption[];
  /** Chip size for every option: sm 24 / md 32. @default 'md' */
  size?: ChipSize;
  /** Accessible name for the group — always provide one. */
  'aria-label'?: string;
}

export interface ChipGroupSingleProps extends ChipGroupBaseProps {
  /** Exclusive pick. Re-tapping the selected chip deselects to null unless `required`. */
  mode: 'single';
  value: string | null;
  onChange: (value: string | null) => void;
  /** Forbids deselecting — one option is always chosen. @default false */
  required?: boolean;
}

export interface ChipGroupMultiProps extends ChipGroupBaseProps {
  /** Independent toggles; `value` is the array of selected option values. */
  mode: 'multi';
  value: string[];
  onChange: (value: string[]) => void;
}

export type ChipGroupProps = ChipGroupSingleProps | ChipGroupMultiProps;

/** Internal view of the union — the assertion keeps destructuring simple. */
interface ChipGroupAnyProps extends ChipGroupBaseProps {
  mode: ChipGroupMode;
  value: string | null | string[];
  onChange: (value: string | null | string[]) => void;
  required?: boolean;
}

/**
 * ChipGroup — a wrapping row of Chips with managed single/multi selection
 * and roving-tabindex keyboard support. See ChipGroup.prompt.md.
 * Screens: 2c triage targets, 1l tags, 2b capture parse row, 2f filters.
 */
export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(function ChipGroup(props, ref) {
  const { options, size = 'md', className, mode, value, onChange, required, ...rest } =
    props as ChipGroupAnyProps;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const selectedValues = Array.isArray(value) ? value : value === null ? [] : [value];
  const isSelected = (optionValue: string) => selectedValues.includes(optionValue);

  const toggle = (optionValue: string) => {
    if (mode === 'multi') {
      const current = Array.isArray(value) ? value : [];
      onChange(
        current.includes(optionValue) ? current.filter((v) => v !== optionValue) : [...current, optionValue],
      );
    } else if (value === optionValue) {
      if (!required) onChange(null);
    } else {
      onChange(optionValue);
    }
  };

  // Roving tabindex. Chip owns its internal <button>, so the group manages
  // tabIndex/focus() on the rendered buttons directly (disabled options render
  // real disabled buttons, excluded from the rove). `active` is ephemeral
  // focus bookkeeping, not selection state.
  const [active, setActive] = useState(() => {
    const interactive = options.filter((option) => !option.disabled);
    const firstSelected = interactive.findIndex((option) => selectedValues.includes(option.value));
    return firstSelected >= 0 ? firstSelected : 0;
  });

  const getButtons = () =>
    rootRef.current
      ? Array.from(rootRef.current.querySelectorAll<HTMLButtonElement>('button.ornie-chip__action:not(:disabled)'))
      : [];

  useEffect(() => {
    const buttons = getButtons();
    if (buttons.length === 0) return;
    const current = Math.min(active, buttons.length - 1);
    buttons.forEach((button, i) => {
      button.tabIndex = i === current ? 0 : -1;
    });
  });

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    const buttons = getButtons();
    if (buttons.length === 0) return;
    event.preventDefault();
    const position = Math.min(active, buttons.length - 1);
    let next: number;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else {
      const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
      next = (position + direction + buttons.length) % buttons.length;
    }
    setActive(next);
    buttons[next].tabIndex = 0;
    buttons[next].focus();
  };

  // Clicking/tabbing into a chip makes it the roving tab stop.
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const index = getButtons().findIndex((button) => button === target);
    if (index >= 0 && index !== active) setActive(index);
  };

  return (
    <div
      {...rest}
      ref={setRef}
      role="group"
      className={cx('ornie-chip-group', className)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    >
      {options.map((option) => (
        <Chip
          key={option.value}
          size={size}
          leading={option.leading}
          disabled={option.disabled}
          selected={isSelected(option.value)}
          onSelect={() => toggle(option.value)}
          className="ornie-chip-group__chip"
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
});
