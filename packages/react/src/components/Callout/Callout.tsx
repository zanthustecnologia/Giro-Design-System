import React, { useId } from 'react';
import clsx from 'clsx';
import './Callout.module.scss';
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
    'zds-callout__container',
    `zds-callout__${type}`,
    {
      'zds-callout__container__with-title': title,
      'zds-callout__no-icon': !icon,
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
      <div className="zds-callout__content">
        {icon && <span className="zds-callout__icon">{icon}</span>}
        <div className="zds-callout__subcontent">
          {title && (
            <span id={titleId} className="zds-callout__title">
              {title}
            </span>
          )}
          {text && <span className="zds-callout__text">{text}</span>}
        </div>
      </div>
    </div>
  );
};

export default Callout;