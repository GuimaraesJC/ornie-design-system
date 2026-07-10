import type { Meta, StoryObj } from '@storybook/react';
import { ColorPalette } from './ColorPalette';

const meta = {
  title: 'Foundations/ColorPalette',
  component: ColorPalette,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

export const DarkTheme: Story = {
  render: () => (
    <div data-ornie-theme="dark" className="ornie-app" style={{ padding: 24, borderRadius: 16 }}>
      <ColorPalette showScales={false} />
    </div>
  ),
};
