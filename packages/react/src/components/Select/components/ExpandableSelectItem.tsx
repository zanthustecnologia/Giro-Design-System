import { ChevronRight16Regular, ChevronDown16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState } from 'react';

import Checkbox from '../../Checkbox';
import styles from '../Select.module.scss';

import type { SelectItemProps, SelectVariant } from '../Select.types';


interface ExpandableSelectItemProps {
  item: SelectItemProps;
  variant: SelectVariant;
  onSelect: (value: string) => void;
  selectedValues: string[];
  level?: number; 
}

const ExpandableSelectItem: React.FC<ExpandableSelectItemProps> = ({
  item,
  variant,
  onSelect,
  selectedValues,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedValues.includes(item.value);
  const isCheckboxLeaf = variant === 'checkbox' && !hasChildren;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      setIsExpanded(!isExpanded);
      return;
    }

    if (item.disabled) return;

    // O Checkbox interno já dispara a seleção; evita alternar duas vezes.
    if (isCheckboxLeaf && (e.target as HTMLElement).closest('[role="checkbox"], label')) return;

    onSelect(item.value);
  };

  const textContent = (
    <div className={styles.textContent}>
      <div className={styles.title}>{item.text}</div>
      {item.subTitle && <div className={styles.subTitle}>{item.subTitle}</div>}
    </div>
  );

  return (
    <>
      <div 
        className={styles.expandableItemContainer}
        style={{ paddingLeft: `${level * 16}px` }}
      >
        <div 
          className={clsx(styles.itemWrapper, {
            [styles.selected]: isSelected && !hasChildren,
            [styles.disabled]: item.disabled,
          })}
          onClick={handleClick}
          onKeyDown={(e) => {
            // Teclas vindas do Checkbox interno já são tratadas por ele.
            if (e.target !== e.currentTarget) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e as unknown as React.MouseEvent);
            }
          }}
          role={isCheckboxLeaf ? 'option' : 'button'}
          tabIndex={item.disabled ? -1 : 0}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={isCheckboxLeaf ? isSelected : undefined}
          data-select-row=""
          data-disabled={item.disabled || undefined}
          data-selected={isSelected && !hasChildren && !isCheckboxLeaf ? 'true' : undefined}
          data-testid={`select-item-${item.value}`}
        >
          {isCheckboxLeaf ? (
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(item.value)}
              disabled={item.disabled}
              label={textContent}
            />
          ) : (
            <>
              {variant === 'icon' && item.icon && (
                <span className={styles.icon}>{item.icon}</span>
              )}

              {textContent}
            </>
          )}
          
          {hasChildren && (
            <span className={styles.chevron}>
              {isExpanded ? <ChevronDown16Regular /> : <ChevronRight16Regular />}
            </span>
          )}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className={styles.childrenWrapper}>
          {item.children!.map((child) => (
            <ExpandableSelectItem
              key={child.id || child.value}
              item={child}
              variant={variant}
              onSelect={onSelect}
              selectedValues={selectedValues}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ExpandableSelectItem;