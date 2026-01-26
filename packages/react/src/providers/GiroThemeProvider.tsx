import { useState, useEffect, useMemo, useCallback } from 'react';

import { GiroThemeContext } from '../contexts/GiroThemeContext';

import type { GiroTheme, GiroThemeMode, GiroThemeProviderProps } from '../types/theme.types';

// Converte objeto de tema em CSS variables de forma recursiva e percorre automaticamente toda a estrutura do tema e gera as CSS variables
function themeToCustomProperties(theme: GiroTheme): Record<string, string> {
  const customProperties: Record<string, string> = {};

  function processObject(obj: any, prefix: string): void {
    if (!obj || typeof obj !== 'object') return;

    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) continue;
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Se for objeto, processa recursivamente
        processObject(value, `${prefix}-${key}`);
      } else if (typeof value === 'string' || typeof value === 'number') {
        // Se for valor primitivo (cor, tamanho, etc), adiciona como CSS variable
        customProperties[`${prefix}-${key}`] = String(value);
      }
    }
  }

  // Processa cada seção do tema
  if (theme.colors) {
    processObject(theme.colors, '--color');
  }
  // Facilmente extensível para outras propriedades no futuro:
  // if (theme.spacing) processObject(theme.spacing, '--spacing');
  return customProperties;
}

// Injeta CSS custom properties em uma <style> tag no <head>
const injectThemeStyles = ( customProperties: Record<string, string>, mode: GiroThemeMode) : void => {
  const styleId = 'giro-theme-vars';
  let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;

  // Cria style tag se não existir
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.setAttribute('data-giro-theme-mode', mode);
    document.head.appendChild(styleTag);
  } else {
    // Atualiza atributo de modo
    styleTag.setAttribute('data-giro-theme-mode', mode);
  }

  // Gera CSS no formato :root { --var: value; }
  const cssVars = Object.entries(customProperties).map(([property, value]) => `  ${property}: ${value};`).join('\n');
  styleTag.textContent = `:root {\n${cssVars}\n}`;
}

// Remove a style tag de tema customizado
const removeThemeStyles = () : void => {
  const styleTag = document.getElementById('giro-theme-vars');
  if (styleTag) {
    styleTag.remove();
  }
}

/**
 * Provider de tema do Giro Design System
 * 
 * Componente que gerencia o tema da aplicação, incluindo:
 * - Alternância entre modos light e dark
 * - Customização de cores via objetos de tema
 * - Injeção automática de CSS custom properties no `:root`
 * - Persistência do modo selecionado em localStorage
 * - Sincronização de atributo `data-theme` no `<html>`
 * 
 * @param props - Configurações do provider de tema
 * @param props.theme - Tema customizado para light mode (opcional). Se não fornecido, usa tokens padrão do `@giro-ds/tokens`
 * @param props.darkTheme - Tema customizado para dark mode (opcional). Se não fornecido, usa o mesmo tema do light mode
 * @param props.mode - Modo inicial do tema. Padrão: `'light'`. Será sobrescrito pelo valor do localStorage se `persistMode` estiver ativo
 * @param props.persistMode - Habilita persistência automática do modo em localStorage. Padrão: `true`
 * @param props.storageKey - Chave customizada para armazenar o modo no localStorage. Padrão: `'giro-theme-mode'`
 * @param props.children - Elementos filhos que terão acesso ao contexto de tema
 * 
 * @example
 * ```tsx
 * // Uso básico (sem customização)
 * import { GiroThemeProvider } from '@giro-ds/react';
 * 
 * function App() {
 *   return (
 *     <GiroThemeProvider>
 *       <YourApp />
 *     </GiroThemeProvider>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Com tema customizado
 * import { GiroThemeProvider } from '@giro-ds/react';
 * 
 * const customTheme = {
 *   colors: {...}
 * };
 * 
 * const customDarkTheme = {
 *   colors: {...}
 * };
 * 
 * function App() {
 *   return (
 *     <GiroThemeProvider 
 *       theme={customTheme} 
 *       darkTheme={customDarkTheme}
 *       mode="dark"
 *     >
 *       <YourApp />
 *     </GiroThemeProvider>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Desabilitando persistência
 * <GiroThemeProvider persistMode={false}>
 *   <YourApp />
 * </GiroThemeProvider>
 * ```
 * 
 * @remarks
 * - As CSS custom properties são injetadas no formato `--color-primary-main`, `--color-background-default`, etc.
 * - O atributo `data-theme="light"` ou `data-theme="dark"` é adicionado ao `<html>` automaticamente
 * - Use o hook {@link useGiroTheme} dentro dos componentes filhos para acessar e manipular o tema
 * 
 * @see {@link useGiroTheme} para consumir o tema nos componentes
 * @see {@link GiroThemeProviderProps} para detalhes de todas as props disponíveis
 * 
 * @public
 */
export function GiroThemeProvider({
  theme,
  darkTheme,
  mode: initialMode = 'light',
  persistMode = true,
  storageKey = 'giro-theme-mode',
  children,
}: GiroThemeProviderProps) {
  // Recupera modo do localStorage se persistência estiver habilitada
  const getInitialMode = () : GiroThemeMode => {
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
    root.setAttribute('data-theme', mode);
    const activeTheme = mode === 'dark' && darkTheme ? darkTheme : theme;

    if (activeTheme) {
      const customProperties = themeToCustomProperties(activeTheme);
      injectThemeStyles(customProperties, mode);
    } else {
      removeThemeStyles();
    }
    
    // Cleanup quando componente desmonta
    return () => {
      removeThemeStyles();
      root.removeAttribute('data-theme');
    };
  }, [theme, darkTheme, mode]);

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
