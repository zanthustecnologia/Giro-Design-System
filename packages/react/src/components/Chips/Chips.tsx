import clsx from 'clsx';
import React from 'react';

import styles from './Chips.module.scss';

import type { ChipsProps } from './Chips.types';

const Chips: React.FC<ChipsProps> = ({
  children,
  leftIcon,
  rightIcon,
  variant = 'neutral',
  disabled = false,
  backgroundColor,
  textColor,
  className,
  style,
  ...rest
}) => {

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
    ...(!disabled && backgroundColor && { '--chips-bg': `var(--${backgroundColor})` }),
    ...(!disabled && textColor && { '--chips-text': `var(--${textColor})` }),
    ...style,
  } as React.CSSProperties;

  const isInteractive = typeof rest.onClick === 'function';

  return (
    <div
      className={chipsClass}
      aria-disabled={disabled}
      style={colorStyle}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? (disabled ? -1 : 0) : undefined}
      {...rest}
    >
      {leftIcon && (
        <span className={styles.iconLeft} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={styles.title}>{children}</span>
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