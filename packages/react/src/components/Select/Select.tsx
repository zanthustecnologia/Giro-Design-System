import { ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { Select as SelectRadix } from 'radix-ui';
import React, { useMemo, useId, useRef, useEffect } from 'react';

import CheckboxSelectItem from './components/CheckboxSelectItem';
import ExpandableSelectItem from './components/ExpandableSelectItem';
import SelectItem from './components/SelectItem';
import { useSelectLogic } from './hooks/useSelectLogic';
import styles from './Select.module.scss';
import { SelectProps } from './Select.types';
import LabelComponent from '../../shared/Label';
import Search from '../Search/Search';

const Select: React.FC<SelectProps> = ({
  items,
  onValueChange,
  onOpenChange,
  variant,
  required = false,
  value,
  
  label,
  helperText,
  placeholder = 'Selecione',
  maxWidth,
  search = false,
  error,
  errorMessage,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
  'data-testid': testId,
  tooltipText,
  tooltipSide = 'bottom',
  tooltipAlign = 'start',
  enableInfiniteScroll = false,
  onScrollEnd,
  isLoadingMore = false,
  enableApiSearch = false,
  onApiSearch,
  isSearching = false,
  scale = 1,
  ...rest
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
    enableApiSearch,
    onApiSearch,
    isSearching,
    error,
  });

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
    const termToFilter = enableApiSearch ? state.searchTerm : state.searchInput;
    return utils.getFilteredItems(items, termToFilter);
  }, [items, state.searchTerm, state.searchInput, enableApiSearch, utils]);

  const containerStyle = useMemo(() => ({
    maxWidth: maxWidth ? `${maxWidth}px` : undefined,
    '--giro-scale': scale,
  } as React.CSSProperties), [maxWidth, scale]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    actions.setSearchInput(value);
    
    if (enableApiSearch) {
      actions.setSearchTerm(value);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNavigationKey = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Tab'].includes(e.key);
    
    if (!isNavigationKey) {
      e.stopPropagation();
      return;
    }
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.currentTarget.blur();
      return;
    }

    if (e.key === 'Enter') {
      e.currentTarget.blur();
      return;
    } else if (e.key === 'Escape') {
      e.preventDefault();
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
    <SelectRadix.Root
      value={variant === 'checkbox' || (search && state.isOpen) ? '' : (state.selectedValues[0] || '')}
      onValueChange={variant === 'checkbox' ? undefined : actions.handleSingleSelect}
      required={required}
      open={state.isOpen}
      onOpenChange={actions.setOpen}
      disabled={disabled}
      {...rest}
    >
      <div
        className={clsx(styles.container, className)}
        style={{ ...containerStyle, ...style }}
        data-testid={testId}
      >
        <div className={styles.fieldContainer}>
          <div className={styles.containerLabel}>
            <LabelComponent
              htmlFor={selectId}
              required={required}
              tooltipText={tooltipText}
              tooltip={!!tooltipText}
              side={tooltipSide}
              align={tooltipAlign}
              error={state.hasError && state.touched}
              disabled={disabled}
              scale={scale}
            >
              {label}
            </LabelComponent>
            
            <SelectRadix.Trigger
              className={clsx(styles.trigger, {
                [styles.error]: state.hasError && state.touched,
                [styles.disabled]: disabled,
                [styles.hasValue]: state.selectedValues.length > 0,
                [styles.open]: state.isOpen,
              })}
              id={selectId}
              aria-label={ariaLabel}
              data-testid={`${testId}-trigger`}
            >
              {variant === 'checkbox' ? (
                <span className={styles.triggerText}>{displayText}</span>
              ) : (
                <SelectRadix.Value placeholder={placeholder} className={styles.placeholder}>{displayText}</SelectRadix.Value>
              )}
              <div className={styles.triggerIcon}>
                {state.isOpen ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
              </div>
            </SelectRadix.Trigger>

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

        <SelectRadix.Portal>
          <SelectRadix.Content
            className={styles.content}
            style={{ '--giro-scale': scale } as React.CSSProperties}
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
                  scale={scale}
                />
              </div>
            )}
            
            <SelectRadix.Viewport ref={viewportRef} className={styles.viewport} data-testid={testId ? `${testId}-viewport` : undefined}>
              <SelectRadix.Group className={styles.group}>
                {filteredItems.length === 0 ? (
                  <div className={styles.noResults}>
                    Nenhum resultado encontrado
                  </div>
                ) : (
                  <>
                    {filteredItems.map((item) => {
                      const hasChildren = item.children && item.children.length > 0;
                      
                      if (hasChildren) {
                        return (
                          <ExpandableSelectItem
                            key={item.id || item.value}
                            item={item}
                            variant={variant}
                            selectedValues={state.selectedValues}
                            onSelect={(value) => {
                              if (variant === 'checkbox') {
                                const isSelected = state.selectedValues.includes(value);
                                actions.handleMultipleSelect(value, !isSelected);
                              } else {
                                actions.handleSingleSelect(value);
                              }
                            }}
                          />
                        );
                      }
                      
                      return variant === 'checkbox' ? (
                        <CheckboxSelectItem
                          key={item.id || item.value}
                          {...item}
                          checked={state.selectedValues.includes(item.value)}
                          onCheckedChange={(checked: boolean) =>
                            actions.handleMultipleSelect(item.value, checked)
                          }
                        />
                      ) : (
                        <SelectItem
                          key={item.id || item.value}
                          {...item}
                          variant={variant}
                          disableFocusOnHover={search}
                        />
                      );
                    })}
                    {enableInfiniteScroll && isLoadingMore && (
                      <div className={styles.loadingMore}>
                        Carregando mais itens...
                      </div>
                    )}
                  </>
                )}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </div>
    </SelectRadix.Root>
  );
};

Select.displayName = 'Select';

export default Select;