import { Dismiss24Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useId } from 'react';

import styles from './Callout.module.scss';

import type { CalloutProps } from './Callout.types';

const Callout: React.FC<CalloutProps> = ({
  variant = 'neutral',
  title,
  text,
  icon,
  onDismiss,
  dismiss,
  backgroundColor,
  textColor,
  className,
  id,
  ...rest
}) => {
  if (process.env.NODE_ENV !== 'production' && (text === '' || (typeof text === 'string' && !text.trim()))) {
    console.warn('[Callout] A prop `text` não pode ser uma string vazia.');
  }

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
    ...(textColor && { '--callout-text': `var(--${textColor})` } as React.CSSProperties),
  };

  return (
    <div
      id={componentId}
      className={containerClass}
      role={isAlert ? 'alert' : 'status'}
      aria-live={isAlert ? 'assertive' : 'polite'}
      aria-labelledby={title ? titleId : undefined}
      style={customStyle}
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
            type="button"
            aria-label="Fechar"
          >
            <Dismiss24Regular aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Callout;
