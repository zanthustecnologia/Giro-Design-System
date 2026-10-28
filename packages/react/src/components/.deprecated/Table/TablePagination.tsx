import { ChevronLeft16Regular, ChevronRight16Regular } from '@fluentui/react-icons';
import React from 'react';

import styles from './Table.module.scss';

export interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
  disabled?: boolean;
  className?: string;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [10, 25, 50, 100],
  disabled = false,
  className,
  ...rest
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  const canGoPrev = currentPage > 1 && !disabled;
  const canGoNext = currentPage < totalPages && !disabled;
  
  const handlePrevious = () => {
    if (canGoPrev) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };
  
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange(newItemsPerPage);
  };

  return (
    <div className={`${styles.tablePagination} ${className}`.trim()} {...rest}>

      <div className={styles.tablePaginationSelect}>
        <label htmlFor="items-per-page" className={styles.tablePaginationLabel}>
          Itens por página
        </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          disabled={disabled}
          className={styles.tablePaginationSelectInput}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.tablePaginationInfo}>
        <span>
          {totalItems > 0 
            ? `${startItem}–${endItem} de ${totalItems}`
            : '0 itens'
          }
        </span>
      </div>
      
      <div className={styles.tablePaginationControls}>
        <button
          className={styles.tablePaginationButton}
          onClick={handlePrevious}
          disabled={!canGoPrev}
          aria-label="Página anterior"
        >
          <ChevronLeft16Regular />
        </button>
        
        <button
          className={styles.tablePaginationButton}
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Próxima página"
        >
          <ChevronRight16Regular />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;