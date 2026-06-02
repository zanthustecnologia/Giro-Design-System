import { BaseProps, Scale } from '../../types/common.types';

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
  
  /** Nome do input */
  name?: string;
  
  /** Valor do input */
  value?: string;
  
  /** Estado atual (modo controlado) */
  checked?: boolean;

  /** Classe CSS opcional */
  className?: string;

  /** Escala visual aplicada ao componente */
  scale?: Scale;
}