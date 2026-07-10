import { forwardRef, useRef } from 'react';
import type { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../primitives/Icon/Icon';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { Input } from '../../primitives/Input/Input';
import type { InputSize } from '../../primitives/Input/Input';
import { Kbd } from '../../primitives/Kbd/Kbd';
import './SearchField.css';

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'onChange'> {
  /** Current query (controlled). */
  value: string;
  /**
   * Called with the query string first (unlike Input, whose `onChange` is the
   * raw event); the originating event comes second when there is one.
   */
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  /** Called by the clear button and Escape. @default `() => onChange('')` */
  onClear?: () => void;
  /**
   * Shortcut hint rendered as Kbd caps in the trailing slot while the field
   * is empty (e.g. `['⌘','/']`). The clear button replaces it once there is
   * a value. Decorative — hidden from assistive tech.
   */
  kbd?: string[];
  /** Field height, straight from Input: sm 32 / md 40 / lg 48 (px). @default 'md' */
  size?: InputSize;
  /** Accessible name for the clear button. @default 'Clear search' */
  clearLabel?: string;
}

/**
 * SearchField — Input dressed for search: leading search icon, clear button
 * when there is a value, optional shortcut hint while empty. Controlled with
 * a string payload. `ref` forwards to the inner `<input>`.
 * See SearchField.prompt.md. Screens: 1t browse, 2f anytime, 1o notes list,
 * D:quick-find trigger, D:top bar.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    value,
    onChange,
    onClear,
    kbd,
    size = 'md',
    clearLabel = 'Clear search',
    placeholder = 'Search',
    className,
    disabled,
    onKeyDown,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  },
  ref,
) {
  const inner = useRef<HTMLInputElement | null>(null);
  const setRef = (el: HTMLInputElement | null) => {
    inner.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  const hasValue = value.length > 0;

  const clear = () => {
    if (onClear) onClear();
    else onChange('');
    inner.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.key === 'Escape' && hasValue && !event.defaultPrevented) {
      // Deterministic across browsers (native type=search Esc-clear is
      // inconsistent) — clear, keep focus, keep any open overlay open.
      event.preventDefault();
      clear();
    }
  };

  const trailing =
    hasValue && !disabled ? (
      <IconButton
        aria-label={clearLabel}
        variant="ghost"
        size={32}
        className="ornie-searchfield__clear"
        onClick={clear}
      >
        <Icon name="x" size={16} />
      </IconButton>
    ) : kbd && kbd.length > 0 ? (
      <span className="ornie-searchfield__kbd" aria-hidden="true">
        <Kbd keys={kbd} />
      </span>
    ) : undefined;

  return (
    <Input
      ref={setRef}
      type="search"
      className={cx('ornie-searchfield', className)}
      size={size}
      leading={<Icon name="search" size={16} />}
      trailing={trailing}
      value={value}
      onChange={(event) => onChange(event.target.value, event)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : 'Search')}
      aria-labelledby={ariaLabelledBy}
      autoComplete="off"
      {...rest}
    />
  );
});
