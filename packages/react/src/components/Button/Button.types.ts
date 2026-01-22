import React from 'react';

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

  type?: 'button' | 'submit' | 'reset';

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
  /** Estado de loading */
  loading?: boolean;
  /** Outros props específicos do elemento/componente */
  [key: string]: any;
}
