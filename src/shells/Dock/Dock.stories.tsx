import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dock } from './Dock';

const meta: Meta<typeof Dock> = {
  title: 'Components/Dock',
  component: Dock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 390, paddingTop: 48 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dock>;

export const Default: Story = {
  render: () => {
    const [view, setView] = useState('today');
    return (
      <Dock
        items={[
          { icon: 'sun', label: 'Today', active: view === 'today', onSelect: () => setView('today') },
          { icon: 'inbox', label: 'Inbox', badge: 3, active: view === 'inbox', onSelect: () => setView('inbox') },
          { icon: 'calendar', label: 'Upcoming', active: view === 'upcoming', onSelect: () => setView('upcoming') },
          { icon: 'grid', label: 'Browse', active: view === 'browse', onSelect: () => setView('browse') },
        ]}
        capture={{ onPress: () => {} }}
      />
    );
  },
};

export const WithoutCapture: Story = {
  args: {
    items: [
      { icon: 'sun', label: 'Today', active: true, onSelect: () => {} },
      { icon: 'inbox', label: 'Inbox', onSelect: () => {} },
      { icon: 'calendar', label: 'Upcoming', onSelect: () => {} },
      { icon: 'grid', label: 'Browse', onSelect: () => {} },
    ],
  },
};
