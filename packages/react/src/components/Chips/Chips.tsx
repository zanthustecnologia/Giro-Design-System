import React from 'react';
import styles from './Chips.module.scss';
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
  ...rest
}) => {

  if (!title || title.trim() === '') {
    console.warn('Chips: title prop is required and cannot be empty');
    return null;
  }
  const chipsClass = clsx(
    styles['zds-chips'],
    styles[`zds-chips--${type}`],
    {
      [styles['zds-chips--disabled']]: disabled,
      [styles['has-left-icon']]: leftIcon,
      [styles['has-right-icon']]: rightIcon,
    },
    className
  );
  return (
    <div
      className={chipsClass}
      aria-label={`Chip: ${title}`}
      aria-disabled={disabled}
      {...rest}
    >
      {leftIcon && (
        <span className={styles['zds-chips__icon__left']} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={styles['zds-chips__title']}>{title}</span>
      {rightIcon && (
        <span className={styles['zds-chips__icon__right']}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};

const MemoizedChips = React.memo(Chips);
MemoizedChips.displayName = 'Chips';

export default MemoizedChips;