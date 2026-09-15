import { Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { Dialog } from 'radix-ui';
import * as React from 'react';

import styles from './Modal.module.scss';
import Button from '../Button/Button';
import { isDismissOutsideIgnored } from '../../utils/dismissOutside';

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
  customHeight,
  closingButton = true,
  fullscreen = false,
  ...rest
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

  const handleInteractOutside = (e: Event): void => {
    // Ignora interações em elementos portalizados que se declararam isentos
    // (ex.: VirtualKeyboard em modo native), evitando fechamentos indesejados.
    if (isDismissOutsideIgnored(e.target)) {
      e.preventDefault();
      return;
    }

    if (!closeOnOverlayClick) {
      e.preventDefault();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay} />
        <Dialog.Content
          ref={contentRef}
          className={clsx(styles.modalContent, fullscreen && styles['modalContent--fullscreen'], className)}
          id={id}
          style={{
            '--modal-custom-width': customWidth,
            '--modal-custom-height': customHeight,
          } as React.CSSProperties}
          onInteractOutside={handleInteractOutside}
          onOpenAutoFocus={handleOpenAutoFocus}
          aria-labelledby={id ? `${id}-title` : 'modal-title'}
          tabIndex={-1}
        >
          {(title || headerContent || closingButton) && (
            <header className={styles.modalHeader}>
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
              {closingButton && (
                <div className={styles.modalCloseButton}>
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
              )}
            </header>
          )}
          <section className={styles.modalBody}>
            {children}
          </section>
          {footer && (
            <footer className={styles.modalFooter}>{footer}</footer>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
