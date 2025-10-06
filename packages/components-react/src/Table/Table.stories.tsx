import React, { useState, useCallback, useMemo } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Table from './Table';
import TableHeader, { FilterItem } from './TableHeader';
import TablePagination from './TablePagination';
import Chips from '../Chips';
import Button from '../Button';
import Menu, { MenuItem } from '../Menu/Menu';
import { MoreVertical16Regular, Edit16Regular, Eye16Regular, Delete16Regular } from '@fluentui/react-icons';
import Drawer from '../Drawer';

// ✅ ADICIONAR: Interface para props das stories
interface TableStoryProps {
  showHeader?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  showSelection?: boolean;
  itemsPerPage?: number;
  loading?: boolean;
}

const meta: Meta<typeof TableStoryProps> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    // ✅ Props da tabela
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento da tabela'
    },
    // ✅ NOVOS: Controls para header e pagination
    showHeader: {
      control: 'boolean',
      description: 'Exibir cabeçalho com busca e filtros',
      defaultValue: true
    },
    showSearch: {
      control: 'boolean',
      description: 'Exibir campo de busca no header',
      defaultValue: true
    },
    showFilters: {
      control: 'boolean',
      description: 'Exibir filtros no header',
      defaultValue: true
    },
    showPagination: {
      control: 'boolean',
      description: 'Exibir paginação abaixo da tabela',
      defaultValue: true
    },
    showSelection: {
      control: 'boolean',
      description: 'Habilitar seleção de linhas',
      defaultValue: false
    },
    itemsPerPage: {
      control: { type: 'select' },
      options: [5, 10, 15, 20, 25],
      description: 'Itens por página inicial',
      defaultValue: 10
    }
  },
};

export default meta;

const promotionData = [
  {
    id: 1,
    code: 'PROMO001',
    name: 'Black Friday 2024',
    description: 'Desconto especial para Black Friday',
    type: 'Desconto',
    startDate: '24/11/2024',
    endDate: '30/11/2024',
    status: 'Ativa',
    startDateObj: new Date(2024, 10, 24),
    endDateObj: new Date(2024, 10, 30)
  },
  {
    id: 2,
    code: 'PROMO002',
    name: 'Frete Grátis Natal',
    description: 'Frete grátis para compras acima de R$ 100',
    type: 'Frete Grátis',
    startDate: '01/12/2024',
    endDate: '25/12/2024',
    status: 'Agendada',
    startDateObj: new Date(2024, 11, 1),
    endDateObj: new Date(2024, 11, 25)
  },
  {
    id: 3,
    code: 'PROMO003',
    name: 'Desconto Cliente VIP',
    description: '15% de desconto para clientes VIP',
    type: 'Desconto',
    startDate: '01/11/2024',
    endDate: '31/12/2024',
    status: 'Ativa',
    startDateObj: new Date(2024, 10, 1),
    endDateObj: new Date(2024, 11, 31)
  },
  {
    id: 4,
    code: 'PROMO004',
    name: 'Liquidação Verão',
    description: 'Liquidação de produtos de verão',
    type: 'Desconto',
    startDate: '15/01/2024',
    endDate: '28/02/2024',
    status: 'Expirada',
    startDateObj: new Date(2024, 0, 15),
    endDateObj: new Date(2024, 1, 28)
  },
  {
    id: 5,
    code: 'PROMO005',
    name: 'Cashback Especial',
    description: '10% de cashback em compras',
    type: 'Cashback',
    startDate: '01/10/2024',
    endDate: '31/10/2024',
    status: 'Inativa',
    startDateObj: new Date(2024, 9, 1),
    endDateObj: new Date(2024, 9, 31)
  },
  {
    id: 6,
    code: 'PROMO006',
    name: 'Cupom Primeira Compra',
    description: 'Desconto para novos clientes',
    type: 'Desconto',
    startDate: '01/01/2024',
    endDate: '31/12/2024',
    status: 'Ativa',
    startDateObj: new Date(2024, 0, 1),
    endDateObj: new Date(2024, 11, 31)
  },
  {
    id: 7,
    code: 'PROMO007',
    name: 'Frete Grátis Express',
    description: 'Entrega rápida sem custo',
    type: 'Frete Grátis',
    startDate: '15/11/2024',
    endDate: '15/12/2024',
    status: 'Agendada',
    startDateObj: new Date(2024, 10, 15),
    endDateObj: new Date(2024, 11, 15)
  },
  {
    id: 8,
    code: 'PROMO008',
    name: 'Combo Produtos',
    description: 'Desconto na compra de 2 ou mais produtos',
    type: 'Combo',
    startDate: '01/12/2024',
    endDate: '31/01/2025',
    status: 'Agendada',
    startDateObj: new Date(2024, 11, 1),
    endDateObj: new Date(2025, 0, 31)
  }
];

