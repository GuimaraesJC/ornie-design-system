import { useEffect, useRef, useState } from 'react';

/*
 * Internal helpers for the foundation reference components. Values shown next
 * to token names are read from the live cascade (getComputedStyle), so the
 * cards can never disagree with the stylesheet they document.
 */

function toHex(cssColor: string): string {
  const m = cssColor.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+%?))?\s*\)$/);
  if (!m) return cssColor;
  const hex = (n: string) => Number(n).toString(16).padStart(2, '0');
  const alpha = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  const base = `#${hex(m[1])}${hex(m[2])}${hex(m[3])}`;
  return alpha >= 1 ? base : `${base} ${Math.round(alpha * 100)}%`;
}

/** A labeled color chip: renders `var(<token>)` and reports the resolved value. */
export function Swatch({ token, compact }: { token: string; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (ref.current) setValue(toHex(getComputedStyle(ref.current).backgroundColor));
  }, [token]);
  return (
    <div className={compact ? 'ornie-foundation__swatch ornie-foundation__swatch--compact' : 'ornie-foundation__swatch'}>
      <div ref={ref} className="ornie-foundation__chip" style={{ background: `var(${token})` }} />
      <div className="ornie-foundation__token">{token.replace('--ornie-', '')}</div>
      {!compact && <div className="ornie-foundation__value">{value}</div>}
    </div>
  );
}

/** Renders the resolved text of a custom property (durations, z-index, easing). */
export function TokenValue({ token }: { token: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).getPropertyValue(token).trim());
  }, [token]);
  return (
    <span ref={ref} className="ornie-foundation__value">
      {value}
    </span>
  );
}

export function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ornie-foundation__section">
      <div className="ornie-foundation__label">{label}</div>
      {children}
    </div>
  );
}
