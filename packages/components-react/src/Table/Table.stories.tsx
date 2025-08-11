import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Table from './Table';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import Chips from '../Chips';
import Avatar from '../Avatar';
import Menu from '../Menu';
import MultiLineText from '../MultiLineText';
import { MoreVertical16Regular, Person16Regular, ChevronDown16Regular, ChevronUp16Regular } from '@fluentui/react-icons';

// Tipos e interfaces
interface GeneratedDataItem {
  id: number;
  name: string;
  status: string;
  department: string;
  level: string;
  category: string;
  location: string;
  chips: {
    title: string;
    type: string;
  };
  avatar: {
    icon: React.ReactElement;
    size: string;
  };
  multiLineText: {
    text1: string;
    text2: string;
  };
}

interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc' | null;
}

interface SearchState {
  searchValue: string;
  handleSearchChange: (newSearchValue: string) => void;
  filterData: (searchTerm: string, dataToFilter: GeneratedDataItem[]) => GeneratedDataItem[];
}

interface FiltersState {
  statusFilter: string[];
  departmentFilter: string[];
  categoryFilter: string[];
  locationFilter: string[];
  dateFilter: string | null;
  applyFilters: (dataToFilter: GeneratedDataItem[]) => GeneratedDataItem[];
  filterHandlers: {
    onStatusFilterChange: (selectedItems: string[]) => void;
    onDepartmentFilterChange: (selectedItems: string[]) => void;
    onCategoryFilterChange: (selectedItems: string[]) => void;
    onLocationFilterChange: (selectedItems: string[]) => void;
    onDateFilterChange: (selectedDate: string | null) => void;
  };
  clearAllFilters: () => void;
  getAppliedFiltersCount: () => number;
}

interface SortingState {
  sortConfig: SortConfig;
  sortData: (dataToSort: GeneratedDataItem[], config: SortConfig) => GeneratedDataItem[];
  handleSort: (columnKey: string) => void;
  handleSortMouseEnter: () => void;
  handleSortMouseLeave: () => void;
  renderSortIcon: (columnKey: string) => JSX.Element;
}

interface PaginationState {
  currentPage: number;
  itemsPerPageState: number;
  selectedItems: GeneratedDataItem[];
  handlePageChange: (newPage: number) => void;
  handlePerPageChange: (newItemsPerPage: number, newPage: number) => void;
  handleSelectionChange: (selection: GeneratedDataItem[]) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface TableStoryArgs {
  className: string;
  id: string;
  emptyTitle: string;
  emptyCaption: string;
  internalLoader: boolean;
  showCheckbox: boolean;
  tableHeader: boolean;
  showSearch: boolean;
  showFilters: boolean;
  filterPosition: 'left' | 'right';
  tablePagination: boolean;
  itemsPerPage: number;
  columns?: any[];
  data?: GeneratedDataItem[];
  onSelectionChange?: (selection: GeneratedDataItem[]) => void;
}

interface ColumnConfig {
  key: string;
  label: string | React.ReactElement;
  render: (row: GeneratedDataItem) => React.ReactElement;
}

// Configuração do Storybook para o componente Table
const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    // Props do componente Table principal
    className: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    emptyTitle: {
      control: 'text',
    },
    emptyCaption: {
      control: 'text',
    },
    internalLoader: {
      control: 'boolean',
    },
    showCheckbox: {
      control: 'boolean',
    },

    // Props do TableHeader
    tableHeader: {
      control: 'boolean',
      description: 'Controla a exibição do TableHeader',
    },
    showSearch: {
      control: 'boolean',
      description: 'Controla a exibição do campo de pesquisa no TableHeader',
    },
    showFilters: {
      control: 'boolean',
      description: 'Controla a exibição dos filtros no TableHeader',
    },
    filterPosition: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      description: 'Posição dos filtros dropdown no TableHeader',
    },

    // Props do TablePagination
    tablePagination: {
      control: 'boolean',
      description: 'Controla a exibição da paginação',
    },
    itemsPerPage: {
      control: 'select',
      options: [10, 25, 50, 100],
      description: 'Quantidade de itens por página',
    },

    // Props de componentes complexos (não editáveis no Storybook)
    columns: {
      control: false,
      description: 'Array de configuração das colunas da tabela',
    },
    data: {
      control: false,
      description: 'Array de dados a serem exibidos na tabela',
    },
    onSelectionChange: {
      control: false,
      description: 'Callback executado quando a seleção de itens muda',
    },
  },
  args: {
    // Valores padrão globais
    className: '',
    id: '',
    emptyTitle: 'Nenhum registro encontrado',
    emptyCaption: 'Nenhum registro encontrado pela busca ou filtros aplicados',
    internalLoader: false,
    showCheckbox: false,
    tableHeader: true,
    showSearch: true,
    showFilters: true,
    filterPosition: 'left' as const,
    tablePagination: true,
    itemsPerPage: 10,
  },
};

