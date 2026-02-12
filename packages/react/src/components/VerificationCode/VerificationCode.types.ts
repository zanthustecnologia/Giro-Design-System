import { BaseProps } from '../../types/common.types';

/** Tipos de entrada suportados pelo VerificationCode */
export type InputType = 'numeric' | 'alpha' | 'alphanumeric';

/**
 * Props do componente VerificationCode
 * @example
 * ```tsx
 * <VerificationCode 
 *   length={6}
 *   inputType="numeric"
 *   onComplete={(code) => handleVerification(code)}
 * />
 * ```
 * @example
 * ```tsx
 * <VerificationCode 
 *   length={4}
 *   inputType="alphanumeric"
 *   onComplete={handleCode}
 *   hasError={!!error}
 *   errorMessage="Código inválido"
 *   disabled={isVerifying}
 * />
 * ```
 */
export interface VerificationCodeProps extends BaseProps {
  /** Número de dígitos do código (padrão: 6) */
  length?: number;
  
  /** Tipo de entrada permitida (padrão: "numeric") */
  inputType?: InputType;
  
  /** Callback executado quando todos os campos são preenchidos: (value) => void */
  onComplete?: (value: string) => void;
  
  /** Define se o campo está em estado de erro */
  hasError?: boolean;
  
  /** Mensagem de erro exibida abaixo do componente */
  errorMessage?: string;
  
  /** Props adicionais passadas para os inputs */
  [key: string]: any;
}
