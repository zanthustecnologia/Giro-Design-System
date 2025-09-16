import clsx from 'clsx';
import React, { ReactNode, useId } from 'react';
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
  badgeValue?: BadgeValue;
  /** Classes CSS adicionais */
  className?: string;
  /** ID único do componente */
  id?: string;
  /** Se o badge está desabilitado */
  maxValue?: number;
  /** Props de acessibilidade customizadas */
  'aria-label'?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  badgeValue = null,
  type = 'notification',
  className = '',
  id,
  'aria-label': ariaLabel,
}) => {
  const isEmpty = badgeValue === null || badgeValue === undefined || badgeValue === '';
  const componentId = id || useId();

  const getDisplayValue = (inputValue: BadgeValue): string | number => {
    if (inputValue === null || inputValue === undefined) return '';

    if (typeof inputValue === 'number') {
      if (!isFinite(inputValue)) return '';
      if (inputValue < 0) return 0; 
      if (inputValue === 0) return ''; 

      return inputValue > 99 ? `${99}+` : inputValue;
    }

    // ✅ Sanitizar strings
    const sanitized = String(inputValue).trim();
    return sanitized.length > 10 ? `${sanitized.slice(0, 7)}...` : sanitized;
  };

  const displayValue = getDisplayValue(badgeValue);

  if (type === 'notification') {
    return (
      <div
        className={clsx('zds-badge__container')}
      >
        <div
          id={componentId}
          className={clsx('zds-badge', {
            [ 'zds-badge__small']: Number(badgeValue) <= 10,
            [ 'zds-badge__large']: Number(badgeValue) > 10,
            [className]: className
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

  return (
    <div
      className={clsx('zds-badge__container')}
    >
      <div
        className={clsx('zds-badge__status', {
          'zds-badge__status__empty': isEmpty,
          [className]: className
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