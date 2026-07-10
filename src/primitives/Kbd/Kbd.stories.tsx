import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  args: { children: '⌘' },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleCaps: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ornie-space-2)' }}>
      <Kbd>⌘</Kbd>
      <Kbd>↵</Kbd>
      <Kbd>esc</Kbd>
      <Kbd>tab</Kbd>
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ornie-space-4)' }}>
      <Kbd keys={['⌘', 'K']} />
      <Kbd keys={['⌘', '/']} />
      <Kbd keys={['⌥', 'Space']} />
    </div>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 'var(--ornie-space-2) var(--ornie-space-6)',
        margin: 0,
        alignItems: 'center',
        fontFamily: 'var(--ornie-font-sans)',
        fontSize: 'var(--ornie-text-sm)',
        color: 'var(--ornie-text-muted)',
      }}
    >
      <dt>Quick capture</dt>
      <dd style={{ margin: 0 }}>
        <Kbd keys={['⌘', 'K']} />
      </dd>
      <dt>Quick Find</dt>
      <dd style={{ margin: 0 }}>
        <Kbd keys={['⌘', '/']} />
      </dd>
      <dt>Global capture</dt>
      <dd style={{ margin: 0 }}>
        <Kbd keys={['⌥', 'Space']} />
      </dd>
    </dl>
  ),
};

export const OnInverse: Story = {
  render: () => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--ornie-space-2)',
        padding: '6px 10px',
        borderRadius: 'var(--ornie-radius-sm)',
        background: 'var(--ornie-surface-inverse)',
        color: 'var(--ornie-text-inverse)',
        fontFamily: 'var(--ornie-font-sans)',
        fontSize: 'var(--ornie-text-xs)',
      }}
    >
      Quick Find
      <Kbd keys={['⌘', '/']} onInverse />
    </span>
  ),
};
