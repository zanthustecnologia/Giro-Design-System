import React, { useEffect, useId, useRef, useState } from 'react';
import './tooltip.scss';
import clsx from 'clsx';

export interface TooltipProps {
  id?: string;
  text: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ id, text, children, position = 'top-right' }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tooltipId = id || useId();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const handleMouseLeave = (): void => {
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        setVisible(false);
        break;
      case 'Enter':
      case ' ': 
        e.preventDefault();
        setVisible(!visible);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const tooltipClass = clsx(
    'zds-tooltip__content',
    `zds-tooltip__${position}`,
  )
  return (
    <div
      className={clsx('zds-tooltip__wrapper')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={tooltipClass}
          role='tooltip'
          id={tooltipId}
          aria-describedby={tooltipId}
          aria-hidden={!visible}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
