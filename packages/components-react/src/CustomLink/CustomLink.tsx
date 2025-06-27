import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './CustomLink.scss';

export interface CustomLinkProps {
  /** Conteúdo do link */
  children?: React.ReactNode;
  /** Variante do estilo do link */
  variant?: 'filled' | 'outlined' | 'text';
  /** Classe CSS opcional */
  className?: string;
  /** Ícone opcional */
  icon?: React.ReactNode;
  /** Posição do ícone */
  iconPosition?: 'left' | 'right';
  /** Destino do link */
  to?: string;
  /** Define se o link está desabilitado */
  disabled?: boolean;
  /** Função chamada ao clicar no link */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Tamanho do link */
  size?: 'lg' | 'sm';
  /** Texto para acessibilidade */
  ariaLabel?: string;
  /** Outros props */
  [key: string]: any;
}

const CustomLink: React.FC<CustomLinkProps> = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      children,
      variant = 'filled',
      className = '',
      icon = null,
      iconPosition = 'left',
      to = '',
      disabled = false,
      onClick = null,
      size = 'lg',
      ariaLabel = '',
      ...props
    },
    ref
  ) => {
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          onClick(e);
        }
      },
      [onClick, disabled]
    );

    const customLinkClasses = clsx(
      'zds-button-link',
      `zds-button-link--${variant}`,
      `zds-button-link--${size}`,
      {
        'zds-button-link--with-icon': icon,
        [`zds-button-link--icon-position-${iconPosition}`]: icon,
        'zds-button-link--no-content': !children,
        [`zds-button-link--${variant}--disabled`]: disabled,
        [className]: className,
      }
    );

    return (
      <Link
        ref={ref}
        to={disabled ? '#' : to}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
        className={customLinkClasses}
        onClick={(e) => handleClick(e)}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="zds-button-link--icon zds-button-link--icon--left">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="zds-button-link--icon zds-button-link--icon--right">{icon}</span>
        )}
      </Link>
    );
  }
);

export default React.memo(CustomLink);