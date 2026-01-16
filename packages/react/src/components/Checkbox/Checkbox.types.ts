export interface CheckboxProps {
  id?: string;
  label:  string | React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  indeterminate?: boolean;
}