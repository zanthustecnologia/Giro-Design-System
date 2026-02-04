import * as React from 'react';

export type ListItemVariant = 'text' | 'checkbox' | 'radio' | 'icon';

export interface ListItemProps extends Omit<
  React.LiHTMLAttributes<HTMLLIElement>,
  'onClick' | 'onChange'
> {
  id?: string;
  className?: string;
  variant?: ListItemVariant;
  text?: string;
  name?: string;
  subText?: string;
  disabled?: boolean;
  checked?: boolean;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  onChange?: (checked: boolean) => void;
  icon?: React.ReactNode;
  value?: string;
  showSubText?: boolean;
  hovered?: boolean;
}
