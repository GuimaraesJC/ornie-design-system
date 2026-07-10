import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import './Kbd.css';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /**
   * Key sequence — each entry renders as its own cap with a tight gap
   * (`keys={['⌘','K']}` → two caps). Wins over `children` when both are set.
   */
  keys?: string[];
  /** Single-cap content when `keys` is not given (e.g. `<Kbd>esc</Kbd>`). */
  children?: ReactNode;
  /**
   * Restyle for inverse surfaces (the Tooltip bubble): transparent ground,
   * `--ornie-text-inverse` ink, hairline in the same ink. @default false
   */
  onInverse?: boolean;
}

/**
 * Kbd — key caps for keyboard shortcuts (⌘K, ⌘/, ⌥Space, ↵, esc).
 * Decorative when it repeats information already available (tooltips); the
 * parent hides it from assistive tech. See Kbd.prompt.md.
 * Screens: D:tooltips, CommandOverlay footer, D:settings shortcuts.
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { keys, onInverse = false, className, children, ...rest },
  ref,
) {
  const caps: ReactNode[] = keys ?? [children];
  return (
    <kbd
      ref={ref}
      className={cx('ornie-kbd', onInverse && 'ornie-kbd--inverse', className)}
      {...rest}
    >
      {caps.map((cap, index) => (
        <kbd key={index} className="ornie-kbd__key">
          {cap}
        </kbd>
      ))}
    </kbd>
  );
});
