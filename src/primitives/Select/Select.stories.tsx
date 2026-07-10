import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const PLANS = [
  { value: 'starter', label: 'Starter — free' },
  { value: 'pro', label: 'Pro — $12/month' },
  { value: 'team', label: 'Team — $48/month' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Plan',
    options: PLANS,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 'pro' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args} />
    </div>
  ),
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose a plan…' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args} />
    </div>
  ),
};

export const WithHint: Story = {
  args: { defaultValue: 'starter', hint: 'You can change plans at any time.' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: { placeholder: 'Choose a plan…', error: 'Please select a plan to continue.' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Select size="sm" label="Small" options={PLANS} defaultValue="starter" />
      <Select size="md" label="Medium" options={PLANS} defaultValue="pro" />
      <Select size="lg" label="Large" options={PLANS} defaultValue="team" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'starter' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args} />
    </div>
  ),
};
