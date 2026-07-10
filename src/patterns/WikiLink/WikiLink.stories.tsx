import type { Meta, StoryObj } from '@storybook/react';
import { WikiLink } from './WikiLink';
import { Prose } from '../Prose/Prose';

const meta = {
  title: 'Components/WikiLink',
  component: WikiLink,
  args: { children: 'Moodboard directions', href: '#' },
} satisfies Meta<typeof WikiLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unresolved: Story = {
  args: { unresolved: true, children: 'Porto trip — packing' },
};

export const InText: Story = {
  render: () => (
    <p
      style={{
        margin: 0,
        maxWidth: '48ch',
        fontSize: 'var(--ornie-text-md)',
        lineHeight: 1.65,
        color: 'var(--ornie-text)',
      }}
    >
      Type scale reference lives in <WikiLink href="#">Moodboard directions</WikiLink> — keep them
      in sync. Full packing brain-dump lives in{' '}
      <WikiLink href="#" unresolved>
        Porto trip — packing
      </WikiLink>
      .
    </p>
  ),
};

export const InsideProse: Story = {
  render: () => (
    <Prose style={{ maxWidth: '48ch' }}>
      <p>
        Went through the latest build with Sam. Spacing notes moved to{' '}
        <WikiLink href="#">Design feedback from Sam</WikiLink>, and the follow-ups will live in{' '}
        <WikiLink href="#" unresolved>
          Website redesign — round two
        </WikiLink>
        .
      </p>
    </Prose>
  ),
};