// Colunas básicas para stories simples (sem ações)
const basicColumns = [
  { key: 'code', label: 'Código' },
  { key: 'name', label: 'Nome' },
  { key: 'description', label: 'Descrição' },
  { key: 'type', label: 'Tipo' },
  { key: 'startDate', label: 'Data Início' },
  { key: 'endDate', label: 'Data Fim' },
  {
    key: 'status',
    label: 'Status',
    render: (row: any) => (
      <Chips
        title={row.status}
        label={row.status}
        type={
          row.status === 'Ativa' ? 'success' :
            row.status === 'Inativa' ? 'alert' :
              row.status === 'Agendada' ? 'brand' :
                'neutral'
        }
      />
    ),
  },
  {
    key: 'actions',
    label: '',
    render: (row: any) => (
      <Menu
        position='right'
        menuItems={[
          { id: 'edit', text: 'Editar' },
          { id: 'duplicate', text: 'Duplicar' },
          { id: 'pause', text: row.status === 'Ativa' ? 'Pausar' : 'Ativar' },
          { id: 'delete', text: 'Excluir' },
        ]}
        onMenuItemClick={(item: any) => {
          console.log(`${item.text} promoção:`, row.name);
        }}
      >
        <MoreVertical16Regular style={{ cursor: 'pointer' }} />
      </Menu>
    ),
  },
];

