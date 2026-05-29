import * as React from 'react';
import { ReactElement } from 'react';

import { BaseProps } from '../../types/common.types';

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
 *   type="icon"
 *   search={true}
 *   enableInfiniteScroll={true}
 *   onScrollEnd={loadMore}
 *   maxHeight="400px"
 *   align="end"
 * />
 * ```
 */
export interface MenuProps extends BaseProps {
  /** Array de itens do menu */
  items: MenuItemProps[];
  
  /** Elemento trigger customizado para abrir o menu */
  children?: ReactElement;
  
  /** Tipo de visualização do menu */
  type?: 'text' | 'icon';
  
  /** Callback executado quando um item é selecionado: (item) => void */
  onItemSelect?: (items: MenuItemProps) => void;
  
  /** Array de itens selecionados */
  selectedItems?: MenuItemProps[];
  
  /** Habilita campo de busca */
  search?: boolean;
  
  /** Alinhamento do menu */
  align?: 'start' | 'end' | 'center';
  
  /** Altura máxima do menu */
  maxHeight?: number | string;

  /** Habilita scroll infinito */
  enableInfiniteScroll?: boolean;
  
  /** Callback executado ao chegar ao final do scroll: () => void */
  onScrollEnd?: () => void;
  
  /** Estado de carregamento de mais itens */
  isLoadingMore?: boolean;
  
  /** Habilita busca via API */
  enableApiSearch?: boolean;
  
  /** Callback executado na busca via API: (searchTerm) => void */
  onApiSearch?: (searchTerm: string) => void;
  
  /** Callback executado quando o menu abre/fecha: (open) => void */
  onOpenChange?: (open: boolean) => void;

  /** Classe CSS opcional */
  className?: string;

  /** Escala visual aplicada ao conteúdo do menu */
  scale?: 1 | 1.5 | 2;

  /** Escala visual aplicada ao botão/trigger quando ele aceitar a prop `scale` */
  buttonScale?: 1 | 1.5 | 2;
}
