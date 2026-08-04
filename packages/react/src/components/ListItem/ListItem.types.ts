import * as React from 'react';

import { BaseProps, Scale } from '../../types/common.types';

/** Variantes disponíveis para o ListItem */
export type ListItemVariant = 'text' | 'checkbox' | 'icon';

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
  
  /** Texto secundário/descrição do item */
  subText?: string;
  
  /** Estado de checked (para variante checkbox) */
  checked?: boolean;
  
  /** Estado de selecionado (para variantes text/icon) */
  selected?: boolean;
  
  /** Callback executado ao clicar no item: (event) => void */
  onClick?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  
  /** Callback executado quando o estado muda: (checked) => void */
  onChange?: (checked: boolean) => void;
  
  /** Ícone do item (para variante icon) */
  icon?: React.ReactNode;
  
  /** Largura do item. Quando não informada, ocupa 100% do container */
  customWidth?: React.CSSProperties['width'];

  /** Escala visual do componente (1, 1.5 ou 2) */
  scale?: Scale;

  /** Itens filhos para criar estrutura de árvore (outros ListItems) */
  children?: React.ReactNode;

  /** Estado inicial de expansão — modo não controlado (default: false) */
  defaultExpanded?: boolean;

  /** Estado de expansão controlado */
  expanded?: boolean;

  /** Callback executado quando o estado de expansão muda */
  onExpandedChange?: (expanded: boolean) => void;

}
