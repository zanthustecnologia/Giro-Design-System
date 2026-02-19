import * as React from 'react';
import { ReactNode, ReactElement } from 'react';

import { DropdownItem, DropdownType } from '../Dropdown/Dropdown.types';

type FilterButtonVariant = 'filled' | 'outlined' | 'text';

export interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: DropdownItem[];
  type?: DropdownType | 'calendar';
  selectedIds?: string[];
  onApplyFilter?: (selectedIds: string[]) => void;
  placeholder?: string;
  enableSearch?: boolean;
  buttonText?: string | ReactNode;
  icon?: ReactElement;
  variant?: FilterButtonVariant;
  onOpen?: () => void;
  onClose?: () => void;
  position?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onClearDate?: () => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: 'pt-br' | 'en-us';
}
