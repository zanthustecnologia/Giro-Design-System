import { useCallback, useEffect, useRef } from 'react';
import { normalizeText } from '../../../hooks/NormalizeText';
import { MenuItemProps } from '../MenuRadix.types';

interface UseSearchLogicProps {
  items: MenuItemProps[];
  searchValue: string;
  searchTerm: string;
  enableApiSearch?: boolean;
  onApiSearch?: (term: string) => void;
}

interface UseSearchLogicReturn {
  filteredItems: MenuItemProps[];
}

export const useSearchLogic = ({
  items,
  searchValue,
  searchTerm,
  enableApiSearch,
  onApiSearch,
}: UseSearchLogicProps): UseSearchLogicReturn => {
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSearchTermRef = useRef<string>('');
  const hasInitialSearchRef = useRef<boolean>(false);

  const debouncedApiSearch = useCallback(
    (term: string) => {
      if (lastSearchTermRef.current === term) {
        return;
      }

      lastSearchTermRef.current = term;

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (enableApiSearch && onApiSearch) {
          onApiSearch(term);
        }
      }, 200);
    },
    [enableApiSearch, onApiSearch]
  );

  useEffect(() => {
    if (enableApiSearch && !hasInitialSearchRef.current && onApiSearch) {
      hasInitialSearchRef.current = true;
      onApiSearch('');
      lastSearchTermRef.current = '';
    }
  }, [enableApiSearch, onApiSearch]);

  useEffect(() => {
    if (!enableApiSearch) return;

    if (searchValue.trim() === '') {
      debouncedApiSearch('');
      return;
    }
    if (searchTerm !== undefined && searchTerm.trim() !== '') {
      debouncedApiSearch(searchTerm);
    }
  }, [searchTerm, searchValue, enableApiSearch, debouncedApiSearch]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const filteredItems = useCallback((): MenuItemProps[] => {
    if (enableApiSearch) {
      return items;
    }

    if (!searchValue.trim()) {
      return items;
    }

    const normalized = normalizeText(searchValue).toLowerCase();

    return items.filter((item) => {
      const text = normalizeText(item.text || '').toLowerCase();
      const subText = normalizeText(item.subText || '').toLowerCase();

      return text.includes(normalized) || subText.includes(normalized);
    });
  }, [items, searchValue, enableApiSearch]);

  return { filteredItems: filteredItems() };
};
