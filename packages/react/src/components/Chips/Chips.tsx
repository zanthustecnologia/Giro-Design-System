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

  const isInteractive = typeof rest.onClick === 'function';

  const chipsClass = clsx(
    styles.chips,
    styles[variant],
    {
      [styles.disabled]: disabled,
      [styles.interactive]: isInteractive && !disabled,
      [styles.hasLeftIcon]: leftIcon,
      [styles.hasRightIcon]: rightIcon,
    },
    className
  );

  const colorStyle = {
    '--giro-scale': scale,
    ...(!disabled && backgroundColor && { '--chips-bg': `var(--${backgroundColor})` }),
    ...(!disabled && textColor && { '--chips-text': `var(--${textColor})` }),
    ...style,
  } as React.CSSProperties;

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