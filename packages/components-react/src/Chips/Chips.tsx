import React from 'react';
import './Chips.scss';
import clsx from 'clsx';
export interface ChipsProps {
  /** Variante a ser escolhida para utilizar padrões de estilizações pré-definidos */
  type?: 'neutral' | 'brand' | 'color' | 'success' | 'alert';
  /** Texto a ser exibido dentro do componente */
  title: string;
  /** Ícone react que ficará posicionado à esquerda no componente */
  leftIcon?: React.ReactNode;
  /** Ícone react que ficará posicionado à direita no componente */
  rightIcon?: React.ReactNode;
  /** Estado alterável para desabilitar */
  disabled?: boolean;
  /** Classe CSS adicional */
  className?: string;
  /** Props adicionais para o elemento div */
  [key: string]: any;
}

/**
 * Componente Chips para exibir tags/etiquetas com ícones opcionais
 */
const Chips: React.FC<ChipsProps> = ({
  title,
  leftIcon = null,
  rightIcon = null,
  type = 'neutral',
  disabled = false,
  className = '',
}) => {

  if (!title || title.trim() === '') {
    console.warn('Chips: title prop is required and cannot be empty');
    return null;
  }
  const chipsClass = clsx(
    'zds-chips',
    `zds-chips--${type}`,
    {
      'zds-chips--disabled': disabled,
      'has-left-icon': leftIcon,
      'has-right-icon': rightIcon,
    },
    className
  );
  return (
    <div
      className={chipsClass}
      role="button"
      aria-label={`Chip: ${title}`}
    >
      {leftIcon && (
        <span className="zds-chips__icon__left">
          {leftIcon}
        </span>
      )}
      <span className="zds-chips__title">{title}</span>
      {rightIcon && (
        <span className="zds-chips__icon__right">
          {rightIcon}
        </span>
      )}
    </div>
  );
};

const MemoizedChips = React.memo(Chips);
MemoizedChips.displayName = 'Chips';

export default MemoizedChips;