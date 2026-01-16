

export interface RadioProps {
  id?: string | number;
  value: string;
  label: string;
  disabled?: boolean;
}
export interface RadioGroupProps {
  id?: string;
  items: RadioProps[];
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  ariaLabel?: string;
  orientation?: "horizontal" | "vertical";

}