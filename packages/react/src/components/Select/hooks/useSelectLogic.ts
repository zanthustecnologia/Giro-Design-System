import { useReducer, useEffect, useRef, useCallback } from 'react';

import { normalizeText } from '../../../hooks/NormalizeText';
import {
  SelectState,
  SelectAction,
  UseSelectLogicProps,
  UseSelectLogicReturn,
  SelectItemProps,
} from '../Select.types';

const initialState: SelectState = {
  isOpen: false,
  selectedValues: [],
  searchInput: '',
  searchTerm: '',
  touched: false,
  hasError: false,
};

function selectReducer(state: SelectState, action: SelectAction): SelectState {
  switch (action.type) {
    case 'SET_OPEN':
      return { ...state, isOpen: action.payload };
    case 'SET_SELECTED_VALUES':
      return { ...state, selectedValues: action.payload };
    case 'SET_SEARCH_INPUT':
      return { ...state, searchInput: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_TOUCHED':
      return { ...state, touched: action.payload };
    case 'SET_ERROR':
      return { ...state, hasError: action.payload };
    case 'RESET_SEARCH':
      return { ...state, searchInput: '', searchTerm: '' };
    case 'VALIDATE': {
      const hasError = action.payload.required && state.selectedValues.length === 0;
      return { ...state, hasError, touched: true };
    }
    default:
      return state;
  }
}

export function useSelectLogic({
  value,
  required = false,
  search = false,
  onValueChange,
  onOpenChange,
  enableApiSearch = false,
  onApiSearch,
  isSearching = false,
}: UseSelectLogicProps): UseSelectLogicReturn {
  const [state, dispatch] = useReducer(selectReducer, {
    ...initialState,
    selectedValues: Array.isArray(value) ? value : value ? [value] : [],
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitialSearchRef = useRef<boolean>(false);
  const lastSearchTermRef = useRef<string>('');

  const debouncedApiSearch = useCallback(
    (searchTerm: string) => {
      if (lastSearchTermRef.current === searchTerm) {
        return;
      }
      
      lastSearchTermRef.current = searchTerm;
      
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (enableApiSearch && onApiSearch) {
          onApiSearch(searchTerm);
        }
      }, 300);
    },
    [enableApiSearch, onApiSearch]
  );

  useEffect(() => {
    const newValues = Array.isArray(value) ? value : value ? [value] : [];
    dispatch({ type: 'SET_SELECTED_VALUES', payload: newValues });
  }, [value]);

  useEffect(() => {
    if (state.isOpen && search) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [state.isOpen, search]);

  useEffect(() => {
    if (!state.isOpen) {
      dispatch({ type: 'RESET_SEARCH' });
      hasInitialSearchRef.current = false;
      lastSearchTermRef.current = '';
    }
  }, [state.isOpen]);

  useEffect(() => {
    if (state.isOpen && enableApiSearch && !hasInitialSearchRef.current) {
      hasInitialSearchRef.current = true;
      if (onApiSearch) {
        onApiSearch('');
        lastSearchTermRef.current = '';
      }
    }
  }, [state.isOpen, enableApiSearch, onApiSearch]);

  useEffect(() => {
    if (enableApiSearch && state.searchTerm && state.isOpen) {
      if (lastSearchTermRef.current !== state.searchTerm) {
        debouncedApiSearch(state.searchTerm);
      }
    }
  }, [state.searchTerm, enableApiSearch, state.isOpen, debouncedApiSearch]);

  useEffect(() => {
    if (enableApiSearch && state.isOpen && state.searchInput === '' && state.searchTerm === '') {
      if (lastSearchTermRef.current !== '') {
        lastSearchTermRef.current = '';
        if (onApiSearch) {
          onApiSearch('');
        }
      }
    }
  }, [state.searchInput, state.searchTerm, enableApiSearch, state.isOpen, onApiSearch]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      hasInitialSearchRef.current = false;
      lastSearchTermRef.current = '';
    };
  }, []);

  const setOpen = (open: boolean) => {
    dispatch({ type: 'SET_OPEN', payload: open });
    onOpenChange?.(open);

    if (!open) {
      dispatch({ type: 'VALIDATE', payload: { required } });
    }
  };

  const setSelectedValues = (values: string[]) => {
    dispatch({ type: 'SET_SELECTED_VALUES', payload: values });
  };

  const setSearchInput = (input: string) => {
    dispatch({ type: 'SET_SEARCH_INPUT', payload: input });
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setTouched = (touched: boolean) => {
    dispatch({ type: 'SET_TOUCHED', payload: touched });
  };

  const setError = (error: boolean) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const resetSearch = () => {
    dispatch({ type: 'RESET_SEARCH' });
    lastSearchTermRef.current = '';
  };

  const validate = () => {
    dispatch({ type: 'VALIDATE', payload: { required } });
  };

  const handleSingleSelect = (newValue: string) => {
    const newValues = [newValue];
    setSelectedValues(newValues);
    onValueChange?.(newValue);
    setOpen(false);

    if (required && state.hasError) {
      setError(false);
    }
  };

  const handleMultipleSelect = (itemValue: string, checked: boolean) => {
    let newSelectedValues: string[];

    if (checked) {
      newSelectedValues = [...state.selectedValues, itemValue];
    } else {
      newSelectedValues = state.selectedValues.filter((val) => val !== itemValue);
    }

    setSelectedValues(newSelectedValues);
    onValueChange?.(newSelectedValues);

    if (required && state.hasError && newSelectedValues.length > 0) {
      setError(false);
    }
  };

  const getDisplayText = (
    selectedValues: string[],
    placeholder: string,
    variant: string,
    items: SelectItemProps[]
  ): string => {
    if (selectedValues.length === 0) return placeholder;

    if (variant === 'checkbox') {
      const selectedItems = selectedValues
        .map((value) => {
          const item = items.find((item) => item.value === value);
          return (item?.text as string) || value;
        });

      if (selectedItems.length > 3) {
        const firstThree = selectedItems.slice(0, 3).join(', ');
        const remaining = selectedItems.length - 3;
        return `${firstThree} e mais ${remaining}`;
      }

      return selectedItems.join(', ');
    }

    return (
      (items.find((item) => item.value === selectedValues[0])?.text as string) ||
      selectedValues[0]
    );
  };

  const getFilteredItems = (
    items: SelectItemProps[],
    searchTerm: string
  ): SelectItemProps[] => {
    if (enableApiSearch) {
      return items;
    }

    if (!searchTerm) return items;

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return items.filter((item) => {
      const normalizedText = normalizeText(item.text);
      const normalizedSubTitle = item.subTitle
        ? normalizeText(item.subTitle)
        : '';
      const normalizedValue = normalizeText(item.value);

      return (
        normalizedText.includes(lowercasedSearchTerm) ||
        normalizedSubTitle.includes(lowercasedSearchTerm) ||
        normalizedValue.includes(lowercasedSearchTerm)
      );
    });
  };

  return {
    state,
    actions: {
      setOpen,
      setSelectedValues,
      setSearchInput,
      setSearchTerm,
      setTouched,
      setError,
      resetSearch,
      validate,
      handleSingleSelect,
      handleMultipleSelect,
    },
    computed: {
      displayText: '',
      filteredItems: [],
    },
    refs: {
      searchInputRef,
    },
    utils: {
      getDisplayText,
      getFilteredItems,
    },
  };
}

export default useSelectLogic;