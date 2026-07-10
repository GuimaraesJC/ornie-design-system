import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Get started' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete project' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button leading={<Icon name="plus" />}>New project</Button>
      <Button variant="secondary" trailing={<Icon name="chevron-right" />}>
        Continue
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Button {...args} />
    </div>
  ),
};

/** `iconStart`/`iconEnd` still render (mapped to `leading`/`trailing`) and warn once in dev. Removed in 0.3.0. */
export const DeprecatedIconProps: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button iconStart={<Icon name="plus" />}>iconStart (deprecated)</Button>
      <Button variant="secondary" iconEnd={<Icon name="chevron-right" />}>
        iconEnd (deprecated)
      </Button>
    </div>
  ),
};
