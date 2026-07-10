import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { 'aria-label': 'Ask Ornie', children: <Icon name="sparkle" /> },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};

export const Outline: Story = {
  args: { variant: 'outline', size: 32 },
};

export const Filled: Story = {
  args: { variant: 'filled', 'aria-label': 'Add task', children: <Icon name="plus" /> },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ornie-space-2)' }}>
      <IconButton size={32} aria-label="Close">
        <Icon name="x" />
      </IconButton>
      <IconButton size={40} aria-label="Close">
        <Icon name="x" />
      </IconButton>
      <IconButton size={44} aria-label="Close">
        <Icon name="x" />
      </IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, 'aria-label': 'Search' },
};

export const EditorToolbar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ornie-space-1)' }}>
      <IconButton size={32} aria-label="Edit note">
        <Icon name="pen" size={16} />
      </IconButton>
      <IconButton size={32} aria-label="Add wikilink">
        <Icon name="link" size={16} />
      </IconButton>
      <IconButton size={32} aria-label="Add tag">
        <Icon name="tag" size={16} />
      </IconButton>
      <IconButton size={32} aria-label="More actions">
        <Icon name="dots-horizontal" size={16} />
      </IconButton>
    </div>
  ),
};
