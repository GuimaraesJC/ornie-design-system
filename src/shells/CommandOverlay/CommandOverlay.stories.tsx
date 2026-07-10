import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommandOverlay } from './CommandOverlay';
import { Button } from '../../primitives/Button/Button';
import { Chip } from '../../primitives/Chip/Chip';
import { Kbd } from '../../primitives/Kbd/Kbd';
import { ListRow } from '../../patterns/ListRow/ListRow';
import { ProjectDot } from '../../patterns/ProjectDot/ProjectDot';

const meta: Meta = {
  title: 'Components/CommandOverlay',
};

export default meta;
type Story = StoryObj;

export const QuickCapture: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Quick capture (⌘K)
        </Button>
        <CommandOverlay
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={setValue}
          placeholder="What's on your mind?"
          icon="plus"
          trailing={<Kbd keys={['⌘', 'K']} />}
          aria-label="Quick capture"
          footer={
            <span className="ornie-command-overlay__hint">
              <Kbd>↵</Kbd> lands in Inbox
            </span>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px' }}>
            <span style={{ fontSize: 12, color: 'var(--ornie-text-muted)' }}>Sort it later —</span>
            <Chip selected onSelect={() => {}}>
              Task
            </Chip>
            <Chip onSelect={() => {}}>Note</Chip>
            <Chip onSelect={() => {}}>Someday</Chip>
          </div>
        </CommandOverlay>
      </>
    );
  },
};

interface FindResult {
  id: string;
  label: string;
  kind: string;
  dot: 'river' | 'moss' | 'clay' | 'fur';
}

const everything: FindResult[] = [
  { id: '1', label: 'Water the ferns', kind: 'Task · Today', dot: 'moss' },
  { id: '2', label: 'Website redesign', kind: 'Project', dot: 'river' },
  { id: '3', label: 'Weekly review notes', kind: 'Note', dot: 'fur' },
  { id: '4', label: 'Book dentist appointment', kind: 'Task · Inbox', dot: 'clay' },
  { id: '5', label: 'Reading list', kind: 'Note', dot: 'river' },
  { id: '6', label: 'Garden plan', kind: 'Project', dot: 'moss' },
];

export const QuickFind: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    // The APP filters (D-23): the overlay only renders what it is given.
    const results = everything.filter((r) => r.label.toLowerCase().includes(value.toLowerCase()));
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Quick Find (⌘/)
        </Button>
        <CommandOverlay<FindResult>
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={setValue}
          placeholder="Jump anywhere, do anything…"
          icon="search"
          width={560}
          trailing={<Kbd keys={['⌘', '/']} />}
          aria-label="Quick Find"
          items={results}
          getKey={(r) => r.id}
          renderItem={(r) => (
            <ListRow
              title={r.label}
              leading={<ProjectDot color={r.dot} />}
              trailing={<span style={{ fontSize: 'var(--ornie-text-xs)' }}>{r.kind}</span>}
              density="desktop"
              padded
            />
          )}
          onSelect={() => setOpen(false)}
        >
          <div style={{ padding: '16px 10px', fontSize: 'var(--ornie-text-sm)', color: 'var(--ornie-text-muted)' }}>
            Nothing matches — press ⌘K to capture it instead.
          </div>
        </CommandOverlay>
      </>
    );
  },
};

export const KeyboardShortcutWiring: Story = {
  render: () => {
    // The app owns the global shortcut; shown here for the full recipe.
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const results = everything.filter((r) => r.label.toLowerCase().includes(value.toLowerCase()));
    return (
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === '/') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        style={{ padding: 24, border: '1px dashed var(--ornie-border)', borderRadius: 'var(--ornie-radius-md)' }}
      >
        <span style={{ fontSize: 'var(--ornie-text-sm)', color: 'var(--ornie-text-muted)' }}>
          Focus this box and press ⌘/ (or ctrl+/) — ↑↓ rove, ↵ selects, esc closes.
        </span>
        <CommandOverlay<FindResult>
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={setValue}
          placeholder="Jump anywhere, do anything…"
          width={560}
          aria-label="Quick Find"
          items={results}
          getKey={(r) => r.id}
          renderItem={(r) => <ListRow title={r.label} leading={<ProjectDot color={r.dot} />} density="desktop" padded />}
          onSelect={() => setOpen(false)}
        />
      </div>
    );
  },
};
