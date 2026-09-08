import { useCallback } from 'react';
import { normalizeText } from '../../../hooks/NormalizeText';
import { MenuItemProps } from '../Menu.types';

interface UseSearchLogicProps {
  items: MenuItemProps[];
  searchValue: string;
  searchTerm: string;
}

interface UseSearchLogicReturn {
  filteredItems: MenuItemProps[];
}

export const useSearchLogic = ({
  items,
  searchValue,
}: UseSearchLogicProps): UseSearchLogicReturn => {
  const filteredItems = useCallback((): MenuItemProps[] => {
    if (!searchValue.trim()) {
      return items;
    }

    const normalized = normalizeText(searchValue).toLowerCase();

    return items.filter((item) => {
      const text = normalizeText(item.text || '').toLowerCase();
      const subText = normalizeText(item.subText || '').toLowerCase();

      return text.includes(normalized) || subText.includes(normalized);
    });
  }, [items, searchValue]);

  return { filteredItems: filteredItems() };
};
