import type { Meta, StoryObj } from '@storybook/react';
import { Motion } from './Motion';

const meta = {
  title: 'Foundations/Motion',
  component: Motion,
} satisfies Meta<typeof Motion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Reference: Story = {};
