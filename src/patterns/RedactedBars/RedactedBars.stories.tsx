import type { Meta, StoryObj } from '@storybook/react';
import { RedactedBars } from './RedactedBars';
import { SealBadge } from '../SealBadge/SealBadge';

const meta = {
  title: 'Components/RedactedBars',
  component: RedactedBars,
  args: { seed: 'entry-1', style: { maxWidth: 320 } },
} satisfies Meta<typeof RedactedBars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OrganicList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-4)', maxWidth: 320 }}>
      {['entry-1', 'entry-2', 'entry-3', 'entry-4', 42].map((seed) => (
        <RedactedBars key={String(seed)} seed={seed} />
      ))}
    </div>
  ),
};

export const FixedTwoBars: Story = {
  args: { seed: 'entry-3', bars: 2 },
};

export const FixedThreeBars: Story = {
  args: { seed: 'entry-3', bars: 3 },
};

export const BurrowLockedEntry: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ornie-space-3)',
        maxWidth: 320,
        padding: '14px 16px',
        background: 'var(--ornie-surface)',
        border: '1px solid var(--ornie-border)',
        borderRadius: 'var(--ornie-radius-lg)',
      }}
    >
      <SealBadge />
      <RedactedBars seed="journal-2026-07-08" label="Sealed journal entry" />
    </div>
  ),
};
