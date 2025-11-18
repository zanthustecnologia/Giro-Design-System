import { ReactNode, ReactElement } from 'react';

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

export interface MenuProps {
  /** Elemento React que será usado como âncora do menu (obrigatório) */
  children: ReactElement<any, any>;
  /** Array de itens do menu */
  menuItems?: MenuItem[];
  /** Callback executado quando um item do menu é clicado */
  onMenuItemClick?: (item: MenuItem) => void;
  /** Callback executado quando o menu é aberto/fechado */
  onToggle?: (isOpen: boolean) => void;
  /** Tipo do dropdown */
  type?: 'text' | 'icon';
  /** Habilita campo de busca */
  applySearch?: boolean;
  /** Placeholder do campo de busca */
  placeholder?: string;
  /** Controla exibição do subtexto */
  showSubText?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** ID único do componente */
  id?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
  /** Posição do menu em relação ao elemento âncora */
  position?: 'left' | 'right';
}
