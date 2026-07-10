import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

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

/** Controlled RadioGroup — name, checked state and onChange flow to the
 *  child radios via context. Arrow keys move the selection. */
export const ControlledGroup: Story = {
  render: () => {
    const [theme, setTheme] = useState('system');
    return (
      <RadioGroup
        label="Appearance"
        description="Riverbed at night follows your device when set to system."
        value={theme}
        onChange={setTheme}
        style={{ width: 340 }}
      >
        <Radio value="light" label="Light" />
        <Radio value="dark" label="Dark" />
        <Radio value="system" label="System" />
      </RadioGroup>
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    const [density, setDensity] = useState('phone');
    return (
      <RadioGroup label="Density" orientation="horizontal" value={density} onChange={setDensity}>
        <Radio value="phone" label="Comfortable" />
        <Radio value="desktop" label="Compact" />
      </RadioGroup>
    );
  },
};

export const GroupWithRadioDescriptions: Story = {
  render: () => {
    const [start, setStart] = useState('today');
    return (
      <RadioGroup label="Start my day on" value={start} onChange={setStart} style={{ width: 360 }}>
        <Radio value="today" label="Today" description="Tasks and events for the current day." />
        <Radio value="inbox" label="Inbox" description="Everything captured and not yet sorted." />
        <Radio value="last" label="Where I left off" description="The last view from the previous session." />
      </RadioGroup>
    );
  },
};
