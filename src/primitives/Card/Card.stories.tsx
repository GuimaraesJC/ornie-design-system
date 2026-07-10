import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 340 }}>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Weekly report</div>
      <div style={{ color: 'var(--ornie-text-muted)', fontSize: 14, lineHeight: 1.5 }}>
        Your projects had 1,284 visitors this week — up 12% from last week.
      </div>
    </Card>
  ),
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
  render: (args) => (
    <Card {...args} style={{ width: 340 }}>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Quiet surface</div>
      <div style={{ color: 'var(--ornie-text-muted)', fontSize: 14, lineHeight: 1.5 }}>
        Outlined cards sit flush with the page — no shadow, just a border.
      </div>
    </Card>
  ),
};

export const Sunken: Story = {
  args: { variant: 'sunken' },
  render: (args) => (
    <Card {...args} style={{ width: 340 }}>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Sunken surface</div>
      <div style={{ color: 'var(--ornie-text-muted)', fontSize: 14, lineHeight: 1.5 }}>
        For grouping content inside another surface.
      </div>
    </Card>
  ),
};

export const ProfileExample: Story = {
  render: () => (
    <Card style={{ width: 360 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name="Jean Guimarães" size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700 }}>Jean Guimarães</div>
          <div style={{ color: 'var(--ornie-text-muted)', fontSize: 13 }}>Product designer</div>
        </div>
        <Badge variant="success" dot>
          Online
        </Badge>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid var(--ornie-border)',
        }}
      >
        <Button size="sm">Message</Button>
        <Button size="sm" variant="secondary">
          View profile
        </Button>
      </div>
    </Card>
  ),
};

export const Paddings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <Card padding="sm" variant="outlined">
        <div>Small padding</div>
      </Card>
      <Card padding="md" variant="outlined">
        <div>Medium padding</div>
      </Card>
      <Card padding="lg" variant="outlined">
        <div>Large padding</div>
      </Card>
    </div>
  ),
};
