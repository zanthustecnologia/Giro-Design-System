import * as React from 'react';
import * as Form from '@radix-ui/react-form';
import styles from './TextFieldRadix.module.scss';

export interface TextFieldRadixProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  errorMessage?: string;
  helperText?: string;
  className?: string;
  valueMissingMessage?: string;
  typeMismatchMessage?: string;
  patternMismatchMessage?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  // Nova prop para controlar se usa Form.Root interno
  standalone?: boolean;
}

const TextFieldRadixContent = React.forwardRef<HTMLInputElement, TextFieldRadixProps>(
  (
    {
      name,
      label,
      type = 'text',
      placeholder,
      required = false,
      disabled = false,
      value,
      defaultValue,
      onChange,
      errorMessage,
      helperText,
      className,
      valueMissingMessage = 'This field is required',
      typeMismatchMessage = 'Please provide a valid value',
      patternMismatchMessage = 'Please match the requested format',
      pattern,
      minLength,
      maxLength,
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };

    return (
      <Form.Field
        className={`${styles.Field} ${className || ''}`}
        name={name}
      >
        <div className={styles.LabelContainer}>
          {label && (
            <Form.Label className={styles.Label}>
              {label}
              {required && <span className={styles.Required}>*</span>}
            </Form.Label>
          )}

          {/* Mensagens de validação */}
          {required && (
            <Form.Message className={styles.Message} match="valueMissing">
              {valueMissingMessage}
            </Form.Message>
          )}

          {type === 'email' && (
            <Form.Message className={styles.Message} match="typeMismatch">
              {typeMismatchMessage}
            </Form.Message>
          )}

          {pattern && (
            <Form.Message className={styles.Message} match="patternMismatch">
              {patternMismatchMessage}
            </Form.Message>
          )}

          {errorMessage && (
            <span className={styles.ErrorMessage}>{errorMessage}</span>
          )}
        </div>

        <Form.Control asChild>
          <input
            ref={ref}
            className={styles.Input}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            pattern={pattern}
            minLength={minLength}
            maxLength={maxLength}
          />
        </Form.Control>

        {helperText && (
          <span className={styles.HelperText}>{helperText}</span>
        )}
      </Form.Field>
    );
  }
);

TextFieldRadixContent.displayName = 'TextFieldRadixContent';

// Componente principal que decide se usa Form.Root ou não
const TextFieldRadix = React.forwardRef<HTMLInputElement, TextFieldRadixProps>(
  ({ standalone = true, ...props }, ref) => {
    // Se standalone=true, cria um Form.Root próprio
    if (standalone) {
      return (
        <Form.Root>
          <TextFieldRadixContent ref={ref} {...props} />
        </Form.Root>
      );
    }

    // Se standalone=false, usa o Form.Root do contexto pai
    return <TextFieldRadixContent ref={ref} {...props} />;
  }
);

TextFieldRadix.displayName = 'TextFieldRadix';

export default TextFieldRadix;