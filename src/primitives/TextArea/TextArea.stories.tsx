import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  args: {
    label: 'Notes',
    placeholder: 'Anything worth remembering…',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <TextArea {...args} />
    </div>
  ),
};

export const WithHint: Story = {
  args: { hint: 'Saved as you type.' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <TextArea {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Journal entry',
    error: 'This entry could not be saved. It is kept locally.',
    defaultValue: 'Slow morning, good walk by the river.',
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <TextArea {...args} />
    </div>
  ),
};

export const Rows: Story = {
  args: { label: 'Journal entry', rows: 6 },
  render: (args) => (
    <div style={{ width: 280 }}>
      <TextArea {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <TextArea size="sm" label="Small" placeholder="Small textarea" rows={2} />
      <TextArea size="md" label="Medium" placeholder="Medium textarea" rows={3} />
      <TextArea size="lg" label="Large" placeholder="Large textarea" rows={3} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'This note is sealed in the Burrow.' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <TextArea {...args} />
    </div>
  ),
};
