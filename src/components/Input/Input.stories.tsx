import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const SearchIcon = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithHint: Story = {
  args: { hint: "We'll never share your email." },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    error: 'That email address looks invalid.',
    defaultValue: 'jean@ornie',
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search projects…',
    iconStart: SearchIcon,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Locked value' },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};
