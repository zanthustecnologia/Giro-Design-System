import React, { useId, useMemo } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

const Button = React.forwardRef<HTMLElement, ButtonProps>(({
  as,
  children,
  variant = 'filled',
  iconPosition = 'left',
  href,
  to,
  external = false,
  target,
  rel,
  routerProps = {},
  disabled = false,
  onClick,
  size = 'lg',
  className = '',
  type = 'button',
  id = '',
  icon = null,
  fullWidth = false,
  ariaLabel = '',
  iconOnly = false,
  ...restProps
}, ref) => {

  const componentId = id || useId();

  const getComponent = (): React.ElementType => {
    if (as) return as;

    if (href) return 'a';   
    if (to) return 'a'; 
    return 'button';
    };

  const Component = getComponent();
  const hasContent = useMemo(() => {
    return children && React.Children.count(children) > 0;
  }, [children]);

  const buttonClasses = clsx(
    styles['zds-button'],
    styles[`zds-button__${variant}`],
    styles[`zds-button__${size}`],
    {
      [styles['zds-button__with-icon']]: icon && !iconOnly,
      [styles[`zds-button__icon-position-${iconPosition}`]]: icon && !iconOnly && iconPosition !== 'none',
      [styles['zds-button__no-content']]: icon && !hasContent && !iconOnly,
      [styles['zds-button__full-width']]: fullWidth,
      [styles['zds-button__icon-only']]: iconOnly,
      [styles['zds-button__disabled']]: disabled,
    },
    className
  );

  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (iconOnly && !ariaLabel) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Button: Icon-only buttons should have an ariaLabel for accessibility');
      }
      return 'Botão de ação';
    }
    if (typeof children === 'string') return children;
    return undefined;
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const renderContent = () => {
    if (iconOnly && icon) {
      return (
        <span className={styles['zds-button__icon-only']} aria-hidden="true">
          {icon}
        </span>
      );
    }
    return (
      <>
        {icon && iconPosition === 'left' && (
          <span className={styles['zds-button__icon-left']} aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className={styles['zds-button__icon-right']} aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    );
  };

  const baseProps = {
    ref,
    id: componentId,
    className: buttonClasses,
    'aria-label': getAriaLabel(),
    'aria-disabled': disabled,
    tabIndex: disabled ? -1 : 0,
    onClick: handleClick,
    ...restProps,
  };

  const getNavigationProps = () => {
    if (href) {
      return {
        href: disabled ? '#' : href,
        target: external || target === '_blank' ? '_blank' : target,
        rel: external || target === '_blank' ? 'noopener noreferrer' : rel,
      };
    }

    if (to) {
      if (Component !== 'a') {
        return {
          to: disabled ? '#' : to,
          ...routerProps,
        };
      }
      return {
        href: disabled ? '#' : to,
      };
    }
    if (Component === 'button') {
      return {
        type,
        disabled,
      };
    }

    return {};
  };

  return (
    <Component
      {...baseProps}
      {...getNavigationProps()}
    >
      {renderContent()}
    </Component>
  );
});

Button.displayName = 'Button';
export default Button;