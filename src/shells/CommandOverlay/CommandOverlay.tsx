import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { cx } from '../../lib/cx';
import { Modal } from '../../primitives/Modal/Modal';
import { Icon } from '../../primitives/Icon/Icon';
import type { IconName } from '../../primitives/Icon/Icon';
import { Kbd } from '../../primitives/Kbd/Kbd';
import './CommandOverlay.css';

export interface CommandOverlayProps<T = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'children'> {
  /** Whether the overlay is shown (controlled). */
  open: boolean;
  /** Called on Escape and scrim click. */
  onClose?: () => void;
  /** Input text (controlled). The app owns filtering — this component never searches (D-23). */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Leading glyph in the input row: `plus` for capture, `search` for Quick Find. @default 'search' */
  icon?: IconName;
  /** Trailing slot in the input row — typically `<Kbd keys={['⌘','K']} />`. Decorative. */
  trailing?: ReactNode;
  /** Panel width in px: 540 quick capture (default) / 560 Quick Find (SPECS). @default 540 */
  width?: number;
  /** Managed results. The app filters; the overlay only renders + roves. */
  items?: T[];
  /** Stable key per item (falls back to the index). */
  getKey?: (item: T) => string;
  /** Renders one result row — return a ListRow recipe. `active` marks the roving row. */
  renderItem?: (item: T, active: boolean) => ReactNode;
  /** Called on Enter (active item) or click. */
  onSelect?: (item: T) => void;
  /**
   * Results area content when `items` is not managed — or the empty message
   * rendered when a managed `items` array is empty.
   */
  children?: ReactNode;
  /**
   * Footer bar. Defaults to the standard Kbd hints
   * ("↑↓ navigate · ↵ open · esc close"); pass `null` to remove the bar.
   */
  footer?: ReactNode;
  /** Escape and scrim click close the overlay. @default true */
  dismissible?: boolean;
  /** Portal target — for embedding/testing (grids); apps normally omit it. */
  container?: Element | null;
}

const defaultFooter = (
  <>
    <span className="ornie-command-overlay__hint">
      <Kbd keys={['↑', '↓']} /> navigate
    </span>
    <span className="ornie-command-overlay__hint">
      <Kbd>↵</Kbd> open
    </span>
    <span className="ornie-command-overlay__hint">
      <Kbd>esc</Kbd> close
    </span>
  </>
);

/**
 * CommandOverlay — the desktop ⌘K / ⌘/ surface: a top-pinned Modal composed
 * of an input row, a results area and a Kbd-hint footer. It wires roving
 * selection (ArrowUp/Down wrap, Enter selects) with combobox/listbox
 * semantics, but contains NO search logic — the app queries SQLite and
 * passes filtered `items` (D-23). Phones use Sheet instead.
 * See CommandOverlay.prompt.md. Screens: D:quick-capture (540),
 * D:quick-find (560) (COVERAGE_MATRIX).
 */
function CommandOverlayInner<T>(
  {
    open,
    onClose,
    value,
    onChange,
    placeholder,
    icon = 'search',
    trailing,
    width = 540,
    items,
    getKey,
    renderItem,
    onSelect,
    children,
    footer,
    dismissible,
    container,
    className,
    style,
    ...rest
  }: CommandOverlayProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const managed = items !== undefined;
  const count = items?.length ?? 0;
  const active = count > 0 ? Math.min(activeIndex, count - 1) : -1;
  const optionId = (index: number) =>
    `${listId}-option-${items && getKey ? getKey(items[index]) : index}`;

  // The roving index restarts when the app re-filters or the overlay reopens.
  useEffect(() => {
    setActiveIndex(0);
  }, [value, open]);

  // Keep the active row visible while roving.
  useEffect(() => {
    if (!open || active < 0) return;
    document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- id derivation only
  }, [open, active]);

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!managed || count === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((active + 1) % count);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((active - 1 + count) % count);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (active >= 0 && items) onSelect?.(items[active]);
    }
  };

  const footerContent = footer === undefined ? defaultFooter : footer;

  return (
    <Modal
      open={open}
      onClose={onClose}
      placement="top"
      flush
      showCloseButton={false}
      dismissible={dismissible}
      container={container}
      initialFocus={inputRef}
      className={cx('ornie-command-overlay', className)}
      style={{ maxWidth: width, ...style } as CSSProperties}
      {...rest}
    >
      <div className="ornie-command-overlay__input-row">
        {/* Mockup glyph is 15px; Icon's size union is 16|20|24 — 16 is the lift. */}
        <Icon name={icon} size={16} className="ornie-command-overlay__icon" />
        <input
          ref={setInputRef}
          type="text"
          className="ornie-command-overlay__input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          role={managed && count > 0 ? 'combobox' : undefined}
          aria-expanded={managed && count > 0 ? true : undefined}
          aria-controls={managed && count > 0 ? listId : undefined}
          aria-autocomplete={managed && count > 0 ? 'list' : undefined}
          aria-activedescendant={managed && count > 0 && active >= 0 ? optionId(active) : undefined}
        />
        {trailing && (
          <span className="ornie-command-overlay__trailing" aria-hidden="true">
            {trailing}
          </span>
        )}
      </div>
      {/* A listbox must contain options — with zero items the role comes off
          and the empty message renders as plain content. */}
      <div
        className="ornie-command-overlay__results"
        role={managed && count > 0 ? 'listbox' : undefined}
        id={managed && count > 0 ? listId : undefined}
        aria-label={managed && count > 0 ? 'Results' : undefined}
      >
        {managed
          ? items!.map((item, index) => (
              <div
                key={getKey ? getKey(item) : index}
                id={optionId(index)}
                role="option"
                aria-selected={index === active}
                className={cx(
                  'ornie-command-overlay__option',
                  index === active && 'ornie-command-overlay__option--active',
                )}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onSelect?.(item)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {renderItem ? renderItem(item, index === active) : String(item)}
              </div>
            ))
          : children}
        {managed && count === 0 && children}
      </div>
      {footerContent != null && (
        <div className="ornie-command-overlay__footer">{footerContent}</div>
      )}
    </Modal>
  );
}

export const CommandOverlay = forwardRef(CommandOverlayInner) as (<T = unknown>(
  props: CommandOverlayProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement | null) & { displayName?: string };
CommandOverlay.displayName = 'CommandOverlay';
