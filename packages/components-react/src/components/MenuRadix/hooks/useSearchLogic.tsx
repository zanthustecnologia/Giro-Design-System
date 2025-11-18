import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { normalizeText } from '../../../hooks/NormalizeText';
import { MenuItemProps } from '../MenuRadix.types';

interface UseSearchLogicProps {
  items: MenuItemProps[];
  searchValue: string;
  searchTerm?: string;
  enableApiSearch?: boolean;
  onApiSearch?: (term: string) => void;
}

interface UseSearchLogicReturn {
  filteredItems: MenuItemProps[];
  clearSearch: () => string;
}

export const useSearchLogic = ({
  items,
  searchValue,
  searchTerm,
  enableApiSearch,
  onApiSearch,
}: UseSearchLogicProps): UseSearchLogicReturn => {
  const [searchInput, setSearchInput] = useState(''); // Tempo real
  const [internalSearchTerm, setInternalSearchTerm] = useState(''); // Confirmado

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSearchTermRef = useRef<string>(''); // Último termo buscado
  const hasInitialSearchRef = useRef<boolean>(false); // Já carregou inicial?

  const debouncedApiSearch = useCallback(
    (term: string) => {
      // ✅ Evita chamadas duplicadas
      if (lastSearchTermRef.current === term) {
        return;
      }

      lastSearchTermRef.current = term;

      // ✅ Cancela timeout anterior
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // ✅ Aguarda 300ms antes de chamar API
      debounceTimeoutRef.current = setTimeout(() => {
        if (enableApiSearch && onApiSearch) {
          onApiSearch(term); // 🚀 CHAMA A API
        }
      }, 300);
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
    if (enableApiSearch && searchTerm) {
      if (searchTerm.length > 0) {
        if (lastSearchTermRef.current !== searchTerm) {
          debouncedApiSearch(searchTerm); // ✅ Aguarda 300ms
        }
      }
    }
  }, [searchTerm, enableApiSearch, debouncedApiSearch]);

  const filteredItems = useCallback(() => {
    if (!searchTerm && !searchInput) {
      return items;
    }

    const term = searchTerm || searchInput;
    const normalized = normalizeText(term).toLowerCase();

    return items.filter((item) => {
      const text = normalizeText(item.text || '').toLowerCase();
      const subText = normalizeText(item.subText || '').toLowerCase();

      return text.includes(normalized) || subText.includes(normalized);
    });
  }, [items, searchTerm, searchInput])();
  const clearSearch = () => {
    return (searchValue = '');
  };

  return { filteredItems, clearSearch };
};
