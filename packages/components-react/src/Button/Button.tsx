import React, { useId } from 'react';
import clsx from 'clsx';
import './Button.modules.scss';

export interface ButtonProps {
  /** Define o elemento a ser renderizado (ex: 'button', 'a', ou outro componente) */
  as?: React.ElementType;
  /** Define o texto principal do botão */
  children: React.ReactNode;
  /** Define tipo do botão entre as opções */
  variant?: 'filled' | 'outlined' | 'text';
  /** Define a posição do ícone entre as opções */
  iconPosition?: 'left' | 'right';
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

const Button: React.FC<ButtonProps> = ({
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
  ariaLabel = ''
}) => {

  const componentId = id || useId();
  const buttonClasses = clsx(
    'zds-button',
    `zds-button__${variant}`,
    `zds-button__${size}`,
    {
      'zds-button__with-icon': icon,
      [`zds-button__icon-position-${iconPosition}`]: icon,
      'zds-button__no-content': !children,
      'zds-button__full-width': fullWidth,
      'zds-button__disabled': disabled,
      [className]: className,
    }
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  if (href) {
    return (
      <Component
        href={disabled ? '#' : href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
        className={buttonClasses}
        onClick={handleClick}
        id={componentId}
      >
        {icon && iconPosition === 'left' && (
          <span className="zds-button__icon zds-button__icon-left">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="zds-button__icon zds-button__icon-right">{icon}</span>
        )}
      </Component>
    );
  }

  return (
    <Component
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      type="button"
      onClick={handleClick}
      id={componentId}
      tabIndex={disabled ? -1 : 0}
      className={buttonClasses}
    >
      {icon && iconPosition === 'left' && (
        <span className="zds-button__icon zds-button__icon-left">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="zds-button__icon zds-button__icon-right">{icon}</span>
      )}
    </Component>
  );
};

const MemoizedButton = React.memo(Button);
MemoizedButton.displayName = 'Button';
export default MemoizedButton;