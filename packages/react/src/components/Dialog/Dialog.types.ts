import { ReactNode } from 'react';

import { BaseProps } from '../../types/common.types';

/**
 * Props do componente Dialog
 * @example
 * <Dialog
 *   title="Confirmar ação"
 *   text="Tem certeza que deseja continuar?"
 *   textConfirm="Confirmar"
 *   textCancel="Cancelar"
 * />
 */
export interface DialogProps extends BaseProps, React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo customizado do diálogo */
  children?: ReactNode;
  /** Título exibido no cabeçalho do diálogo */
  title?: string;
  /** Texto ou conteúdo do corpo do diálogo */
  text?: ReactNode;
  /** Texto do botão de confirmação */
  textConfirm?: string;
  /** Texto do botão de cancelamento */
  textCancel?: string;
}
