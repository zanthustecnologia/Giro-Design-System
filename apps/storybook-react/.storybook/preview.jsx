import { Theme } from '@radix-ui/themes';
import '../../../packages/tokens/build/css/tokens.css';
import '../../../packages/tokens/build-next/css/core.css';
import '../../../packages/tokens/build-next/css/semantic.css';
import '../../../packages/tokens/build-next/css/components.css';
import '../../../packages/tokens/build-next/css/themes/dark.css';
import '../../../packages/react/dist/styles.css';
import '../src/styles/globals.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Fix: "TypeError: Illegal invocation" / "Cannot set property focus which has only a getter"
 * causado por @react-aria/interactions (setupGlobalFocusEvents) ao renderizar componentes
 * Radix UI no iframe do Storybook.
 *
 * O runtime do Storybook redefine HTMLElement.prototype.focus como um getter (sem setter).
 * Este código roda APÓS o runtime, obtém o focus nativo de um realm limpo (iframe
 * temporário) e redefine a propriedade como um método writable, permitindo que o
 * React Aria tanto leia quanto sobrescreva focus normalmente.
 */
if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {
  const desc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus');
  if (desc && typeof desc.get === 'function' && !desc.set) {
    const frame = document.createElement('iframe');
    document.head.appendChild(frame);
    const realFocus = frame.contentWindow?.HTMLElement?.prototype?.focus;
    frame.remove();
    if (typeof realFocus === 'function') {
      Object.defineProperty(HTMLElement.prototype, 'focus', {
        value: function focus(options) { return realFocus.call(this, options); },
        writable: true,
        configurable: true,
        enumerable: false,
      });
    }
  }
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
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
          'Boas-vindas',
          'Comece aqui',          'Giro MCP',          'Changelog',          'Contribua',
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

  initialGlobals: {
    theme: 'light',
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Tema global do design system',
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
        document.body.style.backgroundColor = 'var(--color-background-default)';
        document.body.style.color = 'var(--color-text-primary)';
      }

      return (
        <BrowserRouter>
          <Theme appearance={theme}>
            <div data-theme={theme}>
              <Story />
            </div>
          </Theme>
        </BrowserRouter>
      );
    },
  ],
};

export default preview;
