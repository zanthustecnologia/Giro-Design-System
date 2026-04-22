import clsx from 'clsx';
import React, { useId } from 'react';

import styles from './Badge.module.scss';

import type { BadgeProps} from './Badge.types';

const getDisplayValue = (value: BadgeProps['badgeValue']): string => {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'number') {
    if (value <= 0 || !isFinite(value)) return '';
    return value > 99 ? '99+' : String(value);
  }
  return String(value).trim();
};

const Badge: React.FC<BadgeProps> = ({
  children,
  badgeValue = null,
  type = 'notification',
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  const generatedId = useId();
  const componentId = id || generatedId;
  const displayValue = getDisplayValue(badgeValue);
  const isEmpty = displayValue === '';

  if (type === 'notification') {
    return (
      <div className={styles.badgeContainer}>
        <div
          id={componentId}
          className={clsx(styles.badge, {
            [styles['badge__small']]: displayValue.length <= 2,
            [styles['badge__large']]: displayValue.length > 2,
          }, className)}
          data-testid="badge-notification"
        >
          {!isEmpty && (
            <span aria-hidden={!!ariaLabel}>{displayValue}</span>
          )}
        </div>
        {children && (
          <div data-testid="badge-content">{children}</div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.badgeContainer}>
      <div
        className={clsx(styles['badge__status'], {
          [styles['badge__status__empty']]: isEmpty,
        }, className)}
        data-testid="badge-status"
      >
        {!isEmpty && (
          <span aria-hidden={!!ariaLabel}>{displayValue}</span>
        )}
      </div>
    </div>
  );
};

export default Badge;