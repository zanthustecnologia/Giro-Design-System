import React from 'react';

import { ScalableProps } from '../../types/common.types';

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
export interface CheckboxProps extends ScalableProps {
  
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
}
