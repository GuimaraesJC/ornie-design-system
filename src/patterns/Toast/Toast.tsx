import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { FocusEvent, HTMLAttributes, ReactNode, TransitionEvent } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';
import './Toast.css';

/** Auto-dismiss delay. Long on purpose — undo needs time (D-50). */
const DEFAULT_DURATION = 8000;
/** Safety net in case `transitionend` never fires (display:none ancestors etc.). */
const LEAVE_FALLBACK_MS = 600;

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Single action label ("Undo", "Open") — rendered as a semibold underlined
   * text button in `--ornie-text-inverse` after a quiet `·` separator.
   */
  action?: ReactNode;
  /** Called when the action is pressed. */
  onAction?: () => void;
}

/**
 * Toast — the presentational pill: `--ornie-surface-inverse` background,
 * 13px `--ornie-text-inverse` message, optional "message · Action" pattern.
 * Positioning, queueing, and the live region belong to `<ToastHost>`.
 * See Toast.prompt.md. Screens: undo everywhere (complete/delete/triage),
 * export-ready, device-added, 1n close-day.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { action, onAction, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('ornie-toast', className)} {...rest}>
      <span className="ornie-toast__message">{children}</span>
      {action != null && (
        <>
          <span className="ornie-toast__sep" aria-hidden="true">
            ·
          </span>
          <button type="button" className="ornie-toast__action" onClick={() => onAction?.()}>
            {action}
          </button>
        </>
      )}
    </div>
  );
});

export interface ToastOptions {
  /** The one-line message. Plain words, no exclamation marks. */
  message: ReactNode;
  /** Single action label — see `ToastProps.action`. */
  action?: ReactNode;
  /** Called when the action is pressed (the toast then dismisses itself). */
  onAction?: () => void;
  /**
   * ms before auto-dismiss. The timer pauses while the pointer hovers the
   * toast or focus is inside it. @default 8000
   */
  duration?: number;
}

export interface ToastContextValue {
  /** Enqueue a toast. Returns an id usable with `dismiss`. */
  toast: (options: ToastOptions) => number;
  /** Dismiss the visible toast (animated) or drop a queued one. */
  dismiss: (id: number) => void;
}

interface QueuedToast extends ToastOptions {
  id: number;
}

interface ToastInternalValue {
  queue: QueuedToast[];
  leavingId: number | undefined;
  dismiss: (id: number) => void;
  remove: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);
const ToastInternalContext = createContext<ToastInternalValue | null>(null);

export interface ToastProviderProps {
  children?: ReactNode;
}

/**
 * ToastProvider — owns the toast queue. Wrap the app once, render one
 * `<ToastHost />` inside it, and call `useToast()` anywhere below.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [queue, setQueue] = useState<QueuedToast[]>([]);
  const [leavingId, setLeavingId] = useState<number | undefined>(undefined);
  const idRef = useRef(1);
  const queueRef = useRef(queue);
  queueRef.current = queue;

  const toast = useCallback((options: ToastOptions) => {
    const id = idRef.current++;
    setQueue((q) => [...q, { ...options, id }]);
    return id;
  }, []);

  // Visible toast → start the leave transition; queued toast → drop silently.
  const dismiss = useCallback((id: number) => {
    if (queueRef.current[0]?.id === id) {
      setLeavingId(id);
    } else {
      setQueue((q) => q.filter((t) => t.id !== id));
    }
  }, []);

  // Called by the host when the leave transition finishes.
  const remove = useCallback((id: number) => {
    setQueue((q) => q.filter((t) => t.id !== id));
    setLeavingId((current) => (current === id ? undefined : current));
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  const internal = useMemo(
    () => ({ queue, leavingId, dismiss, remove }),
    [queue, leavingId, dismiss, remove],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastInternalContext.Provider value={internal}>{children}</ToastInternalContext.Provider>
    </ToastContext.Provider>
  );
}

/**
 * useToast — `{ toast(options), dismiss(id) }`. Must be called below a
 * `<ToastProvider>`.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>.');
  return ctx;
}

export interface ToastHostProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * ToastHost — bottom-centered, portalled to `document.body`. Renders at most
 * ONE toast; new toasts queue behind the visible one (never stack). The
 * region is `aria-live="polite"` — nothing in Ornie is assertive — and it is
 * mounted persistently so screen readers announce the first toast too.
 */
