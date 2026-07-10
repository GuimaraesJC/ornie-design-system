import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Icon } from '../../primitives/Icon/Icon';
import { Button } from '../../primitives/Button/Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    title: 'Inbox is clear',
    children: 'New captures land here first — sort them whenever you’re ready.',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: <Icon name="inbox" /> },
};

export const WithAction: Story = {
  args: {
    icon: <Icon name="inbox" />,
    action: (
      <Button variant="secondary" size="sm">
        Capture something
      </Button>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Nothing waiting on anyone',
    children: undefined,
  },
};

export const Trash: Story = {
  args: {
    icon: <Icon name="trash" />,
    title: 'Trash is empty',
    children: 'Nothing here screams. Items rest for 30 days, then leave on their own.',
  },
};

export const Logbook: Story = {
  args: {
    icon: <Icon name="journal" />,
    title: 'Nothing logged yet',
    children: 'Finished tasks gather here at the close of each day.',
    action: (
      <Button variant="ghost" size="sm">
        Go to Today
      </Button>
    ),
  },
};
