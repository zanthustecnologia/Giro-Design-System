import * as React from 'react';

export type InputType = 'numeric' | 'alpha' | 'alphanumeric';

export interface VerificationCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Define o número de dígitos do código (padrão: 6) */
  length?: number;
  /** Define tipo de entrada: números, letras ou alfanumérico (padrão: "numeric") */
  inputType?: InputType;
  /** Callback chamado quando todos os campos são preenchidos */
  onComplete?: (value: string) => void;
  /** Indica se o campo está em estado de erro */
  hasError?: boolean;
  /** Mensagem de erro exibida abaixo do componente */
  errorMessage?: string;
  /** Define se o componente deve estar desabilitado */
  disabled?: boolean;
  /** Classe CSS adicional para estilização externa */
  className?: string;
}