export const ToastHost = forwardRef<HTMLDivElement, ToastHostProps>(function ToastHost(
  { className, ...rest },
  ref,
) {
  const internal = useContext(ToastInternalContext);
  if (!internal) throw new Error('ToastHost must be rendered inside <ToastProvider>.');
  // The throw above is unconditional relative to context, so hook order is stable.
  /* eslint-disable react-hooks/rules-of-hooks */
  const { queue, leavingId, dismiss, remove } = internal;
  const current = queue[0];
  const currentId = current?.id;
  const leaving = currentId !== undefined && leavingId === currentId;

  const [entering, setEntering] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const remainingRef = useRef(0);
  const startedAtRef = useRef(0);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);

  const pauseTimer = useCallback(() => {
    if (timeoutRef.current === undefined) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
    remainingRef.current -= Date.now() - startedAtRef.current;
  }, []);

  const resumeTimer = useCallback(() => {
    if (currentId === undefined || leaving || timeoutRef.current !== undefined) return;
    startedAtRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = undefined;
      dismiss(currentId);
    }, Math.max(remainingRef.current, 0));
  }, [currentId, leaving, dismiss]);

  // Pause while hovered OR focus is within — both must clear to resume.
  const syncTimer = useCallback(() => {
    if (hoveredRef.current || focusedRef.current) pauseTimer();
    else resumeTimer();
  }, [pauseTimer, resumeTimer]);

  // New visible toast: play the enter transition, arm the auto-dismiss timer.
  useEffect(() => {
    if (currentId === undefined) return;
    // Fresh element — clear pause flags left stale if the previous toast
    // unmounted while hovered/focused (no leave/blur fires in that case).
    hoveredRef.current = false;
    focusedRef.current = false;
    setEntering(true);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntering(false));
    });
    remainingRef.current = current?.duration ?? DEFAULT_DURATION;
    if (!hoveredRef.current && !focusedRef.current) {
      startedAtRef.current = Date.now();
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = undefined;
        dismiss(currentId);
      }, remainingRef.current);
    }
    return () => {
      cancelAnimationFrame(raf);
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by toast identity only
  }, [currentId, dismiss]);

  // Leaving: stop the timer and keep a fallback in case transitionend is lost.
  useEffect(() => {
    if (!leaving || currentId === undefined) return;
    pauseTimer();
    const fallback = setTimeout(() => remove(currentId), LEAVE_FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, [leaving, currentId, pauseTimer, remove]);
  /* eslint-enable react-hooks/rules-of-hooks */

  if (typeof document === 'undefined') return null;

  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (leaving && currentId !== undefined && event.propertyName === 'opacity') {
      remove(currentId);
    }
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    focusedRef.current = false;
    syncTimer();
  };

  return createPortal(
    <div ref={ref} className={cx('ornie-toast-host', className)} aria-live="polite" {...rest}>
      {current && (
        <Toast
          key={current.id}
          className={cx(entering && 'ornie-toast--entering', leaving && 'ornie-toast--leaving')}
          action={current.action}
          onAction={() => {
            current.onAction?.();
            dismiss(current.id);
          }}
          onMouseEnter={() => {
            hoveredRef.current = true;
            syncTimer();
          }}
          onMouseLeave={() => {
            hoveredRef.current = false;
            syncTimer();
          }}
          onFocus={() => {
            focusedRef.current = true;
            syncTimer();
          }}
          onBlur={onBlur}
          onTransitionEnd={onTransitionEnd}
        >
          {current.message}
        </Toast>
      )}
    </div>,
    document.body,
  );
});
