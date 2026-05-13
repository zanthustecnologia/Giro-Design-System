import { ReactNode, ReactElement } from 'react';

import { Variant, BaseProps } from '../../types/common.types';

/**
 * Props do componente Drawer
 * @example
 * ```tsx
 * <Drawer 
 *   isOpen={isDrawerOpen}
 *   onClose={handleClose}
 *   title="Menu"
 * >
 *   <nav>
 *     <a href="/home">Home</a>
 *     <a href="/about">Sobre</a>
 *   </nav>
 * </Drawer>
 * ```
 * @example
 * ```tsx
 * <Drawer 
 *   isOpen={showDrawer}
 *   onClose={() => setShowDrawer(false)}
 *   title="Configurações"
 *   customWidth="400px"
 *   closeOnOverlayClick={true}
 *   closeOnEscape={true}
 * >
 *   <Settings />
 * </Drawer>
 * ```
 */
export interface DrawerProps extends BaseProps {
  /** Conteúdo a ser exibido dentro do drawer */
  children?: ReactNode;

  /** Conteúdo customizado do cabeçalho */
  headerContent?: ReactNode;
  
  /** Largura customizada do drawer (ex: '400px', '50%') */
  customWidth?: string;
  
  /** Callback executado ao fechar o drawer: () => void */
  onClose: () => void;
  
  /** Título exibido no cabeçalho do drawer */
  title?: string;
  
  /** Define se o drawer está aberto */
  isOpen: boolean;
  
  /** Callback executado ao abrir o drawer: () => void */
  onOpen?: () => void;
  
  /** Callback executado ao clicar no overlay: () => void */
  onOverlayClick?: () => void;
  
  /** Define se o drawer fecha ao clicar no overlay */
  closeOnOverlayClick?: boolean;
  
  /** Define se o drawer fecha ao pressionar ESC */
  closeOnEscape?: boolean;

  /** Classe CSS opcional */
  className?: string;
}

/**
 * Props do componente DrawerExample (trigger para abrir o drawer)
 * @example
 * ```tsx
 * <DrawerExample 
 *   text="Abrir menu"
 *   icon={<MenuIcon />}
 *   onOpen={handleOpen}
 * />
 * ```
 */
export interface DrawerExampleProps extends BaseProps {
  /** Texto do botão trigger */
  text?: string;
  
  /** Ícone do botão trigger */
  icon?: ReactElement;
  
  /** Conteúdo customizado do botão trigger */
  children?: ReactNode;
  
  /** Callback executado ao abrir: () => void */
  onOpen?: () => void;
  
  /** Variante visual do botão trigger */
  variant?: Variant;
}
