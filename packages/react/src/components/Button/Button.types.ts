import React from 'react';

import { Size, ScalableProps, Variant, Position } from '../../types/common.types';

/**
 * Props base do Button, independentes da variante iconOnly/icon.
 * `target`, `rel`, `type` e `onClick` são declarados aqui para garantir
 * que o destructuring funcione em todos os modos (button | a | custom).
 */
type ButtonOwnPropsBase = {
  /** Elemento customizado a ser renderizado (ex: 'a', Link do React Router) */
  as?: React.ElementType;

  /** Conteúdo do botão */
  children?: React.ReactNode;

  /** Variante visual do botão */
  variant?: Variant;

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

  /**
   * Classe CSS adicional para customização. Use com moderação e prefira as variantes e estilos pré-definidos do design system.
   */
  className?: string;

  /** Handler de clique; tipado em HTMLElement para ser compatível com todos os modos */
  onClick?: React.MouseEventHandler<HTMLElement>;
} & ScalableProps;

/**
 * Props próprias do componente Button.
 * Quando `iconOnly: true`, a prop `icon` é **obrigatória**.
 * Isso evita que botões icon-only sejam renderizados sem ícone definido.
 */
type ButtonOwnProps =
  | (ButtonOwnPropsBase & {
      /** Exibe apenas o ícone, sem texto. Requer obrigatoriamente a prop `icon`. */
      iconOnly: true;
      /** Ícone exibido no botão — obrigatório quando `iconOnly` é true */
      icon: React.ReactNode;
    })
  | (ButtonOwnPropsBase & {
      /** @default false */
      iconOnly?: false;
      /** Ícone a ser exibido no botão */
      icon?: React.ReactNode;
    });

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
