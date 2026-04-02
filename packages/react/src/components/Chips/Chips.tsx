import clsx from 'clsx';
import React from 'react';

import styles from './Chips.module.scss';

import type { ChipsProps } from './Chips.types';

const Chips: React.FC<ChipsProps> = ({
  title,
  leftIcon,
  rightIcon,
  variant = 'neutral',
  disabled = false,
  backgroundColor,
  foregroundColor,
  className,
  style,
  ...rest
}) => {

  if (!title || title.trim() === '') {
    console.warn('Chips: title prop is required and cannot be empty');
    return null;
  }

  const chipsClass = clsx(
    styles.chips,
    styles[variant],
    {
      [styles.disabled]: disabled,
      [styles.hasLeftIcon]: leftIcon,
      [styles.hasRightIcon]: rightIcon,
    },
    className
  );

  const colorStyle = {
    ...(!disabled && backgroundColor && { '--chips-bg': `var(${backgroundColor})` }),
    ...(!disabled && foregroundColor && { '--chips-fg': `var(${foregroundColor})` }),
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={chipsClass}
      aria-label={`Chip: ${title}`}
      aria-disabled={disabled}
      style={colorStyle}
      {...rest}
    >
      {leftIcon && (
        <span className={styles.iconLeft} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={styles.title}>{title}</span>
      {rightIcon && (
        <span className={styles.iconRight}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};

const MemoizedChips = React.memo(Chips);
MemoizedChips.displayName = 'Chips';

export default MemoizedChips;