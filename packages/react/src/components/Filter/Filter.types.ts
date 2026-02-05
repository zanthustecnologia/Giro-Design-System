import { ReactNode, ReactElement } from 'react';
import { DropdownItem, DropdownType } from '../Dropdown/Dropdown.types';

import { Variant, BaseProps, Locale } from '../../types/common.types';

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
  position?: 'left' | 'right';
  disabled?: BaseProps['disabled'];
  className?: BaseProps['className'];
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onClearDate?: () => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
}
