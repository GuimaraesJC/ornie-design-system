import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { open: false },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 320 }}>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Rename project"
          description="This changes how the project appears across Ornie."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save changes</Button>
            </>
          }
        >
          <Input label="Project name" defaultValue="Morning journal" />
        </Modal>
      </div>
    );
  },
};

export const Confirmation: Story = {
  args: {
    open: true,
    size: 'sm',
    title: 'Delete project?',
    description: 'This permanently removes “Weekly review” and all of its history.',
    footer: (
      <>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete project</Button>
      </>
    ),
  },
  parameters: { docs: { disable: true } },
};

export const WithForm: Story = {
  args: {
    open: true,
    title: 'Invite a teammate',
    description: 'They’ll get an email with a link to join this workspace.',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Email" placeholder="teammate@example.com" />
        <Input label="Note" placeholder="Optional welcome note" />
      </div>
    ),
    footer: (
      <>
        <Button variant="ghost">Cancel</Button>
        <Button>Send invite</Button>
      </>
    ),
  },
  parameters: { docs: { disable: true } },
};
