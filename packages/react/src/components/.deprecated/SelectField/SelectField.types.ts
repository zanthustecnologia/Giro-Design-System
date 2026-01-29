import React from 'react';

export interface SelectFieldProps {
  /** ID do campo */
  id?: string;
  /** Nome do campo */
  name?: string;
  /** Valor exibido */
  value?: string;
  /** Placeholder */
  placeholder?: string;
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
  /** Ícone (chevron) */
  icon?: React.ReactNode;
  /** Estado aberto */
  isOpen?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Tooltip info */
  tooltip?: React.ReactNode;
  tooltipText?: string;
  positionTooltip?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
  /** Indica se o campo foi "tocado" (aberto e fechado) */
  isTouched?: boolean;
  /** Força estado de erro independente da validação interna */
  hasError?: boolean;
}
