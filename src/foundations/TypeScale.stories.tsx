import type { Meta, StoryObj } from '@storybook/react';
import { TypeScale } from './TypeScale';

const meta = {
  title: 'Foundations/TypeScale',
  component: TypeScale,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TypeScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