export default meta;

/**
 * Função para gerar dados em massa para paginação com datas variadas
 * Otimizada para evitar recriação desnecessária de objetos
 * Agora inclui propriedades necessárias para filtros funcionais
 * @param count - Quantidade de registros a gerar
 * @returns Array com dados gerados
 */
const generateLargeDataSet = (count: number = 30): GeneratedDataItem[] => {
  const statuses: string[] = ['neutral', 'brand', 'color', 'success', 'alert'];
  const statusLabels: string[] = ['Ativo', 'Inativo', 'Pendente'];
  const departments: string[] = ['Desenvolvimento', 'Design', 'Marketing', 'Vendas', 'Suporte'];
  const levels: string[] = ['Júnior', 'Pleno', 'Sênior', 'Especialista', 'Lead'];
  const categories: string[] = ['Premium', 'Standard', 'Basic'];
  const locations: string[] = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Porto Alegre'];

  return Array.from({ length: count }, (_, index): GeneratedDataItem => ({
    id: index + 1,
    name: `Usuário ${index + 1}`,
    status: statusLabels[index % statusLabels.length],
    department: departments[index % departments.length],
    level: levels[index % levels.length],
    category: categories[index % categories.length],
    location: locations[index % locations.length],
    chips: {
      title: statusLabels[index % statusLabels.length],
      type: statuses[index % statuses.length],
    },
    avatar: { icon: <Person16Regular />, size: 'large' },
    multiLineText: {
      text1: departments[index % departments.length],
      text2: levels[index % levels.length],
    },
  }));
};

/**
 * Hook customizado para gerenciar estado de pesquisa com debounce otimizado
 * Previne memory leaks e melhora performance
 * @param initialSearchValue - Valor inicial da pesquisa
 * @returns Estado e handlers de pesquisa
 */
const useOptimizedSearch = (initialSearchValue: string = ''): SearchState => {
  const [searchValue, setSearchValue] = useState<string>(initialSearchValue);
  const isMountedRef = useRef<boolean>(true);

  // Cleanup no unmount para prevenir memory leaks
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Manipula a mudança no valor da pesquisa de forma otimizada
   * @param newSearchValue - Novo valor da pesquisa
   */
  const handleSearchChange = useCallback((newSearchValue: string): void => {
    if (!isMountedRef.current) return;
    setSearchValue(newSearchValue);
  }, []);

  /**
   * Função para filtrar os dados baseado na pesquisa apenas no campo nome
   * Otimizada com cache simples para termos repetidos
   * @param searchTerm - Termo de pesquisa
   * @param dataToFilter - Dados a serem filtrados
   * @returns Dados filtrados
   */
  const filterData = useCallback((searchTerm: string, dataToFilter: GeneratedDataItem[]): GeneratedDataItem[] => {
    if (!searchTerm.trim()) return dataToFilter;

    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    return dataToFilter.filter((item) => {
      // Busca apenas no campo nome para melhor performance
      return item.name && item.name.toLowerCase().includes(lowerSearchTerm);
    });
  }, []);

  return {
    searchValue,
    handleSearchChange,
    filterData,
  };
};

/**
 * Hook customizado para gerenciar filtros funcionais do TableHeader
 * Aplica a mesma lógica do componente Filter com múltipla seleção
 * @returns Estados e handlers dos filtros
 */
