import * as React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { BaseProps } from '../../types/common.types';
import type { VirtualKeyboardVariant } from '../VirtualKeyboard/VirtualKeyboard.type';

/**
 * Props do componente Search
 * @example
 * ```tsx
 * <Search 
 *   placeholder="Buscar..."
 *   value={searchTerm}
 *   onChange={(e) => setSearchTerm(e.target.value)}
 *   onClear={() => setSearchTerm('')}
 * />
 * ```
 * @example
 * ```tsx
 * <Search 
 *   placeholder="Pesquisar produtos"
 *   disabled={isLoading}
 *   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
 *   onFocus={handleFocus}
 * />
 * ```
 */

type NativeInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue' | 'onChange' | 'onClick' | 'onMouseDown' 
>;

export interface SearchProps extends BaseProps, NativeInputProps {
  /** Placeholder do campo de busca */
  placeholder?: string;
  
  /** Valor controlado do campo */
  value?: string;
  
  /** Callback executado quando o valor muda: (e) => void */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Callback executado ao pressionar tecla: (e) => void */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  
  /** Callback executado ao focar no campo: (e) => void */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Callback executado ao desfocar do campo: (e) => void */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Callback executado ao limpar o campo: () => void */
  onClear?: () => void;
  
  /** Callback executado ao clicar no componente: (e) => void */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Callback executado ao pressionar mouse no componente: (e) => void */
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  
  /** ID para testes automatizados */
  'data-testid'?: string;

  /** Classe CSS opcional */
  className?: string;

  /** Habilita o teclado virtual */
  virtualKeyboard?: boolean;

  /** Variante do teclado virtual (padrão: 'default') */
  virtualKeyboardVariant?: VirtualKeyboardVariant;

  /** Comprimento máximo permitido pelo teclado virtual */
  virtualKeyboardMaxLength?: number;
}
