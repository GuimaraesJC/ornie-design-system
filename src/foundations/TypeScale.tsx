import { Section, TokenValue } from './shared';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
const WEIGHTS = ['regular', 'medium', 'semibold', 'bold', 'extrabold'] as const;

const SPECIMEN = 'A calm river over warm stone';

export interface TypeScaleProps {}

/** Living reference for the Manrope type scale, weights, and line heights. */
export function TypeScale(_props: TypeScaleProps) {
  return (
    <div className="ornie-foundation">
      <div className="ornie-foundation__title">Type scale</div>
      <Section label={'font-sans — Manrope'}>
        {SIZES.map((size) => (
          <div key={size} className="ornie-foundation__spec-row">
            <div className="ornie-foundation__spec-meta">
              <span className="ornie-foundation__token">text-{size}</span>
              <TokenValue token={`--ornie-text-${size}`} />
            </div>
            <span style={{ fontSize: `var(--ornie-text-${size})`, lineHeight: 'var(--ornie-leading-tight)' }}>
              {SPECIMEN}
            </span>
          </div>
        ))}
      </Section>
      <Section label="weights">
        {WEIGHTS.map((weight) => (
          <div key={weight} className="ornie-foundation__spec-row">
            <div className="ornie-foundation__spec-meta">
              <span className="ornie-foundation__token">weight-{weight}</span>
              <TokenValue token={`--ornie-weight-${weight}`} />
            </div>
            <span style={{ fontWeight: `var(--ornie-weight-${weight})` }}>{SPECIMEN}</span>
          </div>
        ))}
      </Section>
      <Section label="line heights">
        <div className="ornie-foundation__row">
          {(['tight', 'normal'] as const).map((leading) => (
            <div key={leading} style={{ flex: '1 1 240px' }}>
              <span className="ornie-foundation__token">
                leading-{leading} (<TokenValue token={`--ornie-leading-${leading}`} />)
              </span>
              <p style={{ margin: 0, lineHeight: `var(--ornie-leading-${leading})` }}>
                Riverbeds are shaped slowly. The water never argues with the stone; it just keeps
                choosing the quiet path until the path is the river.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
