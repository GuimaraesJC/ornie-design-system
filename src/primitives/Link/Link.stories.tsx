import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  args: { children: 'Read the sync guide', href: '#' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: 'muted', children: 'Learn how projects work' },
};

export const InSentence: Story = {
  render: () => (
    <p
      style={{
        margin: 0,
        maxWidth: 380,
        fontFamily: 'var(--ornie-font-sans)',
        fontSize: 'var(--ornie-text-md)',
        lineHeight: 1.5,
        color: 'var(--ornie-text)',
      }}
    >
      Your workspace syncs when you are online. See <Link href="#">how sync works</Link> or{' '}
      <Link href="#" variant="muted">
        manage devices
      </Link>{' '}
      in settings.
    </p>
  ),
};

export const ExternalLink: Story = {
  args: {
    href: 'https://ornie.app/docs',
    target: '_blank',
    rel: 'noreferrer',
    children: 'API reference',
  },
};
