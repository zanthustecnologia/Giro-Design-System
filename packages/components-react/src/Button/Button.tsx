import React, { useId } from 'react';
import clsx from 'clsx';
import './Button.scss';

export interface ButtonProps {
  /** Define o elemento a ser renderizado (ex: 'button', 'a', ou outro componente) */
  as?: React.ElementType;
  /** Define o texto principal do botão */
  children?: React.ReactNode;
  /** Define tipo do botão entre as opções */
  variant?: 'filled' | 'outlined' | 'text';
  iconOnly?: boolean;
  /** Define a posição do ícone entre as opções */
  iconPosition?: 'none' | 'left' | 'right';
  /** Define a rota caso o botão seja usado como link */
  href?: string;
  /** Indica se o link é externo */
  external?: boolean;
  /** Desabilita interações do botão */
  disabled?: boolean;
  /** Função a ser chamada quando o botão é clicado */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Define o tamanho do botão entre as opções */
  size?: 'lg' | 'sm';
  /** Classe CSS opcional */
  className?: string;
  /** ID opcional */
  id?: string;
  /** Ícone opcional */
  icon?: React.ReactNode;
  /** Define se o botão deve ocupar toda a largura */
  fullWidth?: boolean;
  /** Texto para acessibilidade */
  ariaLabel?: string;
  /** Outros props */
  [key: string]: any;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(({
  as: Component = 'button',
  children,
  variant = 'filled',
  iconPosition = 'left',
  href,
  external = false,
  disabled = false,
  onClick,
  size = 'lg',
  className = '',
  id = '',
  icon = null,
  fullWidth = false,
  ariaLabel = '',
  iconOnly = false
}, ref) => {

  const componentId = id || useId();
  
  const hasContent = children && React.Children.count(children) > 0;
  
  const buttonClasses = clsx(
    'zds-button',
    `zds-button__${variant}`,
    `zds-button__${size}`,
    {
      'zds-button__with-icon': icon && !iconOnly,
      [`zds-button__icon-position-${iconPosition}`]: icon && !iconOnly, 
      'zds-button__no-content': icon && !hasContent && !iconOnly,
      'zds-button__full-width': fullWidth,
      'zds-button__icon-only': iconOnly,
      [className]: className,
    }
  );

  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (iconOnly && !ariaLabel) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Button: Icon-only buttons should have an ariaLabel for accessibility');
      }
      return 'Botão de ação'; // Fallback genérico
    }
    if (typeof children === 'string') return children;
    return undefined;
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
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

  if (href) {
    return (
      <Component
        ref={ref}
        href={disabled ? '#' : href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
        aria-label={getAriaLabel()}
        tabIndex={disabled ? -1 : 0}
        className={buttonClasses}
        onClick={handleClick}
        id={componentId}
      >
        {renderContent()}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      disabled={disabled}
      aria-label={getAriaLabel()}
      type="button"
      onClick={handleClick}
      id={componentId}
      tabIndex={disabled ? -1 : 0}
      className={buttonClasses}
    >
      {renderContent()}
    </Component>
  );
});

const MemoizedButton = React.memo(Button);
MemoizedButton.displayName = 'Button';
Button.displayName = 'Button';
export default MemoizedButton;