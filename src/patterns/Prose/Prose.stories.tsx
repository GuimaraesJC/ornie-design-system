import type { Meta, StoryObj } from '@storybook/react';
import { Prose } from './Prose';
import { WikiLink } from '../WikiLink/WikiLink';

const meta = {
  title: 'Components/Prose',
  component: Prose,
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

const noteDocument = (
  <>
    <h1>Design feedback from Sam</h1>
    <p>
      Went through the latest build with Sam over a call. Overall reaction was warm —{' '}
      <strong>"clearest version so far."</strong> Spacing is still inconsistent between{' '}
      <code>/pricing</code> and <code>/about</code>, and the <em>almost done</em> pages are the
      ones circling my brain.
    </p>
    <h2>Fix this week</h2>
    <ul>
      <li>Fix hero CTA copy</li>
      <li>
        Spacing pass on <code>/pricing</code>
      </li>
      <li>
        Reply to the thread with <a href="#">the shared checklist</a>
      </li>
    </ul>
    <blockquote>
      <p>"Ship the calm version. The loud one can wait forever."</p>
    </blockquote>
    <pre>
      <code>{'ornie "book flights #porto [[Porto trip]]"\n# capture from anywhere'}</code>
    </pre>
    <hr />
    <h3>Sync notes</h3>
    <p>
      Type scale reference lives in <WikiLink href="#">Moodboard directions</WikiLink> — keep them
      in sync. Full packing brain-dump lives in{' '}
      <WikiLink href="#" unresolved>
        Porto trip — packing
      </WikiLink>
      .
    </p>
  </>
);

export const Document: Story = {
  render: () => <Prose style={{ maxWidth: '640px' }}>{noteDocument}</Prose>,
};

export const PhoneWidth: Story = {
  render: () => <Prose style={{ maxWidth: '400px' }}>{noteDocument}</Prose>,
};

export const AskResponse: Story = {
  render: () => (
    <Prose style={{ maxWidth: '340px' }}>
      <p>Three things are waiting on Sam:</p>
      <ol>
        <li>Design feedback reply</li>
        <li>Hero CTA copy</li>
        <li>
          The spacing pass noted in <WikiLink href="#">Design feedback from Sam</WikiLink>
        </li>
      </ol>
      <p>The first two are small — a focus block this afternoon would clear them.</p>
    </Prose>
  ),
};
