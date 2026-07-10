import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastHost, ToastProvider, useToast } from './Toast';
import { Button } from '../../primitives/Button/Button';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: { children: 'Done' },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: { children: 'Done', action: 'Undo', onAction: () => {} },
};

export const LongMessage: Story = {
  args: {
    children: 'Captured — it’s in Inbox. Sort it whenever you have a quiet moment.',
    action: 'Undo',
    onAction: () => {},
  },
};

export const ExportReady: Story = {
  args: { children: 'Export ready', action: 'Download', onAction: () => {} },
};

function QueueDemoApp() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 'var(--ornie-space-2)', flexWrap: 'wrap' }}>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ message: 'Done', action: 'Undo', onAction: () => toast({ message: 'Restored' }) })
        }
      >
        Complete a task
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ message: 'Let go. It rests in Trash for 30 days.', action: 'Undo', onAction: () => {} })}
      >
        Delete a task
      </Button>
      <Button variant="ghost" onClick={() => toast({ message: 'Export ready', action: 'Download', onAction: () => {} })}>
        Export
      </Button>
    </div>
  );
}

/**
 * Live queue behavior — the variant grid only shows static pills.
 * Max ONE toast is visible; extra toasts wait in line (never stack).
 * The 8s timer pauses while the pointer hovers the toast or focus is inside.
 */
export const QueueDemo: Story = {
  render: () => (
    <ToastProvider>
      <QueueDemoApp />
      <ToastHost />
    </ToastProvider>
  ),
};
