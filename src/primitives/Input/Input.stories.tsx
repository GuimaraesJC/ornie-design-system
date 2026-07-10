import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';

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
    leading: <Icon name="search" />,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithTrailingClear: Story = {
  args: { label: 'Capture', placeholder: 'What needs doing?' },
  render: (args) => {
    const [value, setValue] = useState('water the ferns tomorrow');
    return (
      <div style={{ width: 280 }}>
        <Input
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          trailing={
            value ? (
              <IconButton aria-label="Clear" size={32} onClick={() => setValue('')}>
                <Icon name="x" size={16} />
              </IconButton>
            ) : undefined
          }
        />
      </div>
    );
  },
};

export const WithKbdHint: Story = {
  args: {
    label: 'Quick find',
    placeholder: 'Search notes and tasks…',
    leading: <Icon name="search" />,
    trailing: (
      <span
        style={{
          fontSize: 11,
          lineHeight: '16px',
          padding: '1px 5px',
          border: '1px solid var(--ornie-border)',
          borderRadius: 5,
          color: 'var(--ornie-text-muted)',
        }}
      >
        ⌘/
      </span>
    ),
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const MobileCapture: Story = {
  args: {
    label: 'Capture',
    placeholder: 'What needs doing?',
    size: 'lg',
    inputMode: 'text',
    enterKeyHint: 'done',
    autoComplete: 'off',
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
