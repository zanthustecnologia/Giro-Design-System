import React, { useMemo, useId } from 'react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';

import { SelectRadixProps } from './SelectRadix.types';
import { useSelectLogic } from './hooks/useSelectLogic';
import CheckboxItem from './components/CheckboxItem';
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
  tooltipMessage,
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
  ...restProps
}) => {
  const componentId = useId();
  const selectId = `select-${componentId}`;

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
  });

  const displayText = useMemo(
    () => utils.getDisplayText(state.selectedValues, placeholder, variant, items),
    [state.selectedValues, placeholder, variant, items, utils]
  );

  const filteredItems = useMemo(
    () => utils.getFilteredItems(items, state.searchTerm),
    [items, state.searchTerm, utils]
  );

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

  const renderCheckboxVariant = () => (
    <div
      className={clsx(styles.container, className)}
      style={containerStyle}
      data-testid={testId}
    >
      <div className={styles.containerLabel}>
        <LabelComponent
          htmlFor={selectId}
          required={required}
          tooltipMessage={tooltipMessage}
          tooltip={tooltip}
          error={state.hasError && state.touched}
        >
          {label}
        </LabelComponent>
        
        <button
          id={selectId}
          className={clsx(styles.trigger, styles.triggerCheckbox, {
            [styles.error]: state.hasError && state.touched,
            [styles.disabled]: disabled,
          })}
          onClick={() => !disabled && actions.setOpen(!state.isOpen)}
          aria-label={ariaLabel || 'Select options'}
          aria-expanded={state.isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          data-testid={`${testId}-trigger`}
        >
          <span>{displayText}</span>
          {state.isOpen ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
        </button>

        {!state.isOpen && helperText && !state.hasError && (
          <span className={styles.helper}>{helperText}</span>
        )}
        
        {state.hasError && state.touched && (
          <span className={styles.error}>
            {errorMessage || 'Campo obrigatório'}
          </span>
        )}
      </div>

      {state.isOpen && (
        <div className={styles.checkboxDropdown}>
          <div className={styles.content}>
            {search && (
              <div className={styles.searchWrapper}>
                <Search
                  ref={refs.searchInputRef}
                  className={styles.search}
                  placeholder="Buscar"
                  value={state.searchInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  onClear={actions.resetSearch}
                  data-testid={`${testId}-search`}
                />
              </div>
            )}
            
            <div className={styles.viewport} role="listbox">
              {filteredItems.length === 0 ? (
                <div className={styles.noResults}>
                  {state.searchTerm
                    ? `Nenhum resultado encontrado para "${state.searchTerm}"`
                    : 'Nenhum item disponível'
                  }
                </div>
              ) : (
                filteredItems.map((item) => (
                  <CheckboxItem
                    key={item.id || item.value}
                    {...item}
                    checked={state.selectedValues.includes(item.value)}
                    onChange={(checked) =>
                      actions.handleMultipleSelect(item.value, checked)
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSelectVariant = () => (
    <Select.Root
      value={state.selectedValues[0] || ''}
      onValueChange={actions.handleSingleSelect}
      required={required}
      open={state.isOpen}
      onOpenChange={actions.setOpen}
      disabled={disabled}
      {...restProps}
    >
      <div className={clsx(styles.containerLabel, className)}>
        <LabelComponent
          htmlFor={selectId}
          required={required}
          tooltipMessage={tooltipMessage}
          tooltip={tooltip}
          error={state.hasError && state.touched}
        >
          {label}
        </LabelComponent>
        
        <Select.Trigger
          className={clsx(styles.trigger, {
            [styles.error]: state.hasError && state.touched,
            [styles.disabled]: disabled,
          })}
          id={selectId}
          aria-label={ariaLabel}
          data-testid={`${testId}-trigger`}
        >
          <Select.Value placeholder={placeholder}>{displayText}</Select.Value>
          {state.isOpen ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
        </Select.Trigger>

        {!state.isOpen && helperText && !state.hasError && (
          <span className={styles.helper}>{helperText}</span>
        )}
        
        {state.hasError && state.touched && (
          <span className={styles.error}>
            {errorMessage || 'Campo obrigatório'}
          </span>
        )}
      </div>

      <Select.Portal>
        <Select.Content
          className={styles.content}
          position="popper"
          side="bottom"
          sideOffset={8}
          align="start"
          avoidCollisions={false}
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
                onClear={actions.resetSearch}
                data-testid={`${testId}-search`}
              />
            </div>
          )}
          
          <Select.Viewport className={styles.viewport}>
            <Select.Group className={styles.group}>
              {filteredItems.length === 0 ? (
                <div className={styles.noResults}>
                  {state.searchTerm
                    ? `Nenhum resultado encontrado para "${state.searchTerm}"`
                    : 'Nenhum item disponível'
                  }
                </div>
              ) : (
                filteredItems.map((item) => (
                  <SelectItem
                    key={item.id || item.value}
                    {...item}
                    variant={variant}
                  />
                ))
              )}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );

  return variant === 'checkbox' ? renderCheckboxVariant() : renderSelectVariant();
};

SelectRadix.displayName = 'SelectRadix';

export default SelectRadix;