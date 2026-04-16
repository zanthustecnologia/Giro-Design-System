import { ReactNode } from 'react';

import { BaseProps } from '../../types/common.types';

/**
 * Props do componente Dialog
 * @example
 * <Dialog
 *   title="Confirmar ação"
 *   bodyContent="Tem certeza que deseja continuar?"
 *   textPrimaryAction="Confirmar"
 *   textSecondaryAction="Cancelar"
 * />
 */
export interface DialogProps extends BaseProps, React.HTMLAttributes<HTMLDivElement> {

  /** Controla a visibilidade do diálogo */
  show?: boolean;
  /** Título exibido no cabeçalho do diálogo */
  title?: string;
  /** Texto ou conteúdo do corpo do diálogo */
  bodyContent?: ReactNode;
  /** Texto do botão de ação primária */
  textPrimaryAction?: string;
  /** Texto do botão de ação secundária */
  textSecondaryAction?: string;
  /** Função chamada ao executar a ação primária */
  onPrimaryAction?: () => void;
  /** Função chamada ao executar a ação secundária */
  onSecondaryAction?: () => void;
}
