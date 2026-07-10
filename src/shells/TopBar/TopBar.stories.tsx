import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { Icon } from '../../primitives/Icon/Icon';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { DayRing } from '../../patterns/DayRing/DayRing';

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  args: { title: 'Today' },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullSlots: Story = {
  args: {
    title: 'Inbox',
    leading: (
      <IconButton aria-label="Expand sidebar" size={32}>
        <Icon name="chevron-right" size={16} />
      </IconButton>
    ),
    trailing: (
      <>
        <IconButton aria-label="Search" size={32}>
          <Icon name="search" size={16} />
        </IconButton>
        <DayRing done={2} planned={5} />
        <IconButton aria-label="Ask Ornie" variant="outline" size={32}>
          <Icon name="sparkle" size={16} />
        </IconButton>
      </>
    ),
  },
};

export const Scrolled: Story = {
  args: { title: 'Upcoming', scrolled: true },
};

export const LongTitleTruncation: Story = {
  render: () => (
    <div style={{ width: '360px', border: '1px solid var(--ornie-border)' }}>
      <TopBar
        title="Modules / GitHub / anthropics/ornie-design-system pull requests"
        leading={
          <IconButton aria-label="Back" size={32}>
            <Icon name="chevron-left" size={16} />
          </IconButton>
        }
        trailing={
          <IconButton aria-label="Ask Ornie" variant="outline" size={32}>
            <Icon name="sparkle" size={16} />
          </IconButton>
        }
      />
    </div>
  ),
};
