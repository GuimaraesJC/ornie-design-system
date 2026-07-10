import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

const rowStyle: CSSProperties = {
  padding: '12px 16px',
  fontFamily: 'var(--ornie-font-sans)',
  fontSize: 'var(--ornie-text-md)',
  color: 'var(--ornie-text)',
};

export const Default: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Divider />
    </div>
  ),
};

export const BetweenRows: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        background: 'var(--ornie-surface)',
        border: '1px solid var(--ornie-border)',
        borderRadius: 'var(--ornie-radius-lg)',
        overflow: 'hidden',
      }}
    >
      <div style={rowStyle}>Water the ferns</div>
      <Divider inset="md" />
      <div style={rowStyle}>Renew library card</div>
      <Divider inset="md" />
      <div style={rowStyle}>Sketch the pond layout</div>
    </div>
  ),
};

export const Insets: Story = {
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-6)' }}>
      <Divider inset="none" />
      <Divider inset="md" />
      <Divider inset="lg" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 'var(--ornie-space-3)',
        fontFamily: 'var(--ornie-font-sans)',
        fontSize: 'var(--ornie-text-sm)',
        color: 'var(--ornie-text-muted)',
      }}
    >
      <span>Today</span>
      <Divider orientation="vertical" />
      <span>This week</span>
      <Divider orientation="vertical" />
      <span>Someday</span>
    </div>
  ),
};
