import clsx from 'clsx';
import React, { ReactNode, useId } from 'react';
import styles from './Badge.module.scss';
import type { BadgeProps, BadgeType, BadgeValue } from './Badge.types';

const Badge: React.FC<BadgeProps> = ({
  children,
  badgeValue = null,
  type = 'notification',
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  const isEmpty = badgeValue === null || badgeValue === undefined || badgeValue === '';
  const componentId = id || useId();

  const getDisplayValue = (inputValue: BadgeValue): string | number => {
    if (inputValue === null || inputValue === undefined) return '';

    if (typeof inputValue === 'number') {
      if (!isFinite(inputValue)) return '';
      if (inputValue < 0) return 0; 
      if (inputValue === 0) return ''; 

      return inputValue > 99 ? `${99}+` : inputValue;
    }

    // ✅ Sanitizar strings
    const sanitized = String(inputValue).trim();
    return sanitized.length > 10 ? `${sanitized.slice(0, 7)}...` : sanitized;
  };

  const displayValue = getDisplayValue(badgeValue);

  if (type === 'notification') {
    return (
      <div
        className={clsx(styles['zds-badge__container'])}
      >
        <div
          id={componentId}
          className={clsx(styles['zds-badge'], {
            [styles['zds-badge__small']]: Number(badgeValue) <= 10,
            [styles['zds-badge__large']]: Number(badgeValue) > 10,
          }, className)}
          data-testid="badge-notification"
        >
          {!isEmpty && (
            <span
              className={styles['zds-badge__value']}
              aria-hidden={ariaLabel ? 'true' : 'false'}
            >
              {displayValue}
            </span>
          )}
        </div>
        {children && (
          <div className={styles['zds-badge__content']} data-testid="badge-content">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(styles['zds-badge__container'])}
    >
      <div
        className={clsx(styles['zds-badge__status'], {
          [styles['zds-badge__status__empty']]: isEmpty,
        }, className)}
        data-testid="badge-status"
      >
        {!isEmpty && (
          <span
            className={styles['zds-badge__status-value']}
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