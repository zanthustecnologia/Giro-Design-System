import { create } from 'storybook/theming';
import { formatGiroVersion } from '@giro-ds/version';

const config = {
  colors: {
    primary: '#3b45f2',
    secondary: '#505255',
    white: '#ffffff',
    black: '#1a1a1a',
    gray: '#e2e4ea',
    lightGray: '#f5f6fa',
    darkGray: '#d4d7e0',
  }
}

export const ZanthusTheme = create({
  base: 'light',

  // Marca
  brandTitle: formatGiroVersion(),
  brandUrl: 'https://giro.framer.website/',
  brandImage: '/images/giro-logo.svg',
  brandTarget: '_blank',

  // Paleta principal (estilo Vibe)
  colorPrimary: config.colors.primary,
  colorSecondary: config.colors.secondary,

  // Top bar (clara, com acento azul)
  barBg: config.colors.white,
  barTextColor: config.colors.black,
  barSelectedColor: config.colors.primary,

  // Fundo geral da app (em volta do canvas)
  appBg: config.colors.lightGray,
  
  // Fundo da área de conteúdo (Docs / Canvas)
  appContentBg: config.colors.white,

  // Bordas e “cards”
  appBorderColor: config.colors.gray,
  appBorderRadius: 8,

  // Tipografia
  fontBase: '"Figtree", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"Figtree", monospace',

  // Texto
  textColor: config.colors.black,
  textInverseColor: config.colors.white,

  // Inputs (em painéis, controles)
  inputBg: config.colors.white,
  inputBorder: config.colors.darkGray,
  inputTextColor: config.colors.black,
});
