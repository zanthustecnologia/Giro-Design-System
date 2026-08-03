import { addons } from 'storybook/manager-api';
import { createElement } from 'react';
import { ZanthusTheme } from './theme';
import './manager.css';

// Componentes — badge aparece no nó pai (colapsado ou não)
// Usar o name do componente (última parte do title)
const NEW_COMPONENTS = new Set([
  'TableV2',
  'VirtualKeyboard',
  'VerificationCode',
]);

// Páginas MDX standalone — badge aparece direto no item
const NEW_PAGES = new Set([
  'Giro MCP',
]);

// Componentes — badge aparece no nó pai (colapsado ou não)
// Usar o name do componente (última parte do title)
const DEPRECATED_COMPONENTS = new Set([
  'Table',
]);

// Páginas MDX standalone — badge aparece direto no item
const DEPRECATED_PAGES = new Set([

]);

addons.setConfig({
  theme: ZanthusTheme,
  sidebar: {
    renderLabel: (item) => {
      const isNew =
        (item.type === 'component' && NEW_COMPONENTS.has(item.name)) ||
        (item.type === 'story' && NEW_COMPONENTS.has(item.name)) ||
        (item.type === 'docs' && NEW_PAGES.has(item.title));
      const isDeprecated =
        (item.type === 'component' && DEPRECATED_COMPONENTS.has(item.name)) ||
        (item.type === 'story' && DEPRECATED_COMPONENTS.has(item.name)) ||
        (item.type === 'docs' && DEPRECATED_PAGES.has(item.title));
      return createElement(
        'span',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' } },
        item.name,
        isNew &&
          createElement(
            'span',
            { className: 'sidebar-new-badge' },
            'Novo'
          ),
        isDeprecated &&
          createElement(
            'span',
            { className: 'sidebar-deprecated-badge' },
            'Depreciado'
          )
      );
    },
  },
});