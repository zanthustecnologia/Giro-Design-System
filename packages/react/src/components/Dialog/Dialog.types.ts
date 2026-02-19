import { ReactNode } from 'react';

import { BaseProps } from '../../types/common.types';

/**
 * Props do componente Dialog
 * @example
 * ```tsx
 * <Dialog 
 *   show={isOpen}
 *   title="Confirmar exclusão"
 *   text="Tem certeza que deseja excluir este item?"
 *   textConfirm="Excluir"
 *   textCancel="Cancelar"
 *   fnConfirm={handleDelete}
 *   fnCancel={handleCancel}
 *   onClose={handleClose}
 * />
 * ```
 * @example
 * ```tsx
 * <Dialog 
 *   show={showDialog}
 *   title="Informação"
 *   onClose={() => setShowDialog(false)}
 * >
 *   <p>Conteúdo customizado do dialog</p>
 * </Dialog>
 * ```
 */
export interface DialogProps extends BaseProps {
  /** Conteúdo customizado do dialog */
  children?: ReactNode;
  
  /** Define se o dialog está visível */
  show: boolean;
  
  /** Título exibido no cabeçalho do dialog */
  title: string;
  
  /** Texto ou conteúdo do corpo do dialog */
  text?: ReactNode;
  
  /** Texto do botão de confirmação */
  textConfirm?: string;
  
  /** Texto do botão de cancelamento */
  textCancel?: string;
  
  /** Callback executado ao confirmar: () => void */
  fnConfirm?: () => void;
  
  /** Callback executado ao cancelar: () => void */
  fnCancel?: () => void;
  
  /** Callback executado ao fechar o dialog: () => void */
  onClose?: () => void;
}
