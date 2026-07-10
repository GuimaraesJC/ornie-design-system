import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormField } from './FormField';
import { Checkbox } from '../../primitives/Checkbox/Checkbox';
import { Input } from '../../primitives/Input/Input';

const meta = {
  title: 'Components/FormField',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Project name',
    help: 'Shown in the sidebar and on task rows.',
    children: <Input placeholder="Garden" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Passphrase',
    error: 'Passphrase needs at least 8 characters',
    children: <Input type="password" defaultValue="otter" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Passphrase',
    required: true,
    help: 'Lost passphrase means lost entries. Keep the recovery code safe.',
    children: <Input type="password" required />,
  },
};

export const CheckboxGroup: Story = {
  args: { label: 'Sync scope', children: null },
  render: () => {
    const [scope, setScope] = useState({ tasks: true, notes: true, journal: false });
    const toggle = (key: keyof typeof scope) => setScope((s) => ({ ...s, [key]: !s[key] }));
    return (
      <FormField label="Sync scope" help="Choose what this device keeps locally.">
        <Checkbox label="Tasks" checked={scope.tasks} onChange={() => toggle('tasks')} />
        <Checkbox label="Notes" checked={scope.notes} onChange={() => toggle('notes')} />
        <Checkbox label="Journal" checked={scope.journal} onChange={() => toggle('journal')} />
      </FormField>
    );
  },
};

export const GroupWithError: Story = {
  args: { label: 'Reminder days', children: null },
  render: () => (
    <FormField label="Reminder days" error="Pick at least one day">
      <Checkbox label="Weekdays" />
      <Checkbox label="Weekends" />
    </FormField>
  ),
};
