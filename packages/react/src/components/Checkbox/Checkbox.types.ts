import React from 'react';

import { BaseProps } from '../../types/common.types';

/**
 * Props do componente Checkbox
 * @example
 * ```tsx
 * <Checkbox 
 *   label="Aceito os termos"
 *   checked={accepted}
 *   onCheckedChange={setAccepted}
 * />
 * ```
 * @example
 * ```tsx
 * <Checkbox 
 *   label="Selecionar todos"
 *   indeterminate={someSelected}
 *   onCheckedChange={handleSelectAll}
 *   disabled={isLoading}
 * />
 * ```
 */
export interface CheckboxProps extends BaseProps {
  
  /** Label ou conteúdo a ser exibido ao lado do checkbox */
  label?: React.ReactNode;
  
  /** Callback executado quando o estado muda: (checked) => void */
  onCheckedChange?: (checked: boolean) => void;
  
  /** Estado inicial (modo não controlado) */
  defaultChecked?: boolean;
  
  /** Estado atual (modo controlado) */
  checked?: boolean;
  
  /** Estado indeterminado (usado em selecionar todos com seleção parcial) */
  indeterminate?: boolean;

  /** Classe CSS opcional */
  className?: string;

  /** Escala visual aplicada ao componente */
  scale?: 1 | 1.5 | 2;
}