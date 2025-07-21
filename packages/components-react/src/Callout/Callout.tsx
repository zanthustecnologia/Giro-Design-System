import React, { useId } from 'react';
import clsx from 'clsx';
import './callout.scss';

export interface CalloutProps {
  /** Define o tipo de callout */
  type?: 'neutral' | 'color' | 'brand' | 'alert' | 'success';
  /** Define o título com mais destaque */
  title?: string | null;
  /** Define o texto com menos destaque */
  text?: string;
  /** Define o ícone a ser importado */
  icon?: React.ReactNode;
  /** Define a classe CSS adicional */
  className?: string;
  /** Define o id do callout */
  id?: string;
  /** Props adicionais para o elemento div */
  [key: string]: any;
}

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
  );
};

export default Callout;