// ✅ STORY DEFAULT - Configurável via Controls
export const Default: StoryFn = ({
  showHeader = true,
  showSearch = true,
  showFilters = true,
  showPagination = true,
  showSelection = false,
  itemsPerPage: initialItemsPerPage = 10,
  loading = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);

  // ✅ ATUALIZAR: itemsPerPage quando prop muda
  React.useEffect(() => {
    setItemsPerPage(initialItemsPerPage);
    setCurrentPage(1);
  }, [initialItemsPerPage]);

  // ✅ LIMPAR: Filtros quando showFilters é desabilitado
  React.useEffect(() => {
    if (!showFilters) {
      setSelectedStatus([]);
      setSelectedTypes([]);
      setStartDateFilter(null);
      setEndDateFilter(null);
    }
  }, [showFilters]);

  // ✅ LIMPAR: Busca quando showSearch é desabilitado
  React.useEffect(() => {
    if (!showSearch) {
      setSearchValue('');
    }
  }, [showSearch]);

  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    setSelectedStatus([]);
    setSelectedTypes([]);
    setStartDateFilter(null);
    setEndDateFilter(null);
    setSearchValue('');
  };

  // Contador de filtros ativos
  const activeFiltersCount = selectedStatus.length + selectedTypes.length +
    (startDateFilter ? 1 : 0) + (endDateFilter ? 1 : 0);

  // Colunas memoizadas
  const memoizedColumns = useMemo(() => [
    {
      key: 'code',
      label: 'Cód.',
      render: (row: any) => (
        <span style={{ fontWeight: 500, fontFamily: 'monospace' }}>{row.code}</span>
      ),
    },
    {
      key: 'name',
      label: 'Nome da promoção',
      render: (row: any) => (
        <div>
          <div style={{ fontWeight: 500 }}>{row.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{row.description}</div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Tipo',
      render: (row: any) => (
        <Chips
          title={row.type}
          type={row.type === 'Desconto' ? 'success' : row.type === 'Frete Grátis' ? 'brand' : 'neutral'}
        />
      ),
    },
    {
      key: 'startDate',
      label: 'Início',
      render: (row: any) => (
        <span>{row.startDate}</span>
      ),
    },
    {
      key: 'endDate',
      label: 'Término',
      render: (row: any) => (
        <span>{row.endDate}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: any) => (
        <Chips
          title={row.status}
          type={
            row.status === 'Ativa' ? 'success' :
              row.status === 'Inativa' ? 'alert' :
                row.status === 'Agendada' ? 'brand' :
                  'neutral'
          }
        />
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (row: any) => (
        <Menu
          position='right'
          menuItems={[
            { id: 'edit', text: 'Editar' },
            { id: 'duplicate', text: 'Duplicar' },
            { id: 'pause', text: row.status === 'Ativa' ? 'Pausar' : 'Ativar' },
            { id: 'delete', text: 'Excluir' },
          ]}
          onMenuItemClick={(item: any) => {
            console.log(`${item.text} promoção:`, row.name);
          }}
        >
          <MoreVertical16Regular style={{ cursor: 'pointer' }} />
        </Menu>
      ),
    },
  ], []);

  // Dados para filtros (somente se showFilters está ativo)
  const statusItems = [
    { id: 'ativa', text: 'Ativa' },
    { id: 'inativa', text: 'Inativa' },
    { id: 'agendada', text: 'Agendada' },
    { id: 'expirada', text: 'Expirada' }
  ];

  const typeItems = [
    { id: 'desconto', text: 'Desconto' },
    { id: 'frete-gratis', text: 'Frete Grátis' },
    { id: 'cashback', text: 'Cashback' },
    { id: 'combo', text: 'Combo' }
  ];

  // Lógica de filtragem
  let filteredData = promotionData;

  // Filtro por busca (somente se showSearch está ativo)
  if (showSearch && searchValue) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Filtros (somente se showFilters está ativo)
  if (showFilters) {
    if (selectedStatus.length > 0) {
      filteredData = filteredData.filter(item => {
        const statusMap: Record<string, string> = {
          'ativa': 'Ativa',
          'inativa': 'Inativa',
          'agendada': 'Agendada',
          'expirada': 'Expirada'
        };
        return selectedStatus.some(status => statusMap[status] === item.status);
      });
    }

    if (selectedTypes.length > 0) {
      filteredData = filteredData.filter(item => {
        const typeMap: Record<string, string> = {
          'desconto': 'Desconto',
          'frete-gratis': 'Frete Grátis',
          'cashback': 'Cashback',
          'combo': 'Combo'
        };
        return selectedTypes.some(type => typeMap[type] === item.type);
      });
    }

    if (startDateFilter) {
      filteredData = filteredData.filter(item => item.startDateObj >= startDateFilter);
    }

    if (endDateFilter) {
      filteredData = filteredData.filter(item => item.endDateObj <= endDateFilter);
    }
  }

  // Paginação
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // ✅ FILTROS: Condicionais baseados em showFilters
  const filterItems = useMemo((): FilterItem[] => {
    if (!showFilters) return [];

    return [
      {
        id: 'status-filter',
        buttonText: selectedStatus.length > 0
          ? `Status (${selectedStatus.length})`
          : 'Status',
        items: statusItems,
        type: 'checkbox',
        selectedIds: selectedStatus,
        onSelectionChange: setSelectedStatus,
        placeholder: 'Selecione status...',
        position: 'left'
      },
      {
        id: 'type-filter',
        buttonText: selectedTypes.length > 0
          ? `Tipo (${selectedTypes.length})`
          : 'Tipo',
        items: typeItems,
        type: 'checkbox',
        selectedIds: selectedTypes,
        onSelectionChange: setSelectedTypes,
        placeholder: 'Selecione tipos...',
        position: 'right'
      },
      {
        id: 'start-date-filter',
        buttonText: startDateFilter
          ? `Data Início: ${startDateFilter.toLocaleDateString('pt-BR')}`
          : 'Data Início',
        type: 'calendar',
        selectedDate: startDateFilter,
        onDateSelect: (date: Date) => {
          setStartDateFilter(date);
        },
        minDate: new Date(2024, 0, 1),
        maxDate: new Date(2025, 11, 31),
        placeholder: 'Selecione data de início...',
        position: 'right'
      },
      {
        id: 'end-date-filter',
        buttonText: endDateFilter
          ? `Data Fim: ${endDateFilter.toLocaleDateString('pt-BR')}`
          : 'Data Fim',
        type: 'calendar',
        selectedDate: endDateFilter,
        onDateSelect: (date: Date) => {
          setEndDateFilter(date);
        },
        minDate: startDateFilter || new Date(2024, 0, 1),
        maxDate: new Date(2025, 11, 31),
        placeholder: 'Selecione data de fim...',
        position: 'right'
      }
    ];
  }, [showFilters, selectedStatus, selectedTypes, startDateFilter, endDateFilter, statusItems, typeItems]);

  return (
    <div>
      {/* ✅ HEADER CONDICIONAL */}
      {showHeader && (
        <TableHeader
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Buscar promoções..."
          showSearch={showSearch}
          showFilters={showFilters}
          filterItems={filterItems}
        />
      )}

      {/* ✅ INDICADOR DE FILTROS ATIVOS (somente se showHeader e showFilters) */}
      {showHeader && showFilters && activeFiltersCount > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-12)',
          marginBottom: 'var(--spacing-16)',
          padding: 'var(--spacing-8) var(--spacing-12)',
          backgroundColor: 'var(--color-neutral-50)',
          borderRadius: 'var(--border-radius-8)',
          fontSize: 'var(--font-size-14)'
        }}>
          <span style={{ fontWeight: 500 }}>
            {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} ativo{activeFiltersCount > 1 ? 's' : ''}
          </span>
          <Button
            text="Limpar filtros"
            variant="text"
            size="small"
            onClick={clearAllFilters}
            style={{ fontSize: 'var(--font-size-12)' }}
          />
        </div>
      )}

      {/* ✅ TABELA */}
      <Table
        columns={memoizedColumns}
        dataSource={loading ? [] : paginatedData}
        loading={loading}
        rowSelection={showSelection ? {
          selectedRowKeys: selectedKeys,
          onChange: setSelectedKeys,
        } : undefined}
      />

      {/* ✅ PAGINAÇÃO CONDICIONAL */}
      {showPagination && !loading && totalItems > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          pageSizeOptions={[5, 10, 15, 20]}
        />
      )}
    </div>
  );
};
Default.args ={
  showHeader: true,
  showSearch: true,
  showFilters: true,
  showPagination: true,
  showSelection: false,
  itemsPerPage: 10,
  loading: false
}

