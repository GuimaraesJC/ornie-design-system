import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

export const IndeterminateWithDescription: Story = {
  args: {
    label: 'Select all',
    description: 'Two of five checklist items are selected.',
    indeterminate: true,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Checkbox {...args} />
    </div>
  ),
};

/** Controlled "select all" over a partial selection — the mixed flag is
 *  restored after every click, so it never gets stuck cleared. */
export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = useState([true, false, true]);
    const all = items.every(Boolean);
    const none = items.every((v) => !v);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
        <Checkbox
          label="Select all"
          checked={all}
          indeterminate={!all && !none}
          onChange={() => setItems(items.map(() => !all))}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 30 }}>
          {['Water the ferns', 'Order compost', 'Sharpen the shears'].map((label, i) => (
            <Checkbox
              key={label}
              label={label}
              checked={items[i]}
              onChange={() => setItems(items.map((v, j) => (j === i ? !v : v)))}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Disabled mixed" disabled indeterminate />
    </div>
  ),
};
