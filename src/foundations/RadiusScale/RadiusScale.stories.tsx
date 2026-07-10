import type { Meta, StoryObj } from '@storybook/react';
import { RadiusScale } from './RadiusScale';

const meta = {
  title: 'Foundations/RadiusScale',
  component: RadiusScale,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RadiusScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
