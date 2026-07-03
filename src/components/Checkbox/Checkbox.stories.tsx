import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Email me product updates' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Usage analytics',
    description: 'Share anonymous usage data to help us improve Ornie.',
    defaultChecked: true,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Checkbox {...args} />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};
