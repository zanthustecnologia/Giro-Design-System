import React from 'react';
import type { Preview } from '@storybook/react';
import { CustomAutoDoc } from './CustomAutodocs/CustomAutodoc';

import '../../../packages/tokens/build/css/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'alpha',
    },
    // docs: {
    //   page: CustomAutoDoc,
  
    // },
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
};

export default preview;