import React, { useCallback, useId } from 'react';
import './Radio.scss';
import clsx from 'clsx';
import { useRadioGroup } from '../RadioGroup/RadioGroup';

export interface RadioProps {
  /** Definirá o nome do grupo de radio */
  name?: string;
  /** O valor associado ao botão de rádio */
  value: string;
  /** O identificador único para o input do rádio */
  id?: string;
  /** Indica se o botão de rádio está selecionado */
  checked?: boolean;
  /** Classes adicionais para estilização personalizada */
  className?: string;
  /** Função de callback acionada quando o valor do botão de rádio muda */
  onChange?: (value: string) => void;
  /** O texto do rótulo exibido ao lado do botão de rádio */
  label?: string;
  /** Indica se o botão de rádio está desabilitado */
  disabled?: boolean;

}

const Radio: React.FC<RadioProps> = ({
  name = 'radiobutton',
  value = '',
  id,
  checked = false,
  className = '',
  onChange,
  label = '',
  disabled = false,
  ...props
}) => {
  const radioGroup = useRadioGroup();
  
  const uniqueId = useId();
  const inputId = id || uniqueId;
  
  const finalName = radioGroup?.name || name;
  const finalChecked = radioGroup ? radioGroup.value === value : checked;
  const finalDisabled = radioGroup?.disabled || disabled;
  const finalOnChange = radioGroup?.onChange || onChange;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (finalDisabled) return;
    finalOnChange?.(e.target.value);
  };
  
  const radioClass = clsx(
    'zds-radiobutton',
    {
      'zds-radiobutton--disabled': finalDisabled,
    },
    className
  );
  const labelClass = clsx(
    'zds-radiobutton__box-check',
    {
      'zds-radiobutton__disabled': finalDisabled,
    }
  );

  return (
    <div className={radioClass}>
      <label className={labelClass} htmlFor={inputId}>
        <div className="zds-radiobutton__mini-box">
          <input
            id={inputId}
            type="radio"
            name={finalName}
            value={value}
            checked={finalChecked}
            disabled={finalDisabled}
            onChange={handleChange}
            {...props}
          />
        </div>
        {label && (
          <span id={`${inputId}-description`} className="zds-radiobutton__box-check__text">{label}</span>
        )}
      </label>
    </div>
  );
};

const MemoizedRadio = React.memo(Radio);
MemoizedRadio.displayName = 'Radio';

export default MemoizedRadio;