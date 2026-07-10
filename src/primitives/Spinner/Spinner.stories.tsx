import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ornie-space-4)' }}>
      <Spinner size={14} />
      <Spinner size={18} />
      <Spinner size={24} />
    </div>
  ),
};

export const SyncPending: Story = {
  render: () => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--ornie-space-2)',
        fontFamily: 'var(--ornie-font-sans)',
        fontSize: 'var(--ornie-text-sm)',
        color: 'var(--ornie-text-muted)',
      }}
    >
      <Spinner size={14} label="Sync in progress" />
      Syncing
    </span>
  ),
};
