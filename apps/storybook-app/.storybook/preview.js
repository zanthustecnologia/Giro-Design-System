import '../../../packages/tokens/build/css/tokens.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    docs:{
      autodocs: true
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: "todo"
    },
    options: {
      storySort: {
        order: [
          'Boas-vindas',
          'Primeiros passos', 
          'Fundações',
          'Componentes',
          '*' // Todas as outras histórias
        ]
      }
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
        showName: true
      }
    }
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      
      // Aplicar o tema no elemento raiz do preview
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
      }
      
      // Retornar a Story sem wrapper JSX
      return Story();
    }
  ]
};

export default preview;