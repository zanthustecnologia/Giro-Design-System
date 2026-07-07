import { BaseProps } from '../../types/common.types';

/** Tipos de validação suportados pelo VerificationCode */
export type OTPValidationType = 'numeric' | 'alphanumeric' | 'alpha';

/**
 * Props do componente VerificationCode
 * @example
 * ```tsx
 * <VerificationCode
 *   length={6}
 *   validationType="numeric"
 *   onValueChange={(v) => console.log(v)}
 * />
 * ```
 * @example
 * ```tsx
 * <VerificationCode
 *   length={4}
 *   name="otp"
 *   autoSubmit
 *   onAutoSubmit={(v) => handleVerify(v)}
 *   hasError={!!error}
 *   errorMessage="Código inválido"
 * />
 * ```
 */
export interface VerificationCodeProps extends BaseProps {
  /** Número de campos/dígitos (padrão: 6) */
  length?: number;

  /** Tipo de validação aceita pelo campo (padrão: 'numeric') */
  validationType?: OTPValidationType;

  /** Valor controlado do campo */
  value?: string;

  /** Valor inicial não controlado */
  defaultValue?: string;

  /** Callback chamado quando o valor muda */
  onValueChange?: (value: string) => void;

  /** Submete o formulário associado automaticamente ao completar */
  autoSubmit?: boolean;

  /** Callback chamado ao completar (quando autoSubmit está ativo) */
  onAutoSubmit?: (value: string) => void;

  /** Nome do campo para envio em formulários */
  name?: string;

  /** ID do formulário associado */
  form?: string;

  /** Define se o campo está em estado de erro */
  hasError?: boolean;

  /** Mensagem de erro exibida abaixo do componente */
  errorMessage?: string;

  /** Define o campo como somente leitura */
  readOnly?: boolean;
}
