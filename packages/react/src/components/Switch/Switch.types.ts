import { BaseProps } from '../../types/common.types';

/**
 * Props do componente Switch
 * @example
 * ```tsx
 * <Switch 
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 * />
 * ```
 * @example
 * ```tsx
 * <Switch 
 *   defaultChecked={true}
 *   disabled={isLoading}
 *   onCheckedChange={(checked) => console.log(checked)}
 *   name="notifications"
 * />
 * ```
 */
export interface SwitchProps extends BaseProps {
  /** Estado inicial (modo não controlado) */
  defaultChecked?: boolean;
  
  /** Callback executado quando o estado muda: (checked) => void */
  onCheckedChange?: (checked: boolean) => void;
  
  /** Nome do input — associa o switch a um campo de formulário (HTML `name`) */
  name?: string;
  
  /** Valor enviado no formulário quando o switch está ativo (análogo ao `value` do `<input type="checkbox">`) */
  value?: string;
  
  /** Estado atual (modo controlado) */
  checked?: boolean;

  /** Classe CSS opcional */
  className?: string;
}