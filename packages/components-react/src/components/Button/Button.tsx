import React, { useId, useMemo } from 'react';
import clsx from 'clsx';
import './button.scss';

// ✅ 1. Definir props base do componente
interface BaseButtonProps {
  /** Define o texto principal do botão */
  children?: React.ReactNode;
  /** Define tipo do botão entre as opções */
  variant?: 'filled' | 'outlined' | 'text';
  /** Define se é apenas ícone */
  iconOnly?: boolean;
  /** Define a posição do ícone */
  iconPosition?: 'none' | 'left' | 'right';
  /** URL para links externos */
  href?: string;
  /** Rota interna para navegação SPA */
  to?: string;
  /** Indica se o link é externo */
  external?: boolean;
  /** Props para React Router */
  routerProps?: Record<string, any>;
  /** Desabilita interações do botão */
  disabled?: boolean;
  /** Função a ser chamada quando o botão é clicado */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Define o tamanho do botão */
  size?: 'lg' | 'sm';
  /** Ícone opcional */
  icon?: React.ReactNode;
  /** Define se o botão deve ocupar toda a largura */
  fullWidth?: boolean;
  /** Texto para acessibilidade */
  ariaLabel?: string;
}

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    as?: 'button';
    href?: never;
    to?: never;
  };

type ButtonAsAnchor = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    as?: 'a';
    href?: string;
    to?: string;
  };

type ButtonAsPolymorphic<E extends React.ElementType> = BaseButtonProps & {
  as: E;
} & Omit<React.ComponentPropsWithRef<E>, keyof BaseButtonProps | 'as'>;

export type ButtonProps<E extends React.ElementType = 'button'> =
  | ButtonAsButton
  | ButtonAsAnchor
  | ButtonAsPolymorphic<E>;

function Button<E extends React.ElementType = 'button'>({
  as,
  children,
  variant = 'filled',
  iconPosition = 'left',
  href,
  to,
  external = false,
  disabled = false,
  onClick,
  size = 'lg',
  className = '',
  icon = null,
  fullWidth = false,
  ariaLabel = '',
  iconOnly = false,
  routerProps = {},
  ...restProps
}: ButtonProps<E> & { ref?: React.Ref<React.ComponentRef<E>> }) {
  const componentId = (restProps as any).id || useId();
  const ref = (restProps as any).ref;

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
    'zds-button',
    `zds-button__${variant}`,
    `zds-button__${size}`,
    {
      'zds-button__with-icon': icon && !iconOnly,
      [`zds-button__icon-position-${iconPosition}`]:
        icon && !iconOnly && iconPosition !== 'none',
      'zds-button__no-content': icon && !hasContent && !iconOnly,
      'zds-button__full-width': fullWidth,
      'zds-button__icon-only': iconOnly,
      'zds-button__disabled': disabled,
    },
    className
  );

  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (iconOnly && !ariaLabel) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'Button: Icon-only buttons should have an ariaLabel for accessibility'
        );
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
        <span className="zds-button__icon-only" aria-hidden="true">
          {icon}
        </span>
      );
    }
    return (
      <>
        {icon && iconPosition === 'left' && (
          <span className="zds-button__icon-left" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="zds-button__icon-right" aria-hidden="true">
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
  };

  const getNavigationProps = () => {
    if (href) {
      return {
        href: disabled ? '#' : href,
        target:
          external || (restProps as any).target === '_blank'
            ? '_blank'
            : (restProps as any).target,
        rel:
          external || (restProps as any).target === '_blank'
            ? 'noopener noreferrer'
            : (restProps as any).rel,
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
        type: (restProps as any).type || 'button',
        disabled,
      };
    }

    return {};
  };

  return (
    <Component {...baseProps} {...getNavigationProps()} {...restProps}>
      {renderContent()}
    </Component>
  );
}

Button.displayName = 'Button';

export default Button;
