import type { Meta, StoryObj } from '@storybook/react';
import { SealBadge } from './SealBadge';
import { TaskRow } from '../TaskRow/TaskRow';
import { MetaLine } from '../MetaLine/MetaLine';

const meta = {
  title: 'Components/SealBadge',
  component: SealBadge,
} satisfies Meta<typeof SealBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Detail: Story = {
  args: { detail: true },
};

export const CustomLabel: Story = {
  args: { label: 'Selado' },
};

export const InTaskRowTrailing: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <TaskRow
        title="Therapy notes — Tuesday"
        meta={<MetaLine>Burrow</MetaLine>}
        trailing={<SealBadge />}
        onToggle={() => {}}
      />
    </div>
  ),
};
