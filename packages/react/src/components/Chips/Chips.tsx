import React from 'react';
import './Chips.module.scss';
import clsx from 'clsx';
import type { ChipsProps } from './Chips.types';

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
      aria-label={`Chip: ${title}`}
      aria-disabled={disabled}
    >
      {leftIcon && (
        <span className="zds-chips__icon__left" aria-hidden="true">
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