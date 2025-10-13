import React, { createContext, useContext, useState, useId } from 'react';
import clsx from 'clsx';
import './RadioGroup.scss';

// ✅ Context para compartilhar estado entre RadioGroup e Radio
interface RadioGroupContextValue {
  value?: string;
  name: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ✅ Hook para Radio acessar o context
export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  return context;
};

// ✅ Interface do RadioGroup
export interface RadioGroupProps {
  /** Valor selecionado do grupo */
  value?: string;
  /** Valor inicial padrão */
  defaultValue?: string;
  /** Nome do grupo (gerado automaticamente se não fornecido) */
  name?: string;
  /** Callback quando o valor muda */
  onChange?: (value: string) => void;
  /** Desabilita todo o grupo */
  disabled?: boolean;
  /** Direção do layout */
  direction?: 'horizontal' | 'vertical';
  /** Classes adicionais */
  className?: string;
  /** Título/Label do grupo */
  label?: string;
  /** Texto de ajuda */
  helperText?: string;
  /** Estado de erro */
  error?: boolean;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Filhos (componentes Radio) */
  children: React.ReactNode;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  name,
  onChange,
  disabled = false,
  direction = 'vertical',
  className,
  label,
  children
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const groupId = useId();
  const groupName = name || `radio-group-${groupId}`;
  
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleChange = (newValue: string) => {
    if (disabled) return;
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const contextValue: RadioGroupContextValue = {
    value: currentValue,
    name: groupName,
    onChange: handleChange,
    disabled
  };

  const groupClass = clsx(
    'zds-radio-group',
    {
      'zds-radio-group--horizontal': direction === 'horizontal',
      'zds-radio-group--vertical': direction === 'vertical',
      'zds-radio-group--disabled': disabled,
    },
    className
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={groupClass} role="radiogroup" aria-labelledby={label ? `${groupName}-label` : undefined}>
        {/* ✅ Label do grupo */}
        {label && (
          <div id={`${groupName}-label`} className="zds-radio-group__label">
            {label}
          </div>
        )}
        
        <div className="zds-radio-group__options">
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;