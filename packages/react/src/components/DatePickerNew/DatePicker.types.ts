import { Locale, BaseProps, Side, Align } from '../../types/common.types';

/**
 * Props do componente DatePicker
 * @example
 * ```tsx
 * <DatePicker 
 *   label="Data de nascimento"
 *   value={birthDate}
 *   onChange={setBirthDate}
 *   locale="pt-br"
 * />
 * ```
 * @example
 * ```tsx
 * <DatePicker 
 *   label="Data de início"
 *   required
 *   helperText="Selecione a data de início do projeto"
 *   minDate={new Date()}
 *   calendarPosition="right"
 *   error={errorMessage}
 * />
 * ```
 */
export interface DatePickerNewProps extends BaseProps {
  /** Locale para formatação da data */
  locale?: Locale;
  
  /** Posição do calendário em relação ao campo */
  calendarSide?: Side;

  /** Alinhamento do calendário em relação ao campo */
  calendarAlign?: Align;
  
  /** Texto de ajuda exibido abaixo do campo */
  helperText?: string;
  
  /** Define se o campo é obrigatório */
  required?: boolean;
  
  /** Label do campo de data */
  label?: string;
  
  /** Valor controlado da data */
  value?: Date | null;
  
  /** Valor inicial para modo não controlado */
  defaultValue?: Date | null;
  
  /** Callback executado quando a data muda: (date) => void */
  onChange?: (date: Date | null) => void;
  
  /** Mensagem de erro a ser exibida */
  error?: string;
  
  /** Data mínima selecionável */
  minDate?: Date;
  
  /** Data máxima selecionável */
  maxDate?: Date;
  
  /** ID para testes automatizados */
  'data-testid'?: string;

}
