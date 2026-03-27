import { Theme } from '@radix-ui/themes';
import '../../../packages/tokens/build/css/tokens.css';
import '../../../packages/react/dist/styles.css';
import '../src/styles/globals.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    docs: {
      autodocs: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Bem-vindo',
          'Comece aqui',
          'Foundation',
          'Components',
          'Patterns',
          '*', // Todas as outras histórias
        ],
      },
      // Define a história inicial
      initialActive: 'general-welcome--docs',
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Tema global do design system',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      // Aplicar o tema no elemento raiz do preview
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
      }

      return (
        <BrowserRouter>
          <Theme appearance={theme}>
            <Story />
          </Theme>
        </BrowserRouter>
      );
    },
  ],
};

export default preview;
