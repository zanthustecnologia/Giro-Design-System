import React from 'react';
import clsx from 'clsx';
import './Button.scss';

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
  as: Component = 'button', // Elemento padrão é 'button'
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
  ...props
}) => {
  const buttonClasses = clsx(
    'zds-button',
    `zds-button--${variant}`,
    `zds-button--${size}`,
    {
      'zds-button--with-icon': icon,
      [`zds-button--icon-position-${iconPosition}`]: icon,
      'zds-button--no-content': !children,
      'zds-button--full-width': fullWidth,
      'zds-button--disabled': disabled,
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
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="zds-button--icon zds-button--icon--left">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="zds-button--icon zds-button--icon--right">{icon}</span>
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
      id={id}
      tabIndex={disabled ? -1 : 0}
      className={buttonClasses}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="zds-button--icon zds-button--icon--left">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="zds-button--icon zds-button--icon--right">{icon}</span>
      )}
    </Component>
  );
};

const MemoizedButton = React.memo(Button);
MemoizedButton.displayName = 'Button';
export default MemoizedButton;