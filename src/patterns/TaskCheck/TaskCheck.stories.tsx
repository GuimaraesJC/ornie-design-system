import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TaskCheck } from './TaskCheck';

const meta = {
  title: 'Components/TaskCheck',
  component: TaskCheck,
  args: { checked: false, onChange: () => {}, 'aria-label': 'Email design feedback to Sam' },
} satisfies Meta<typeof TaskCheck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <TaskCheck {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Checked: Story = {
  args: { checked: true },
};

export const DesktopDensity: Story = {
  args: { size: 'sm' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
