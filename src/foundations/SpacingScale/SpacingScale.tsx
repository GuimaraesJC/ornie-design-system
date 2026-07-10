import { Section, TokenValue } from './shared';

const STEPS = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16'] as const;

export interface SpacingScaleProps {}

/** Living reference for the 4px spacing grid. Bars are actual size. */
export function SpacingScale(_props: SpacingScaleProps) {
  return (
    <div className="ornie-foundation">
      <div className="ornie-foundation__title">Spacing — 4px grid</div>
      <Section label="space-1 … space-16 (bars are actual size)">
        {STEPS.map((step) => (
          <div key={step} className="ornie-foundation__spec-row" style={{ alignItems: 'center' }}>
            <div className="ornie-foundation__spec-meta">
              <span className="ornie-foundation__token">space-{step}</span>
              <TokenValue token={`--ornie-space-${step}`} />
            </div>
            <div className="ornie-foundation__bar" style={{ width: `var(--ornie-space-${step})` }} />
          </div>
        ))}
      </Section>
    </div>
  );
}
