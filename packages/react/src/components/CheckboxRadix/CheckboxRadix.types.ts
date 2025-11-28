
export interface CheckboxRadixProps {
  id?: string;
  label: string;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  indeterminate?: boolean;
}