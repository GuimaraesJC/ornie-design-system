import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TaskRow } from './TaskRow';
import { MetaLine } from '../MetaLine/MetaLine';
import { ProjectDot } from '../ProjectDot/ProjectDot';
import { Icon } from '../../primitives/Icon/Icon';

const meta: Meta<typeof TaskRow> = {
  title: 'Components/TaskRow',
  component: TaskRow,
  args: { title: 'Email design feedback to Sam' },
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 420, background: 'var(--ornie-surface)', padding: '0 16px', borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskRow>;

export const Default: Story = {
  render: (args) => {
    const [done, setDone] = useState(false);
    return <TaskRow {...args} state={done ? 'done' : 'default'} onToggle={() => setDone(!done)} />;
  },
};

export const WithMeta: Story = {
  args: {
    onToggle: () => {},
    meta: (
      <MetaLine>
        <span>9:00</span>
        <ProjectDot color="moss" label="Garden project" />
        <span>
          <Icon name="repeat" size={16} /> weekly
        </span>
      </MetaLine>
    ),
  },
};

export const Done: Story = {
  args: { state: 'done', onToggle: () => {} },
};

export const Waiting: Story = {
  args: {
    state: 'waiting',
    onToggle: () => {},
    meta: (
      <MetaLine>
        <span>
          <Icon name="person" size={16} /> waiting on Sam
        </span>
      </MetaLine>
    ),
  },
};

export const Resurfaced: Story = {
  args: { state: 'resurfaced', onToggle: () => {} },
};

export const DesktopDensity: Story = {
  args: { density: 'desktop', onToggle: () => {}, trailing: <Icon name="chevron-right" size={16} /> },
};

export const OpensDetail: Story = {
  args: { onToggle: () => {}, onOpen: () => {}, trailing: <Icon name="chevron-right" size={16} /> },
};
