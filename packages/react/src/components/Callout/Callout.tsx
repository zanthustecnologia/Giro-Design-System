import React, { useId } from 'react';
import clsx from 'clsx';
import styles from './Callout.module.scss';
import type { CalloutProps } from './Callout.types';

const Callout: React.FC<CalloutProps> = ({
  type = 'neutral',
  title = null,
  text = '',
  icon = null,
  className = '',
  id = ''
}) => {
  const generatedId = useId();
  const titleId = id || `callout-title-${generatedId}`;
  const componentId = id || generatedId;

  const calloutClass = clsx(
    styles['zds-callout__container'],
    styles[`zds-callout__${type}`],
    {
      [styles['zds-callout__container__with-title']]: title,
      [styles['zds-callout__no-icon']]: !icon,
    },
    className
  );

  return (
    <div
      id={componentId}
      className={calloutClass}
      aria-live="polite"
      role="alert"
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={styles['zds-callout__content']}>
        {icon && <span className={styles['zds-callout__icon']}>{icon}</span>}
        <div className={styles['zds-callout__subcontent']}>
          {title && (
            <span id={titleId} className={styles['zds-callout__title']}>
              {title}
            </span>
          )}
          {text && <span className={styles['zds-callout__text']}>{text}</span>}
        </div>
      </div>
    </div>
  );
};

export default Callout;