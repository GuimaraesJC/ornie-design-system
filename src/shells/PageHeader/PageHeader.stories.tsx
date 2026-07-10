import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { DayRing } from '../../patterns/DayRing/DayRing';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { Icon } from '../../primitives/Icon/Icon';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  args: { children: 'Upcoming' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const askButton = (
  <IconButton variant="outline" size={32} aria-label="Ask Ornie">
    <Icon name="sparkle" size={16} />
  </IconButton>
);

export const Default: Story = {};

export const Greeting: Story = {
  args: {
    variant: 'greeting',
    kicker: 'Friday, July 3',
    subtitle: '3 things for today',
    trailing: (
      <>
        <DayRing done={2} planned={5} />
        {askButton}
      </>
    ),
    children: 'Good morning, Jean',
  },
};

export const View: Story = {
  args: {
    children: 'Logbook',
    subtitle: '23 things this week. Quietly impressive.',
  },
};

export const ViewWithKicker: Story = {
  args: {
    kicker: 'This week',
    children: 'Weekly review',
    trailing: askButton,
  },
};

export const HeadingLevel: Story = {
  args: { as: 'h2', children: 'Rendered as an h2' },
};

export const LongTitle: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <PageHeader
        variant="greeting"
        kicker="Friday, July 3"
        subtitle="3 things for today"
        trailing={
          <>
            <DayRing done={2} planned={5} />
            {askButton}
          </>
        }
      >
        Good morning, Jean-Sebastien of the very long name
      </PageHeader>
    </div>
  ),
};
