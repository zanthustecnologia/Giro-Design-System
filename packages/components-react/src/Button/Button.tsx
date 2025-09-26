import React, { useId } from 'react';
import clsx from 'clsx';
import './Button.scss';

export interface ButtonProps {
  /** Define o elemento a ser renderizado (ex: 'button', 'a', ou componente de roteamento) */
  as?: React.ElementType;
  /** Define o texto principal do botão */
  children?: React.ReactNode;
  /** Define tipo do botão entre as opções */
  variant?: 'filled' | 'outlined' | 'text';
  iconOnly?: boolean;
  /** Define a posição do ícone entre as opções */
  iconPosition?: 'none' | 'left' | 'right';
  
  // ✅ PROPS DE NAVEGAÇÃO
  /** URL para links externos (ex: https://example.com) */
  href?: string;
  /** Rota interna para navegação SPA (ex: /dashboard, /profile) */
  to?: string;
  /** Indica se o link é externo */
  external?: boolean;
  /** Target para links (_blank, _self, etc.) */
  target?: string;
  /** Rel attribute para links */
  rel?: string;
  /** Props para React Router (replace, state, etc.) */
  routerProps?: Record<string, any>;
  
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
  /** Outros props específicos do elemento/componente */
  [key: string]: any;
}

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
  id = '',
  icon = null,
  fullWidth = false,
  ariaLabel = '',
  iconOnly = false,
  ...restProps
}, ref) => {

  const componentId = id || useId();
  
  // ✅ LÓGICA INTELIGENTE: Determinar o componente correto
  const getComponent = (): React.ElementType => {
    // Se 'as' foi especificado explicitamente, usar ele
    if (as) return as;
    
    // Auto-detectar baseado nas props:
    if (href) return 'a';        // Link externo/absoluto
    if (to) return 'a';          // Link interno (fallback para 'a' se não houver router)
    
    return 'button';             // Padrão: button
  };

  const Component = getComponent();
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
      'zds-button__disabled': disabled,
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

  // ✅ PROPS BASE comuns a todos os elementos
  const baseProps = {
    ref,
    id: componentId,
    className: buttonClasses,
    'aria-label': getAriaLabel(),
    'aria-disabled': disabled,
    tabIndex: disabled ? -1 : 0,
    onClick: handleClick,
    ...restProps, // Props específicos do elemento/componente
  };

  // ✅ PROPS ESPECÍFICOS por tipo de navegação
  const getNavigationProps = () => {
    // Link externo (href)
    if (href) {
      return {
        href: disabled ? '#' : href,
        target: external || target === '_blank' ? '_blank' : target,
        rel: external || target === '_blank' ? 'noopener noreferrer' : rel,
      };
    }

    // Link interno (to) - para React Router ou similar
    if (to) {
      // Se estiver usando React Router Link component
      if (Component !== 'a') {
        return {
          to: disabled ? '#' : to,
          ...routerProps, // Props extras como replace, state, etc.
        };
      }
      
      // Fallback: usar como href se for elemento 'a'
      return {
        href: disabled ? '#' : to,
      };
    }

    // Button normal
    if (Component === 'button') {
      return {
        type: 'button',
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