import React from 'react';

import { Size, BaseProps, Variant, Position } from '../../types/common.types';

/**
 * Props próprias do componente Button, independentes do elemento renderizado.
 * `target`, `rel`, `type` e `onClick` são declarados aqui para garantir
 * que o destructuring funcione em todos os modos (button | a | custom).
 */
type ButtonOwnProps = {
  /** Elemento customizado a ser renderizado (ex: 'a', Link do React Router) */
  as?: React.ElementType;

  /** Conteúdo do botão */
  children?: React.ReactNode;

  /** Variante visual do botão */
  variant?: Variant;

  /** Define se o botão exibe apenas ícone (sem texto) */
  iconOnly?: boolean;

  /** Posição do ícone em relação ao texto */
  iconPosition?: Position;

  /** URL de destino quando usado como link (renderiza <a>) */
  href?: string;

  /** Rota de destino para roteadores (ex: React Router) */
  to?: string;

  /** Define se o link abre em nova aba */
  external?: boolean;

  /** Atributo target do HTML para links */
  target?: string;

  /** Atributo rel do HTML para links */
  rel?: string;

  /** Tipo HTML do botão */
  type?: 'button' | 'submit' | 'reset';

  /** Tamanho do botão */
  size?: Size;

  /** Ícone a ser exibido no botão */
  icon?: React.ReactNode;

  /** Define se o botão ocupa 100% da largura do container */
  fullWidth?: boolean;

  /** Label acessível para leitores de tela */
  ariaLabel?: string;

  /** Estado de carregamento (exibe spinner) */
  loading?: boolean;

  /** Texto do tooltip exibido quando o botão é apenas ícone */
  tooltipText?: string;

  /** Lado em que o tooltip será exibido */
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';

  /** Alinhamento do tooltip */
  tooltipAlign?: 'start' | 'center' | 'end';

  /** Handler de clique; tipado em HTMLElement para ser compatível com todos os modos */
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseProps;

/** Button renderizado como `<button>` — recebe atributos HTML precisos de HTMLButtonElement */
type ButtonAsButton = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>;

/** Button renderizado como `<a>` — recebe atributos HTML precisos de HTMLAnchorElement */
type ButtonAsAnchor = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps>;

/** Button renderizado como elemento customizado via prop `as` */
type ButtonAsCustom = ButtonOwnProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof ButtonOwnProps> & {
    as: React.ElementType;
  };

/**
 * Props do componente Button
 * @example
 * ```tsx
 * <Button variant="filled" size="lg" onClick={handleClick}>
 *   Clique aqui
 * </Button>
 * ```
 * @example
 * ```tsx
 * <Button
 *   variant="outlined"
 *   icon={<Icon />}
 *   iconPosition="left"
 *   loading={isLoading}
 * >
 *   Salvar
 * </Button>
 * ```
 */
export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsCustom;
