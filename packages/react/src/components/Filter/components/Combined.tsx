import { FilterRegular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useCallback } from 'react';

import Badge from '../../Badge';
import Button from '../../Button';
import Drawer from '../../Drawer/Drawer';
import styles from '../Filter.module.scss';

import type { FilterProps } from '../Filter.types';

const Combined: React.FC<FilterProps> = ({
  buttonText = 'Filtrar',
  icon,
  variant = 'outlined',
  disabled = false,
  className,
  title = 'Filtrar',
  drawerWidth = "fit-content",
  activeCount = 0,
  drawerHeaderContent,
  children,
  onApply,
  onClear,
  onOpen,
  onClose,
  id,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleApply = useCallback(() => {
    onApply?.();
    handleClose();
  }, [onApply, handleClose]);

  const handleClear = useCallback(() => {
    onClear?.();
  }, [onClear]);

  return (
    <div className={clsx(styles.triggerWrapper, className)} id={id} {...rest}>
      <Button
        variant={variant}
        disabled={disabled}
        icon={icon ?? <FilterRegular />}
        iconPosition="left"
        onClick={handleOpen}
      >
        <span className={styles.triggerContent}>
          {buttonText}
          {activeCount > 0 && (
            <Badge badgeValue={activeCount} filterVariant />
          )}
        </span>
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        customWidth={drawerWidth}
        closeOnOverlayClick
        closeOnEscape
        headerContent = {drawerHeaderContent}
        footer={
          <div className={styles.combinedFooter}>
            <Button variant="outlined" onClick={handleClear}>
              Limpar
            </Button>
            <Button onClick={handleApply}>
              Aplicar
            </Button>
          </div>
        }
      >
        <div className={styles.body}>
          {children}
        </div>
      </Drawer>
    </div>
  );
};

export default Combined;
