import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { glyphs } from './glyphs.generated';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'inbox' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ornie-space-4)', alignItems: 'center', color: 'var(--ornie-text-muted)' }}>
      <Icon name="inbox" size={16} />
      <Icon name="inbox" size={20} />
      <Icon name="inbox" size={24} />
    </div>
  ),
};

export const AllGlyphs: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 96px)',
        gap: 'var(--ornie-space-3)',
        color: 'var(--ornie-text-muted)',
      }}
    >
      {(Object.keys(glyphs) as Array<keyof typeof glyphs>).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Icon name={name} />
          <span style={{ fontSize: '10.5px', color: 'var(--ornie-text-subtle)' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
