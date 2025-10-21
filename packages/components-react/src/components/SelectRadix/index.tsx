import * as React from 'react';
import { Label, Select } from 'radix-ui';
import './SelectRadix.scss';
import Search from '../Search/Search';
import Checkbox from '../Checkbox';

import {
  ChevronUp16Regular,
  ChevronDown16Regular,
} from '@fluentui/react-icons';

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
      className="zds-select-radix__item"
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
          <div className="zds-select-radix__checkbox-content">
            <div className="zds-select-radix__text-content">
              <span className="zds-select-radix__title">{text}</span>
              {subTitle && (
                <div className="zds-select-radix__subtitle">{subTitle}</div>
              )}
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

  placeholder = 'Selecione',
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ ...props }) => {
      return (
        <div className="zds-select-radix__item-wrapper">
          {variant === 'icon' && (
            <span className="zds-select-radix__icon">{props.icon}</span>
          )}

          <Select.Item className="zds-select-radix__item" {...props}>
            <Select.ItemText className="zds-select-radix__title">
              {props.text}
            </Select.ItemText>

            {props.subTitle && (
              <div className="zds-select-radix__subtitle">{props.subTitle}</div>
            )}
            <Select.ItemIndicator className="zds-select-radix__item-indicator"></Select.ItemIndicator>
          </Select.Item>
        </div>
      );
    }
  );

  React.useEffect(() => {
    setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
  }, [value]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
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

  if (variant === 'checkbox') {
    return (
      <div className="zds-select-radix__container" ref={containerRef}>
        <button
          className="zds-select-radix__trigger"
          onClick={() => handleOpenChange(!open)}
          aria-label="Select options"
          aria-expanded={open}
        >
          <span>{getDisplayText()}</span>
          {open ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
        </button>

        {open && (
          <div className="zds-select-radix__checkbox-dropdown">
            <div className="zds-select-radix__content">
              <div className="zds-select-radix__viewport">
                <Search
                  className="zds-select-radix__search"
                  placeholder="Buscar"
                />
                {items.map((item) => (
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
                ))}
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
        <Select.Trigger className="zds-select-radix__trigger" id="item-select">
          <Select.Value placeholder={placeholder}>
            {getDisplayText()}
          </Select.Value>
          {open ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="zds-select-radix__content"
            position="popper"
            sideOffset={8}
            align="center"
          >
            {/* <Search className="zds-select-radix__search" placeholder="buscar" /> */}
            <Select.ScrollUpButton className="zds-select-radix__scroll-button"></Select.ScrollUpButton>
            <Select.Viewport className="zds-select-radix__viewport">
              <Select.Group className="zds-select-radix__group">
                {items.map((item) => (
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
            </Select.Viewport>
            <Select.ScrollDownButton className="zds-select-radix__scroll-button"></Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
};
export type { SelectRadixProps, SelectItemProps };
export default SelectRadix;
