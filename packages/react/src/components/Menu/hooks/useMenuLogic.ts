import { useState, useCallback } from 'react';
import { MenuItemProps } from '../Menu.types';

export interface UseMenuLogicProps {
  selectedItems?: MenuItemProps[];
  onItemSelect?: (item: MenuItemProps) => void;
  onOpenChange?: (open: boolean) => void;
}

export interface UseMenuLogicReturn {
  open: boolean;
  internalSelectedItems: MenuItemProps[];
  setOpen: (open: boolean) => void;
  handleItemSelect: (item: MenuItemProps) => void;
  isItemSelected: (item: MenuItemProps) => boolean;
}

const getItemKey = (item: MenuItemProps): string => item.value ?? item.id ?? item.text ?? '';

export function useMenuLogic({
  selectedItems,
  onItemSelect,
  onOpenChange,
}: UseMenuLogicProps): UseMenuLogicReturn {
  const isControlled = selectedItems !== undefined;

  const [open, setOpenState] = useState(false);
  const [uncontrolledSelectedItems, setUncontrolledSelectedItems] = useState<MenuItemProps[]>([]);

  const internalSelectedItems = isControlled ? selectedItems : uncontrolledSelectedItems;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      setOpenState(newOpen);
      onOpenChange?.(newOpen);
    },
    [onOpenChange]
  );

  const isItemSelected = useCallback(
    (item: MenuItemProps): boolean => {
      const itemKey = getItemKey(item);
      if (!itemKey) return false;

      return internalSelectedItems.some(
        (selected) => getItemKey(selected) === itemKey
      );
    },
    [internalSelectedItems]
  );

  const handleItemSelect = useCallback(
    (item: MenuItemProps) => {
      if (!isControlled) {
        setUncontrolledSelectedItems([item]);
      }

      onItemSelect?.(item);
      setOpen(false);
    },
    [isControlled, onItemSelect, setOpen]
  );

  return {
    open,
    internalSelectedItems,
    setOpen,
    handleItemSelect,
    isItemSelected,
  };
}

export default useMenuLogic;
