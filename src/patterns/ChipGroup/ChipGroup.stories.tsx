import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChipGroup } from './ChipGroup';
import type { ChipGroupOption } from './ChipGroup';
import { Icon } from '../../primitives/Icon/Icon';

const targets: ChipGroupOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'someday', label: 'Someday' },
];

const meta = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  args: { mode: 'single', options: targets, value: 'today', onChange: () => {}, 'aria-label': 'Triage target' },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    const [target, setTarget] = useState<string | null>('today');
    return (
      <ChipGroup mode="single" aria-label="Triage target" options={targets} value={target} onChange={setTarget} />
    );
  },
};

export const SingleRequired: Story = {
  render: () => {
    const [scope, setScope] = useState<string | null>('week');
    return (
      <ChipGroup
        mode="single"
        required
        aria-label="Scope"
        options={targets}
        value={scope}
        onChange={setScope}
      />
    );
  },
};

export const Multi: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['errands']);
    return (
      <ChipGroup
        mode="multi"
        aria-label="Tags"
        options={[
          { value: 'errands', label: 'errands' },
          { value: 'home', label: 'home' },
          { value: 'focus', label: 'focus' },
          { value: 'calls', label: 'calls' },
        ]}
        value={tags}
        onChange={setTags}
      />
    );
  },
};

export const WithLeading: Story = {
  render: () => {
    const [filter, setFilter] = useState<string | null>('scheduled');
    return (
      <ChipGroup
        mode="single"
        size="sm"
        aria-label="Filter"
        options={[
          { value: 'scheduled', label: 'Scheduled', leading: <Icon name="calendar" /> },
          { value: 'tagged', label: 'Tagged', leading: <Icon name="tag" /> },
          { value: 'waiting', label: 'Waiting', leading: <Icon name="person" /> },
        ]}
        value={filter}
        onChange={setFilter}
      />
    );
  },
};

export const DisabledOption: Story = {
  render: () => {
    const [target, setTarget] = useState<string | null>('today');
    return (
      <ChipGroup
        mode="single"
        aria-label="Triage target"
        options={[
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'This week' },
          { value: 'project', label: 'Garden project', disabled: true },
        ]}
        value={target}
        onChange={setTarget}
      />
    );
  },
};
