import type { Meta, StoryObj } from '@storybook/react';
import { ProjectDot } from './ProjectDot';

const meta = {
  title: 'Components/ProjectDot',
  component: ProjectDot,
} satisfies Meta<typeof ProjectDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: 'river', label: 'Companion app' },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--ornie-text-muted)' }}>
      <ProjectDot color="river" label="Companion app" />
      <ProjectDot color="moss" label="Garden project" />
      <ProjectDot color="clay" label="Kitchen reno" />
      <ProjectDot color="fur" label="Personal" />
      <ProjectDot color="rust" label="Tax return" />
    </div>
  ),
};

export const DotOnly: Story = {
  args: { color: 'moss' },
};
