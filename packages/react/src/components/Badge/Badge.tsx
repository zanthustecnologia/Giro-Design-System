import clsx from 'clsx';
import React, { useId } from 'react';

import styles from './Badge.module.scss';

import type { BadgeProps } from './Badge.types';

const getDisplayValue = (value: BadgeProps['badgeValue']): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (!isFinite(value) || value <= 0) return '';
  return value > 99 ? '99+' : String(value);
};

const Badge: React.FC<BadgeProps> = ({
  children,
  badgeValue = null,
  className,
  id,
  filterVariant = false,

  'aria-label': ariaLabel,
}) => {
  const generatedId = useId();
  const componentId = id || generatedId;
  const displayValue = getDisplayValue(badgeValue);
  const isEmpty = displayValue === '';

  if (children) {
    return (
      <div className={styles.badgeContainer}>
        <div data-testid="badge-content">{children}</div>
        <div
          id={componentId}
          className={clsx(styles.badge, {
            [styles['badge__empty']]: isEmpty,
            [styles['badge__flex']]: displayValue.length >= 2,
          }, className)}
          data-testid="badge"
        >
          {!isEmpty && <span aria-hidden={!!ariaLabel}>{displayValue}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.badgeContainer}>
      <div
        className={clsx(styles['badge__status'], {
          [styles['badge__status__empty']]: isEmpty,
          [styles['badge__status__flex']]: displayValue.length >= 2,
          [styles['badge__status__filterBadge']]: filterVariant,
        }, className)}
        data-testid="badge"
      >
        {!isEmpty && (
          <span aria-hidden={!!ariaLabel}>{displayValue}</span>
        )}
      </div>
    </div>
  );
};

export default Badge;