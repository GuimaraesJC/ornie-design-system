import type { Meta, StoryObj } from '@storybook/react';
import { TriageCard } from './TriageCard';
import { ProjectDot } from '../../patterns/ProjectDot/ProjectDot';

const targets = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'someday', label: 'Someday' },
  { value: 'porto', label: 'Porto trip', leading: <ProjectDot color="clay" /> },
  { value: 'website', label: 'Website redesign', leading: <ProjectDot color="river" /> },
];

const plainTargets = targets.map(({ value, label }) => ({ value, label }));

const meta: Meta<typeof TriageCard> = {
  title: 'Components/TriageCard',
  component: TriageCard,
  args: {
    text: 'Book dentist appointment',
    source: ['via share sheet', '2h ago'],
    targets,
    onDecide: () => {},
    progress: { current: 3, total: 7 },
    swipeHint: true,
  },
  // Cards are width: 100% of their column — stories set one via parameters.width.
  decorators: [
    (Story, context) => (
      <div style={{ maxWidth: `${context.parameters.width ?? 400}px` }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TriageCard>;

export const Default: Story = {};

export const NoLeadingIcons: Story = {
  args: { targets: plainTargets },
};

export const LongCapturedText: Story = {
  args: {
    text: 'Idea from the walk: a monthly dinner with Laura & Ben, rotating who cooks, and maybe invite the neighbours from the third floor once it settles into a rhythm',
    source: ['typed', 'yesterday'],
  },
};

export const ProgressStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-4)' }}>
      <TriageCard {...args} progress={{ current: 1, total: 7 }} />
      <TriageCard {...args} progress={{ current: 6, total: 7 }} />
    </div>
  ),
};

export const WithoutSwipeHint: Story = {
  args: { swipeHint: false },
};

export const Minimal: Story = {
  args: {
    source: undefined,
    progress: undefined,
    swipeHint: false,
    targets: plainTargets,
  },
};

export const DesktopWidth: Story = {
  parameters: { width: 540 },
};
