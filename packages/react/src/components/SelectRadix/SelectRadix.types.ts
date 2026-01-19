import { ReactNode } from 'react';

export interface SelectItemProps {
  id?: string;
  text: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  value: string;
  selected?: boolean;
}

export interface CheckboxItemProps extends SelectItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export type SelectVariant = 'text' | 'icon' | 'checkbox';

export interface SelectRadixProps {
  items: SelectItemProps[];
  onValueChange?: (value: string | string[]) => void;
  onOpenChange?: (open: boolean) => void;
  variant: SelectVariant;
  required?: boolean;
  value?: string | string[];
  multiple?: boolean;
  placeholder?: string;
  search?: boolean;
  label?: string;
  helperText?: string;
  maxWidth?: string | number;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  // tooltip props
  tooltip?: boolean;
  tooltipText?: string;
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end";
  // scroll props
  enableInfiniteScroll?: boolean;
  onScrollEnd?: () => void;
  isLoadingMore?: boolean;
  // API search props
  enableApiSearch?: boolean;
  onApiSearch?: (term: string) => void;
  isSearching?: boolean;
}

export interface SelectState {
  isOpen: boolean;
  selectedValues: string[];
  searchInput: string;
  searchTerm: string;
  touched: boolean;
  hasError: boolean;
}

export type SelectAction =
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'SET_SELECTED_VALUES'; payload: string[] }
  | { type: 'SET_SEARCH_INPUT'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_TOUCHED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: boolean }
  | { type: 'RESET_SEARCH' }
  | { type: 'VALIDATE'; payload: { required: boolean } };

export interface UseSelectLogicProps {
  value?: string | string[];
  required?: boolean;
  search?: boolean;
  onValueChange?: (value: string | string[]) => void;
  onOpenChange?: (open: boolean) => void;
  // API search props
  enableApiSearch?: boolean;
  onApiSearch?: (term: string) => void;
  isSearching?: boolean;
}

export interface UseSelectLogicReturn {
  state: SelectState;
  actions: {
    setOpen: (open: boolean) => void;
    setSelectedValues: (values: string[]) => void;
    setSearchInput: (input: string) => void;
    setSearchTerm: (term: string) => void;
    setTouched: (touched: boolean) => void;
    setError: (error: boolean) => void;
    resetSearch: () => void;
    validate: () => void;
    handleSingleSelect: (value: string) => void;
    handleMultipleSelect: (value: string, checked: boolean) => void;
  };
  computed: {
    displayText: string;
    filteredItems: SelectItemProps[];
  };
  refs: {
    searchInputRef: React.RefObject<HTMLInputElement | null>;
  };
  utils: {
    getDisplayText: (
      selectedValues: string[],
      placeholder: string,
      variant: string,
      items: SelectItemProps[]
    ) => string;
    getFilteredItems: (items: SelectItemProps[], searchTerm: string) => SelectItemProps[];
  };
}