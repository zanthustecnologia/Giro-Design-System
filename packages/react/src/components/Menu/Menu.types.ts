import * as React from 'react';
import { ReactElement } from 'react';

import { ScalableProps } from '../../types/common.types';

/**
 * Representa um item do menu (suporta subitens aninhados)
 */
export interface MenuItemProps {
  /** ID único do item */
  id?: string;
  
  /** Texto principal do item */
  text?: string;
  
  /** Texto secundário/descrição do item */
  subText?: string;
  
  /** Estado desabilitado do item */
  disabled?: boolean;
  
  /** Ícone do item */
  icon?: React.ReactNode;
  
  /** Subitens do menu (para menus aninhados) */
  children?: MenuItemProps[];
  
  /** Valor do item */
  value?: string;
}

/**
 * Props para renderização customizada de item do menu
 */
export interface DefaultMenuItemProps {
  /** Dados do item */
  item: MenuItemProps;
  
  /** Define se o item está selecionado */
  isSelected: boolean;
  
  /** Callback executado ao selecionar o item: (item) => void */
  onSelect: (item: MenuItemProps) => void;
}

/**
 * Props do componente Menu
 * @example
 * ```tsx
 * <Menu 
 *   items={[
 *     { id: '1', text: 'Perfil', icon: <UserIcon /> },
 *     { id: '2', text: 'Configurações', icon: <SettingsIcon /> }
 *   ]}
 *   onItemSelect={(item) => handleSelect(item)}
 * >
 *   <Button>Menu</Button>
 * </Menu>
 * ```
 * @example
 * ```tsx
 * <Menu 
 *   items={menuItems}
 *   search={true}
 *   maxHeight="400px"
 *   align="end"
 * />
 * ```
 */
export interface MenuProps extends ScalableProps {
  /** Array de itens do menu */
  items: MenuItemProps[];
  
  /** Elemento trigger customizado para abrir o menu */
  children?: ReactElement;
  
  /** Callback executado quando um item é selecionado: (item) => void */
  onItemSelect?: (item: MenuItemProps) => void;
  
  /**
   * Itens selecionados (modo controlado). O Menu é single-select: apenas um item é considerado.
   * Quando informado, a seleção vem desta prop; quando omitido, o Menu guarda o último item clicado.
   */
  selectedItems?: MenuItemProps[];
  
  /** Habilita campo de busca */
  search?: boolean;
  
  /** Alinhamento do menu */
  align?: 'start' | 'end' | 'center';
  
  /** Altura máxima do menu */
  maxHeight?: number | string;

  /** Callback executado quando o menu abre/fecha: (open) => void */
  onOpenChange?: (open: boolean) => void;
}
