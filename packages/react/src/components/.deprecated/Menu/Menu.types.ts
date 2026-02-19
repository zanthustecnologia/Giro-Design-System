import { ReactNode, ReactElement } from 'react';

import { BaseProps } from '../../../types/common.types';

/**
 * Representa um item individual do menu
 */
export interface MenuItem {
  /** ID único do item */
  id: string;
  
  /** Texto principal do item */
  text: string;
  
  /** Texto secundário opcional */
  subText?: string;
  
  /** Ícone do item */
  icon?: ReactNode;
  
  /** Estado desabilitado */
  disabled?: boolean;
  
  /** Valor customizado do item */
  value?: unknown;
}

/**
 * Props do componente Menu
 * @example
 * ```tsx
 * <Menu 
 *   menuItems={[
 *     { id: '1', text: 'Perfil', icon: <UserIcon /> },
 *     { id: '2', text: 'Configurações', icon: <SettingsIcon /> }
 *   ]}
 *   onMenuItemClick={(item) => handleMenuClick(item)}
 * >
 *   <Button>Abrir Menu</Button>
 * </Menu>
 * ```
 * @example
 * ```tsx
 * <Menu 
 *   menuItems={items}
 *   type="icon"
 *   applySearch={true}
 *   placeholder="Buscar..."
 *   position="right"
 *   onToggle={(isOpen) => console.log(isOpen)}
 * >
 *   <IconButton icon={<MenuIcon />} />
 * </Menu>
 * ```
 */
export interface MenuProps {
  /** Elemento React que será usado como âncora do menu */
  children: ReactElement<any, any>;
  
  /** Array de itens do menu */
  menuItems?: MenuItem[];
  
  /** Callback executado quando um item do menu é clicado: (item) => void */
  onMenuItemClick?: (item: MenuItem) => void;
  
  /** Callback executado quando o menu é aberto/fechado: (isOpen) => void */
  onToggle?: (isOpen: boolean) => void;
  
  /** Tipo do dropdown */
  type?: 'text' | 'icon';
  
  /** Habilita campo de busca */
  applySearch?: boolean;
  
  /** Placeholder do campo de busca */
  placeholder?: string;
  
  /** Controla exibição do subtexto dos itens */
  showSubText?: boolean;
  
  /** Classe CSS customizada */
  className?: BaseProps['className'];
  
  /** ID único do elemento */
  id?: BaseProps['id'];
  
  /** Largura máxima do menu */
  maxWidth?: string | number;
  
  /** Largura mínima do menu */
  minWidth?: string | number;
  
  /** Posição do menu em relação ao elemento âncora */
  position?: 'left' | 'right';
}