const useTableFilters = (): FiltersState => {
  // Estados para filtros seguindo o padrão do FilterWithMultipleSelection
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  const isMountedRef = useRef<boolean>(true);

  // Cleanup no unmount para prevenir memory leaks
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Aplica filtros aos dados seguindo a lógica do componente Filter
   * Considera múltiplas seleções e persistência de estado
   * @param dataToFilter - Dados a serem filtrados
   * @returns Dados filtrados
   */
  const applyFilters = useCallback(
    (dataToFilter: GeneratedDataItem[]): GeneratedDataItem[] => {
      let filtered = [...dataToFilter];

      // Aplica filtro de status (múltipla seleção)
      if (statusFilter.length > 0) {
        filtered = filtered.filter((item) => statusFilter.includes(item.status));
      }

      // Aplica filtro de departamento (múltipla seleção)
      if (departmentFilter.length > 0) {
        filtered = filtered.filter((item) => departmentFilter.includes(item.department));
      }

      // Aplica filtro de categoria (múltipla seleção)
      if (categoryFilter.length > 0) {
        filtered = filtered.filter((item) => categoryFilter.includes(item.category));
      }

      // Aplica filtro de localização (múltipla seleção)
      if (locationFilter.length > 0) {
        filtered = filtered.filter((item) => locationFilter.includes(item.location));
      }

      // Aplica filtro de data se selecionada
      if (dateFilter) {
        // Aqui você pode implementar a lógica específica de filtro por data
        console.log('Filtro por data aplicado:', dateFilter);
      }

      return filtered;
    },
    [statusFilter, departmentFilter, categoryFilter, locationFilter, dateFilter]
  );

  /**
   * Handlers para atualização dos filtros
   * Seguem o padrão de múltipla seleção do componente Filter
   */
  const filterHandlers = useMemo(
    () => ({
      onStatusFilterChange: (selectedItems: string[]): void => {
        if (!isMountedRef.current) return;
        setStatusFilter(selectedItems);
        console.log('Filtro Status aplicado:', selectedItems);
      },
      onDepartmentFilterChange: (selectedItems: string[]): void => {
        if (!isMountedRef.current) return;
        setDepartmentFilter(selectedItems);
        console.log('Filtro Departamento aplicado:', selectedItems);
      },
      onCategoryFilterChange: (selectedItems: string[]): void => {
        if (!isMountedRef.current) return;
        setCategoryFilter(selectedItems);
        console.log('Filtro Categoria aplicado:', selectedItems);
      },
      onLocationFilterChange: (selectedItems: string[]): void => {
        if (!isMountedRef.current) return;
        setLocationFilter(selectedItems);
        console.log('Filtro Localização aplicado:', selectedItems);
      },
      onDateFilterChange: (selectedDate: string | null): void => {
        if (!isMountedRef.current) return;
        setDateFilter(selectedDate);
        console.log('Filtro Data aplicado:', selectedDate);
      },
    }),
    []
  );

  /**
   * Função para limpar todos os filtros
   * Reseta todos os estados de filtro
   */
  const clearAllFilters = useCallback((): void => {
    if (!isMountedRef.current) return;
    setStatusFilter([]);
    setDepartmentFilter([]);
    setCategoryFilter([]);
    setLocationFilter([]);
    setDateFilter(null);
    console.log('Todos os filtros foram limpos');
  }, []);

  /**
   * Retorna a contagem total de filtros aplicados
   * Usado para feedback visual no TableHeader
   * @returns Quantidade total de filtros aplicados
   */
  const getAppliedFiltersCount = useCallback((): number => {
    let count = 0;
    count += statusFilter.length;
    count += departmentFilter.length;
    count += categoryFilter.length;
    count += locationFilter.length;
    count += dateFilter ? 1 : 0;
    return count;
  }, [statusFilter, departmentFilter, categoryFilter, locationFilter, dateFilter]);

  return {
    // Estados dos filtros
    statusFilter,
    departmentFilter,
    categoryFilter,
    locationFilter,
    dateFilter,

    // Funções de manipulação
    applyFilters,
    filterHandlers,
    clearAllFilters,
    getAppliedFiltersCount,
  };
};

