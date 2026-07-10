import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StepDots } from './StepDots';
import { Button } from '../../primitives/Button/Button';

const meta = {
  title: 'Components/StepDots',
  component: StepDots,
  args: { count: 3, active: 0 },
} satisfies Meta<typeof StepDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MidFlow: Story = {
  args: { count: 5, active: 2 },
};

export const LastStep: Story = {
  args: { count: 7, active: 6 },
};

export const CustomLabel: Story = {
  args: { count: 3, active: 1, label: 'Passo 2 de 3' },
};

export const SteppingThrough: Story = {
  render: () => {
    const count = 5;
    const [active, setActive] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ornie-space-4)' }}>
        <StepDots count={count} active={active} />
        <div style={{ display: 'flex', gap: 'var(--ornie-space-2)' }}>
          <Button variant="secondary" onClick={() => setActive((s) => Math.max(0, s - 1))} disabled={active === 0}>
            Back
          </Button>
          <Button onClick={() => setActive((s) => Math.min(count - 1, s + 1))} disabled={active === count - 1}>
            Next
          </Button>
        </div>
      </div>
    );
  },
};
