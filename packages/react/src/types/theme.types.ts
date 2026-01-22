/**
 * Giro Design System - Theme Types
 * Tipos para customização de tema em projetos consumidores
 */

/**
 * Configuração de cores para tema customizado
 */
export interface GiroThemeColors {
  brand?: {
    primary?: {
      default?: string;
      dark?: string;
      medium?: string;
      light?: string;
    };
    secondary?: {
      default?: string;
      dark?: string;
      medium?: string;
      light?: string;
    };
  };
  feedback?: {
    alert?: {
      default?: string;
      dark?: string;
      medium?: string;
      light?: string;
    };
    success?: {
      default?: string;
      dark?: string;
      medium?: string;
      light?: string;
    };
  };
  neutral?: {
    low?: {
      default?: string;
      dark?: string;
      medium?: string;
      light?: string;
    };
    high?: {
      default?: string;
      dark?: string;
      medium?: string;
      light?: string;
    };
  };
}

/**
 * Configuração de espaçamento para tema customizado
 */
export interface GiroThemeSpacing {
  0?: string;
  4?: string;
  8?: string;
  12?: string;
  16?: string;
  24?: string;
  32?: string;
  40?: string;
  48?: string;
  56?: string;
  64?: string;
  80?: string;
  120?: string;
  160?: string;
  200?: string;
}

/**
 * Configuração de tipografia para tema customizado
 */
export interface GiroThemeTypography {
  fontFamily?: {
    primary?: string;
  };
  fontSize?: {
    12?: string;
    14?: string;
    16?: string;
    18?: string;
    20?: string;
    24?: string;
    28?: string;
    32?: string;
    40?: string;
    48?: string;
    64?: string;
    96?: string;
    inherit?: string;
  };
  fontWeight?: {
    regular?: string;
    medium?: string;
    bold?: string;
  };
}

/**
 * Configuração de bordas para tema customizado
 */
export interface GiroThemeBorder {
  borderRadius?: {
    4?: string;
    8?: string;
    12?: string;
    16?: string;
    24?: string;
    none?: string;
    pill?: string;
    circular?: string;
  };
  borderWidth?: {
    1?: string;
    2?: string;
    4?: string;
    6?: string;
    8?: string;
    12?: string;
    none?: string;
  };
}

/**
 * Configuração completa do tema customizado
 * Todos os campos são opcionais - apenas sobrescreva o que necessário
 */
export interface GiroTheme {
  colors?: GiroThemeColors;
  spacing?: GiroThemeSpacing;
  typography?: GiroThemeTypography;
  border?: GiroThemeBorder;
}

/**
 * Modo do tema (light/dark)
 */
export type GiroThemeMode = 'light' | 'dark';

/**
 * Contexto do tema disponível via hook
 */
export interface GiroThemeContextValue {
  theme: GiroTheme | null;
  mode: GiroThemeMode;
  setMode: (mode: GiroThemeMode) => void;
  toggleMode: () => void;
}
