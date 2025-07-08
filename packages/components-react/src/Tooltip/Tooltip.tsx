import React, { useEffect, useRef, useState } from 'react';
import './tooltip.scss';
import clsx from 'clsx';



interface TooltipProps {
  text: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top-right' }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

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
    if (e.key === 'Escape') {
      setVisible(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className='zds-tooltip__wrapper'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={`zds-tooltip__content zds-tooltip__${position}`}
          role='tooltip'
        >
          {text}
        </div>
      )}
    </div>
  );
};


export default Tooltip;