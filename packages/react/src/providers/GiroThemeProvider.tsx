import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { GiroThemeContext } from '../contexts/GiroThemeContext';
import type { GiroTheme, GiroThemeMode } from '../types/theme.types';
import type { ReactNode } from 'react';

/**
 * Props do GiroThemeProvider
 */
export interface GiroThemeProviderProps {
  /** Tema customizado (opcional). Se não fornecido, usa tema padrão do design system */
  theme?: GiroTheme;
  /** Modo inicial do tema (light ou dark). Padrão: 'light' */
  mode?: GiroThemeMode;
  /** Habilita persistência do modo em localStorage. Padrão: true */
  persistMode?: boolean;
  /** Chave para localStorage. Padrão: 'giro-theme-mode' */
  storageKey?: string;
  /** Conteúdo da aplicação */
  children: ReactNode;
}

/**
 * Converte objeto de tema em CSS variables
 */
function themeToCustomProperties(theme: GiroTheme): Record<string, string> {
  const customProperties: Record<string, string> = {};

  // Cores
  if (theme.colors) {
    const { brand, feedback, neutral } = theme.colors;

    if (brand?.primary) {
      if (brand.primary.default) customProperties['--color-brand-primary-default'] = brand.primary.default;
      if (brand.primary.dark) customProperties['--color-brand-primary-dark'] = brand.primary.dark;
      if (brand.primary.medium) customProperties['--color-brand-primary-medium'] = brand.primary.medium;
      if (brand.primary.light) customProperties['--color-brand-primary-light'] = brand.primary.light;
    }

    if (brand?.secondary) {
      if (brand.secondary.default) customProperties['--color-brand-secondary-default'] = brand.secondary.default;
      if (brand.secondary.dark) customProperties['--color-brand-secondary-dark'] = brand.secondary.dark;
      if (brand.secondary.medium) customProperties['--color-brand-secondary-medium'] = brand.secondary.medium;
      if (brand.secondary.light) customProperties['--color-brand-secondary-light'] = brand.secondary.light;
    }

    if (feedback?.alert) {
      if (feedback.alert.default) customProperties['--color-feedback-alert-default'] = feedback.alert.default;
      if (feedback.alert.dark) customProperties['--color-feedback-alert-dark'] = feedback.alert.dark;
      if (feedback.alert.medium) customProperties['--color-feedback-alert-medium'] = feedback.alert.medium;
      if (feedback.alert.light) customProperties['--color-feedback-alert-light'] = feedback.alert.light;
    }

    if (feedback?.success) {
      if (feedback.success.default) customProperties['--color-feedback-success-default'] = feedback.success.default;
      if (feedback.success.dark) customProperties['--color-feedback-success-dark'] = feedback.success.dark;
      if (feedback.success.medium) customProperties['--color-feedback-success-medium'] = feedback.success.medium;
      if (feedback.success.light) customProperties['--color-feedback-success-light'] = feedback.success.light;
    }

    if (neutral?.low) {
      if (neutral.low.default) customProperties['--color-neutral-low-default'] = neutral.low.default;
      if (neutral.low.dark) customProperties['--color-neutral-low-dark'] = neutral.low.dark;
      if (neutral.low.medium) customProperties['--color-neutral-low-medium'] = neutral.low.medium;
      if (neutral.low.light) customProperties['--color-neutral-low-light'] = neutral.low.light;
    }

    if (neutral?.high) {
      if (neutral.high.default) customProperties['--color-neutral-high-default'] = neutral.high.default;
      if (neutral.high.dark) customProperties['--color-neutral-high-dark'] = neutral.high.dark;
      if (neutral.high.medium) customProperties['--color-neutral-high-medium'] = neutral.high.medium;
      if (neutral.high.light) customProperties['--color-neutral-high-light'] = neutral.high.light;
    }
  }

  // Espaçamento
  if (theme.spacing) {
    Object.entries(theme.spacing).forEach(([key, value]) => {
      if (value) customProperties[`--spacing-${key}`] = value;
    });
  }

  // Tipografia
  if (theme.typography) {
    if (theme.typography.fontFamily?.primary) {
      customProperties['--font-family-primary'] = theme.typography.fontFamily.primary;
    }

    if (theme.typography.fontSize) {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        if (value) customProperties[`--font-size-${key}`] = value;
      });
    }

    if (theme.typography.fontWeight) {
      Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
        if (value) customProperties[`--font-weight-${key}`] = value;
      });
    }
  }

  // Bordas
  if (theme.border) {
    if (theme.border.borderRadius) {
      Object.entries(theme.border.borderRadius).forEach(([key, value]) => {
        if (value) customProperties[`--border-radius-${key}`] = value;
      });
    }

    if (theme.border.borderWidth) {
      Object.entries(theme.border.borderWidth).forEach(([key, value]) => {
        if (value) customProperties[`--border-width-${key}`] = value;
      });
    }
  }

  return customProperties;
}

/**
 * Provider de tema do Giro Design System
 * 
 * @example
 * // Usando tema padrão
 * <GiroThemeProvider>
 *   <App />
 * </GiroThemeProvider>
 * 
 * @example
 * // Customizando cores
 * const customTheme = {
 *   colors: {
 *     brand: {
 *       primary: { default: '#FF5733' }
 *     }
 *   }
 * };
 * 
 * <GiroThemeProvider theme={customTheme}>
 *   <App />
 * </GiroThemeProvider>
 * 
 * @example
 * // Com dark mode inicial
 * <GiroThemeProvider mode="dark">
 *   <App />
 * </GiroThemeProvider>
 */
export function GiroThemeProvider({
  theme,
  mode: initialMode = 'light',
  persistMode = true,
  storageKey = 'giro-theme-mode',
  children,
}: GiroThemeProviderProps) {
  // Recupera modo do localStorage se persistência estiver habilitada
  const getInitialMode = (): GiroThemeMode => {
    if (!persistMode) return initialMode;
    
    try {
      const stored = localStorage.getItem(storageKey);
      return (stored === 'dark' || stored === 'light') ? stored : initialMode;
    } catch {
      return initialMode;
    }
  };

  const [mode, setModeState] = useState<GiroThemeMode>(getInitialMode);

  // Atualiza modo e persiste se habilitado
  const setMode = useCallback((newMode: GiroThemeMode) => {
    setModeState(newMode);
    
    if (persistMode) {
      try {
        localStorage.setItem(storageKey, newMode);
      } catch (error) {
        console.warn('Failed to persist theme mode:', error);
      }
    }
  }, [persistMode, storageKey]);

  // Toggle entre light e dark
  const toggleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  // Aplica CSS custom properties quando tema ou modo mudam
  useEffect(() => {
    const root = document.documentElement;

    // Define atributo data-theme para suporte a dark mode via CSS
    root.setAttribute('data-theme', mode);

    // Se há tema customizado, aplica as custom properties
    if (theme) {
      const customProperties = themeToCustomProperties(theme);
      Object.entries(customProperties).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }

    // Cleanup não é necessário pois queremos manter as propriedades
  }, [theme, mode]);

  const contextValue = useMemo(
    () => ({
      theme: theme || null,
      mode,
      setMode,
      toggleMode,
    }),
    [theme, mode, setMode, toggleMode]
  );

  return (
    <GiroThemeContext.Provider value={contextValue}>
      {children}
    </GiroThemeContext.Provider>
  );
}
