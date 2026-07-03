import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Notifications' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Weekly digest',
    description: 'A summary of activity across your projects, every Monday.',
    defaultChecked: true,
  },
  render: (args) => (
    <div style={{ width: 340 }}>
      <Switch {...args} />
    </div>
  ),
};

export const Small: Story = {
  args: { size: 'sm', label: 'Compact mode' },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
