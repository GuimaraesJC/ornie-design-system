import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import './RedactedBars.css';

export interface RedactedBarsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Stable identity of the sealed item (its id, title hash, …). Bar count
   * and widths are derived deterministically from it, so a list looks
   * organic but never shuffles between renders.
   */
  seed: string | number;
  /** Force the bar count instead of deriving it from the seed. */
  bars?: 2 | 3;
  /** Accessible name. @default 'Sealed content' */
  label?: string;
}

/** Fixed width set the seed picks from — organic, but only ever these. */
const WIDTHS = [72, 88, 55, 64, 81, 47];

/**
 * FNV-1a over the stringified seed: tiny, stable, good-enough spread.
 * Bar count = 2 + lowest bit; bar i picks WIDTHS[(hash >> i*5) % 6],
 * nudged one slot forward when it would repeat the bar above it.
 */
function hashSeed(seed: string | number): number {
  const s = String(seed);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function widthsFor(hash: number, count: number): number[] {
  const out: number[] = [];
  let prev = -1;
  for (let i = 0; i < count; i++) {
    let idx = (hash >>> (i * 5)) % WIDTHS.length;
    if (idx === prev) idx = (idx + 1) % WIDTHS.length;
    prev = idx;
    out.push(WIDTHS[idx]);
  }
  return out;
}

/**
 * RedactedBars — the stand-in for sealed content: two or three quiet
 * rounded bars. Deliberate concealment, not loading — it never animates.
 * See RedactedBars.prompt.md.
 * Screens: Burrow locked list (hub §04), locked notification previews (COVERAGE_MATRIX).
 */
export const RedactedBars = forwardRef<HTMLDivElement, RedactedBarsProps>(function RedactedBars(
  { seed, bars, label = 'Sealed content', className, ...rest },
  ref,
) {
  const hash = hashSeed(seed);
  const count = bars ?? 2 + (hash & 1);
  const widths = widthsFor(hash, count);
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cx('ornie-redactedbars', className)}
      {...rest}
    >
      {widths.map((width, i) => (
        <span key={i} className="ornie-redactedbars__bar" style={{ width: `${width}%` }} />
      ))}
    </div>
  );
});
