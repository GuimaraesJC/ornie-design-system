import type { Meta, StoryObj } from '@storybook/react';
import { SpacingScale } from './SpacingScale';

const meta = {
  title: 'Foundations/SpacingScale',
  component: SpacingScale,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SpacingScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
