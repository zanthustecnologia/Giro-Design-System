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
}) => {
  const handleOpenChange = (open: boolean): void => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.ModalOverlay} />
        <Dialog.Content
          className={clsx(styles.ModalContent, className)}
          id={id}
          onInteractOutside={!closeOnOverlayClick ? (e) => e.preventDefault() : undefined}
          aria-labelledby={id ? `${id}-title` : 'modal-title'}
        >
          <div className={styles.ModalHeader}>
            {title && (
              <Dialog.Title
                className={styles.ModalTitle}
                id={id ? `${id}-title` : 'modal-title'}
              >
                {title}
              </Dialog.Title>
            )}
            {headerContent && (
              <div className={styles.ModalHeaderContent}>{headerContent}</div>
            )}
            <Dialog.Close asChild>
              <Button
                variant="outlined"
                iconOnly
                icon={<Dismiss16Regular />}
                size="lg"
              />
            </Dialog.Close>
          </div>
          <div className={styles.ModalBody}>
            {children}
          </div>
          {footer && (
            <div className={styles.ModalFooter}>{footer}</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
