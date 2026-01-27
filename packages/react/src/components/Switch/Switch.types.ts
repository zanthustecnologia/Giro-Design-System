export interface SwitchProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  checked?: boolean;
}