import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';
import type { SegmentedControlOption, SegmentedControlSize } from './SegmentedControl';

const appearance: SegmentedControlOption[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

function Controlled(props: {
  options: SegmentedControlOption[];
  initial: string;
  size?: SegmentedControlSize;
  'aria-label': string;
}) {
  const [value, setValue] = useState(props.initial);
  return (
    <SegmentedControl
      options={props.options}
      value={value}
      onChange={setValue}
      size={props.size}
      aria-label={props['aria-label']}
    />
  );
}

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: { options: appearance, value: 'light', onChange: () => {}, 'aria-label': 'Appearance' },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Controlled options={appearance} initial="light" aria-label="Appearance" />,
};

export const Small: Story = {
  render: () => (
    <Controlled
      size="sm"
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
      initial="week"
      aria-label="Scope"
    />
  ),
};

export const TwoOptions: Story = {
  render: () => (
    <Controlled
      options={[
        { value: 'local', label: 'Local' },
        { value: 'cloud', label: 'Cloud' },
      ]}
      initial="local"
      aria-label="Ask model"
    />
  ),
};

export const FourOptions: Story = {
  render: () => (
    <Controlled
      options={[
        { value: 'none', label: 'None' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ]}
      initial="low"
      aria-label="Energy"
    />
  ),
};

export const DisabledOption: Story = {
  render: () => (
    <Controlled
      options={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System', disabled: true },
      ]}
      initial="dark"
      aria-label="Appearance"
    />
  ),
};
