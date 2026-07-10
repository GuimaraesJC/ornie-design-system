import type { Meta, StoryObj } from '@storybook/react';
import { ListRow } from './ListRow';
import { Avatar } from '../../primitives/Avatar/Avatar';
import { Badge } from '../../primitives/Badge/Badge';
import { Icon } from '../../primitives/Icon/Icon';
import { Switch } from '../../primitives/Switch/Switch';

const meta = {
  title: 'Components/ListRow',
  component: ListRow,
  args: { title: 'Appearance' },
} satisfies Meta<typeof ListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    title: 'Porto ideas',
    description: 'Tram 28 at golden hour, the bookshop near the bridge…',
  },
};

export const DesktopDensity: Story = {
  args: { density: 'desktop', title: 'Homepage wireframe — first pass' },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => {},
    title: 'Appearance',
    trailing: 'Riverbed · Light',
    chevron: true,
  },
};

export const AsLink: Story = {
  args: {
    interactive: true,
    href: '#settings',
    title: 'Keyboard shortcuts',
    chevron: true,
  },
};

export const SettingsRecipe: Story = {
  name: 'Recipe: settings row',
  render: () => (
    <ListRow
      padded
      interactive
      onClick={() => {}}
      leading={<Icon name="moon" size={20} />}
      title="Appearance"
      trailing="Riverbed · Light"
      chevron
    />
  ),
};

export const PersonRecipe: Story = {
  name: 'Recipe: person row',
  render: () => (
    <ListRow
      interactive
      onClick={() => {}}
      leading={<Avatar name="Laura Mendes" size="sm" />}
      title="Laura Mendes"
      description="2 waiting"
      trailing={<Badge count={2} />}
      chevron
    />
  ),
};

export const NoteRecipe: Story = {
  name: 'Recipe: note row',
  render: () => (
    <ListRow
      interactive
      onClick={() => {}}
      title="Porto ideas"
      description="Tram 28 at golden hour, the bookshop near the bridge…"
      trailing="Jul 2"
    />
  ),
};

export const ModuleRecipe: Story = {
  name: 'Recipe: module row',
  render: () => (
    <ListRow
      padded
      leading={<Icon name="puzzle" size={20} />}
      title="Calendar"
      description="Today's shape on the Upcoming view"
      trailing={<Switch aria-label="Calendar module" defaultChecked />}
    />
  ),
};
