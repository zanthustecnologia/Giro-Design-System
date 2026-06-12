import { addons } from 'storybook/manager-api';
import { createElement } from 'react';
import { ZanthusTheme } from './theme';
import './manager.css';
import { PLAYGROUND_INTRO_CODE } from './playground-intro';

// Pre-popula o localStorage na primeira visita para evitar o editor em branco.
// O storybook-addon-playground usa useParameter (assíncrono) para ler introCode,
// que chega tarde demais na inicialização — o localStorage é lido de forma síncrona.
(function () {
  var STORAGE_KEY = 'storybook-playground-v1';
  try {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PLAYGROUND_INTRO_CODE));
    }
  } catch (e) { /* localStorage indisponível */ }
})();

// Componentes — badge aparece no nó pai (colapsado ou não)
// Usar o name do componente (última parte do title)
const NEW_COMPONENTS = new Set([
  'Popover',
  'Playground',
  'TableV2',
  'VirtualKeyboard',
  'OneTimePassword',
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