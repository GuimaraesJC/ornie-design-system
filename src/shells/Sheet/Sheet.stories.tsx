import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Sheet } from './Sheet';
import { Button } from '../../primitives/Button/Button';
import { Input } from '../../primitives/Input/Input';
import { ChipGroup } from '../../patterns/ChipGroup/ChipGroup';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open sheet
        </Button>
        <Sheet open={open} onClose={() => setOpen(false)} title="Capture" height="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-3)' }}>
            <Input placeholder="What's on your mind?" size="lg" />
            <Button fullWidth size="lg">
              Add to Inbox
            </Button>
          </div>
        </Sheet>
      </>
    );
  },
};

export const CaptureHalfSheet: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState<string | null>('today');
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Capture
        </Button>
        <Sheet open={open} onClose={() => setOpen(false)} height="half" title="Capture" initialFocus={inputRef}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-3)' }}>
            <Input ref={inputRef} size="lg" placeholder="Water the ferns tomorrow 9:00" />
            <ChipGroup
              mode="single"
              aria-label="Send to"
              value={target}
              onChange={setTarget}
              options={[
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This week' },
                { value: 'someday', label: 'Someday' },
              ]}
            />
          </div>
        </Sheet>
      </>
    );
  },
};

export const NonDismissible: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Unlock Burrow
        </Button>
        <Sheet open={open} onClose={() => setOpen(false)} title="Sealed" dismissible={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ornie-space-3)' }}>
            <Input type="password" placeholder="Passphrase" />
            <Button fullWidth onClick={() => setOpen(false)}>
              Unlock
            </Button>
          </div>
        </Sheet>
      </>
    );
  },
};
