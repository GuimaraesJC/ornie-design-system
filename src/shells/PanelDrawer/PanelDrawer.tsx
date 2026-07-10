import { forwardRef, useEffect, useId, useRef } from 'react';
import type { HTMLAttributes, KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { Icon } from '../../primitives/Icon/Icon';
import './PanelDrawer.css';

export type PanelDrawerMode = 'inline' | 'overlay';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface PanelDrawerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Whether the panel is shown (controlled). `false` renders nothing in both modes. */
  open: boolean;
  /** Called on the close button — and on Escape / scrim tap in overlay mode. */
  onClose?: () => void;
  /**
   * `inline` renders in normal flow — the app's flex row pushes content aside
   * (desktop Ask panel). `overlay` portals over an `--ornie-overlay` scrim
   * with full dialog semantics (tablet, 1z). @default 'inline'
   */
  mode?: PanelDrawerMode;
  /** Header title (14/semibold per the Ask panel mockup). */
  title?: ReactNode;
  /** Secondary line under the title (11.5 `--ornie-text-subtle`). */
  description?: ReactNode;
  /** Slot before the titles — the Ask sparkle tile. Decorative (`aria-hidden`). */
  leading?: ReactNode;
  /** Pinned below the scrollable body — the Ask input row lives here. */
  footer?: ReactNode;
  /** Accessible name for the close button. @default 'Close panel' */
  closeLabel?: string;
  /** @default true */
  showCloseButton?: boolean;
  /** Overlay mode: focused on open; defaults to the panel. */
  initialFocus?: RefObject<HTMLElement>;
  /** Overlay mode: Escape and scrim tap close the panel. @default true */
  dismissible?: boolean;
  /** Overlay mode portal target — for embedding/testing (grids); apps normally omit it. */
  container?: Element | null;
}

/**
 * PanelDrawer — the 372px right side panel with its own left hairline.
 * Inline it sits in the app's flex row (desktop Ask panel, future detail
 * panels); as an overlay it floats over the wash (tablet). See
 * PanelDrawer.prompt.md. Screens: D:Ask panel (inline), 2d tablet base,
 * 1z tablet overlay (COVERAGE_MATRIX).
 */
export const PanelDrawer = forwardRef<HTMLElement, PanelDrawerProps>(function PanelDrawer(
  {
    open,
    onClose,
    mode = 'inline',
    title,
    description,
    leading,
    footer,
    closeLabel = 'Close panel',
    showCloseButton = true,
    initialFocus,
    dismissible = true,
    container,
    className,
    children,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement | null>(null);
  const overlay = mode === 'overlay';

  // Overlay portal target; contained (embedded in a demo box) skips
  // page-level focus/scroll management — same pattern as Sheet/Modal.
  const target = container ?? (typeof document !== 'undefined' ? document.body : null);
  const contained = !!container && container !== document.body;
  const managed = open && overlay && !contained;

  // Overlay: Escape + body scroll lock while open.
  useEffect(() => {
    if (!managed) return;
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
  }, [managed, dismissible, onClose]);

  // Overlay: focus on open, return focus to the opener on close.
  useEffect(() => {
    if (!managed) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTarget = initialFocus?.current ?? panelRef.current;
    focusTarget?.focus();
    return () => {
      opener?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-focusing on ref identity churn would steal focus
  }, [managed]);

  if (!open) return null;

  const setPanelRef = (node: HTMLElement | null) => {
    panelRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  // Overlay focus trap: Tab cycles inside the panel.
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

  const hasHeader = title || description || leading || showCloseButton;

  // Overlay mode is a dialog — role="dialog" is not allowed on <aside>, so
  // the element switches: complementary landmark inline, plain div overlay.
  const Root = overlay ? 'div' : 'aside';
  const panel = (
    <Root
      ref={setPanelRef}
      tabIndex={overlay ? -1 : undefined}
      className={cx('ornie-panel-drawer', `ornie-panel-drawer--${mode}`, className)}
      role={overlay ? 'dialog' : undefined}
      aria-modal={overlay ? true : undefined}
      aria-labelledby={title ? titleId : undefined}
      {...rest}
    >
      {hasHeader && (
        <div className="ornie-panel-drawer__header">
          {leading && (
            <div className="ornie-panel-drawer__leading" aria-hidden="true">
              {leading}
            </div>
          )}
          {(title || description) && (
            <div className="ornie-panel-drawer__titles">
              {title && (
                <div id={titleId} className="ornie-panel-drawer__title">
                  {title}
                </div>
              )}
              {description && <div className="ornie-panel-drawer__description">{description}</div>}
            </div>
          )}
          {showCloseButton && (
            <IconButton
              size={32}
              variant="ghost"
              aria-label={closeLabel}
              className="ornie-panel-drawer__close"
              onClick={() => onClose?.()}
            >
              <Icon name="x" size={16} />
            </IconButton>
          )}
        </div>
      )}
      {/* tabIndex 0: the scrollable body must be keyboard-reachable */}
      <div className="ornie-panel-drawer__body" tabIndex={0}>
        {children}
      </div>
      {footer && <div className="ornie-panel-drawer__footer">{footer}</div>}
    </Root>
  );

  if (!overlay) return panel;
  if (!target) return null;

  return createPortal(
    <div
      className={cx('ornie-panel-drawer__scrim', contained && 'ornie-panel-drawer__scrim--contained')}
      role="presentation"
      onKeyDown={trapFocus}
      onMouseDown={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose?.();
      }}
    >
      {panel}
    </div>,
    target,
  );
});