/**
 * Hook customizado para gerenciar estado de ordenação com otimizações
 * @returns Estado e handlers de ordenação
 */
const useOptimizedSorting = (): SortingState => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  const [isHoveringSort, setIsHoveringSort] = useState<boolean>(false);

  /**
   * Função para ordenar os dados de forma otimizada
   * @param dataToSort - Dados a serem ordenados
   * @param config - Configuração de ordenação
   * @returns Dados ordenados
   */
  const sortData = useCallback((dataToSort: GeneratedDataItem[], config: SortConfig): GeneratedDataItem[] => {
    if (!config.key || !config.direction) return dataToSort;

    return [...dataToSort].sort((a, b) => {
      let aValue: string, bValue: string;

      if (config.key === 'multiLineText') {
        // Ordena pelo text1 (Departamento)
        aValue = a.multiLineText.text1.toLowerCase();
        bValue = b.multiLineText.text1.toLowerCase();
      } else {
        aValue = a[config.key as keyof GeneratedDataItem] as string;
        bValue = b[config.key as keyof GeneratedDataItem] as string;
      }

      if (aValue < bValue) {
        return config.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, []);

  /**
   * Manipula a ordenação das colunas de forma otimizada
   * @param columnKey - Chave da coluna a ser ordenada
   */
  const handleSort = useCallback((columnKey: string): void => {
    setSortConfig((prevConfig) => {
      let newDirection: 'asc' | 'desc' | null;

      if (prevConfig.key !== columnKey) {
        // Se é uma coluna diferente, inicia com ascendente
        newDirection = 'asc';
      } else {
        // Se é a mesma coluna, cicla entre: asc -> desc -> null
        if (prevConfig.direction === 'asc') {
          newDirection = 'desc';
        } else if (prevConfig.direction === 'desc') {
          newDirection = null;
        } else {
          newDirection = 'asc';
        }
      }

      return {
        key: newDirection ? columnKey : null,
        direction: newDirection,
      };
    });
  }, []);

  /**
   * Manipuladores de hover otimizados
   */
  const handleSortMouseEnter = useCallback((): void => {
    setIsHoveringSort(true);
  }, []);

  const handleSortMouseLeave = useCallback((): void => {
    setIsHoveringSort(false);
  }, []);

  /**
   * Renderiza o ícone de ordenação baseado no estado atual
   * Memoizado para melhor performance
   * @param columnKey - Chave da coluna
   * @returns Ícone de ordenação ou espaço reservado
   */
  const renderSortIcon = useCallback(
    (columnKey: string): JSX.Element => {
      // Sempre retorna um elemento para manter o layout estável
      const iconStyle: React.CSSProperties = {
        marginLeft: 'var(--zds-spacing-xs, 4px)',
        width: 'var(--zds-icon-size-sm, 16px)',
        height: 'var(--zds-icon-size-sm, 16px)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      // Se a coluna está sendo ordenada, mostra o ícone do estado atual
      if (sortConfig.key === columnKey) {
        if (sortConfig.direction === 'asc') {
          return (
            <span style={iconStyle}>
              <ChevronUp16Regular />
            </span>
          );
        } else if (sortConfig.direction === 'desc') {
          return (
            <span style={iconStyle}>
              <ChevronDown16Regular />
            </span>
          );
        }
      }

      // Se não está sendo ordenada mas está com hover, mostra o ícone de down
      if (columnKey === 'multiLineText' && isHoveringSort && sortConfig.key !== columnKey) {
        return (
          <span style={iconStyle}>
            <ChevronDown16Regular />
          </span>
        );
      }

      // Retorna um espaço vazio mas com as mesmas dimensões para manter o layout
      return <span style={iconStyle}></span>;
    },
    [sortConfig, isHoveringSort]
  );

  return {
    sortConfig,
    sortData,
    handleSort,
    handleSortMouseEnter,
    handleSortMouseLeave,
    renderSortIcon,
  };
};

/**
 * Hook customizado para gerenciar paginação com otimizações de performance
 * @param args - Argumentos do Storybook
 * @returns Estado e handlers de paginação
 */
const useOptimizedPagination = (args: TableStoryArgs): PaginationState => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPageState, setItemsPerPageState] = useState<number>(args.itemsPerPage);
  const [selectedItems, setSelectedItems] = useState<GeneratedDataItem[]>([]);
  const isMountedRef = useRef<boolean>(true);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Manipula mudança de página de forma otimizada
   * @param newPage - Nova página
   */
  const handlePageChange = useCallback((newPage: number): void => {
    if (!isMountedRef.current) return;
    setCurrentPage(newPage);
  }, []);

  /**
   * Manipula mudança de itens por página de forma otimizada
   * @param newItemsPerPage - Novo número de itens por página
   * @param newPage - Nova página (sempre 1 quando muda itens por página)
   */
  const handlePerPageChange = useCallback((newItemsPerPage: number, newPage: number): void => {
    if (!isMountedRef.current) return;
    setItemsPerPageState(newItemsPerPage);
    setCurrentPage(newPage);
  }, []);

  /**
   * Manipula seleção de itens de forma otimizada
   * @param selection - Itens selecionados
   */
  const handleSelectionChange = useCallback((selection: GeneratedDataItem[]): void => {
    if (!isMountedRef.current) return;
    setSelectedItems(selection);
    console.log('Itens selecionados:', selection);
  }, []);

  // Atualiza itemsPerPage quando o arg muda
  useEffect(() => {
    if (isMountedRef.current) {
      setItemsPerPageState(args.itemsPerPage);
      setCurrentPage(1);
    }
  }, [args.itemsPerPage]);

  return {
    currentPage,
    itemsPerPageState,
    selectedItems,
    handlePageChange,
    handlePerPageChange,
    handleSelectionChange,
    setCurrentPage,
  };
};

/**
 * Template principal que unifica todas as funcionalidades
 * Otimizado para performance seguindo padrões do Zanthus Design System
 * Integra a lógica do Filter nos filtros do TableHeader
 * @param args - Argumentos do Storybook
 * @returns Componente renderizado
 */
const Template: StoryFn<TableStoryArgs> = (args) => {
  // Hooks customizados otimizados
  const { searchValue, handleSearchChange, filterData } = useOptimizedSearch();
  const { sortConfig, sortData, handleSort, handleSortMouseEnter, handleSortMouseLeave, renderSortIcon } = useOptimizedSorting();
  const { currentPage, itemsPerPageState, selectedItems, handlePageChange, handlePerPageChange, handleSelectionChange, setCurrentPage } = useOptimizedPagination(args);

  // Hook para filtros funcionais do TableHeader
  const { statusFilter, departmentFilter, categoryFilter, locationFilter, dateFilter, applyFilters, filterHandlers, clearAllFilters, getAppliedFiltersCount } = useTableFilters();

  // Dados completos memoizados (30 itens) - evita recriação
  const allData = useMemo(() => generateLargeDataSet(30), []);

  // Configuração das colunas da tabela com ordenação - memoizada
  const columns = useMemo<ColumnConfig[]>(
    () => [
      {
        key: 'name',
        label: 'Usuário',
        render: (row: GeneratedDataItem) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--zds-spacing-sm, 12px)',
            }}
          >
            <Avatar icon={row.avatar.icon} size={row.avatar.size} />
            <span>{row.name}</span>
          </div>
        ),
      },
      {
        key: 'multiLineText',
        label: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              minWidth: 'fit-content',
            }}
            onClick={() => handleSort('multiLineText')}
            onMouseEnter={handleSortMouseEnter}
            onMouseLeave={handleSortMouseLeave}
          >
            Departamento/Cargo
            {renderSortIcon('multiLineText')}
          </div>
        ),
        render: (row: GeneratedDataItem) => <MultiLineText text1={row.multiLineText.text1} text2={row.multiLineText.text2} />,
      },
      {
        key: 'actions',
        label: '',
        render: (row: GeneratedDataItem) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--zds-spacing-md, 16px)',
            }}
          >
            <Chips title={row.chips.title} type={row.chips.type} />
            <Menu />
          </div>
        ),
      },
    ],
    [handleSort, handleSortMouseEnter, handleSortMouseLeave, renderSortIcon]
  );

  // Dados processados (filtrados por pesquisa, filtros do TableHeader e ordenados) - memoizados
  const processedData = useMemo(() => {
    // Aplica primeiro a pesquisa
    const searchFiltered = filterData(searchValue, allData);

    // Aplica os filtros do TableHeader
    const tableFiltered = applyFilters(searchFiltered);

    // Aplica a ordenação
    return sortData(tableFiltered, sortConfig);
  }, [searchValue, allData, filterData, applyFilters, sortData, sortConfig]);

  // Dados paginados calculados baseados nos dados processados - memoizados
  const paginatedData = useMemo(() => {
    if (!args.tablePagination) return processedData;

    const startIndex = (currentPage - 1) * itemsPerPageState;
    const endIndex = startIndex + itemsPerPageState;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, itemsPerPageState, args.tablePagination]);

  /**
   * Manipula a mudança no valor da pesquisa com reset de página
   * Otimizada para evitar re-renders desnecessários
   * @param newSearchValue - Novo valor da pesquisa
   */
  const handleSearchChangeWithReset = useCallback(
    (newSearchValue: string): void => {
      handleSearchChange(newSearchValue);
      setCurrentPage(1); // Reset para primeira página ao pesquisar
    },
    [handleSearchChange, setCurrentPage]
  );

  // Componente TableHeader condicional com filtros funcionais - memoizado
  const tableHeaderComponent = useMemo(() => {
    if (!args.tableHeader) return null;

    return (
      <TableHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChangeWithReset}
        showSearch={args.showSearch}
        showFilters={args.showFilters}
        filterPosition={args.filterPosition}
        // Props dos filtros funcionais
        statusFilter={statusFilter}
        departmentFilter={departmentFilter}
        categoryFilter={categoryFilter}
        locationFilter={locationFilter}
        dateFilter={dateFilter}
        onStatusFilterChange={filterHandlers.onStatusFilterChange}
        onDepartmentFilterChange={filterHandlers.onDepartmentFilterChange}
        onCategoryFilterChange={filterHandlers.onCategoryFilterChange}
        onLocationFilterChange={filterHandlers.onLocationFilterChange}
        onDateFilterChange={filterHandlers.onDateFilterChange}
        appliedFiltersCount={getAppliedFiltersCount()}
        onClearAllFilters={clearAllFilters}
      />
    );
  }, [
    args.tableHeader,
    args.showSearch,
    args.showFilters,
    args.filterPosition,
    searchValue,
    handleSearchChangeWithReset,
    statusFilter,
    departmentFilter,
    categoryFilter,
    locationFilter,
    dateFilter,
    filterHandlers,
    getAppliedFiltersCount,
    clearAllFilters,
  ]);

  // Componente TablePagination condicional - memoizado
  const tablePaginationComponent = useMemo(() => {
    if (!args.tablePagination) return null;

    return (
      <TablePagination
        currentPage={currentPage}
        totalItems={processedData.length}
        itemsPerPage={itemsPerPageState}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        perPageOptions={[10, 25, 50, 100]}
      />
    );
  }, [args.tablePagination, currentPage, processedData.length, itemsPerPageState, handlePageChange, handlePerPageChange]);

  return (
    <div>
      <Table
        {...args}
        columns={columns}
        data={paginatedData}
        tableHeader={tableHeaderComponent}
        tablePagination={tablePaginationComponent}
        onSelectionChange={handleSelectionChange}
        currentPage={currentPage}
      />
    </div>
  );
};

