import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import styles from './index.module.scss';
import Search from '../Search/Search';
import Checkbox from '../Checkbox';

import {
  ChevronUp16Regular,
  ChevronDown16Regular,
} from '@fluentui/react-icons';
import LabelComponent from '../../shared/Label';
import { normalizeText } from '../../hooks/NormalizeText';

interface SelectItemProps {
  id?: string;
  text: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  value: string;
  selected?: boolean;
}

interface SelectRadixProps {
  items: SelectItemProps[];
  onValueChange?: (value: string | string[]) => void;
  onOpenChange?: (open: boolean) => void;
  variant: 'text' | 'icon' | 'checkbox';
  required?: boolean;
  value?: string | string[];
  multiple?: boolean;
  placeholder?: string;
  search?: boolean;
  tooltip?: boolean;
  tooltipMessage?: string;
  label?: string;
  helperText?: string;
  maxWidth?: string | number;
}

interface CheckboxItemProps extends SelectItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  text,
  subTitle,
  disabled,
  checked,
  onChange,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={styles.item}
      onClick={handleClick}
      role="option"
      aria-selected={checked}
      data-selected={checked}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        label={
          <div className={styles.checkboxContent}>
            <div className={styles.textContent}>
              <span className={styles.title}>{text}</span>
              {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
            </div>
          </div>
        }
      />
    </div>
  );
};

const SelectRadix: React.FC<SelectRadixProps> = ({
  items,
  onValueChange,
  required,
  onOpenChange,
  variant,
  value,
  tooltip,
  tooltipMessage,
  label = 'selecione',
  helperText = 'teste',
  placeholder = 'Selecione',
  maxWidth,
  search = false,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ text, subTitle, icon, disabled, value, ...restProps }, ref) => {
      return (
        <div className={styles.itemWrapper}>
          {variant === 'icon' && <span className={styles.icon}>{icon}</span>}

          <Select.Item
            className={styles.item}
            value={value}
            disabled={disabled}
            {...restProps}
          >
            <Select.ItemText className={styles.title}>{text}</Select.ItemText>

            {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
            <Select.ItemIndicator
              className={styles.itemIndicator}
            ></Select.ItemIndicator>
          </Select.Item>
        </div>
      );
    }
  );

  React.useEffect(() => {
    setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
  }, [value]);

  const getMaxWidth = () => {
    if (!maxWidth) return undefined;

    if (typeof maxWidth === 'number') {
      return `${maxWidth}px`;
    }

    return maxWidth;
  };
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchTerm(searchInputValue);
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setSearchInputValue('');
    }
  };

  const searchItems = () => {
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
  const filteredItems = React.useMemo(() => searchItems(), [items, searchTerm]);

  const handleSingleSelect = (newValue: string) => {
    setSelectedValues([newValue]);
    onValueChange?.(newValue);
    setOpen(false);
  };

  const handleCheckboxChange = (itemValue: string, checked: boolean) => {
    let newSelectedValues: string[];

    if (checked) {
      newSelectedValues = [...selectedValues, itemValue];
    } else {
      newSelectedValues = selectedValues.filter((val) => val !== itemValue);
    }

    setSelectedValues(newSelectedValues);
    onValueChange?.(newSelectedValues);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;

    if (variant === 'checkbox') {
      return selectedValues
        .map((value) => {
          const item = items.find((item) => item.value === value);
          return item?.text || value;
        })
        .join(', ');
    }
    return (
      items.find((item) => item.value === selectedValues[0])?.text ||
      selectedValues[0]
    );
  };
  React.useEffect(() => {
    if (!open) {
      setSearchInputValue('');
      setSearchTerm('');
    }
  }, [open]);
  const containerStyle = {
    maxWidth: getMaxWidth(),
  };
  if (variant === 'checkbox') {
    return (
      <div
        className={styles.container}
        ref={containerRef}
        style={containerStyle}
      >
        <button
          className={styles.trigger}
          onClick={() => handleOpenChange(!open)}
          aria-label="Select options"
          aria-expanded={open}
        >
          <span>{getDisplayText()}</span>
          {open ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
        </button>

        {open && (
          <div className={styles.checkboxDropdown}>
            <div className={styles.content}>
              <div className={styles.viewport}>
                {search && (
                  <div className={styles.searchWrapper}>
                    <Search
                      ref={searchInputRef}
                      className={styles.search}
                      placeholder="Buscar"
                      value={searchInputValue}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchKeyDown}
                      onClear={() => setSearchTerm('')}
                    />
                  </div>
                )}
                {filteredItems.length === 0 ? (
                  <div className={styles.noResults}>
                    Nenhum resultado encontrado
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <CheckboxItem
                      key={item.id || item.value}
                      value={item.value}
                      text={item.text}
                      subTitle={item.subTitle}
                      icon={item.icon}
                      disabled={item.disabled}
                      checked={selectedValues.includes(item.value)}
                      onChange={(checked) =>
                        handleCheckboxChange(item.value, checked)
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
  }

  return (
    <>
      <Select.Root
        value={selectedValues[0] || ''}
        onValueChange={handleSingleSelect}
        required={required}
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      >
        <div className={styles.containerLabel}>
          <LabelComponent
            htmlFor="select-items"
            required={required}
            tooltipMessage={tooltipMessage}
            tooltip={tooltip}
          >
            {label}
          </LabelComponent>
          <Select.Trigger className={styles.trigger} id="select-items">
            <Select.Value placeholder={placeholder}>
              {getDisplayText()}
            </Select.Value>
            {open ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
          </Select.Trigger>
          {!open && helperText && (
            <span className={styles.helper}>{helperText}</span>
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
                  ref={searchInputRef}
                  className={styles.search}
                  placeholder="buscar"
                  value={searchInputValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  onClear={() => setSearchTerm('')}
                />
              </div>
            )}
            <Select.ScrollUpButton
              className={styles.scrollButton}
            ></Select.ScrollUpButton>
            <Select.Viewport className={styles.viewport}>
              <Select.Group className={styles.group}>
                {filteredItems.length === 0 ? (
                  <div className={styles.noResults}>
                    {searchTerm
                      ? `Nenhum resultado encontrado para "${searchTerm}"`
                      : 'Nenhum item disponível'}
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <SelectItem
                      key={item.id || item.value}
                      value={item.value}
                      text={item.text}
                      subTitle={item.subTitle}
                      icon={item.icon}
                      disabled={item.disabled}
                    />
                  ))
                )}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton
              className={styles.scrollButton}
            ></Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
};
export type { SelectRadixProps, SelectItemProps };
export default SelectRadix;
