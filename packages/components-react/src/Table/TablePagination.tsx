import React from 'react';
import { ChevronLeft16Regular, ChevronRight16Regular } from '@fluentui/react-icons';
import './Table.scss';

export interface TablePaginationProps {
  /** Página atual */
  currentPage: number;
  /** Total de itens */
  totalItems: number;
  /** Itens por página */
  itemsPerPage: number;
  /** Callback quando a página muda */
  onPageChange: (page: number) => void;
  /** Callback quando itens por página muda */
  onItemsPerPageChange: (itemsPerPage: number) => void;
  /** Opções disponíveis para itens por página */
  pageSizeOptions?: number[];
  /** Desabilita a paginação */
  disabled?: boolean;
  /** Classes CSS adicionais */
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
  className = '',
}) => {
  // Cálculos simples
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  const canGoPrev = currentPage > 1 && !disabled;
  const canGoNext = currentPage < totalPages && !disabled;
  
  // Handlers simples
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
    <div className={`zds-table__pagination ${className}`.trim()}>
      {/* Seletor de itens por página */}
      <div className="zds-table__pagination-select">
        <label htmlFor="items-per-page" className="zds-table__pagination-label">
          Itens por página
        </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          disabled={disabled}
          className="zds-table__pagination-select-input"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Informações de paginação */}
      <div className="zds-table__pagination-info">
        <span>
          {totalItems > 0 
            ? `${startItem}–${endItem}`
            : '0 itens'
          }
        </span>
      </div>
      
      {/* Controles de navegação */}
      <div className="zds-table__pagination-controls">
     
          <ChevronLeft16Regular   onClick={handlePrevious}/>
          <ChevronRight16Regular onClick={handleNext} />
      
      </div>
    </div>
  );
};

export default TablePagination;
