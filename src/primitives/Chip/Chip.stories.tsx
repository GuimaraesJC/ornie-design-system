import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Chip } from './Chip';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'errands' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Selectable: Story = {
  render: () => {
    const [target, setTarget] = useState('today');
    const options = [
      ['today', 'Today'],
      ['week', 'This week'],
      ['someday', 'Someday'],
    ] as const;
    return (
      <div style={{ display: 'flex', gap: 'var(--ornie-space-2)' }}>
        {options.map(([id, label]) => (
          <Chip key={id} selected={target === id} onSelect={() => setTarget(id)}>
            {label}
          </Chip>
        ))}
      </div>
    );
  },
};

export const WithLeadingIcon: Story = {
  args: { leading: <Icon name="calendar" />, children: 'tomorrow 9:00' },
};

export const Removable: Story = {
  args: { onRemove: () => {}, removeLabel: 'Remove tag errands' },
};

export const SmallSize: Story = {
  args: { size: 'sm', leading: <Icon name="tag" /> },
};
