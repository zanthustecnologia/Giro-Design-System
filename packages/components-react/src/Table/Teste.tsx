// ✅ REFATORAR: Story Default com controls
export const Default: StoryFn<TableStoryProps> = ({
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

      {/* ✅ INFORMAÇÕES DE DEBUG (opcional) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          marginTop: 'var(--spacing-16)',
          padding: 'var(--spacing-8)',
          backgroundColor: 'var(--color-neutral-50)',
          borderRadius: 'var(--border-radius-4)',
          fontSize: 'var(--font-size-12)',
          color: 'var(--color-neutral-low-medium)'
        }}>
          <strong>Debug:</strong> 
          Header: {showHeader ? 'Sim' : 'Não'} | 
          Busca: {showSearch ? 'Sim' : 'Não'} | 
          Filtros: {showFilters ? 'Sim' : 'Não'} | 
          Paginação: {showPagination ? 'Sim' : 'Não'} | 
          Seleção: {showSelection ? 'Sim' : 'Não'}
        </div>
      )}
    </div>
  );
};

// ✅ ADICIONAR: Args padrão
Default.args = {
  showHeader: true,
  showSearch: true,
  showFilters: true,
  showPagination: true,
  showSelection: false,
  itemsPerPage: 10,
  loading: false
};