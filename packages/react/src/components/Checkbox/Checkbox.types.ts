export interface CheckboxProps {
  id?: string;
  label: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  indeterminate?: boolean;
}