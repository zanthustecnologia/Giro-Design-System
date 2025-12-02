// apps/storybook-react/.storybook/theme.ts
import { create } from 'storybook/theming';
import giroLogo from '../src/assets/giro-logo.svg';

export const ZanthusTheme = create({
  base: 'light',

  // Marca
  brandTitle: 'Zanthus Design System',
  brandUrl: 'https://www.zanthus.com.br',
  brandImage: giroLogo,
  brandTarget: '_blank',

  // Paleta principal (estilo Vibe)
  colorPrimary: '#3b45f2',   // azul principal
  colorSecondary: '#505255', // verde de apoio (se quiser depois a gente suaviza)

  // Top bar (clara, com acento azul)
  barBg: '#ffffff',
  barTextColor: '#1a1a1a',
  barSelectedColor: '#3b45f2',

  // Fundo geral da app (em volta do canvas)
  appBg: '#f5f6fa',

  // Fundo da área de conteúdo (Docs / Canvas)
  appContentBg: '#ffffff',

  // Bordas e “cards”
  appBorderColor: '#e2e4ea',
  appBorderRadius: 8,

  // Tipografia
  fontBase: '"Figtree", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"Figtree", monospace',

  // Texto
  textColor: '#1a1a1a',
  textInverseColor: '#ffffff',

  // Inputs (em painéis, controles)
  inputBg: '#ffffff',
  inputBorder: '#d4d7e0',
  inputTextColor: '#1a1a1a',
});
