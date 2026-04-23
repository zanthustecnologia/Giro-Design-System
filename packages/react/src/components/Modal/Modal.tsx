import { Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { Dialog } from 'radix-ui';
import * as React from 'react';

import styles from './Modal.module.scss';
import Button from '../Button/Button';

import type { ModalProps } from './Modal.types';

const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  onClose,
  title,
  children,
  headerContent,
  closeOnOverlayClick = true,
  className,
  id,
  footer,
  customWidth,
  fullscreen = false,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean): void => {
    if (!open) {
      onClose();
    }
  };

  const handleOpenAutoFocus = (e: Event): void => {
    e.preventDefault();
    contentRef.current?.focus();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay} />
        <Dialog.Content
          ref={contentRef}
          className={clsx(styles.modalContent, fullscreen && styles['modalContent--fullscreen'], className)}
          id={id}
          style={{
            '--modal-custom-width': customWidth,
          } as React.CSSProperties}
          onInteractOutside={!closeOnOverlayClick ? (e) => e.preventDefault() : undefined}
          onOpenAutoFocus={handleOpenAutoFocus}
          aria-labelledby={id ? `${id}-title` : 'modal-title'}
          tabIndex={-1}
        >
          <div className={styles.modalHeader}>
            {title && (
              <Dialog.Title
                className={styles.modalTitle}
                id={id ? `${id}-title` : 'modal-title'}
              >
                {title}
              </Dialog.Title>
            )}
            {headerContent && (
              <div>{headerContent}</div>
            )}
            <Dialog.Close asChild>
              <Button
                variant="outlined"
                iconOnly
                icon={<Dismiss16Regular />}
                size="lg"
                tooltipText='Fechar'
              />
            </Dialog.Close>
          </div>
          <div className={styles.modalBody}>
            {children}
          </div>
          {footer && (
            <div className={styles.modalFooter}>{footer}</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
