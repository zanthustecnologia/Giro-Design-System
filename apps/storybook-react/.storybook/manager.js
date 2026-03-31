import { addons } from 'storybook/manager-api';
import { createElement } from 'react';
import { ZanthusTheme } from './theme';
import './manager.css';

// Componentes — badge aparece no nó pai (colapsado ou não)
// Usar o name do componente (última parte do title)
const NEW_COMPONENTS = new Set([
  'Popover',
  'Playground',
]);

// Páginas MDX standalone — badge aparece direto no item
const NEW_PAGES = new Set([
  'Giro MCP',
]);

addons.setConfig({
  theme: ZanthusTheme,
  sidebar: {
    renderLabel: (item) => {
      const isNew =
        (item.type === 'component' && NEW_COMPONENTS.has(item.name)) ||
        (item.type === 'story' && NEW_COMPONENTS.has(item.name)) ||
        (item.type === 'docs' && NEW_PAGES.has(item.title));

      return createElement(
        'span',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' } },
        item.name,
        isNew &&
          createElement(
            'span',
            {
              style: {
                fontSize: '12px',
                fontWeight: '700',
                lineHeight: 1,
                padding: '2px 6px',
                borderRadius: '4px',
                background: 'transparent',
                border: '1.5px solid #0ab16b',
                color: '#0ab16b',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                flexShrink: 0,
              },
            },
            'Novo'
          )
      );
    },
  },
});