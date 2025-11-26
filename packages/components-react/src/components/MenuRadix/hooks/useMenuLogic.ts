import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuItemProps } from '../MenuRadix.types';

export interface UseMenuLogicProps {
  selectedItems?: MenuItemProps[];
  onItemSelect?: (items: MenuItemProps) => void;
  onOpenChange?: (open: boolean) => void;
}

export interface UseMenuLogicReturn {
  open: boolean;
  internalSelectedItems: MenuItemProps[];
  setOpen: (open: boolean) => void;
  handleItemSelect: (item: MenuItemProps) => void;
  isItemSelected: (item: MenuItemProps) => boolean;
}

export function useMenuLogic({
  selectedItems = [],
  onItemSelect,
  onOpenChange,
}: UseMenuLogicProps): UseMenuLogicReturn {
  
  const isControlledRef = useRef(selectedItems !== undefined);
  const prevSelectedItemsRef = useRef<MenuItemProps[]>(selectedItems);

  const [open, setOpenState] = useState(false);
  const [internalSelectedItems, setInternalSelectedItems] = useState<MenuItemProps[]>(
    selectedItems || []
  );

  const getItemKey = useCallback((item: MenuItemProps): string => {
    return item.value ?? item.id ?? item.text ?? '';
  }, []);

  useEffect(() => {
    if (!isControlledRef.current || !selectedItems) return;

    const prevKeys = prevSelectedItemsRef.current.map(getItemKey).sort().join(',');
    const currentKeys = selectedItems.map(getItemKey).sort().join(',');

    if (prevKeys !== currentKeys) {
      setInternalSelectedItems(selectedItems);
      prevSelectedItemsRef.current = selectedItems;
    }
  }, [selectedItems, getItemKey]);

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
    [internalSelectedItems, getItemKey]
  );

  const handleItemSelect = useCallback(
    (item: MenuItemProps) => {
      const newSelection = [item];
      setInternalSelectedItems(newSelection);

      if (onItemSelect) {
        onItemSelect(item);
      }

      setOpen(false);
    },
    [onItemSelect, setOpen]
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
