import { ReactNode, ReactElement } from 'react';

import { Variant, BaseProps } from '../../types/common.types';

export interface DrawerProps {
  /** Conteúdo do Drawer */
  children?: ReactNode;
  /** Largura do Drawer (use design tokens quando possível) */
  customWidth?: string;
  /** Callback quando o Drawer é fechado */
  onClose: () => void;
  /** Título do Drawer */
  title?: string;
  /** Determina se o drawer está aberto */
  isOpen: boolean;
  /** Callback quando o Drawer é aberto */
  onOpen?: () => void;
  /** Classes CSS adicionais */
  className?: BaseProps['className'];
  /** ID único do componente */
  id?: BaseProps['id'];
  /** Se o drawer está desabilitado */
  disabled?: BaseProps['disabled'];
  /** Callback chamado quando clica no overlay */
  onOverlayClick?: () => void;
  /** Se deve fechar ao clicar no overlay */
  closeOnOverlayClick?: boolean;
  /** Se deve fechar ao pressionar ESC */
  closeOnEscape?: boolean;
}

export interface DrawerExampleProps {
  /** Texto do botão */
  text?: string;
  /** Ícone do botão */
  icon?: ReactElement;
  /** Conteúdo do Drawer */
  children?: ReactNode;
  /** Callback quando o Drawer é aberto */
  onOpen?: () => void;
  /** Classes CSS adicionais */
  className?: BaseProps['className'];
  /** Variante do botão */
  variant?: Variant;
  /** Se o botão está desabilitado */
  disabled?: BaseProps['disabled'];
}
