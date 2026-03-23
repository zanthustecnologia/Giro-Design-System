import { Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useEffect, useState, useCallback, ReactNode, ReactElement } from 'react';

import styles from './Drawer.module.scss';
import Button from '../Button/Button';

import type { DrawerProps, DrawerExampleProps } from './Drawer.types';

const Drawer: React.FC<DrawerProps> = ({
  children,
  headerContent,
  customWidth = '400px',
  onClose,
  title = 'Título',
  isOpen = false,
  onOpen,
  className,
  id,
  disabled = false,
  onOverlayClick,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {

  const internalClose = useCallback((): void => {
    if (disabled) return;

    onClose();
  }, [onClose, disabled]);

  const handleOverlayClick = useCallback((): void => {
    if (onOverlayClick) {
      onOverlayClick();
    }
    
    if (closeOnOverlayClick && !disabled) {
      internalClose();
    }
  }, [onOverlayClick, closeOnOverlayClick, internalClose, disabled]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        internalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, internalClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen && !disabled) {
      if (onOpen) {
        onOpen();
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onOpen, disabled]);

  const handleDrawerClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  const handleCloseClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    internalClose();
  };

  return (
    <>
      <div
        className={clsx(styles['drawerShadow'], {
          [styles['drawerShadow--visible']]: isOpen,
        })}
        onClick={handleOverlayClick}
        role="presentation"
        aria-hidden="true"
        data-testid="drawer-overlay"
      />
      <div
        className={clsx(
          styles['drawerSidebar'],
          {
            [styles['drawerSidebar--open']]: isOpen,
            [styles['drawerSidebar--disabled']]: disabled,
          },
          className
        )}
        style={{
          '--drawer-custom-width': customWidth,
        } as React.CSSProperties}
        onClick={handleDrawerClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id ? `${id}-title` : 'drawer-title'}
        aria-hidden={!isOpen}
        data-testid="drawer-panel"
        id={id}
      >
     
        <div className={clsx(styles['drawerTitleClose'])}>
          <div 
            className={clsx(styles['drawerTitle'])} 
            id={id ? `${id}-title` : 'drawer-title'}
          >
            {title}
          </div>
          
          {headerContent && (
            <div>{headerContent}</div>
          )}

          <Button 
            onClick={handleCloseClick}
            variant='outlined'
            iconOnly
            icon={<Dismiss16Regular />}
            size='lg'
          />
        </div>
        <div 
          className={clsx(styles['drawerChildren'])} 
          data-testid="drawer-content"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;