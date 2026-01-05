import React, { useMemo, useId, useRef, useEffect } from 'react';
import { Select } from 'radix-ui';
import clsx from 'clsx';
import { ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';

import { SelectRadixProps } from './SelectRadix.types';
import { useSelectLogic } from './hooks/useSelectLogic';
import CheckboxSelectItem from './components/CheckboxSelectItem';
import SelectItem from './components/SelectItem';
import Search from '../Search/Search';
import LabelComponent from '../../shared/Label';

import styles from './index.module.scss';

const SelectRadix: React.FC<SelectRadixProps> = ({
  items,
  onValueChange,
  onOpenChange,
  variant,
  required = false,
  value,
  tooltip = false,
  tooltipText,
  label,
  helperText,
  placeholder = 'Selecione',
  maxWidth,
  search = false,
  errorMessage,
  disabled = false,
  className,
  'aria-label': ariaLabel,
  'data-testid': testId,
  // Props para scroll infinito
  enableInfiniteScroll = false,
  onScrollEnd,
  isLoadingMore = false,
  // Props para busca em API
  enableApiSearch = false,
  onApiSearch,
  isSearching = false,
  ...restProps
}) => {
  const componentId = useId();
  const selectId = `select-${componentId}`;
  const viewportRef = useRef<HTMLDivElement>(null);
  const hasReachedEndRef = useRef<boolean>(false);

  const {
    state,
    actions,
    refs,
    utils,
  } = useSelectLogic({
    value,
    required,
    search,
    onValueChange,
    onOpenChange,
    // API search props
    enableApiSearch,
    onApiSearch,
    isSearching,
  });

  // Infinite Scroll Logic
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !enableInfiniteScroll) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (isAtBottom && !hasReachedEndRef.current && onScrollEnd && !isLoadingMore) {
        hasReachedEndRef.current = true;
        onScrollEnd();
      } else if (!isAtBottom && hasReachedEndRef.current) {
        hasReachedEndRef.current = false;
      }
    };

    viewport.addEventListener('scroll', handleScroll);

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [state.isOpen, enableInfiniteScroll, onScrollEnd, isLoadingMore]);

  // Reset a flag when the select opens
  useEffect(() => {
    if (state.isOpen && enableInfiniteScroll) {
      hasReachedEndRef.current = false;
    }
  }, [state.isOpen, enableInfiniteScroll]);

  const displayText = useMemo(
    () => utils.getDisplayText(state.selectedValues, placeholder, variant, items),
    [state.selectedValues, placeholder, variant, items, utils]
  );

  const filteredItems = useMemo(() => {
    // Para busca via API, usa searchTerm (só atualiza quando Enter é pressionado)
    // Para busca local, usa searchInput (atualiza a cada tecla para filtro em tempo real)
    const termToFilter = enableApiSearch ? state.searchTerm : state.searchInput;
    return utils.getFilteredItems(items, termToFilter);
  }, [items, state.searchTerm, state.searchInput, enableApiSearch, utils]);

  const containerStyle = useMemo(() => ({
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
  }), [maxWidth]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setSearchInput(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      e.preventDefault();
      actions.setSearchTerm(state.searchInput);
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      actions.resetSearch();
    }
  };

  const handleClear = () => {
    actions.resetSearch();
    if (enableApiSearch && onApiSearch) {
      onApiSearch('');
    }
  };

  return (
    <Select.Root
      value={variant === 'checkbox' ? '' : (state.selectedValues[0] || '')}
      onValueChange={variant === 'checkbox' ? undefined : actions.handleSingleSelect}
      required={required}
      open={state.isOpen}
      onOpenChange={actions.setOpen}
      disabled={disabled}
      {...restProps}
    >
      <div
        className={clsx(styles.container, className)}
        style={containerStyle}
        data-testid={testId}
      >
        <div className={styles.fieldContainer}>
          <div className={styles.containerLabel}>
            <LabelComponent
              htmlFor={selectId}
              required={required}
              tooltipText={tooltipText}
              tooltip={tooltip}
              error={state.hasError && state.touched}
              disabled={disabled}
            >
              {label}
            </LabelComponent>
            
            <Select.Trigger
              className={clsx(styles.trigger, {
                [styles.error]: state.hasError && state.touched,
                [styles.disabled]: disabled,
                [styles.hasValue]: state.selectedValues.length > 0,
              })}
              id={selectId}
              aria-label={ariaLabel}
              data-testid={`${testId}-trigger`}
            >
              {variant === 'checkbox' ? (
                <span className={styles.triggerText}>{displayText}</span>
              ) : (
                <Select.Value placeholder={placeholder} className={styles.placeholder}>{displayText}</Select.Value>
              )}
              {state.isOpen ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
            </Select.Trigger>

            {!state.isOpen && helperText && !state.hasError && (
              <span className={clsx(
                styles.helper,
                {
                  [styles.disabled]: disabled
                }                
              )}>{helperText}</span>
            )}
            
            {state.hasError && state.touched && (
              <span className={styles.errorMessage}>
                {errorMessage || 'Campo obrigatório'}
              </span>
            )}
          </div>
        </div>

        <Select.Portal>
          <Select.Content
            className={styles.content}
            position="popper"
            side="bottom"
            sideOffset={8}
            align="start"
            avoidCollisions={true}
          >
            {search && (
              <div className={styles.searchWrapper}>
                <Search
                  ref={refs.searchInputRef}
                  className={styles.search}
                  placeholder="Buscar"
                  value={state.searchInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  onClear={handleClear}
                  data-testid={`${testId}-search`}
                />
              </div>
            )}
            
            <Select.Viewport ref={viewportRef} className={styles.viewport}>
              <Select.Group className={styles.group}>
                {filteredItems.length === 0 ? (
                  <div className={styles.noResults}>
                    Nenhum resultado encontrado
                  </div>
                ) : (
                  <>
                    {filteredItems.map((item) => (
                      variant === 'checkbox' ? (
                        <CheckboxSelectItem
                          key={item.id || item.value}
                          {...item}
                          checked={state.selectedValues.includes(item.value)}
                          onChange={(checked: boolean) =>
                            actions.handleMultipleSelect(item.value, checked)
                          }
                        />
                      ) : (
                        <SelectItem
                          key={item.id || item.value}
                          {...item}
                          variant={variant}
                        />
                      )
                    ))}
                    {enableInfiniteScroll && isLoadingMore && (
                      <div className={styles.loadingMore}>
                        Carregando mais itens...
                      </div>
                    )}
                  </>
                )}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  );
};

SelectRadix.displayName = 'SelectRadix';

export default SelectRadix;