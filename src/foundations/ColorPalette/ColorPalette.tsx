import { Section, Swatch } from '../shared';

const SCALES: Record<string, string[]> = {
  river: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  sand: ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '1000'],
  fur: ['50', '100', '200', '300', '500', '700', '900'],
  moss: ['50', '100', '200', '300', '500', '600', '700', '900'],
  clay: ['50', '100', '200', '300', '500', '600', '700', '900'],
  rust: ['50', '100', '300', '500', '600', '700', '900'],
};

const ROLES: Record<string, string[]> = {
  'Surfaces': ['bg', 'surface', 'surface-sunken', 'surface-hover'],
  'Text': ['text', 'text-muted', 'text-subtle', 'text-on-accent'],
  'Borders': ['border', 'border-strong', 'border-hover', 'border-subtle'],
  'Accent': ['accent', 'accent-hover', 'accent-active', 'accent-subtle', 'accent-subtle-border', 'accent-text'],
  'Success': ['success', 'success-subtle', 'success-text'],
  'Warning': ['warning', 'warning-subtle', 'warning-text'],
  'Danger': ['danger', 'danger-hover', 'danger-active', 'danger-subtle', 'danger-text'],
  'Inverse & overlay': ['inverse-surface', 'inverse-text', 'overlay'],
};

export interface ColorPaletteProps {
  /** Show the raw Layer 1 scales. @default true */
  showScales?: boolean;
  /** Show the Layer 2 semantic roles (resolved for the active theme). @default true */
  showRoles?: boolean;
}

/**
 * Living reference for the Riverbed palette: the raw scales (Layer 1) and the
 * semantic roles components consume (Layer 2). Values are read from the live
 * cascade, so the card always shows the active theme's truth.
 */
export function ColorPalette({ showScales = true, showRoles = true }: ColorPaletteProps) {
  return (
    <div className="ornie-foundation">
      {showScales && (
        <>
          <div className="ornie-foundation__title">Palette — Layer 1 scales</div>
          {Object.entries(SCALES).map(([scale, stops]) => (
            <Section key={scale} label={scale}>
              <div className="ornie-foundation__row">
                {stops.map((stop) => (
                  <Swatch key={stop} token={`--ornie-${scale}-${stop}`} compact />
                ))}
              </div>
            </Section>
          ))}
        </>
      )}
      {showRoles && (
        <>
          <div className="ornie-foundation__title">Semantic roles — Layer 2 (build with these)</div>
          {Object.entries(ROLES).map(([group, roles]) => (
            <Section key={group} label={group}>
              <div className="ornie-foundation__row">
                {roles.map((role) => (
                  <Swatch key={role} token={`--ornie-${role}`} />
                ))}
              </div>
            </Section>
          ))}
        </>
      )}
    </div>
  );
}
