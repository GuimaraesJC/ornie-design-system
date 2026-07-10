import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';

const ITEMS = [
  {
    label: 'Overview',
    content: 'A quick summary of your project: recent activity, visitors, and health checks.',
  },
  {
    label: 'Analytics',
    content: 'Traffic sources, conversion funnels, and weekly trends live here.',
  },
  {
    label: 'Settings',
    content: 'Rename the project, manage collaborators, or transfer ownership.',
  },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { items: ITEMS },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  render: (args) => (
    <div style={{ width: 420 }}>
      <Tabs {...args} />
    </div>
  ),
};

export const Pills: Story = {
  args: { variant: 'pills' },
  render: (args) => (
    <div style={{ width: 420 }}>
      <Tabs {...args} />
    </div>
  ),
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      ...ITEMS.slice(0, 2),
      { label: 'Billing', content: 'Billing is managed by your workspace owner.', disabled: true },
    ],
  },
  render: (args) => (
    <div style={{ width: 420 }}>
      <Tabs {...args} />
    </div>
  ),
};

export const SecondTabActive: Story = {
  args: { defaultIndex: 1 },
  render: (args) => (
    <div style={{ width: 420 }}>
      <Tabs {...args} />
    </div>
  ),
};

export const SmallSize: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 420 }}>
      <Tabs {...args} />
      <Tabs {...args} variant="pills" />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    return (
      <div style={{ width: 420 }}>
        <Tabs {...args} index={index} onChange={setIndex} />
        <div style={{ marginTop: 16, fontSize: 13, color: 'var(--ornie-text-muted)' }}>
          Active view: {index + 1} of {args.items.length}
        </div>
      </div>
    );
  },
};