// ✅ STORY BÁSICA - Apenas a tabela
export const Basic: StoryFn = () => (

  <Table
    columns={basicColumns}
    dataSource={promotionData.slice(0, 5)}
  />

);

// ✅ STORY LOADING - Estado de carregamento
export const Loading: StoryFn = () => (
  <div style={{ padding: '20px' }}>
    <Table
      columns={basicColumns}
      dataSource={[]}
      loading={true}
    />
  </div>
);

// ✅ STORY CALENDAR FILTERS - Demonstração dos filtros de calendário
export const CalendarFilters: StoryFn = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Handler para mudança de itens por página
  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset para primeira página
  }, []);

  // Lógica de filtragem (mesmo código da story Default)
  let filteredData = promotionData;

  if (searchValue) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (selectedStatus.length > 0) {
    filteredData = filteredData.filter(item => {
      const statusMap: Record<string, string> = {
        'ativa': 'Ativa',
        'inativa': 'Inativa',
        'agendada': 'Agendada',
        'expirada': 'Expirada'
      };
      return selectedStatus.some(status => statusMap[status] === item.status);
    });
  }

  if (selectedTypes.length > 0) {
    filteredData = filteredData.filter(item => {
      const typeMap: Record<string, string> = {
        'desconto': 'Desconto',
        'frete-gratis': 'Frete Grátis',
        'cashback': 'Cashback',
        'combo': 'Combo'
      };
      return selectedTypes.some(type => typeMap[type] === item.type);
    });
  }

  if (startDateFilter) {
    filteredData = filteredData.filter(item => {
      return item.startDateObj >= startDateFilter;
    });
  }

  if (endDateFilter) {
    filteredData = filteredData.filter(item => {
      return item.endDateObj <= endDateFilter;
    });
  }

  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const clearAllFilters = () => {
    setSelectedStatus([]);
    setSelectedTypes([]);
    setStartDateFilter(null);
    setEndDateFilter(null);
    setSearchValue('');
  };

  const activeFiltersCount = selectedStatus.length + selectedTypes.length +
    (startDateFilter ? 1 : 0) + (endDateFilter ? 1 : 0);

  // ✅ FILTROS: Tipagem segura para CalendarFilters
  const filterItems: FilterItem[] = useMemo(() => [
    {
      id: 'status-filter',
      buttonText: selectedStatus.length > 0
        ? `Status (${selectedStatus.length})`
        : 'Status',
      items: [
        { id: 'ativa', text: 'Ativa' },
        { id: 'inativa', text: 'Inativa' },
        { id: 'agendada', text: 'Agendada' },
        { id: 'expirada', text: 'Expirada' }
      ],
      type: 'checkbox',
      selectedIds: selectedStatus,
      onSelectionChange: setSelectedStatus,
      placeholder: 'Selecione status...',
      position: 'left'
    },
    {
      id: 'type-filter',
      buttonText: selectedTypes.length > 0
        ? `Tipo (${selectedTypes.length})`
        : 'Tipo',
      items: [
        { id: 'desconto', text: 'Desconto' },
        { id: 'frete-gratis', text: 'Frete Grátis' },
        { id: 'cashback', text: 'Cashback' },
        { id: 'combo', text: 'Combo' }
      ],
      type: 'checkbox',
      selectedIds: selectedTypes,
      onSelectionChange: setSelectedTypes,
      placeholder: 'Selecione tipos...',
      position: 'left'
    },
    {
      id: 'start-date-filter',
      buttonText: startDateFilter
        ? `Data Início: ${startDateFilter.toLocaleDateString('pt-BR')}`
        : 'Data Início',
      type: 'calendar',
      selectedDate: startDateFilter,
      onDateSelect: (date: Date) => {
        console.log('CalendarFilters - Data início selecionada:', date);
        setStartDateFilter(date);
      },
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2025, 11, 31),
      placeholder: 'Filtrar promoções que começam a partir desta data...',
      position: 'left'
    },
    {
      id: 'end-date-filter',
      buttonText: endDateFilter
        ? `Data Fim: ${endDateFilter.toLocaleDateString('pt-BR')}`
        : 'Data Fim',
      type: 'calendar',
      selectedDate: endDateFilter,
      onDateSelect: (date: Date) => {
        console.log('CalendarFilters - Data fim selecionada:', date);
        setEndDateFilter(date);
      },
      minDate: startDateFilter || new Date(2024, 0, 1),
      maxDate: new Date(2025, 11, 31),
      placeholder: 'Filtrar promoções que terminam até esta data...',
      position: 'left'
    }
  ], [selectedStatus, selectedTypes, startDateFilter, endDateFilter]);

  return (
    <div style={{ padding: '20px', minHeight: '600px' }}>
      <h3 style={{ marginBottom: 'var(--spacing-16)' }}>
        Filtros de Calendário - Demonstração
      </h3>

      {/* Header com filtros incluindo calendário */}
      <TableHeader
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Buscar promoções..."
        showSearch={true}
        showFilters={true}
        filterItems={filterItems}
      />

      {/* Indicador de filtros ativos */}
      {activeFiltersCount > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-12)',
          marginBottom: 'var(--spacing-16)',
          padding: 'var(--spacing-8) var(--spacing-12)',
          backgroundColor: 'var(--color-neutral-50)',
          borderRadius: 'var(--border-radius-8)',
          fontSize: 'var(--font-size-14)'
        }}>
          <span style={{ fontWeight: 500 }}>
            {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} ativo{activeFiltersCount > 1 ? 's' : ''}
          </span>
          <Button
            text="Limpar filtros"
            variant="text"
            size="small"
            onClick={clearAllFilters}
            style={{ fontSize: 'var(--font-size-12)' }}
          />
        </div>
      )}

      {/* Informações sobre os filtros de data */}
      {(startDateFilter || endDateFilter) && (
        <div style={{
          marginBottom: 'var(--spacing-16)',
          padding: 'var(--spacing-12)',
          backgroundColor: 'var(--color-brand-50)',
          borderRadius: 'var(--border-radius-8)',
          fontSize: 'var(--font-size-14)'
        }}>
          <strong>Filtros de data ativos:</strong>
          <ul style={{ margin: 'var(--spacing-4) 0 0 var(--spacing-16)' }}>
            {startDateFilter && (
              <li>Promoções que iniciam a partir de: <strong>{startDateFilter.toLocaleDateString('pt-BR')}</strong></li>
            )}
            {endDateFilter && (
              <li>Promoções que terminam até: <strong>{endDateFilter.toLocaleDateString('pt-BR')}</strong></li>
            )}
          </ul>
        </div>
      )}

      {/* Tabela */}
      <Table
        columns={basicColumns}
        dataSource={paginatedData}
      />

      {/* Paginação */}
      {totalItems > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          pageSizeOptions={[5, 10, 15]}
        />
      )}

      {/* Estatísticas */}
      <div style={{
        marginTop: 'var(--spacing-16)',
        padding: 'var(--spacing-12)',
        backgroundColor: 'var(--color-neutral-50)',
        borderRadius: 'var(--border-radius-8)',
        fontSize: 'var(--font-size-14)'
      }}>
        <strong>Resultados:</strong> {filteredData.length} de {promotionData.length} promoções
      </div>
    </div>
  );
};

