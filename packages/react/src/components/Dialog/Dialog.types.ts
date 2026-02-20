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
  title?: string;
  text?: ReactNode;
  textConfirm?: string;
  textCancel?: string;
  id?: string;
  className?: string;
}
