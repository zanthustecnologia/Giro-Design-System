import React, { useEffect, useRef, useId, useCallback, ReactNode } from 'react';
import './Dialog.module.scss';
import Button from '../Button/Button';
import clsx from 'clsx';
import { useFocusTrap } from './utils/DialogUtils';
import type { DialogProps } from './Dialog.types';

/**
 * Componente Dialog - Modal simples e acessível.
 * Não utiliza um wrapper externo, gerencia seu próprio backdrop e container.
 * Fecha ao clicar nos botões ou pressionar ESC.
 * Mantém o foco preso dentro do modal enquanto aberto (trap focus).
 */
const Dialog: React.FC<DialogProps> = ({
  show,
  title,
  text,
  textConfirm = 'OK',
  textCancel = 'Cancelar',
  fnConfirm,
  fnCancel,
  onClose,
  className,
  id: propId
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const id = propId || generatedId;

  const containerRef = useFocusTrap(show);

  const handleConfirm = useCallback((): void => {
    if (fnConfirm) fnConfirm();
    if (onClose) onClose();
  }, [fnConfirm, onClose]);

  /**
   * Handler para ação Cancelar.
   */
  const handleCancel = useCallback((): void => {
    if (fnCancel) fnCancel();
    if (onClose) onClose();
  }, [fnCancel, onClose]);

  // Foca o modal ao abrir e adiciona ESC para fechar
  useEffect(() => {
    if (show && dialogRef.current) {
      dialogRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, handleCancel]);
  if (!show) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div className="zds-dialog__overlay" />

      {/* Wrapper do Dialog */}
      <div className="zds-dialog__wrapper">
        <div
          className={clsx('zds-dialog', className)}
          role="dialog"
          aria-modal="true"
          id={id}
          aria-labelledby={`zds-dialog-title-${id}`}
          aria-describedby={`zds-dialog-desc-${id}`}
          tabIndex={-1}
          ref={containerRef}
        >
          {/* Título */}
          <div id={`zds-dialog-title-${id}`} className="zds-dialog__title">
            {title}
          </div>

          {/* Conteúdo/Texto */}
          <div id={`zds-dialog-desc-${id}`} className="zds-dialog__text">
            {text}
          </div>

          {/* Ações/Botões */}
          <div className="zds-dialog__actions">
            {!!(textCancel && textCancel.trim()) && (
              <Button variant="outlined" onClick={handleCancel}>
                {textCancel}
              </Button>
            )}
            <Button variant="filled" onClick={handleConfirm}>
              {textConfirm}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// Memoização para otimização de performance
const MemoizedDialog = React.memo(Dialog);
MemoizedDialog.displayName = 'Dialog';

export default MemoizedDialog;