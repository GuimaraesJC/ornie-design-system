import { forwardRef, useEffect, useId, useRef } from 'react';
import type { HTMLAttributes, KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';
import { deprecate } from '../../lib/deprecate';
import { Icon } from '../Icon/Icon';
import './Modal.css';

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalPlacement = 'center' | 'top';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the dialog is shown (controlled). */
  open: boolean;
  /** Called on Escape, scrim click, or the close button. */
  onClose?: () => void;
  title?: ReactNode;
  /** Secondary line under the title. */
  description?: ReactNode;
  /** Action row, right-aligned (typically Buttons). */
  footer?: ReactNode;
  /** Panel max width: sm 400 / md 540 / lg 680 (px). @default 'md' */
  size?: ModalSize;
  /** `top` pins the panel 12vh from the top — the command-overlay position. @default 'center' */
  placement?: ModalPlacement;
  /** Focused when the dialog opens; defaults to the panel itself. */
  initialFocus?: RefObject<HTMLElement>;
  /** Escape and scrim click close the dialog. @default true */
  dismissible?: boolean;
  /** @deprecated Use `dismissible`; removed in 0.3.0. */
  closeOnOverlayClick?: boolean;
  /** @default true */
  showCloseButton?: boolean;
  /**
   * Removes the body padding so children run edge-to-edge (CommandOverlay's
   * input row / results / footer bar). @default false
   */
  flush?: boolean;
  /** Portal target — for embedding/testing (grids); apps normally omit it. */
  container?: Element | null;
}

/**
 * Modal — the centered (or top-pinned) dialog. See Modal.prompt.md.
 * Screens: 2i empty-trash confirm, 1z tablet overlays, D:quick-capture,
 * D:quick-find via CommandOverlay, D:Trash confirm (COVERAGE_MATRIX).
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
    placement = 'center',
    initialFocus,
    dismissible,
    closeOnOverlayClick,
    showCloseButton = true,
    flush = false,
    container,
    className,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  let canDismiss = dismissible ?? true;
  if (closeOnOverlayClick !== undefined) {
    deprecate('Modal.closeOnOverlayClick', 'Modal closeOnOverlayClick is deprecated, use dismissible; removed in 0.3.0');
    if (dismissible === undefined) canDismiss = closeOnOverlayClick;
  }

  // Portal target; contained (embedded in a demo box) skips page-level
  // focus/scroll management — same pattern as Sheet.
  const target = container ?? (typeof document !== 'undefined' ? document.body : null);
  const contained = !!container && container !== document.body;

  // Escape + body scroll lock while open.
  useEffect(() => {
    if (!open || contained) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && canDismiss) onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, contained, canDismiss, onClose]);

  // Focus on open (initialFocus or the panel), return focus to the opener on close.
  useEffect(() => {
    if (!open || contained) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const target = initialFocus?.current ?? panelRef.current;
    target?.focus();
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

  // Focus trap: Tab cycles inside the panel.
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
      className={cx('ornie-modal', `ornie-modal--${placement}`, contained && 'ornie-modal--contained')}
      role="presentation"
      onKeyDown={trapFocus}
      onMouseDown={(event) => {
        if (canDismiss && event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={setPanelRef}
        tabIndex={-1}
        className={cx('ornie-modal__panel', `ornie-modal__panel--${size}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        {...rest}
      >
        {(title || description || showCloseButton) && (
          <div className="ornie-modal__header">
            <div className="ornie-modal__titles">
              {title && (
                <div id={titleId} className="ornie-modal__title">
                  {title}
                </div>
              )}
              {description && (
                <div id={descId} className="ornie-modal__description">
                  {description}
                </div>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                className="ornie-modal__close"
                aria-label="Close"
                onClick={() => onClose?.()}
              >
                <Icon name="x" size={16} />
              </button>
            )}
          </div>
        )}
        {children != null && (
          <div className={cx('ornie-modal__body', flush && 'ornie-modal__body--flush')}>{children}</div>
        )}
        {footer && <div className="ornie-modal__footer">{footer}</div>}
      </div>
    </div>,
    target,
  );
});
