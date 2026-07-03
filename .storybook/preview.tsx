import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ornie',
      values: [
        { name: 'ornie', value: '#f8f5f1' },
        { name: 'surface', value: '#ffffff' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="ornie-app" style={{ background: 'transparent' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
