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
  badgeValue = null,
  type = 'notification',
  className = '',
  id,
  'aria-label': ariaLabel,
}) => {
  // ✅ Verificações de estado
  const isEmpty = badgeValue === null || badgeValue === undefined || badgeValue === '';
  const componentId = id || useId();
  /**
   * Formata o valor de exibição baseado no tipo e limites
   * @param inputValue - Valor a ser formatado
   * @returns Valor formatado para exibição
   */
  const getDisplayValue = (inputValue: BadgeValue): string | number => {
    if (inputValue === null || inputValue === undefined) return '';

    if (typeof inputValue === 'number') {
      if (!isFinite(inputValue)) return '';
      if (inputValue < 0) return 0; // ou return '' para ocultar
      if (inputValue === 0) return ''; // Badge vazio para zero

      return inputValue > 99 ? `${99}+` : inputValue;
    }

    // ✅ Sanitizar strings
    const sanitized = String(inputValue).trim();
    return sanitized.length > 10 ? `${sanitized.slice(0, 7)}...` : sanitized;
  };

  const displayValue = getDisplayValue(badgeValue);

  /**
   * Manipula clique no badge
   * @param event - Evento de clique
   */

  if (type === 'notification') {
    return (
      <div
        className={clsx('zds-badge__container')}
      >
        <div
          id={componentId}
          className={clsx('zds-badge', {
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

  // ✅ Renderização do badge tipo status
  return (
    <div
      className={clsx('zds-badge-container__status')}
    >
      <div
        className={clsx('zds-badge__status', {
          'zds-badge__status--empty': isEmpty,
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