import { useReducer, useMemo, useEffect, useRef } from 'react';
import { normalizeText } from '../../../hooks/NormalizeText';
import {
  SelectState,
  SelectAction,
  UseSelectLogicProps,
  UseSelectLogicReturn,
  SelectItemProps,
} from '../SelectRadix.types';

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
    case 'VALIDATE':
      const hasError = action.payload.required && state.selectedValues.length === 0;
      return { ...state, hasError, touched: true };
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
}: UseSelectLogicProps): UseSelectLogicReturn {
  const [state, dispatch] = useReducer(selectReducer, {
    ...initialState,
    selectedValues: Array.isArray(value) ? value : value ? [value] : [],
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes
  useEffect(() => {
    const newValues = Array.isArray(value) ? value : value ? [value] : [];
    dispatch({ type: 'SET_SELECTED_VALUES', payload: newValues });
  }, [value]);

  // Auto-focus search when opening
  useEffect(() => {
    if (state.isOpen && search) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [state.isOpen, search]);

  // Reset search when closing
  useEffect(() => {
    if (!state.isOpen) {
      dispatch({ type: 'RESET_SEARCH' });
    }
  }, [state.isOpen]);

  const setOpen = (open: boolean) => {
    dispatch({ type: 'SET_OPEN', payload: open });
    onOpenChange?.(open);

    // Validate when closing
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
  };

  const validate = () => {
    dispatch({ type: 'VALIDATE', payload: { required } });
  };

  const handleSingleSelect = (newValue: string) => {
    const newValues = [newValue];
    setSelectedValues(newValues);
    onValueChange?.(newValue);
    setOpen(false);

    // Clear error when a value is selected
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

    // Clear error when at least one value is selected
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
      return selectedValues
        .map((value) => {
          const item = items.find((item) => item.value === value);
          return (item?.text as string) || value;
        })
        .join(', ');
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
      displayText: '', // Will be computed in component
      filteredItems: [], // Will be computed in component
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