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
export interface CheckboxProps {
  /** ID único do elemento */
  id?: BaseProps['id'];
  
  /** Label ou conteúdo a ser exibido ao lado do checkbox */
  label?: React.ReactNode;
  
  /** Callback executado quando o estado muda: (checked) => void */
  onCheckedChange?: (checked: boolean) => void;
  
  /** Estado inicial (modo não controlado) */
  defaultChecked?: boolean;
  
  /** Estado atual (modo controlado) */
  checked?: boolean;
  
  /** Estado desabilitado do checkbox */
  disabled?: BaseProps['disabled'];
  
  /** Classe CSS customizada */
  className?: BaseProps['className'];
  
  /** Estado indeterminado (usado em selecionar todos com seleção parcial) */
  indeterminate?: boolean;
}