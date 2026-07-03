import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

/* Tiny inline portrait so image stories never depend on the network. */
const PORTRAIT =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="#f0977e"/>
      <circle cx="32" cy="24" r="11" fill="#521810"/>
      <path d="M10 60c0-12 10-18 22-18s22 6 22 18v4H10z" fill="#521810"/>
    </svg>`,
  );

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: 'Jean Guimarães' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const WithImage: Story = {
  args: { src: PORTRAIT, alt: 'Portrait of Jean' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="xs" name="Jean Guimarães" />
      <Avatar size="sm" name="Jean Guimarães" />
      <Avatar size="md" name="Jean Guimarães" />
      <Avatar size="lg" name="Jean Guimarães" />
      <Avatar size="xl" name="Jean Guimarães" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" />
      <Avatar name="Katherine Johnson" />
      <Avatar name="Edsger Dijkstra" />
    </div>
  ),
};

export const Square: Story = {
  args: { shape: 'square' },
};

export const Fallback: Story = {
  args: { name: undefined, alt: 'Unknown user' },
};
