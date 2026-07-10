import type { Meta, StoryObj } from '@storybook/react';
import { MetaLine } from './MetaLine';
import { ProjectDot } from '../ProjectDot/ProjectDot';
import { Icon } from '../../primitives/Icon/Icon';

const meta = {
  title: 'Components/MetaLine',
  component: MetaLine,
} satisfies Meta<typeof MetaLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MetaLine>
      <span>9:00</span>
      <ProjectDot color="moss" label="Garden project" />
      <span>25m</span>
    </MetaLine>
  ),
};

export const FullRun: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <MetaLine>
        <span>tomorrow 9:00</span>
        <ProjectDot color="clay" label="Kitchen reno" />
        <span>#errands</span>
        <span>25m</span>
        <span>
          <Icon name="repeat" size={16} /> weekly
        </span>
      </MetaLine>
    </div>
  ),
};

export const ConditionalFragments: Story = {
  render: () => (
    <MetaLine>
      <span>today</span>
      {null}
      {false}
      <span>15m</span>
    </MetaLine>
  ),
};
