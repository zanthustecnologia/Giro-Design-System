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
export interface SwitchProps {
  /** Estado inicial (modo não controlado) */
  defaultChecked?: boolean;
  
  /** Estado desabilitado do switch */
  disabled?: BaseProps['disabled'];
  
  /** Callback executado quando o estado muda: (checked) => void */
  onCheckedChange?: (checked: boolean) => void;
  
  /** Nome do input */
  name?: string;
  
  /** Valor do input */
  value?: string;
  
  /** Estado atual (modo controlado) */
  checked?: boolean;
}