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
  scale = 1,
  className,
  style,
  ...rest
}) => {

  const scaleClass = {
    1: 'scale-1-0',
    1.5: 'scale-1-5',
    2: 'scale-2-0',
  }[scale];

  const chipsClass = clsx(
    styles.chips,
    styles[variant],
    scaleClass,
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

  const { onKeyDown: userOnKeyDown, ...otherRest } = rest;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    userOnKeyDown?.(e);
    if (!e.defaultPrevented && isInteractive && !disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      rest.onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={chipsClass}
      aria-disabled={disabled}
      style={colorStyle}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? (disabled ? -1 : 0) : undefined}
      onKeyDown={handleKeyDown}
      {...otherRest}
    >
      {leftIcon && (
        <span className={styles.iconLeft} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={styles.title}>{children}</span>
      {rightIcon && (
        <span className={styles.iconRight} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </div>
  );
};

const MemoizedChips = React.memo(Chips);
MemoizedChips.displayName = 'Chips';

export default MemoizedChips;