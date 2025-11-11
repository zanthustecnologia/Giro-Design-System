import React from 'react';
import type { Preview } from '@storybook/react';

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
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    options: {
      storySort: (a, b) => {
        const aTitle = a.title;
        const bTitle = b.title;
        const aName = a.name;
        const bName = b.name;

        // Se são do mesmo componente
        if (aTitle === bTitle) {
          // Docs sempre primeiro
          if (aName === 'Docs') return -1;
          if (bName === 'Docs') return 1;
          // Ordem alfabética para o resto
          return aName.localeCompare(bName);
        }
        
        // Ordem alfabética entre componentes diferentes
        return aTitle.localeCompare(bTitle);
      },
    },
  },
};

export default preview;