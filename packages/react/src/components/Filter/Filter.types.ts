import { ReactNode, ReactElement } from 'react';

import { Variant, BaseProps, Locale, Position } from '../../types/common.types';
import { DropdownItem, DropdownType } from '../Dropdown/Dropdown.types';


export interface FilterProps {
  items?: DropdownItem[];
  type?: DropdownType | 'calendar';
  selectedIds?: string[];
  onApplyFilter?: (selectedIds: string[]) => void;
  placeholder?: string;
  enableSearch?: boolean;
  buttonText?: string | ReactNode;
  icon?: ReactElement;
  variant?: Variant;
  onOpen?: () => void;
  onClose?: () => void;
  position?: Position;
  disabled?: BaseProps['disabled'];
  className?: BaseProps['className'];
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onClearDate?: () => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
}
