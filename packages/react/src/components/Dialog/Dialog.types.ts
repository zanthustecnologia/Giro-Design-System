import { ReactNode } from 'react';

export interface DialogProps {
  children?: ReactNode;
  /** Se o Dialog está visível */
  show: boolean;
  /** Título exibido no cabeçalho do Dialog (obrigatório) */
  title: string;
  /** Texto do corpo do Dialog */
  text?: ReactNode;
  /** Texto do botão de confirmação */
  textConfirm?: string;
  /** Texto do botão de cancelamento */
  textCancel?: string;
  /** Função chamada ao confirmar */
  fnConfirm?: () => void;
  /** Função chamada ao cancelar */
  fnCancel?: () => void;
  /** Função chamada ao fechar o Dialog */
  onClose?: () => void;
  /** ID opcional para o Dialog */
  id?: string;
  /** Classe CSS opcional */
  className?: string;
}
