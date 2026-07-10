import type { Meta, StoryObj } from '@storybook/react';
import { ListSection } from './ListSection';
import { ListRow } from '../ListRow/ListRow';
import { Badge } from '../../primitives/Badge/Badge';
import { Button } from '../../primitives/Button/Button';
import { Icon } from '../../primitives/Icon/Icon';
import { Switch } from '../../primitives/Switch/Switch';

const meta = {
  title: 'Components/ListSection',
  component: ListSection,
} satisfies Meta<typeof ListSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = (padded = false) => (
  <>
    <ListRow padded={padded} title="Pack for Porto — passports, chargers" description="Porto trip · 25 min" />
    <ListRow padded={padded} title="Buy Sam's birthday card" description="10 min" />
    <ListRow padded={padded} title="Water plants before leaving" />
  </>
);

export const Default: Story = {
  args: { label: 'This weekend' },
  render: (args) => <ListSection {...args}>{rows()}</ListSection>,
};

export const WithTrailingCount: Story = {
  render: () => (
    <ListSection label="Waiting" trailing={<Badge count={3} />}>
      {rows()}
    </ListSection>
  ),
};

export const CardSurface: Story = {
  render: () => (
    <ListSection label="On this phone" surface="card">
      <ListRow padded interactive onClick={() => {}} title="Appearance" trailing="Riverbed · Light" chevron />
      <ListRow padded interactive onClick={() => {}} title="Today density" trailing="Focused" chevron />
      <ListRow padded title="Quiet hours" trailing={<Switch aria-label="Quiet hours" defaultChecked />} />
    </ListSection>
  ),
};

export const WithTrailingAction: Story = {
  render: () => (
    <ListSection
      label="Recently deleted"
      trailing={
        <Button variant="ghost" size="sm">
          Empty
        </Button>
      }
    >
      {rows()}
    </ListSection>
  ),
};

export const AsHeading: Story = {
  render: () => (
    <ListSection label="Sealed · 3 entries" as="h3" surface="card">
      <ListRow padded leading={<Icon name="lock" size={16} />} title="Unlock with Face ID" trailing={<Switch aria-label="Unlock with Face ID" defaultChecked />} />
      <ListRow padded leading={<Icon name="clock" size={16} />} title="Auto-seal after" trailing="5 minutes" chevron interactive onClick={() => {}} />
    </ListSection>
  ),
};
