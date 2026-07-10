import { useState } from 'react';
import { Section, TokenValue } from '../shared';
import { Spinner } from '../../primitives/Spinner/Spinner';
import { Button } from '../../primitives/Button/Button';

export interface MotionProps {}

/**
 * Motion — living reference for the motion tokens. Ornie's whole motion
 * vocabulary is two durations, two eases, and one spin period; everything
 * collapses under prefers-reduced-motion in the token layer (D-01).
 */
export function Motion(_: MotionProps) {
  const [nudged, setNudged] = useState(false);

  const demo = (duration: string, ease: string) => (
    <span
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        borderRadius: 4,
        background: 'var(--ornie-accent)',
        transform: nudged ? 'translateX(72px)' : 'none',
        transition: `transform var(${duration}) var(${ease})`,
      }}
    />
  );

  const row = (name: string, note: string, sample: React.ReactNode) => (
    <div
      key={name}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ornie-space-4)',
        padding: 'var(--ornie-space-2) 0',
      }}
    >
      <code style={{ width: 240, flex: 'none', fontSize: 'var(--ornie-text-xs)' }}>{name}</code>
      <span style={{ width: 120, flex: 'none' }}>
        <TokenValue token={name} />
      </span>
      <span style={{ width: 110, flex: 'none' }}>{sample}</span>
      <span style={{ fontSize: 'var(--ornie-text-sm)', color: 'var(--ornie-text-muted)' }}>{note}</span>
    </div>
  );

  return (
    <div>
      <Section label="Durations & eases — the entire vocabulary">
        <div style={{ marginBottom: 'var(--ornie-space-3)' }}>
          <Button size="sm" variant="secondary" onClick={() => setNudged(!nudged)}>
            Play
          </Button>
        </div>
        {row('--ornie-duration-quick', 'hover washes, ink changes, focus', demo('--ornie-duration-quick', '--ornie-ease-out'))}
        {row('--ornie-duration-gentle', 'checks drawing in, sheets rising, toasts', demo('--ornie-duration-gentle', '--ornie-ease-inout'))}
        {row('--ornie-ease-out', 'the default curve', demo('--ornie-duration-gentle', '--ornie-ease-out'))}
        {row('--ornie-ease-inout', 'movement that settles', demo('--ornie-duration-gentle', '--ornie-ease-inout'))}
        {row('--ornie-duration-spin', 'the one continuous animation', <Spinner label="Demo spinner" />)}
      </Section>
      <Section label="Reduced motion — handled once, in the token layer">
        <p style={{ margin: 0, fontSize: 'var(--ornie-text-sm)', color: 'var(--ornie-text-muted)', maxWidth: '56ch' }}>
          Under prefers-reduced-motion the token layer collapses every duration
          to 1ms (transitions become instant) and pauses the spin
          (<code>--ornie-spin-state: paused</code>) — components never write
          that media query themselves. Nothing in Ornie ever animates without
          the user acting first: no entrances, no pulses, no attention motion (D-01).
        </p>
      </Section>
    </div>
  );
}
