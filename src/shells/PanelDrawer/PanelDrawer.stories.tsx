import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PanelDrawer } from './PanelDrawer';
import { Button } from '../../primitives/Button/Button';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { Icon } from '../../primitives/Icon/Icon';
import { Input } from '../../primitives/Input/Input';
import { Chip } from '../../primitives/Chip/Chip';

const meta: Meta<typeof PanelDrawer> = {
  title: 'Components/PanelDrawer',
  component: PanelDrawer,
};

export default meta;
type Story = StoryObj<typeof PanelDrawer>;

const sparkleTile = (
  <span
    style={{
      width: 28,
      height: 28,
      borderRadius: 9,
      background: 'var(--ornie-accent)',
      color: 'var(--ornie-text-on-accent)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon name="sparkle" size={16} />
  </span>
);

const askFooter = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-2)' }}>
    <Input
      placeholder="Ask your workspace…"
      trailing={
        <IconButton size={32} variant="filled" aria-label="Send">
          <Icon name="arrow-up-right" size={16} />
        </IconButton>
      }
    />
    <div style={{ fontSize: 'var(--ornie-text-xs)', color: 'var(--ornie-text-muted)', textAlign: 'center' }}>
      Answers link back to the exact items they came from
    </div>
  </div>
);

export const InlineInteractive: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div
        style={{
          display: 'flex',
          height: 420,
          border: '1px solid var(--ornie-border)',
          borderRadius: 'var(--ornie-radius-lg)',
          overflow: 'hidden',
          background: 'var(--ornie-bg)',
        }}
      >
        <div style={{ flex: 1, minWidth: 0, padding: 'var(--ornie-space-6)' }}>
          <Button variant="secondary" onClick={() => setOpen(!open)}>
            {open ? 'Close panel' : 'Open panel'}
          </Button>
          <p style={{ color: 'var(--ornie-text-muted)', fontSize: 'var(--ornie-text-sm)' }}>
            Inline mode sits in the app&rsquo;s flex row; closing it collapses the width and the
            content flows back.
          </p>
        </div>
        <PanelDrawer
          open={open}
          onClose={() => setOpen(false)}
          mode="inline"
          title="Ask"
          description="reads your tasks, notes, projects & modules"
          leading={sparkleTile}
          footer={askFooter}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            <Chip onSelect={() => {}}>What should I focus on?</Chip>
            <Chip onSelect={() => {}}>Anything slipping?</Chip>
            <Chip onSelect={() => {}}>What did I finish this week?</Chip>
          </div>
        </PanelDrawer>
      </div>
    );
  },
};

export const OverlayMode: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open overlay panel
        </Button>
        <PanelDrawer
          open={open}
          onClose={() => setOpen(false)}
          mode="overlay"
          title="Task"
          description="Water the ferns"
          footer={<Button fullWidth>Mark done</Button>}
        >
          <p style={{ margin: 0, fontSize: 'var(--ornie-text-sm)', color: 'var(--ornie-text-muted)' }}>
            Overlay mode floats over the wash on tablet (1z): focus is trapped, Escape and a scrim
            tap close it, and focus returns to this button.
          </p>
        </PanelDrawer>
      </>
    );
  },
};

export const LongBodyScrolls: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', height: 380, background: 'var(--ornie-bg)' }}>
      <PanelDrawer open mode="inline" title="Notes" footer={<Input placeholder="Add a note…" />}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-3)' }}>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} style={{ fontSize: 'var(--ornie-text-sm)', color: 'var(--ornie-text-muted)' }}>
              Body row {i + 1} — scrolls between the pinned header and footer.
            </div>
          ))}
        </div>
      </PanelDrawer>
    </div>
  ),
};
