/** Locales suportados pelo DatePicker */
export type DatePickerLocale = 'pt-br' | 'en-us';

/** Posições disponíveis para o calendário */
export type CalendarPosition = 'left' | 'right';

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
export interface DatePickerProps {
  /** Locale para formatação da data */
  locale?: DatePickerLocale;
  
  /** Posição do calendário em relação ao campo */
  calendarPosition?: CalendarPosition;
  
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
  
  /** Estado desabilitado do campo */
  disabled?: boolean;
  
  /** Mensagem de erro a ser exibida */
  error?: string;
  
  /** Data mínima selecionável */
  minDate?: Date;
  
  /** Data máxima selecionável */
  maxDate?: Date;
  
  /** Classe CSS customizada */
  className?: string;
  
  /** ID para testes automatizados */
  'data-testid'?: string;
}
