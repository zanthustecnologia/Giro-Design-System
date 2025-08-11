import clsx from 'clsx';
import React, { ReactNode } from 'react';
import './Badge.scss';

// ✅ Types para o componente
type BadgeType = 'notification' | 'status';
type BadgeValue = number | string | null;

export interface BadgeProps {
  /** Tipo de badge (notificação ou status) */
  type: BadgeType;
  /** Conteúdo a ser envolvido pelo badge */
  children?: ReactNode;
  /** Valor a ser exibido no badge (número, texto ou null) */
  value?: BadgeValue;
  /** Classes CSS adicionais */
  className?: string;
  /** ID único do componente */
  id?: string;
  /** Se o badge está desabilitado */
  disabled?: boolean;
  /** Valor máximo para exibição (padrão: 99) */
  maxValue?: number;
  /** Callback quando o badge é clicado */
  onClick?: () => void;
  /** Props de acessibilidade customizadas */
  'aria-label'?: string;
}

/**
 * Componente Badge do Zanthus Design System
 * Renderiza um badge com ou sem valor, dependendo das propriedades fornecidas.
 * Suporta dois tipos: notification (para contadores) e status (para indicadores)
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  value = null,
  type = 'notification',
  className = '',
  id,
  disabled = false,
  maxValue = 99,
  onClick,
  'aria-label': ariaLabel,
}) => {
  // ✅ Verificações de estado
  const isEmpty = value === null || value === undefined || value === '';
  const isClickable = onClick && !disabled;

  /**
   * Formata o valor de exibição baseado no tipo e limites
   * @param inputValue - Valor a ser formatado
   * @returns Valor formatado para exibição
   */
  const getDisplayValue = (inputValue: BadgeValue): string | number => {
    if (inputValue === null || inputValue === undefined) return '';
    
    if (typeof inputValue === 'number') {
      return inputValue > maxValue ? `${maxValue}+` : inputValue;
    }
    
    return inputValue;
  };

  const displayValue = getDisplayValue(value);

  /**
   * Manipula clique no badge
   * @param event - Evento de clique
   */
  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    if (onClick) {
      onClick();
    }
  };

  /**
   * Manipula navegação por teclado
   * @param event - Evento de teclado
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      
      if (onClick) {
        onClick();
      }
    }
  };

  // ✅ Props comuns para acessibilidade
  const commonProps = {
    className: clsx(className, {
      'zds-badge--disabled': disabled,
      'zds-badge--clickable': isClickable,
    }),
    id,
    onClick: isClickable ? handleClick : undefined,
    onKeyDown: isClickable ? handleKeyDown : undefined,
    role: isClickable ? 'button' : undefined,
    tabIndex: isClickable ? 0 : undefined,
    'aria-label': ariaLabel || (
      type === 'notification' && !isEmpty 
        ? `${displayValue} notificações` 
        : undefined
    ),
    'aria-disabled': disabled,
    'data-testid': 'badge',
  };

  // ✅ Renderização do badge tipo notification
  if (type === 'notification') {
    return (
      <div 
        className={clsx('zds-badge-container')}
      >
        <div
          className={clsx('zds-badge', {
            'zds-badge-large': typeof value === 'number' && value > maxValue,
            'zds-badge-empty': isEmpty,
            'zds-badge-has-value': !isEmpty,
          })}
          data-testid="badge-notification"
        >
          {!isEmpty && (
            <span 
              className="zds-badge__value"
              aria-hidden={ariaLabel ? 'true' : 'false'}
            >
              {displayValue}
            </span>
          )}
        </div>
        {children && (
          <div className="zds-badge__content" data-testid="badge-content">
            {children}
          </div>
        )}
      </div>
    );
  }

  // ✅ Renderização do badge tipo status
  return (
    <div 
      className={clsx('zds-badge-container__status')}
    >
      <div 
        className={clsx('zds-badge__status', {
          'zds-badge__status--empty': isEmpty,
        })}
        data-testid="badge-status"
      >
        {!isEmpty && (
          <span 
            className="zds-badge__status-value"
            aria-hidden={ariaLabel ? 'true' : 'false'}
          >
            {displayValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default Badge;