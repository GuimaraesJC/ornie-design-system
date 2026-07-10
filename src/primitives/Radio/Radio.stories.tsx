import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: { label: 'Monthly billing' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio name="billing" label="Monthly billing" defaultChecked />
      <Radio name="billing" label="Yearly billing" />
      <Radio name="billing" label="Lifetime" disabled />
    </div>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 340 }}>
      <Radio
        name="plan"
        label="Starter"
        description="For personal projects. Up to 3 collaborators."
        defaultChecked
      />
      <Radio
        name="plan"
        label="Pro"
        description="For growing teams. Unlimited collaborators and history."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio name="disabled-demo" label="Disabled unchecked" disabled />
      <Radio name="disabled-demo" label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};
