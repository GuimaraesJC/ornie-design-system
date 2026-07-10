import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Beta' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="accent">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Failed</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="neutral" dot>
        Offline
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge size="sm" variant="accent">
        Small
      </Badge>
      <Badge size="md" variant="accent">
        Medium
      </Badge>
    </div>
  ),
};

/** Quiet counts for sidebar/dock (D:sidebar, 2n). Neutral by default; accent is opt-in. */
export const Count: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge count={1} />
      <Badge count={8} />
      <Badge count={142} />
      <Badge count={8} variant="accent" />
      <Badge count={8} size="sm" />
    </div>
  ),
};

/** Above `max` (default 99) the count settles into "99+". */
export const CountMax: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge count={142} />
      <Badge count={142} max={999} />
      <Badge count={1000} max={999} />
    </div>
  ),
};

/** `count={0}` renders nothing — an empty badge is silence. */
export const CountZero: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ color: 'var(--ornie-text-muted)', font: '13px var(--ornie-font-sans)' }}>
        count={'{0}'} renders nothing:
      </span>
      <Badge count={0} />
    </div>
  ),
};