/*
✅ IMPLEMENTAÇÃO DOS FILTROS DE CALENDÁRIO - DOCUMENTAÇÃO

1. ESTRUTURA DE DADOS:
   - Cada item de promoção agora inclui propriedades `startDateObj` e `endDateObj` como objetos Date
   - Mantidas as strings de data originais (`startDate`, `endDate`) para exibição

2. FILTROS IMPLEMENTADOS:
   - Data Início: Filtra promoções que começam na data selecionada ou depois
   - Data Fim: Filtra promoções que terminam na data selecionada ou antes

3. INTERFACE DOS FILTROS:
   - Botões mostram a data selecionada quando ativa
   - Placeholder explicativo para cada filtro
   - Contador de filtros ativos
   - Botão "Limpar filtros" para resetar todos os filtros

4. LÓGICA DE FILTRAGEM:
   - Filtros são aplicados em sequência (busca → status → tipo → datas)
   - Filtros de data usam comparação de objetos Date
   - Resultados são paginados após aplicação dos filtros

5. STORIES DISPONÍVEIS:
   - `Default`: Tabela completa com todos os controles
   - `CalendarFilters`: Demonstração específica dos filtros de calendário
   - `Basic`: Tabela simples sem filtros
   - `Loading`: Estado de carregamento

6. EXEMPLO DE USO:
   - Selecionar "Data Início: 01/12/2024" mostra apenas promoções que começam em dezembro
   - Selecionar "Data Fim: 30/11/2024" mostra apenas promoções que terminam até novembro
   - Combinar ambos os filtros cria um range específico

7. INTEGRAÇÃO:
   - Os filtros de calendário seguem a mesma interface dos outros filtros
   - Podem ser combinados com filtros de status e tipo
   - Funcionam em conjunto com busca por texto
*/

// ✅ STORY EMPTY - Sem dados
export const Empty: StoryFn = () => (
  <div style={{ padding: '20px' }}>
    <Table
      columns={basicColumns}
      dataSource={[]}
    />
  </div>
);

// ✅ STORY WITH SELECTION - Com seleção de linhas
export const WithSelection: StoryFn = () => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([1, 3]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        marginBottom: '16px',
        padding: '12px 16px',
        backgroundColor: '#f3f2f1',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#323130'
      }}>
        <strong>Promoções selecionadas:</strong> {selectedKeys.length}
        {selectedKeys.length > 0 && (
          <button
            onClick={() => setSelectedKeys([])}
            style={{
              marginLeft: '12px',
              padding: '4px 8px',
              backgroundColor: '#0078d4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Limpar seleção
          </button>
        )}
      </div>

      <Table
        columns={basicColumns}
        dataSource={promotionData.slice(0, 6)}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (keys, rows) => {
            setSelectedKeys(keys);
            console.log('Seleção alterada:', keys, rows);
          },
        }}
      />
    </div>
  );
};
