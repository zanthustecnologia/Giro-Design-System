import React, { useEffect, useState, useCallback, ReactNode, ReactElement } from 'react';
import clsx from 'clsx';
import './Drawer.scss';
import { Dismiss16Regular } from '@fluentui/react-icons';
import Button from '../Button/Button';

// ✅ Types para o componente
type DrawerType = 'select' | 'filter' | 'form'; // Expandindo os tipos possíveis

export interface DrawerProps {
  /** Conteúdo do Drawer */
  children: ReactNode;
  /** Largura do Drawer (use design tokens quando possível) */
  pWidth?: string;
  /** Callback quando o Drawer é fechado */
  onClose: () => void;
  /** Título do Drawer */
  title?: string;
  /** Tipo do Drawer (não utilizado atualmente) */
  type?: DrawerType;
  /** Remove padding do conteúdo */
  noPadding?: boolean;
  /** Determina se o drawer está aberto */
  isOpen: boolean;
  /** Callback quando o Drawer é aberto */
  onOpen?: () => void;
  /** Classes CSS adicionais */
  className?: string;
  /** ID único do componente */
  id?: string;
  /** Se o drawer está desabilitado */
  disabled?: boolean;
  /** Z-index customizado para o drawer */
  zIndex?: number;
  /** Z-index customizado para o overlay */
  overlayZIndex?: number;
  /** Callback chamado quando clica no overlay */
  onOverlayClick?: () => void;
  /** Se deve fechar ao clicar no overlay */
  closeOnOverlayClick?: boolean;
  /** Se deve fechar ao pressionar ESC */
  closeOnEscape?: boolean;
}

export interface DrawerExampleProps {
  /** Texto do botão */
  text?: string;
  /** Ícone do botão */
  icon?: ReactElement;
  /** Conteúdo do Drawer */
  children?: ReactNode;
  /** Callback quando o Drawer é aberto */
  onOpen?: () => void;
  /** Classes CSS adicionais */
  className?: string;
  /** Variante do botão */
  variant?: 'filled' | 'outlined' | 'text';
  /** Se o botão está desabilitado */
  disabled?: boolean;
}

/**
 * Componente Drawer do Zanthus Design System
 * Implementa um painel lateral deslizante com overlay
 * Segue padrões WCAG 2.1 AA para acessibilidade
 */
const Drawer: React.FC<DrawerProps> = ({
  children,
  pWidth = '0px',
  onClose,
  title = 'Título',
  type = 'select',
  noPadding = false,
  isOpen = false,
  onOpen,
  className = '',
  id,
  disabled = false,
  zIndex = 21,
  overlayZIndex = 20,
  onOverlayClick,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  // ✅ Estados internos tipados
  const [width, setWidth] = useState<string>('0px');
  const [opacity, setOpacity] = useState<string>('0');
  const [indexDrawer, setIndexDrawer] = useState<string>('0');
  const [indexDrawerShadow, setIndexDrawerShadow] = useState<string>('0');

  /**
   * Manipula o fechamento interno do drawer
   * Atualiza estados visuais e executa callback
   */
  const internalClose = useCallback((): void => {
    if (disabled) return;

    setWidth('0px');
    setOpacity('0');
    setIndexDrawer('0');
    setIndexDrawerShadow('0');
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
   * Gerencia estados visuais baseado no prop isOpen
   * Controla width, opacity e z-index do drawer e overlay
   */
  useEffect(() => {
    if (isOpen && !disabled) {
      setWidth(pWidth);
      setOpacity('1.0');
      setIndexDrawer(zIndex.toString());
      setIndexDrawerShadow(overlayZIndex.toString());
      
      // Executa callback de abertura se fornecido
      if (onOpen) {
        onOpen();
      }

      // Previne scroll do body quando drawer está aberto
      document.body.style.overflow = 'hidden';
    } else {
      setWidth('0px');
      setOpacity('0');
      setIndexDrawer('0');
      setIndexDrawerShadow('0');

      // Restaura scroll do body
      document.body.style.overflow = 'unset';
    }

    // Cleanup: restaura scroll do body quando componente é desmontado
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, pWidth, onOpen, disabled, zIndex, overlayZIndex]);

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
  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    internalClose();
  };

  return (
    <>
      {/* Overlay/Shadow */}
      <div
        className={clsx('zds-custom-drawer-shadow', {
          'zds-custom-drawer-shadow--visible': opacity !== '0',
        })}
        style={{
          opacity: opacity,
          display: opacity === '0' ? 'none' : 'block',
          zIndex: indexDrawerShadow,
        }}
        onClick={handleOverlayClick}
        role="presentation"
        aria-hidden="true"
        data-testid="drawer-overlay"
      />

      {/* Drawer Panel */}
      <div
        className={clsx(
          'zds-custom-drawer-sidebar',
          {
            'zds-custom-drawer-sidebar--open': isOpen,
            'zds-custom-drawer-sidebar--no-padding': noPadding,
            'zds-custom-drawer-sidebar--disabled': disabled,
          },
          className
        )}
        style={{
          width: width,
          opacity: opacity,
          zIndex: indexDrawer,
        }}
        onClick={handleDrawerClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id ? `${id}-title` : 'drawer-title'}
        aria-hidden={!isOpen}
        data-testid="drawer-panel"
        id={id}
      >
        {/* Header com título e botão de fechar */}
        <div className={clsx('zds-title-close')}>
          <div 
            className={clsx('zds-title')} 
            id={id ? `${id}-title` : 'drawer-title'}
          >
            {title}
          </div>
          <div 
            className={clsx('close')} 
            onClick={handleCloseClick}
            role="button"
            tabIndex={0}
            aria-label="Fechar drawer"
            onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                internalClose();
              }
            }}
            data-testid="drawer-close-button"
          >
            <Dismiss16Regular width={16} height={16} />
          </div>
        </div>

        {/* Conteúdo do drawer */}
        <div 
          className={clsx('zds-children', 'flex-fill')} 
          style={{ padding: noPadding ? '0' : '0 24px' }}
          data-testid="drawer-content"
        >
          {children}
        </div>
      </div>
    </>
  );
};

/**
 * Componente de exemplo que demonstra o uso do Drawer
 * Implementa um botão que abre o drawer quando clicado
 */
export const DrawerExample: React.FC<DrawerExampleProps> = ({
  text = 'Abrir Drawer',
  icon,
  children,
  onOpen,
  className = '',
  variant = 'outlined',
  disabled = false,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  /**
   * Manipula abertura do drawer
   * Executa callback personalizado se fornecido
   */
  const handleOpenDrawer = (): void => {
    if (disabled) return;
    
    setIsDrawerOpen(true);
    if (onOpen) {
      onOpen();
    }
  };

  /**
   * Manipula fechamento do drawer
   */
  const handleCloseDrawer = (): void => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Button 
        variant={variant} 
        onClick={handleOpenDrawer} 
        icon={icon}
        disabled={disabled}
        data-testid="drawer-trigger-button"
      >
        {text}
      </Button>
      <Drawer 
        isOpen={isDrawerOpen} 
        onOpen={handleOpenDrawer} 
        onClose={handleCloseDrawer} 
        className={className} 
        title="Título do Drawer"
        disabled={disabled}
      >
        {children}
      </Drawer>
    </>
  );
};

export default Drawer;