import { SpinnerIos16Regular, Add16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useId, useMemo } from 'react';

import Tooltip from '../Tooltip';
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
  disabled = false,
  onClick,
  size = 'lg',
  className,
  type = 'button',
  id,
  icon,
  fullWidth = false,
  ariaLabel,
  iconOnly = false,
  loading = false,
  tooltipText,
  tooltipSide = 'top',
  tooltipAlign = 'center',
  ...restProps
}, ref) => {

  const generatedId = useId();
  const componentId = id || generatedId;

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

  const resolvedIcon = iconOnly && !icon ? <Add16Regular /> : icon;

  const buttonClasses = clsx(
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    {
      [styles['buttonLoading']]: loading,
      [styles['buttonWithIcon']]: resolvedIcon && !iconOnly,
      [styles[`buttonIconPosition-${iconPosition}`]]: resolvedIcon && !iconOnly,
      [styles['buttonNoContent']]: resolvedIcon && !hasContent && !iconOnly,
      [styles['buttonFullWidth']]: fullWidth,
      [styles['buttonIconOnly']]: iconOnly,
    },
    className
  );

  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (iconOnly && !ariaLabel) {
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
    if (iconOnly && !loading) {
      return (
        <span className={styles.buttonIconOnly} aria-hidden="true">
          {resolvedIcon}
        </span>
      );
    }
    if (loading) {
      return (
        <span className={styles.buttonLoading} aria-hidden="true">
          <SpinnerIos16Regular aria-hidden="true" />
        </span>
      );
    }
    return (
      <>
        {resolvedIcon && (iconPosition === 'left' || iconPosition === 'both') && (
          <span className={styles.buttonIconLeft} aria-hidden="true">
            {resolvedIcon}
          </span>
        )}
        {children}
        {resolvedIcon && (iconPosition === 'right' || iconPosition === 'both') && (
          <span className={styles.buttonIconRight} aria-hidden="true">
            {resolvedIcon}
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

  if (iconOnly && !loading) {
    return (
      <Tooltip text={tooltipText} side={tooltipSide} align={tooltipAlign}>
        <Component
          {...baseProps}
          {...getNavigationProps()}
        >
          {renderContent()}
        </Component>
      </Tooltip>
    );
  }

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