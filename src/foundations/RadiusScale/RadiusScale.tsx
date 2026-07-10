import { Section, TokenValue } from '../shared';

const RADII = [
  { name: 'xs', note: 'chips, bars' },
  { name: 'sm', note: 'small controls' },
  { name: 'md', note: 'controls' },
  { name: 'lg', note: 'cards, modals' },
  { name: 'full', note: 'pills, avatars' },
] as const;

export interface RadiusScaleProps {}

/** Living reference for the radius scale. */
export function RadiusScale(_props: RadiusScaleProps) {
  return (
    <div className="ornie-foundation">
      <div className="ornie-foundation__title">Radii</div>
      <Section label="radius-xs … radius-full">
        <div className="ornie-foundation__row">
          {RADII.map(({ name, note }) => (
            <div key={name} className="ornie-foundation__swatch" style={{ width: 96 }}>
              <div
                className="ornie-foundation__tile"
                style={{ borderRadius: `var(--ornie-radius-${name})` }}
              />
              <span className="ornie-foundation__token">radius-{name}</span>
              <TokenValue token={`--ornie-radius-${name}`} />
              <span className="ornie-foundation__value">{note}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
