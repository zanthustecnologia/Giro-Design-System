import { useContext } from 'react';

import { GiroThemeContext } from '../contexts/GiroThemeContext';

import type { GiroThemeContextValue } from '../types/theme.types';

/**
 * Hook para acessar o contexto de tema do Giro Design System
 * 
 * @throws {Error} Se usado fora do GiroThemeProvider
 * 
 * @returns Contexto do tema com funções para controlar modo (light/dark)
 * 
 * @example
 * function MyComponent() {
 *   const { mode, toggleMode } = useGiroTheme();
 *   
 *   return (
 *     <button onClick={toggleMode}>
 *       Modo atual: {mode}
 *     </button>
 *   );
 * }
 * 
 * @example
 * function ThemeSwitcher() {
 *   const { mode, setMode } = useGiroTheme();
 *   
 *   return (
 *     <select value={mode} onChange={(e) => setMode(e.target.value as 'light' | 'dark')}>
 *       <option value="light">Light</option>
 *       <option value="dark">Dark</option>
 *     </select>
 *   );
 * }
 */
export function useGiroTheme(): GiroThemeContextValue {
  const context = useContext(GiroThemeContext);

  if (!context) {
    throw new Error(
      'useGiroTheme must be used within a GiroThemeProvider. ' +
      'Make sure to wrap your component tree with <GiroThemeProvider>.'
    );
  }

  return context;
}
