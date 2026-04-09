import { ReactNode } from 'react';

import { BaseProps } from '../../types/common.types';

/**
 * Props do componente Modal
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Título do Modal"
 * >
 *   <p>Conteúdo do modal</p>
 * </Modal>
 * ```
 * @example
 * ```tsx
 * <Modal
 *   isOpen={showModal}
 *   onClose={handleClose}
 *   title="Confirmar ação"
 *   closeOnOverlayClick={false}
 * >
 *   <MyForm />
 * </Modal>
 * ```
 */
export interface ModalProps extends BaseProps {
  /** Define se o modal está aberto */
  isOpen: boolean;

  /** Callback executado ao fechar o modal */
  onClose: () => void;

  /** Título exibido no cabeçalho do modal */
  title?: string;

  /** Conteúdo a ser exibido dentro do modal */
  children?: ReactNode;

  /** Conteúdo customizado no cabeçalho, exibido ao lado do título */
  headerContent?: ReactNode;

  /** Define se o modal fecha ao clicar no overlay (padrão: true) */
  closeOnOverlayClick?: boolean;
}
