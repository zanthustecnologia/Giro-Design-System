import * as React from 'react';

import { TextVariant, BaseProps } from '../../types/common.types';

/**
 * Props do componente Callout
 * @example
 * ```tsx
 * <Callout 
 *   type="success" 
 *   title="Sucesso!"
 *   text="Operação realizada com sucesso"
 *   icon={<CheckIcon />}
 * />
 * ```
 * @example
 * ```tsx
 * <Callout 
 *   type="alert"
 *   title="Atenção"
 *   text="Verifique os campos obrigatórios"
 * />
 * ```
 */
export interface CalloutProps extends BaseProps {
  /** Tipo visual do callout */
  type?: TextVariant;
  
  /** Título principal do callout (texto em destaque) */
  title?: string | null;
  
  /** Texto descritivo do callout */
  text?: string;
  
  /** Ícone a ser exibido no callout */
  icon?: React.ReactNode;

  /** Callback chamado ao clicar no botão de fechar. */
  onDismiss?: () => void;

  /** Exibe o botão de fechar. Requer onDismiss. */
  dismiss?: boolean;

  /**
   * Nome do token de cor de fundo (sem `--`). Sobrescreve a cor da variante.
   * @example backgroundColor="color-brand-secondary-medium"
   */
  backgroundColor?: string;

  /**
   * Nome do token de cor do texto e ícone (sem `--`). Sobrescreve a cor padrão.
   * @example textColor="color-neutral-low-default"
   */
  textColor?: string;

  /** Classe CSS opcional */
  className?: string;
  
  /** Props adicionais para o elemento div */
  [key: string]: any;
}
