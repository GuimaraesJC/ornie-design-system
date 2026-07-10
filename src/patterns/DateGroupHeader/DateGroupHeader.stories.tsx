import type { Meta, StoryObj } from '@storybook/react';
import { DateGroupHeader } from './DateGroupHeader';
import { ListRow } from '../ListRow/ListRow';

const meta = {
  title: 'Components/DateGroupHeader',
  component: DateGroupHeader,
  args: { children: 'Friday, July 3' },
} satisfies Meta<typeof DateGroupHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RelativeName: Story = {
  args: { children: 'Tomorrow · Saturday' },
};

export const WithTrailingCount: Story = {
  args: { children: 'Monday', trailing: '4' },
};

export const Sticky: Story = {
  render: () => (
    <div style={{ height: 180, overflowY: 'auto', background: 'var(--ornie-bg)' }}>
      <DateGroupHeader sticky>Tomorrow · Saturday</DateGroupHeader>
      <ListRow title="Pack for Porto — passports, chargers" description="Porto trip · 25 min" />
      <ListRow title="Water plants before leaving" />
      <DateGroupHeader sticky>Monday</DateGroupHeader>
      <ListRow title="Homepage wireframe — first pass" description="Website redesign · 45 min" />
      <ListRow title="Review Q3 budget draft" description="Q3 finances" />
      <ListRow title="Book dentist follow-up" />
    </div>
  ),
};
