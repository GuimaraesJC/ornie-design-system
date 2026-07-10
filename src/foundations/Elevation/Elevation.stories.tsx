import type { Meta, StoryObj } from '@storybook/react';
import { Elevation } from './Elevation';

const meta = {
  title: 'Foundations/Elevation',
  component: Elevation,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Elevation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
