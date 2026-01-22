// Re-export all components and types
export * from './components';

// Theme system
export { GiroThemeProvider } from './providers/GiroThemeProvider';
export { useGiroTheme } from './hooks/useGiroTheme';
export type {
  GiroTheme,
  GiroThemeColors,
  GiroThemeSpacing,
  GiroThemeTypography,
  GiroThemeBorder,
  GiroThemeMode,
  GiroThemeContextValue,
} from './types/theme.types';
