import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import CustomLink from '../CustomLink/CustomLink';
import './Button.scss';
import clsx from 'clsx';

const Button = ({ children, type = 'button', variant = 'filled', ariaLabel = '', className = null, id = null, icon = null, iconPosition = 'left', to = null, disabled = false, onClick = null, size = 'lg', fullWidth = false, ...props }) => {
  const internalClick = useCallback(() => {

    if (disabled) return;

    if (onClick) {
      onClick();
    }
  }, [onClick, disabled]);

  const buttonClasses = clsx(
    'zds-button',
    `zds-button--${variant}`,
    `zds-button--${size}`,

    {
      'zds-button--with-icon': icon,
      [`zds-button--icon-position-${iconPosition}`]: icon,
      'zds-button--no-content': !children,
      'zds-button--full-width': fullWidth,
      [className]: className,
    }
  );
  if (type === 'link') {
    return (
      <CustomLink to={to} icon={icon} iconPosition={iconPosition} disabled={disabled} onClick={onClick} size={size} className={className} variant={variant} ariaLabel={ariaLabel}>
        {children}
      </CustomLink>
    )
  }
  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      type={type}
      onClick={internalClick}
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

    </button>

  );
};

Button.propTypes = {
  /** Define o texto principal do botão */
  children: PropTypes.node.isRequired,
  /** Define tipo do botão entre as opções: */
  type: PropTypes.oneOf(['button', 'link']).isRequired,
  /** Define o tipo do botão entre as opções: */
  variant: PropTypes.oneOf(['filled', 'outlined', 'text']).isRequired,
  /** Define a posição do ícone entre as opções: */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** Define a rota caso a prop action seja alterada para "link" */
  to: PropTypes.string,
  /** Desabilita interações do botão */
  disabled: PropTypes.bool,
  /** Função a ser chamada quando o botão é clicado */
  onClick: PropTypes.func,
  /** Define o tamanho do botão entre as opções: */
  size: PropTypes.oneOf(['lg', 'sm']),
};
const MemoizedButton = React.memo(Button);
MemoizedButton.displayName = 'Button';
export default MemoizedButton;
