// CombinedFilter.tsx
import { FilterRegular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useCallback } from 'react';

import styles from './CombinedFilter.module.scss';
import Badge from '../../Badge';
import Button from '../../Button';
import DatePicker from '../../DatePicker';
import Drawer from '../../Drawer/Drawer';
import Select from '../../Select';

import type {
  CombinedFilterField,
  CombinedFilterValues,
  FilterProps,
} from '../Filter.types';

const CombinedFilter: React.FC<FilterProps> = ({
  buttonText = 'Filtrar',
  icon,
  variant = 'outlined',
  disabled = false,
  className,
  title = 'Filtrar',
  fields = [],
  values,
  onApply,
  onClear,
  onOpen,
  onClose,
  id,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValues, setInternalValues] = useState<CombinedFilterValues>(
    () => values ?? {}
  );

  const handleOpen = useCallback(() => {
    setInternalValues(values ?? {});
    setIsOpen(true);
    onOpen?.();
  }, [values, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleApply = useCallback(() => {
    onApply?.(internalValues);
    handleClose();
  }, [internalValues, onApply, handleClose]);

  const handleClear = useCallback(() => {
    setInternalValues({});
    onClear?.();
  }, [onClear]);

  const setFieldValue = useCallback(
    (fieldId: string, value: Date | null | string | string[]) => {
      setInternalValues((prev) => ({ ...prev, [fieldId]: value }));
    },
    []
  );

  const activeCount = Object.values(internalValues).filter((v) => {
    if (v === null || v === undefined) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'string') return v !== '';
    return true;
  }).length;

  const renderField = useCallback(
    (field: CombinedFilterField) => {
      const isHalf =
        field.layout === 'half' ||
        (field.layout === undefined && field.type !== 'chips');
      const fieldClass = isHalf ? styles.fieldHalf : styles.fieldFull;

      switch (field.type) {
        case 'date':
          return (
            <div key={field.id} className={fieldClass}>
              <DatePicker
                label={field.label}
                value={(internalValues[field.id] as Date | null) ?? null}
                onChange={(date) => setFieldValue(field.id, date)}
                locale={field.locale ?? 'pt-br'}
                minDate={field.minDate}
                maxDate={field.maxDate}
              />
            </div>
          );

        case 'select': {
          const selectItems = (field.options ?? []).map((o) => ({
            value: o.id,
            text: o.text,
          }));
          return (
            <div key={field.id} className={fieldClass}>
              <Select
                label={field.label}
                items={selectItems}
                variant="text"
                placeholder={field.placeholder ?? 'Selecione'}
                value={(internalValues[field.id] as string) ?? ''}
                onValueChange={(val) => setFieldValue(field.id, val as string)}
              />
            </div>
          );
        }

        case 'chips': {
          const selectedChips = (internalValues[field.id] as string[]) ?? [];
          const isMulti = field.multiSelect !== false;

          const toggleChip = (optionId: string) => {
            const current = (internalValues[field.id] as string[]) ?? [];
            if (isMulti) {
              const next = current.includes(optionId)
                ? current.filter((id) => id !== optionId)
                : [...current, optionId];
              setFieldValue(field.id, next);
            } else {
              setFieldValue(
                field.id,
                current.includes(optionId) ? [] : [optionId]
              );
            }
          };

          return (
            <div key={field.id} className={fieldClass}>
              <p className={styles.fieldLabel}>{field.label}</p>
              <div className={styles.chipsGroup} role="group" aria-label={field.label}>
                {(field.options ?? []).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={selectedChips.includes(opt.id)}
                    className={clsx(styles.chipBtn, {
                      [styles.chipBtnSelected]: selectedChips.includes(opt.id),
                    })}
                    onClick={() => toggleChip(opt.id)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        default:
          return null;
      }
    },
    [internalValues, setFieldValue]
  );

  return (
    <div className={clsx(styles.triggerWrapper, className)} id={id} {...rest}>
      <Button
        variant={variant}
        disabled={disabled}
        icon={icon ?? <FilterRegular />}
        iconPosition="left"
        size="lg"
        onClick={handleOpen}
      >
        <span className={styles.triggerContent}>
          {buttonText}
          {activeCount > 0 && (
            <Badge badgeValue={activeCount} filterVariant />
          )}
        </span>
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        customWidth="400px"
        closeOnOverlayClick
        closeOnEscape
      >
        <div className={styles.body}>
          <div className={styles.fieldsGrid}>
            {fields.map(renderField)}
          </div>
        </div>

        <div className={styles.footer}>
          <Button fullWidth variant="outlined" onClick={handleClear}>
            Limpar
          </Button>
          <Button fullWidth onClick={handleApply}>
            Aplicar
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default CombinedFilter;
