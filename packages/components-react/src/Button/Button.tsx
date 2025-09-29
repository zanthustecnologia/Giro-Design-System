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
  /** Define rota interna para navegação SPA (automaticamente usa React Router se disponível) */
  to?: string;
  /** Props do React Router: replace */
  replace?: boolean;
  /** Props do React Router: state */
  state?: any;
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

// ✅ FUNÇÃO PARA DETECTAR REACT ROUTER
const getRouterLink = () => {
  try {
    // Tenta importar React Router Link
    const ReactRouter = require('react-router-dom');
    return ReactRouter.Link;
  } catch (error) {
    // React Router não está disponível
    return null;
  }
};

const Button = React.forwardRef<HTMLElement, ButtonProps>(({
  as: Component = 'button',
  children,
  variant = 'filled',
  iconPosition = 'left',
  href,
  to,
  replace,
  state,
  external = false,
  disabled = false,
  onClick,
  size = 'lg',
  className = '',
  id = '',
  icon = null,
  fullWidth = false,
  ariaLabel = '',
  iconOnly = false,
  ...restProps
}, ref) => {

  const componentId = id || useId();
  
  // ✅ AUTO-DETECTAR COMPONENTE baseado nas props
  const getComponent = () => {
    // Se 'as' foi especificado explicitamente, usar ele
    if (Component !== 'button') return Component;
    
    // Se tem prop 'to', tentar usar React Router Link
    if (to) {
      const RouterLink = getRouterLink();
      if (RouterLink) {
        return RouterLink; // ✅ Usa React Router Link automaticamente
      }
      return 'a'; // ✅ Fallback para tag 'a' se não houver React Router
    }
    
    // Se tem prop 'href', usar tag 'a'
    if (href) return 'a';
    
    // Padrão: button
    return 'button';
  };

  const FinalComponent = getComponent();
  
  const hasContent = children && React.Children.count(children) > 0;
  
  const buttonClasses = clsx(
    'zds-button',
    `zds-button__${variant}`,
    `zds-button__${size}`,
    {
      'zds-button__with-icon': icon && !iconOnly,
      [`zds-button__icon-position-${iconPosition}`]: icon && !iconOnly && iconPosition !== 'none', 
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

  // ✅ PROPS BASE comuns
  const baseProps = {
    ref,
    'aria-disabled': disabled,
    'aria-label': getAriaLabel(),
    tabIndex: disabled ? -1 : 0,
    className: buttonClasses,
    onClick: handleClick,
    id: componentId,
    ...restProps,
  };

  // ✅ LINK INTERNO com React Router (prop 'to')
  if (to) {
    const RouterLink = getRouterLink();
    
    if (RouterLink && FinalComponent === RouterLink) {
      // ✅ Usando React Router Link
      return (
        <FinalComponent
          {...baseProps}
          to={disabled ? '#' : to}
          replace={replace}
          state={state}
        >
          {renderContent()}
        </FinalComponent>
      );
    } else {
      // ✅ Fallback para tag 'a' normal
      return (
        <FinalComponent
          {...baseProps}
          href={disabled ? '#' : to}
        >
          {renderContent()}
        </FinalComponent>
      );
    }
  }

  // ✅ LINK EXTERNO (prop 'href')
  if (href) {
    return (
      <FinalComponent
        {...baseProps}
        href={disabled ? '#' : href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {renderContent()}
      </FinalComponent>
    );
  }

  // ✅ BUTTON NORMAL
  return (
    <FinalComponent
      {...baseProps}
      disabled={disabled}
      type="button"
    >
      {renderContent()}
    </FinalComponent>
  );
});

const MemoizedButton = React.memo(Button);
MemoizedButton.displayName = 'Button';
Button.displayName = 'Button';
export default MemoizedButton;