import * as React from 'react';

import { BaseProps, TextVariant } from '../../types/common.types';

export type CalloutVariant = Omit<TextVariant, 'color'>;

/**
 * Props do componente Callout
 * @example
 * ```tsx
 * <Callout
 *   variant="success"
 *   title="Sucesso!"
 *   text="Operação realizada com sucesso"
 *   icon={<CheckIcon />}
 * />
 * ```
 * @example
 * ```tsx
 * <Callout
 *   variant="alert"
 *   title="Atenção"
 *   text="Verifique os campos obrigatórios"
 *   dismiss
 *   onDismiss={() => setVisible(false)}
 * />
 * ```
 */
export interface CalloutProps
  extends Omit<BaseProps, 'disabled'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Variante semântica do callout */
  variant?: CalloutVariant;

  /** Título principal do callout */
  title?: React.ReactNode;

  /** Conteúdo descritivo do callout */
  text: React.ReactNode;

  /** Ícone a ser exibido no callout */
  icon?: React.ReactNode;

  /** Callback chamado ao clicar no botão de fechar. */
  onDismiss?: () => void;

  /** Exibe o botão de fechar. Requer onDismiss. */
  dismiss?: boolean;

  /** Label acessível do botão de fechar. @default "Fechar" */
  dismissLabel?: string;

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
}
