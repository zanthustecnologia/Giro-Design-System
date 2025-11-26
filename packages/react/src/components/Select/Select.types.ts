import React from 'react';
import { DropdownType } from '../Dropdown/Dropdown.types';

export interface SelectOption {
  /** ID único da opção (opcional, será gerado automaticamente se não fornecido) */
  id?: string;
  /** Texto principal da opção */
  text: string;
  /** Texto secundário/descrição da opção */
  subText?: string;
  /** Ícone da opção (React node) */
  icon?: React.ReactNode;
  /** Define se a opção está desabilitada */
  disabled?: boolean;
}

export interface SelectProps {
  /** ID único do componente */
  id?: string;
  /** Array de opções para seleção - obrigatório */
  options: SelectOption[];
  /** Valor(es) selecionado(s) */
  value?: string | string[];
  /** Valor inicial para seleção (usado apenas na primeira renderização) */
  initialValue?: string | string[];
  /** Callback para mudanças na seleção */
  onChange?: (selectedItems: SelectOption[]) => void;
  /** Placeholder do campo */
  placeholder?: string;
  /** Tipo do dropdown (single ou multiple) */
  type?: DropdownType;
  maxHeight?: string;
  /** Label do campo */
  label?: string;
  /** Texto de ajuda */
  helperText?: string;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Campo obrigatório */
  required?: boolean;
  /** Campo desabilitado */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Texto para acessibilidade */
  showSubText?: boolean;
  /** Aria-label do campo */
  ariaLabel?: string;
  /** Habilita campo de busca */
  applySearch?: boolean;
  /** Placeholder do campo de busca */
  searchPlaceholder?: string;
  maxWidth?: string;
  minWidth?: string;
  tooltip?: boolean;
  tooltipText?: string;
  width?: string;
  /** Força posição do dropdown: 'top' abre para cima, 'bottom' abre para baixo. Se não especificado, usa detecção automática */
  position?: 'top' | 'bottom';
  positionTooltip?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
  infiniteScroll?: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    page: number;
    lastPage: number;
    onLoadMore: () => void;
    threshold?: number;
    rootMargin?: string;
  };
}
