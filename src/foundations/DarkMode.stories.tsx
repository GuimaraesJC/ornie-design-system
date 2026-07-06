import type { Meta, StoryObj } from '@storybook/react';
import { DarkMode } from './DarkMode';

const meta = {
  title: 'Foundations/DarkMode',
  component: DarkMode,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DarkMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
