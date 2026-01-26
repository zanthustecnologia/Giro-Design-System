import { createContext } from 'react';

import type { GiroThemeContextValue } from '../types/theme.types';

/**
 * Context para gerenciamento de tema do Giro Design System
 * 
 * Este context armazena o estado do tema (modo light/dark) e funções para manipulá-lo.
 * **Não deve ser usado diretamente** - utilize o hook {@link useGiroTheme} para acessar o contexto.
 * 
 * @remarks
 * O context é criado com valor inicial `null` e só é populado quando envolvido pelo {@link GiroThemeProvider}.
 * Se tentar acessar fora do provider, o hook {@link useGiroTheme} lançará um erro.
 * 
 * @example
 * // Use o hook dedicado
 * const { mode, toggleMode } = useGiroTheme();
 * ```
 * 
 * @see {@link useGiroTheme} para consumir o contexto
 * @see {@link GiroThemeProvider} para prover o contexto
 * 
 * @public
 */
export const GiroThemeContext = createContext<GiroThemeContextValue | null>(null);
