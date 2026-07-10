import { forwardRef, useEffect, useId, useRef } from 'react';
import type { HTMLAttributes, KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { Icon } from '../../primitives/Icon/Icon';
import './Sheet.css';

export type SheetHeight = 'half' | 'tall' | 'content';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface SheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the sheet is shown (controlled). */
  open: boolean;
  /** Called on Escape, scrim tap, or the close button. */
  onClose?: () => void;
  /** Header title (10.5 caps per the 2b mockup). */
  title?: ReactNode;
  /** content = intrinsic (max 85dvh) · half = 52dvh · tall = 90dvh. @default 'content' */
  height?: SheetHeight;
  /** Focused when the sheet opens; defaults to the panel. */
  initialFocus?: RefObject<HTMLElement>;
  /** Escape and scrim tap close the sheet. @default true */
  dismissible?: boolean;
  /** @default true */
  showCloseButton?: boolean;
  /** Accessible name for the close button. @default 'Close' */
  closeLabel?: string;
  /** Portal target — for embedding/testing (grids); apps normally omit it. */
  container?: Element | null;
}

/**
 * Sheet — the mobile overlay surface (D-68: capture is a half sheet).
 * Bottom padding is keyboard-safe: env(safe-area-inset-bottom) +
 * --ornie-keyboard-inset (the app supplies the inset). See Sheet.prompt.md.
 * Screens: 2b capture, 1l task detail, 1u Ask on phone (COVERAGE_MATRIX).
 */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  {
    open,
    onClose,
    title,
    height = 'content',
    initialFocus,
    dismissible = true,
    showCloseButton = true,
    closeLabel = 'Close',
    container,
    className,
    children,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Escape + body scroll lock while open (skipped when contained: an embedded
  // demo must not lock the page).
  const target = container ?? (typeof document !== 'undefined' ? document.body : null);
  const contained = !!container && container !== document.body;

  useEffect(() => {
    if (!open || contained) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissible) onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, contained, dismissible, onClose]);

  // Focus on open, return focus to the opener on close.
  useEffect(() => {
    if (!open || contained) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTarget = initialFocus?.current ?? panelRef.current;
    focusTarget?.focus();
    return () => {
      opener?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-focusing on ref identity churn would steal focus
  }, [open, contained]);

  if (!open || !target) return null;

  const setPanelRef = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null,
    );
    if (focusables.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    const inside = active instanceof HTMLElement && panel.contains(active);
    if (!inside || active === panel) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      className={cx('ornie-sheet', contained && 'ornie-sheet--contained')}
      role="presentation"
      onKeyDown={trapFocus}
      onMouseDown={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={setPanelRef}
        tabIndex={-1}
        className={cx('ornie-sheet__panel', `ornie-sheet__panel--${height}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        // A dialog needs a name: untitled sheets fall back to a generic label
        // unless the caller passes their own aria-label (preferred).
        aria-label={!title ? ((rest as Record<string, unknown>)['aria-label'] as string | undefined) ?? 'Sheet' : undefined}
        {...rest}
      >
        <div className="ornie-sheet__grabber" aria-hidden="true" />
        {(title || showCloseButton) && (
          <div className="ornie-sheet__header">
            {title && (
              <div id={titleId} className="ornie-sheet__title">
                {title}
              </div>
            )}
            {showCloseButton && (
              <IconButton size={32} variant="ghost" aria-label={closeLabel} className="ornie-sheet__close" onClick={() => onClose?.()}>
                <Icon name="x" size={16} />
              </IconButton>
            )}
          </div>
        )}
        {/* tabIndex 0: the scrollable body must be keyboard-reachable */}
        <div className="ornie-sheet__body" tabIndex={0}>
          {children}
        </div>
      </div>
    </div>,
    target,
  );
});
