import type { Meta, StoryObj } from '@storybook/react';
import { DayRing } from './DayRing';

const meta = {
  title: 'Components/DayRing',
  component: DayRing,
  args: { done: 2, planned: 5 },
} satisfies Meta<typeof DayRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllDone: Story = {
  args: { done: 5, planned: 5 },
};

export const RestingDay: Story = {
  args: { done: 0, planned: 0 },
};

export const FreshMorning: Story = {
  args: { done: 0, planned: 4 },
};
