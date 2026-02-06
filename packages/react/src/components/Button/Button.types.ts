import React from 'react';

import { Size, BaseProps, Variant, Position } from '../../types/common.types';

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
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
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
  
  /** Estado desabilitado do botão */
  disabled?: BaseProps['disabled'];
  
  /** Callback executado ao clicar no botão: (event) => void */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /** Tamanho do botão */
  size?: Size;
  
  /** Classe CSS customizada */
  className?: BaseProps['className'];
  
  /** ID único do elemento */
  id?: BaseProps['id'];
  
  /** Ícone a ser exibido no botão */
  icon?: React.ReactNode;
  
  /** Define se o botão ocupa 100% da largura do container */
  fullWidth?: boolean;
  
  /** Label acessível para leitores de tela */
  ariaLabel?: string;
  
  /** Estado de carregamento (exibe spinner) */
  loading?: boolean;
}
