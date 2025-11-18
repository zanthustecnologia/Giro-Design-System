import React from 'react';

export type ListItemVariant = 'text' | 'checkbox' | 'radio' | 'icon';

export interface ListItemProps {
  /** ID único do componente */
  id?: string;
  /** Classes CSS customizadas */
  className?: string;
  /** Variante do item da lista */
  variant?: ListItemVariant;
  /** Texto principal do item */
  text?: string;
  /** Nome do input (para checkbox/radio) */
  name?: string;
  /** Texto secundário/descrição */
  subText?: string;
  /** Se o item está desabilitado */
  disabled?: boolean;
  /** Estado de checked (para checkbox/radio) */
  checked?: boolean;
  /** Estado de selecionado (para text/icon) */
  selected?: boolean;
  /** Callback para clique no item */
  onClick?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  /** Callback para mudança de estado */
  onChange?: (checked: boolean) => void;
  /** Ícone do item (para variant icon) */
  icon?: React.ReactNode;
  /** Valor do input (para checkbox/radio) */
  value?: string;
  /** Se deve mostrar o subtexto */
  showSubText?: boolean;
  /** Estado de hover */
  hovered?: boolean;
}
