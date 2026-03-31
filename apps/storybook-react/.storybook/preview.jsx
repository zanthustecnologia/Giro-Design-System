import { Theme } from '@radix-ui/themes';
import '../../../packages/tokens/build/css/tokens.css';
import '../../../packages/react/dist/styles.css';
import '../src/styles/globals.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as GiroComponents from '@giro-ds/react';
import * as FluentIcons from '@fluentui/react-icons';

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
    playground: {
      storyId: 'playground--playground',
      components: {
        ...GiroComponents,
        ...FluentIcons,
        React,
      },
      introCode: {
        jsx: `() => {
  const [timesClicked, setTimesClicked] = React.useState(0);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--font-family-primary, Figtree, sans-serif)',
    }}>
      <img
        src="/images/giro-logo.svg"
        alt="Giro DS"
        style={{ width: '300px', height: 'auto', display: 'block', marginTop: '54px', marginBottom: '16px' }}
      />
      <div style={{ marginBottom: '18px', fontSize: '32px', fontWeight: 700, color: 'var(--color-neutral-low-default, #111119)' }}>
        Playground
      </div>
      <div style={{ marginBottom: '16px', fontSize: '16px', color: 'var(--color-neutral-low-medium, #3f3f3f)', textAlign: 'center' }}>
        Experimente, construa e explore os componentes do Giro DS.
      </div>
      <Button variant="outlined" size="sm" onClick={() => setTimesClicked(p => p + 1)} style={{ marginTop: '8px' }}>
        Clicado {timesClicked} {timesClicked === 1 ? 'vez' : 'vezes'}
      </Button>
      <div style={{ marginTop: '14px', fontSize: '14px', color: 'var(--color-neutral-low-medium, #3f3f3f)' }}>
        Não está vendo o editor? Pressione 'D' no teclado.
      </div>\n    </div>
  );
}`,
        css: `html, body, #storybook-root, #storybook-root > *, #storybook-root > * > * {
  height: 100%;
  margin: 0;
}`,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Boas-vindas',
          'Comece aqui',          'Giro MCP',          'Playground',          'Changelog',          'Contribua',
          'Foundation',
          'Layout',
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
