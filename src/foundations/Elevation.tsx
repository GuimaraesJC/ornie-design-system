import { Section, Swatch, TokenValue } from './shared';

const SHADOWS = [
  { name: 'sm', note: 'inputs, secondary buttons' },
  { name: 'md', note: 'elevated cards' },
  { name: 'lg', note: 'modals' },
] as const;

export interface ElevationProps {}

/**
 * Living reference for elevation, stacking, and motion. Motion is shown as a
 * static spec on purpose — calm by design, nothing animates in a reference card.
 */
export function Elevation(_props: ElevationProps) {
  return (
    <div className="ornie-foundation">
      <div className="ornie-foundation__title">Elevation</div>
      <Section label="shadows (warm-tinted, low)">
        <div className="ornie-foundation__row" style={{ gap: 'var(--ornie-space-6)' }}>
          {SHADOWS.map(({ name, note }) => (
            <div
              key={name}
              className="ornie-foundation__shadow-card"
              style={{ boxShadow: `var(--ornie-shadow-${name})` }}
            >
              <div className="ornie-foundation__token">shadow-{name}</div>
              <div className="ornie-foundation__value">{note}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section label="overlay">
        <div className="ornie-foundation__row">
          <Swatch token="--ornie-overlay" />
        </div>
      </Section>
      <Section label="stacking">
        <div className="ornie-foundation__row" style={{ gap: 'var(--ornie-space-6)' }}>
          <span className="ornie-foundation__token">
            z-modal: <TokenValue token="--ornie-z-modal" />
          </span>
          <span className="ornie-foundation__token">
            z-tooltip: <TokenValue token="--ornie-z-tooltip" />
          </span>
        </div>
      </Section>
      <Section label="motion (opt-out via prefers-reduced-motion)">
        <div className="ornie-foundation__row" style={{ gap: 'var(--ornie-space-6)' }}>
          <span className="ornie-foundation__token">
            duration-fast: <TokenValue token="--ornie-duration-fast" />
          </span>
          <span className="ornie-foundation__token">
            duration-normal: <TokenValue token="--ornie-duration-normal" />
          </span>
          <span className="ornie-foundation__token">
            ease: <TokenValue token="--ornie-ease" />
          </span>
        </div>
      </Section>
    </div>
  );
}
