import { Icon } from '../../primitives/Icon/Icon';
import { glyphs } from '../../primitives/Icon/glyphs.generated';
import type { IconName } from '../../primitives/Icon/glyphs.generated';
import { Section } from '../shared';

export interface IconsProps {
  /** Filter glyphs by substring (gallery convenience). */
  filter?: string;
}

/**
 * Icons — living reference for the curated glyph set: plain Ornie nouns,
 * stroke 1.9, round caps/joins, from Lucide (ISC). Add glyphs via
 * scripts/build-icons.mjs, never ad-hoc SVG.
 */
export function Icons({ filter }: IconsProps) {
  const names = (Object.keys(glyphs) as IconName[]).filter((n) => !filter || n.includes(filter));
  return (
    <Section label={`Icons — ${names.length} glyphs · stroke 1.9 · round caps/joins · plain nouns (D-40)`}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
          gap: 'var(--ornie-space-2)',
        }}
      >
        {names.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: 'var(--ornie-space-3) var(--ornie-space-2)',
              borderRadius: 'var(--ornie-radius-sm)',
              background: 'var(--ornie-surface)',
              color: 'var(--ornie-text-muted)',
            }}
          >
            <Icon name={name} />
            <span style={{ fontSize: '10.5px', color: 'var(--ornie-text-muted)' }}>{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
