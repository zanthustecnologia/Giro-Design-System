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
  searchPlaceholder?: string;
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
  searchPlaceholder = 'Buscar...',
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  
  // ← NOVO: Estados para busca
  const [searchInputValue, setSearchInputValue] = React.useState<string>(''); // Valor do input
  const [searchTerm, setSearchTerm] = React.useState<string>(''); // Termo aplicado ao filtro
  
  const containerRef = React.useRef<HTMLDivElement>(null);

  // ← NOVO: Função para normalizar texto
  const normalizeText = (text: React.ReactNode): string => {
    if (typeof text === 'string') return text.toLowerCase();
    if (typeof text === 'number') return text.toString().toLowerCase();
    return '';
  };

  // ← NOVO: Filtro dos items (memoizado para performance)
  const filteredItems = React.useMemo(() => {
    if (!search || !searchTerm.trim()) {
      return items;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    return items.filter((item) => {
      const textMatch = normalizeText(item.text).includes(searchLower);
      const subTitleMatch = item.subTitle 
        ? normalizeText(item.subTitle).includes(searchLower)
        : false;
      const valueMatch = item.value.toLowerCase().includes(searchLower);

      return textMatch || subTitleMatch || valueMatch;
    });
  }, [items, searchTerm, search]);

  // ← NOVO: Reset ao fechar dropdown
  React.useEffect(() => {
    if (!open) {
      setSearchInputValue('');
      setSearchTerm('');
    }
  }, [open]);

  const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ ...props }, ref) => {
      return (
        <div className={styles.itemWrapper}>
          {variant === 'icon' && (
            <span className={styles.icon}>{props.icon}</span>
          )}

          <Select.Item className={styles.item} {...props}>
            <Select.ItemText className={styles.title}>
              {props.text}
            </Select.ItemText>

            {props.subTitle && (
              <div className={styles.subTitle}>{props.subTitle}</div>
            )}
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

  // ← NOVO: Handler para mudança no input (não aplica filtro ainda)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  // ← NOVO: Handler para tecla Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchTerm(searchInputValue); // ← Aplica o filtro
    }
  };

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

  const containerStyle = {
    maxWidth: getMaxWidth()
  };

  // ← NOVO: Componente de feedback "nenhum resultado"
  const NoResults = () => (
    <div className={styles.noResults}>
      Nenhum resultado encontrado para "{searchTerm}"
    </div>
  );

  if (variant === 'checkbox') {
    return (
      <div className={styles.container} ref={containerRef} style={containerStyle}>
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
              {search && (
                <div className={styles.searchWrapper}>
                  <Search 
                    className={styles.search} 
                    placeholder={searchPlaceholder}
                    value={searchInputValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown} // ← NOVO: Detecta Enter
                  />
                </div>
              )}
              <div className={styles.viewport}>
                {filteredItems.length === 0 ? (
                  <NoResults />
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
          {!open && helperText && <span className={styles.helper}>{helperText}</span>}
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
                  className={styles.search} 
                  placeholder={searchPlaceholder}
                  value={searchInputValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown} // ← NOVO: Detecta Enter
                />
              </div>
            )}
            <Select.ScrollUpButton
              className={styles.scrollButton}
            ></Select.ScrollUpButton>
            <Select.Viewport className={styles.viewport}>
              {filteredItems.length === 0 ? (
                <NoResults />
              ) : (
                <Select.Group className={styles.group}>
                  {filteredItems.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.value}
                      text={item.text}
                      subTitle={item.subTitle}
                      icon={item.icon}
                      disabled={item.disabled}
                    />
                  ))}
                </Select.Group>
              )}
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