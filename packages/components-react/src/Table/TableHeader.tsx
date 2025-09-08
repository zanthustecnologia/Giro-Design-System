import React, { useState, KeyboardEvent } from 'react';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import { DropdownItem, DropdownType } from '../Dropdown/Dropdown';
import { Filter16Regular } from '@fluentui/react-icons';
import './Table.scss';

interface TableHeaderProps {
  /** Valor atual da pesquisa */
  searchValue?: string;
  /** Callback quando o valor da busca muda */
  onSearchChange?: (value: string) => void;
  /** Placeholder do campo de busca */
  searchPlaceholder?: string;
  /** Mostra o campo de busca */
  showSearch?: boolean;
  /** Mostra seção de filtros */
  showFilters?: boolean;
  /** Filtros customizados (slot para componentes externos) */
  filters?: React.ReactNode;
  /** Filtros usando o componente Filter do design system */
  filterItems?: Array<{
    /** ID único para o filtro (para identificação) */
    id?: string;
    /** Texto do botão do filtro */
    buttonText: string | React.ReactNode;
    /** Ícone do filtro (opcional) */
    icon?: React.ReactElement;
    /** Items do dropdown (quando usar dropdown padrão) */
    items?: DropdownItem[];
    /** Tipo do dropdown */
    type?: DropdownType;
    /** IDs selecionados */
    selectedIds?: string[];
    /** Callback quando seleção muda */
    onSelectionChange?: (selectedIds: string[]) => void;
    /** Placeholder do dropdown */
    placeholder?: string;
    /** Habilita busca no dropdown */
    enableSearch?: boolean;
    /** Posição do dropdown */
    position?: 'left' | 'right';
    /** Se está desabilitado */
    disabled?: boolean;
    /** Callback quando abre/fecha */
    onToggle?: (isOpen: boolean) => void;
    /** Tooltip explicativo do filtro */
    tooltip?: string;
  }>;
  /** Classes CSS adicionais */
  className?: string;
  /** Callback quando busca é executada (Enter ou botão) */
  onSearch?: (value: string) => void;
  /** Mostra botão de limpar busca */
  showClearSearch?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  searchValue = '',
  onSearchChange,
  onSearch,
  searchPlaceholder = 'Pesquisar...',
  showSearch = true,
  showFilters = false,
  filters,
  filterItems = [],
  className = '',
}) => {
  // Estado interno para controlar o input de busca
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);

  // Atualiza valor interno quando prop externa muda
  React.useEffect(() => {
    setInternalSearchValue(searchValue);
  }, [searchValue]);

  // Handler para mudanças no campo de busca
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalSearchValue(value);
    
    // Se limpar o campo, buscar imediatamente
    if (value === '' && onSearchChange) {
      onSearchChange('');
    }
  };

  // Handler para Enter no campo de busca
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSearch) {
        onSearch(internalSearchValue);
      } else if (onSearchChange) {
        onSearchChange(internalSearchValue);
      }
    }
  };

  const hasFilters = filters || (filterItems && filterItems.length > 0);

  return (
    <div className={`zds-table-header ${className}`.trim()}>
      {/* Campo de busca */}
      {showSearch && (onSearchChange || onSearch) && (
        <div >
          <Search
            value={internalSearchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={searchPlaceholder}
            className="zds-table-header__search"
          />
        </div>
      )}
      
      {/* Seção de filtros */}
      {showFilters && (
        <div className="zds-table-header__filters">
          {hasFilters ? (
            <div className="zds-table-header__filters-content">
              {/* Filtros customizados (slot flexível) */}
              {filters && (
                <div className="zds-table-header__custom-filters">
                  {filters}
                </div>
              )}

              <span className='zds-table-header__filter-label'>Filtros</span>
              {/* Filtros usando componente Filter */}
              {filterItems && filterItems.map((filterItem, index) => (
                <Filter
                  key={filterItem.id || index}
                  buttonText={filterItem.buttonText}
                  icon={filterItem.icon}
                  position={filterItem.position || 'left'}
                  disabled={filterItem.disabled}
                  variant="outlined"
                  items={filterItem.items}
                  type={filterItem.type}
                  selectedIds={filterItem.selectedIds}
                  onApplyFilter={filterItem.onSelectionChange}
                  placeholder={filterItem.placeholder}
                  enableSearch={filterItem.enableSearch}
                  onOpen={() => filterItem.onToggle?.(true)}
                  onClose={() => filterItem.onToggle?.(false)}
                />
              ))}
            </div>
          ) : (
            <div className="zds-table-header__filters-placeholder">
              <span>Nenhum filtro disponível</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableHeader;
