import * as React from 'react';

import { BaseProps, Scale } from '../../types/common.types';

/** Variantes disponíveis para o ListItem */
export type ListItemVariant = 'text' | 'checkbox' | 'radio' | 'icon';

/**
 * Props do componente ListItem
 * @example
 * ```tsx
 * <ListItem 
 *   variant="text"
 *   text="Item da lista"
 *   subText="Descrição do item"
 *   onClick={handleClick}
 * />
 * ```
 * @example
 * ```tsx
 * <ListItem 
 *   variant="checkbox"
 *   text="Aceitar termos"
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   disabled={false}
 * />
 * ```
 */
export interface ListItemProps extends BaseProps {
  
  /** Variante do item da lista */
  variant?: ListItemVariant;
  
  /** Texto principal do item */
  text?: string;
  
  /** Nome do input (para variantes checkbox/radio) */
  name?: string;
  
  /** Texto secundário/descrição do item */
  subText?: string;
  
  /** Estado de checked (para variantes checkbox/radio) */
  checked?: boolean;
  
  /** Estado de selecionado (para variantes text/icon) */
  selected?: boolean;
  
  /** Callback executado ao clicar no item: (event) => void */
  onClick?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  
  /** Callback executado quando o estado muda: (checked) => void */
  onChange?: (checked: boolean) => void;
  
  /** Ícone do item (para variante icon) */
  icon?: React.ReactNode;
  
  /** Valor do input (para variantes checkbox/radio) */
  value?: string;
  
  /** Controla a visibilidade do subtexto explicitamente, independentemente de `subText` estar preenchido */
  showSubText?: boolean;
  
  /** Habilita o efeito visual de hover ao passar o mouse. Use `false` para itens estáticos/não interativos */
  hovered?: boolean;

  /** Largura do item. Quando não informada, ocupa 100% do container */
  width?: React.CSSProperties['width'];

  /** Escala visual do componente (1, 1.5 ou 2) */
  scale?: Scale;

  /** Classe CSS opcional */
  className?: string;
}
