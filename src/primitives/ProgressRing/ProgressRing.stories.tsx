import type { Meta, StoryObj } from '@storybook/react';
import { ProgressRing } from './ProgressRing';

const meta = {
  title: 'Components/ProgressRing',
  component: ProgressRing,
  args: { value: 0.4 },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ornie-space-3)' }}>
      <ProgressRing size={16} value={0.4} label="Garden project progress" />
      <ProgressRing size={24} value={0.4} />
      <ProgressRing size={46} value={0.4} label="Day progress" />
    </div>
  ),
};

export const Values: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ornie-space-3)' }}>
      {[0, 0.3, 0.7, 1].map((v) => (
        <ProgressRing key={v} value={v} label={`Progress ${v * 100}%`} />
      ))}
    </div>
  ),
};

export const CenterSlot: Story = {
  args: { size: 46, value: 3 / 7, label: '3 of 7 done today', children: '3/7' },
};

export const CustomTrack: Story = {
  args: { size: 46, value: 0.6, trackColor: 'var(--ornie-accent-subtle)' },
};
