import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Copy to clipboard',
    children: <Button variant="secondary">Copy</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 32,
        padding: 48,
      }}
    >
      <Tooltip content="Appears above" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Appears below" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Appears to the left" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Appears to the right" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content:
      'Tooltips wrap once they hit 240px, so longer explanations stay readable instead of stretching across the screen.',
    children: <Button variant="ghost">Hover for details</Button>,
  },
};

export const WithShortcut: Story = {
  args: {
    content: 'Quick Find',
    kbd: ['⌘', '/'],
    children: <Button variant="ghost">Search</Button>,
  },
};

export const ControlledOpen: Story = {
  args: {
    open: true,
    content: 'Pinned open via the controlled prop',
    children: <Button variant="secondary">Always described</Button>,
  },
};
