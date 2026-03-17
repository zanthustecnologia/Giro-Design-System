import React, { useEffect, useState, useCallback, ReactNode, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Drawer.module.scss';
import { Dismiss16Regular } from '@fluentui/react-icons';
import Button from '../Button/Button';
import type { DrawerProps, DrawerExampleProps } from './Drawer.types';

/**
 * Componente Drawer do Zanthus Design System
 * Implementa um painel lateral deslizante com overlay
 * Segue padrões WCAG 2.1 AA para acessibilidade
 */
const Drawer: React.FC<DrawerProps> = ({
  children,
  customWidth = '400px', // ✅ Valor padrão útil
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

  /**
   * Manipula clique no overlay
   * Fecha o drawer se closeOnOverlayClick estiver habilitado
   */
  const handleOverlayClick = useCallback((): void => {
    if (onOverlayClick) {
      onOverlayClick();
    }
    
    if (closeOnOverlayClick && !disabled) {
      internalClose();
    }
  }, [onOverlayClick, closeOnOverlayClick, internalClose, disabled]);

  /**
   * Fecha o drawer ao pressionar ESC
   * Adiciona e remove event listener baseado no estado isOpen
   */
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    /**
     * Manipula teclas pressionadas
     * @param event - Evento de teclado
     */
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        internalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, internalClose, closeOnEscape]);

  /**
   * Gerencia overflow do body baseado no estado isOpen
   */
  useEffect(() => {
    if (isOpen && !disabled) {
      // Executa callback de abertura se fornecido
      if (onOpen) {
        onOpen();
      }

      // Previne scroll do body quando drawer está aberto
      document.body.style.overflow = 'hidden';
    } else {
      // Restaura scroll do body
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onOpen, disabled]);

  /**
   * Previne propagação de eventos no drawer
   * Evita fechamento acidental ao clicar no conteúdo
   * @param event - Evento de clique
   */
  const handleDrawerClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  /**
   * Manipula clique no botão de fechar
   * @param event - Evento de clique
   */
  const handleCloseClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    internalClose();
  };

  return (
    <>
      {/* Overlay/Shadow */}
      <div
        className={clsx(styles['zds-custom__drawer-shadow'], {
          [styles['zds-custom__drawer-shadow--visible']]: isOpen,
        })}
        onClick={handleOverlayClick}
        role="presentation"
        aria-hidden="true"
        data-testid="drawer-overlay"
      />

      {/* Drawer Panel */}
      <div
        className={clsx(
          styles['zds-custom__drawer-sidebar'],
          {
            [styles['zds-custom__drawer-sidebar--open']]: isOpen,
            [styles['zds-custom__drawer-sidebar--disabled']]: disabled,
          },
          className
        )}
        style={{
          // ✅ APENAS: Width customizável via CSS custom property
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
     
        <div className={clsx(styles['zds-drawer__title-close'])}>
          <div 
            className={clsx(styles['zds-drawer__title'])} 
            id={id ? `${id}-title` : 'drawer-title'}
          >
            {title}
          </div>
          <Button
          variant='text'
          iconOnly
          />
          <Button 
            onClick={handleCloseClick}
            variant='text'
            iconOnly
            icon={<Dismiss16Regular />}
            size='lg'
          />
        </div>
        <div 
          className={clsx(styles['zds-drawer__children'])} 
          data-testid="drawer-content"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;