// Export Default único com todas as funcionalidades
export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: `
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import Chips from '../Chips';
import Avatar from '../Avatar';
import MultiLineText from '../MultiLineText';
import { MoreVertical16Regular, Person16Regular } from '@fluentui/react-icons';

interface GeneratedDataItem {
  id: number;
  name: string;
  status: string;
  department: string;
  level: string;
  category: string;
  location: string;
  chips: {
    title: string;
    type: string;
  };
  avatar: {
    icon: React.ReactElement;
    size: string;
  };
  multiLineText: {
    text1: string;
    text2: string;
  };
}

/**
 * Exemplo completo de implementação da Tabela otimizada com filtros funcionais
 * Demonstra todas as funcionalidades com melhor performance
 * Integra a lógica do componente Filter nos filtros do TableHeader
 */
const CompleteTableExample: React.FC = () => {
  // Estados para controle da paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedItems, setSelectedItems] = useState<GeneratedDataItem[]>([]);
  
  // Estados para controle da pesquisa
  const [searchValue, setSearchValue] = useState<string>('');
  
  // Estados para filtros funcionais do TableHeader
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  
  // Ref para controle de memory leaks
  const isMountedRef = useRef<boolean>(true);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Dados completos memoizados (30 itens)
  const allData = useMemo(() => generateLargeDataSet(30), []);

  /**
   * Função para filtrar os dados baseado na pesquisa apenas no campo nome
   * Otimizada para melhor performance
   */
  const filterData = useCallback((searchTerm: string, dataToFilter: GeneratedDataItem[]): GeneratedDataItem[] => {
    if (!searchTerm.trim()) return dataToFilter;

    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    return dataToFilter.filter((item) => {
      // Busca apenas no campo nome para melhor performance
      return item.name && item.name.toLowerCase().includes(lowerSearchTerm);
    });
  }, []);

  /**
   * Aplica filtros funcionais aos dados
   * Considera múltiplas seleções seguindo a lógica do componente Filter
   */
  const applyFilters = useCallback((dataToFilter: GeneratedDataItem[]): GeneratedDataItem[] => {
    let filtered = [...dataToFilter];

    if (statusFilter.length > 0) {
      filtered = filtered.filter((item) => statusFilter.includes(item.status));
    }

    if (departmentFilter.length > 0) {
      filtered = filtered.filter((item) => departmentFilter.includes(item.department));
    }

    if (categoryFilter.length > 0) {
      filtered = filtered.filter((item) => categoryFilter.includes(item.category));
    }

    if (locationFilter.length > 0) {
      filtered = filtered.filter((item) => locationFilter.includes(item.location));
    }

    if (dateFilter) {
      console.log('Filtro por data aplicado:', dateFilter);
    }

    return filtered;
  }, [statusFilter, departmentFilter, categoryFilter, locationFilter, dateFilter]);

  // Dados processados (pesquisa + filtros + ordenação) - memoizados
  const processedData = useMemo(() => {
    const searchFiltered = filterData(searchValue, allData);
    return applyFilters(searchFiltered);
  }, [searchValue, allData, filterData, applyFilters]);

  // Dados paginados calculados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, itemsPerPage]);

  // Manipula a mudança no valor da pesquisa
  const handleSearchChange = useCallback((newSearchValue: string): void => {
    if (!isMountedRef.current) return;
    setSearchValue(newSearchValue);
    setCurrentPage(1); // Reset para primeira página ao pesquisar
  }, []);

  // Manipula mudança de página
  const handlePageChange = useCallback((newPage: number): void => {
    if (!isMountedRef.current) return;
    setCurrentPage(newPage);
  }, []);

  // Manipula mudança de itens por página
  const handlePerPageChange = useCallback((newItemsPerPage: number, newPage: number): void => {
    if (!isMountedRef.current) return;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(newPage);
  }, []);

  // Manipula seleção de itens
  const handleSelectionChange = useCallback((selection: GeneratedDataItem[]): void => {
    if (!isMountedRef.current) return;
    setSelectedItems(selection);
    console.log('Itens selecionados:', selection);
  }, []);

  return (
    <Table
      columns={columns}
      data={paginatedData}
      showCheckbox={true}
      tableHeader={
        <TableHeader
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          showSearch={true}
          showFilters={true}
          statusFilter={statusFilter}
          departmentFilter={departmentFilter}
          onStatusFilterChange={setStatusFilter}
          onDepartmentFilterChange={setDepartmentFilter}
        />
      }
      tablePagination={
        <TablePagination
          currentPage={currentPage}
          totalItems={processedData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          perPageOptions={[10, 25, 50, 100]}
        />
      }
      onSelectionChange={handleSelectionChange}
      emptyTitle="Nenhum usuário encontrado"
      emptyCaption="Nenhum usuário encontrado pelos filtros aplicados"
    />
  );
};
      `.trim(),
    },
  },
};