import { useEffect, useId } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  /** Whether the dialog is shown. */
  open: boolean;
  /** Called on Escape, overlay click, or the close button. */
  onClose?: () => void;
  title?: ReactNode;
  /** Secondary line under the title. */
  description?: ReactNode;
  children?: ReactNode;
  /** Action row, right-aligned (typically Buttons). */
  footer?: ReactNode;
  /** Panel max width. @default 'md' */
  size?: ModalSize;
  /** @default true */
  closeOnOverlayClick?: boolean;
  /** @default true */
  showCloseButton?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
}: ModalProps) {
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="ornie-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        className={cx('ornie-modal__panel', `ornie-modal__panel--${size}`)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
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
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        {children != null && <div className="ornie-modal__body">{children}</div>}
        {footer && <div className="ornie-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
