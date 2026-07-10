import type { Meta, StoryObj } from '@storybook/react';
import { WeekDots } from './WeekDots';

const meta = {
  title: 'Components/WeekDots',
  component: WeekDots,
  args: { values: [true, true, false, true, true, false, false] },
} satisfies Meta<typeof WeekDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyWeek: Story = {
  args: { values: [false, false, false, false, false, false, false] },
};

export const FullWeek: Story = {
  args: { values: [true, true, true, true, true, true, true] },
};

export const TodayMidWeek: Story = {
  args: {
    values: [true, true, false, true, true, false, false],
    todayIndex: 4,
  },
};

export const TodayNotYetDone: Story = {
  args: {
    values: [true, true, true, false, false, false, false],
    todayIndex: 3,
  },
};

export const CustomLabel: Story = {
  args: {
    values: [true, false, true, true, false, false, false],
    todayIndex: 3,
    label: 'Morning pages, 3 of 7 days this week',
  },
};

export const InAHabitRow: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ornie-space-3)',
        padding: '14px 16px',
        background: 'var(--ornie-surface)',
        border: '1px solid var(--ornie-border)',
        borderRadius: 'var(--ornie-radius-lg)',
        maxWidth: 360,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Morning pages</div>
        <div style={{ fontSize: 11.5, color: 'var(--ornie-text-subtle)' }}>before anything else opens</div>
      </div>
      <WeekDots values={[true, true, true, true, true, true, false]} todayIndex={5} />
    </div>
  ),
};
