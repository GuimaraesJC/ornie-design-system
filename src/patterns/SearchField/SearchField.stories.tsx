import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: { value: '', onChange: () => {} },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return <SearchField value={query} onChange={setQuery} />;
  },
};

export const WithKbdHint: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return <SearchField value={query} onChange={setQuery} kbd={['⌘', '/']} placeholder="Quick find" />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [query, setQuery] = useState('garden');
    return <SearchField value={query} onChange={setQuery} kbd={['⌘', '/']} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-3)' }}>
        <SearchField size="sm" value={query} onChange={setQuery} placeholder="Search notes" />
        <SearchField size="md" value={query} onChange={setQuery} />
        <SearchField size="lg" value={query} onChange={setQuery} />
      </div>
    );
  },
};
