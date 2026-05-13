import { BaseProps } from '../../types/common.types';

/**
 * Props de um item individual de rádio
 */
export interface RadioProps {
  /** ID único do elemento */
  id?: string | number;
  
  /** Valor do radio button */
  value: string;
  
  /** Label exibida ao lado do radio button */
  label: string;
  
  /** Estado desabilitado do item */
  disabled?: boolean;

  /** Classe CSS opcional */
  className?: string;
}

/**
 * Props do componente RadioGroup
 * @example
 * ```tsx
 * <RadioGroup 
 *   items={[
 *     { value: 'option1', label: 'Opção 1' },
 *     { value: 'option2', label: 'Opção 2' }
 *   ]}
 *   onValueChange={(value) => setSelected(value)}
 *   defaultValue="option1"
 * />
 * ```
 * @example
 * ```tsx
 * <RadioGroup 
 *   items={options}
 *   onValueChange={handleChange}
 *   name="preference"
 *   orientation="horizontal"
 *   ariaLabel="Selecione sua preferência"
 * />
 * ```
 */
export interface RadioGroupProps extends BaseProps {
  
  /** Array de itens de rádio */
  items: RadioProps[];
  
  /** Callback executado quando o valor muda: (value) => void */
  onValueChange?: (value: string) => void;
  
  /** Valor inicial selecionado */
  defaultValue?: string;
  
  /** Nome do grupo de radio buttons */
  name?: string;
  
  /** Label acessível para leitores de tela */
  ariaLabel?: string;
  
  /** Orientação do layout dos radio buttons */
  orientation?: "horizontal" | "vertical";
}