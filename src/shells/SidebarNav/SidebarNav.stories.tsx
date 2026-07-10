import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav, SidebarGroup, SidebarItem } from './SidebarNav';
import { Icon } from '../../primitives/Icon/Icon';
import { ProgressRing } from '../../primitives/ProgressRing/ProgressRing';
import { ProjectDot } from '../../patterns/ProjectDot/ProjectDot';

const meta = {
  title: 'Components/SidebarNav',
  component: SidebarNav,
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const header = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px' }}>
    <span
      aria-hidden="true"
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '9px',
        background: 'var(--ornie-accent)',
        color: 'var(--ornie-text-on-accent)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'var(--ornie-weight-extrabold)' as never,
        fontSize: '15px',
        flex: 'none',
      }}
    >
      O
    </span>
    <span style={{ minWidth: 0 }}>
      <span style={{ display: 'block', fontSize: '14px', fontWeight: 'var(--ornie-weight-bold)' as never }}>Ornie</span>
      <span style={{ display: 'block', fontSize: '11.5px', color: 'var(--ornie-text-subtle)' }}>Personal</span>
    </span>
  </div>
);

const body = (
  <>
    <SidebarGroup>
      <SidebarItem leading={<Icon name="sun" />} active onSelect={() => {}} kbd={['⌘', '1']}>
        Today
      </SidebarItem>
      <SidebarItem leading={<Icon name="inbox" />} count={4} onSelect={() => {}} kbd={['⌘', '2']}>
        Inbox
      </SidebarItem>
      <SidebarItem leading={<Icon name="calendar" />} onSelect={() => {}}>
        Upcoming
      </SidebarItem>
      <SidebarItem leading={<Icon name="layers" />} onSelect={() => {}}>
        Anytime
      </SidebarItem>
      <SidebarItem leading={<Icon name="archive" />} onSelect={() => {}}>
        Someday
      </SidebarItem>
    </SidebarGroup>
    <SidebarGroup label="Library">
      <SidebarItem leading={<Icon name="folder" />} onSelect={() => {}}>
        Projects
      </SidebarItem>
      <SidebarItem leading={<Icon name="book" />} onSelect={() => {}}>
        Journal
      </SidebarItem>
    </SidebarGroup>
    <SidebarGroup label="Projects">
      <SidebarItem leading={<ProjectDot color="river" />} onSelect={() => {}}>
        Website redesign
      </SidebarItem>
      <SidebarItem leading={<ProjectDot color="clay" />} onSelect={() => {}}>
        Porto trip
      </SidebarItem>
      <SidebarItem
        leading={<ProgressRing size={16} value={8 / 12} label="Q3 finances progress" />}
        trailing="8/12"
        onSelect={() => {}}
      >
        Q3 finances
      </SidebarItem>
    </SidebarGroup>
  </>
);

const footer = (
  <SidebarGroup label="Utilities">
    <SidebarItem leading={<Icon name="gear" />} onSelect={() => {}} kbd={['⌘', ',']}>
      Settings
    </SidebarItem>
  </SidebarGroup>
);

export const Expanded: Story = {
  render: () => (
    <div style={{ height: '560px', display: 'flex' }}>
      <SidebarNav header={header} footer={footer}>
        {body}
      </SidebarNav>
    </div>
  ),
};

export const Rail: Story = {
  render: () => (
    <div style={{ height: '560px', display: 'flex' }}>
      <SidebarNav
        collapsed
        header={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              aria-hidden="true"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '9px',
                background: 'var(--ornie-accent)',
                color: 'var(--ornie-text-on-accent)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'var(--ornie-weight-extrabold)' as never,
                fontSize: '15px',
              }}
            >
              O
            </span>
          </div>
        }
        footer={footer}
      >
        {body}
      </SidebarNav>
    </div>
  ),
};

export const SideBySide: Story = {
  render: () => (
    <div style={{ height: '560px', display: 'flex', gap: 'var(--ornie-space-6)' }}>
      <SidebarNav header={header} footer={footer}>
        {body}
      </SidebarNav>
      <SidebarNav collapsed footer={footer} aria-label="Main (rail)">
        {body}
      </SidebarNav>
    </div>
  ),
};

export const LinksInsteadOfButtons: Story = {
  render: () => (
    <div style={{ height: '280px', display: 'flex' }}>
      <SidebarNav>
        <SidebarGroup label="Views">
          <SidebarItem leading={<Icon name="sun" />} href="#today" active>
            Today
          </SidebarItem>
          <SidebarItem leading={<Icon name="inbox" />} href="#inbox" count={4}>
            Inbox
          </SidebarItem>
        </SidebarGroup>
      </SidebarNav>
    </div>
  ),
};
