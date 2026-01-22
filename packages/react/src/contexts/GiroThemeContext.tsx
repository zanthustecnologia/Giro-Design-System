import { createContext } from 'react';

import type { GiroThemeContextValue } from '../types/theme.types';

/**
 * Context para gerenciamento de tema do Giro Design System
 */
export const GiroThemeContext = createContext<GiroThemeContextValue | null>(null);
