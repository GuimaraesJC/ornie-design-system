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

export const Flat: Story = {
  args: { variant: 'flat' },
  render: (args) => (
    <Card {...args} style={{ width: 340 }}>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Quiet surface</div>
      <div style={{ color: 'var(--ornie-text-muted)', fontSize: 14, lineHeight: 1.5 }}>
        Flat cards sit flush with the page — a hairline edge, no shadow.
      </div>
    </Card>
  ),
};

export const Outlined: Story = {
  // variant="outlined" is deprecated (maps to "flat"; removed in 0.3.0) — this
  // story stays to prove the back-compat path. New code: see Flat.
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

export const Spine: Story = {
  args: { spine: true, padding: 'lg' },
  render: (args) => (
    <Card {...args} style={{ width: 380 }}>
      <div
        style={{
          fontSize: 11,
          color: 'var(--ornie-accent-text)',
          fontWeight: 700,
          letterSpacing: 1,
          marginBottom: 12,
        }}
      >
        RIGHT NOW
      </div>
      <div style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>Email design feedback to Sam</div>
      <div style={{ color: 'var(--ornie-text-muted)', fontSize: 13, marginTop: 8 }}>Website redesign · ~25 min</div>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 340 }}>
      <Card interactive onClick={() => {}}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Renders as a button</div>
        <div style={{ color: 'var(--ornie-text-muted)', fontSize: 13 }}>
          Hover wash, pointer cursor, standard focus ring.
        </div>
      </Card>
      <Card interactive href="#pages" variant="flat">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Renders as a link</div>
        <div style={{ color: 'var(--ornie-text-muted)', fontSize: 13 }}>Pass href to navigate instead of act.</div>
      </Card>
    </div>
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
      <Card padding="none" variant="flat">
        <div style={{ padding: 4 }}>No padding</div>
      </Card>
      <Card padding="sm" variant="flat">
        <div>Small padding</div>
      </Card>
      <Card padding="md" variant="flat">
        <div>Medium padding</div>
      </Card>
      <Card padding="lg" variant="flat">
        <div>Large padding</div>
      </Card>
    </div>
  ),
};
