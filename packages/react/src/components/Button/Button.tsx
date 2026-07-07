import { SpinnerIos16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useId, useMemo } from 'react';

import Tooltip from '../Tooltip';
import styles from './Button.module.scss';

import type { ButtonProps } from './Button.types';

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
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
  scale = 1,
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
  ...rest
}, ref) => {

  const generatedId = useId();
  const componentId = id || generatedId;

  const getComponent = (): React.ElementType => {
    if (as) return as;

    if (href) return 'a';
    if (to) {
      if (process.env.NODE_ENV !== 'production' && !as) {
        console.warn(
          '[Button] A prop `to` foi usada sem `as`. ' +
          'Para navegação via roteador (React Router, Next.js, etc.), passe `as={Link}`. ' +
          'Por ora, `to` será tratado como `href` em um <a> nativo.'
        );
      }
      return 'a';
    }
    return 'button';
  };

  const Component = getComponent();

  const hasContent = useMemo(() => {
    return children && React.Children.count(children) > 0;
  }, [children]);

  if (process.env.NODE_ENV !== 'production' && iconOnly && !icon) {
    console.error(
      '[Button] `iconOnly={true}` foi usado sem a prop `icon`. ' +
      'Forneça um ícone via `icon={<MeuIcone />}`.'
    );
  }
  const resolvedIcon = icon;

  const buttonClasses = clsx(
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    {
      [styles['disabled']]: disabled,
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
    if (iconOnly) {
      if (tooltipText) return tooltipText;
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          '[Button] Botões icon-only precisam de uma prop `ariaLabel` descritiva. ' +
          'O fallback genérico foi removido pois não comunica intenção. ' +
          'Forneça `ariaLabel` ou `tooltipText` para nomear o botão.'
        );
      }
      return undefined;
    }
    return undefined;
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || loading) {
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
        <>
          {!iconOnly && (
            <span className={styles.buttonContentHidden} aria-hidden="true">
              {resolvedIcon && (iconPosition === 'left' || iconPosition === 'both') && (
                <span className={styles.buttonIconLeft}>{resolvedIcon}</span>
              )}
              {children}
              {resolvedIcon && (iconPosition === 'right' || iconPosition === 'both') && (
                <span className={styles.buttonIconRight}>{resolvedIcon}</span>
              )}
            </span>
          )}
          <span className={styles.buttonLoadingSpinner} aria-hidden="true">
            <SpinnerIos16Regular aria-hidden="true" />
          </span>
        </>
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

  const { style: externalStyle, ...otherRest } = rest as Record<string, unknown> & { style?: React.CSSProperties };

  const baseProps = {
    ref,
    id: componentId,
    className: buttonClasses,
    'aria-label': getAriaLabel(),
    'aria-disabled': disabled,
    'aria-busy': loading || undefined,
    tabIndex: disabled || loading ? -1 : 0,
    onClick: handleClick,
    ...otherRest,
    style: {
      '--giro-scale': scale,
      ...externalStyle,
    } as React.CSSProperties,
  };

  const getNavigationProps = () => {
    if (href) {
      if (disabled || loading) {
        return { role: 'link' };
      }
      return {
        href,
        target: external || target === '_blank' ? '_blank' : target,
        rel: external || target === '_blank' ? 'noopener noreferrer' : rel,
      };
    }

    if (to) {
      if (Component !== 'a') {
        return {
          to: disabled ? undefined : to,
        };
      }
      return {
        href: disabled ? undefined : to,
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

  if (iconOnly && tooltipText && !loading) {
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