import clsx from 'clsx';
import React, { useId } from 'react';
import { Dismiss24Regular } from '@fluentui/react-icons';

import styles from './Callout.module.scss';

import type { CalloutProps } from './Callout.types';

const Callout: React.FC<CalloutProps> = ({
  variant = 'neutral',
  title,
  text,
  icon,
  onDismiss,
  dismiss,
  dismissLabel = 'Fechar',
  backgroundColor,
  foregroundColor,
  className,
  id,
  disabled: _disabled,
  style,
  ...rest
}) => {
  const generatedId = useId();
  const titleId = `callout-title-${id || generatedId}`;
  const componentId = id || generatedId;

  const isAlert = variant === 'alert';

  const containerClass = clsx(
    styles.container,
    styles[variant],
    { [styles.withTitle]: title },
    className
  );

  const customStyle: React.CSSProperties = {
    ...(backgroundColor && { '--callout-bg': `var(--${backgroundColor})` } as React.CSSProperties),
    ...(foregroundColor && { '--callout-fg': `var(--${foregroundColor})` } as React.CSSProperties),
    ...style,
  };

  return (
    <div
      id={componentId}
      className={containerClass}
      role={isAlert ? 'alert' : 'status'}
      aria-live={isAlert ? 'assertive' : 'polite'}
      aria-labelledby={title ? titleId : undefined}
      style={Object.keys(customStyle).length > 0 ? customStyle : style}
      {...rest}
    >
      <div className={styles.content}>
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        <div className={styles.subcontent}>
          {title && (
            <span id={titleId} className={styles.title}>{title}</span>
          )}
          {text && <span className={styles.text}>{text}</span>}
        </div>
        {dismiss && (
          <button
            className={styles.dismiss}
            onClick={onDismiss}
            aria-label={dismissLabel}
            type="button"
          >
            <Dismiss24Regular aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Callout;
