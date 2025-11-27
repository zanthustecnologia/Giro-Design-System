import { ReactElement } from 'react';

export interface MenuItemProps {
  id?: string;
  text?: string;
  subText?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
  value?: string;
}

export interface MenuRadixProps {
  items: MenuItemProps[];
  children?: ReactElement;
  type?:  'text' | 'icon' ;
  className?: string;
  onItemSelect?: (items: MenuItemProps) => void;
  selectedItems?: MenuItemProps[];
  search?: boolean;
  align?: 'start' | 'end' | 'center';

  enableInfiniteScroll?: boolean;
  onScrollEnd?: () => void;
  isLoadingMore?: boolean;
  enableApiSearch?: boolean;
  onApiSearch?: (searchTerm: string) => void;
  onOpenChange?: (open: boolean) => void;
}
