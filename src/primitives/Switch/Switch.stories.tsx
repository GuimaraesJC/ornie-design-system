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

/** Default placement is `start`: text left, control right — the settings-row
 *  layout. Stretch the switch to the row width and the track sits flush right. */
export const SettingsRow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Switch
        label="Auto-seal"
        description="Seal the Burrow after 15 minutes of inactivity."
        defaultChecked
        style={{ width: '100%' }}
      />
      <Switch label="Calendar module" description="Show events beside today's tasks." style={{ width: '100%' }} />
    </div>
  ),
};

export const LabelPlacementEnd: Story = {
  args: {
    labelPlacement: 'end',
    label: 'Weekly digest',
    description: 'Control first, text after — for dense inline uses.',
  },
  render: (args) => (
    <div style={{ width: 340 }}>
      <Switch {...args} />
    </div>
  ),
};

export const Bare: Story = {
  args: { label: undefined, 'aria-label': 'Notifications', defaultChecked: true },
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
