import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Table from './Table';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import Avatar from '../Avatar';
import Chips from '../Chips';
import Menu from '../Menu/Menu';
import { Person16Regular, MoreVertical16Regular, Settings16Regular, Calendar16Regular } from '@fluentui/react-icons';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    loading: { 
      control: 'boolean',
      description: 'Estado de carregamento da tabela'
    }
  },
};

export default meta;

// 📋 DADOS MOCK - PROMOÇÕES
const promotionColumns = [
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
          // Adicionar lógica específica para cada ação aqui se necessário
        }}
      >
        <MoreVertical16Regular style={{ cursor: 'pointer' }} />
      </Menu>
    ),
  },
];

const promotionData = [
  {
    id: 1,
    code: 'PROMO001',
    name: 'Black Friday 2024',
    description: 'Desconto especial para Black Friday',
    type: 'Desconto',
    startDate: '24/11/2024',
    endDate: '30/11/2024',
    status: 'Ativa'
  },
  {
    id: 2,
    code: 'PROMO002',
    name: 'Frete Grátis Natal',
    description: 'Frete grátis para compras acima de R$ 100',
    type: 'Frete Grátis',
    startDate: '01/12/2024',
    endDate: '25/12/2024',
    status: 'Agendada'
  },
  {
    id: 3,
    code: 'PROMO003',
    name: 'Desconto Cliente VIP',
    description: '15% de desconto para clientes VIP',
    type: 'Desconto',
    startDate: '01/11/2024',
    endDate: '31/12/2024',
    status: 'Ativa'
  },
  {
    id: 4,
    code: 'PROMO004',
    name: 'Liquidação Verão',
    description: 'Liquidação de produtos de verão',
    type: 'Desconto',
    startDate: '15/01/2024',
    endDate: '28/02/2024',
    status: 'Expirada'
  },
  {
    id: 5,
    code: 'PROMO005',
    name: 'Cashback Especial',
    description: '10% de cashback em compras',
    type: 'Cashback',
    startDate: '01/10/2024',
    endDate: '31/10/2024',
    status: 'Inativa'
  },
  {
    id: 6,
    code: 'PROMO006',
    name: 'Cupom Primeira Compra',
    description: 'Desconto para novos clientes',
    type: 'Desconto',
    startDate: '01/01/2024',
    endDate: '31/12/2024',
    status: 'Ativa'
  },
  {
    id: 7,
    code: 'PROMO007',
    name: 'Frete Grátis Express',
    description: 'Entrega rápida sem custo',
    type: 'Frete Grátis',
    startDate: '15/11/2024',
    endDate: '15/12/2024',
    status: 'Agendada'
  },
  {
    id: 8,
    code: 'PROMO008',
    name: 'Combo Produtos',
    description: 'Desconto na compra de 2 ou mais produtos',
    type: 'Combo',
    startDate: '01/12/2024',
    endDate: '31/01/2025',
    status: 'Agendada'
  },
  {
    id: 9,
    code: 'PROMO009',
    name: 'Combo Produtos',
    description: 'Desconto na compra de 2 ou mais produtos',
    type: 'Combo',
    startDate: '01/12/2024',
    endDate: '31/01/2025',
    status: 'Agendada'
  },
  {
    id: 9,
    code: 'PROMO009',
    name: 'Combo Produtos',
    description: 'Desconto na compra de 2 ou mais produtos',
    type: 'Combo',
    startDate: '01/12/2024',
    endDate: '31/01/2025',
    status: 'Agendada'
  },
  {
    id: 9,
    code: 'PROMO009',
    name: 'Combo Produtos',
    description: 'Desconto na compra de 2 ou mais produtos',
    type: 'Combo',
    startDate: '01/12/2024',
    endDate: '31/01/2025',
    status: 'Agendada'
  },
  {
    id: 9,
    code: 'PROMO009',
    name: 'Combo Produtos',
    description: 'Desconto na compra de 2 ou mais produtos',
    type: 'Combo',
    startDate: '01/12/2024',
    endDate: '31/01/2025',
    status: 'Agendada'
  },
];

// ✅ STORY DEFAULT - Configurável via Controls
export const Default: StoryFn = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [showPagination, setShowPagination] = useState(true);
  const [showSelection, setShowSelection] = useState(false);
  
  // Dados para filtros
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
  
  // Filtros
  let filteredData = promotionData;
  
  // Filtro por busca
  if (searchValue) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  
  // Filtro por status
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
  
  // Filtro por tipo
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
  
  return (      
      <div>
      {(showSearch || showFilters) && (
        <TableHeader
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          showSearch={showSearch}
          showFilters={showFilters}
          searchPlaceholder="Buscar por nome, código ou descrição..."
          filterItems={showFilters ? [
            {
              id: 'status-filter',
              buttonText: selectedStatus.length > 0 
                ? `Status (${selectedStatus.length})` 
                : 'Status',
              icon: <Settings16Regular />,
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
              icon: <Calendar16Regular />,
              items: typeItems,
              type: 'checkbox',
              selectedIds: selectedTypes,
              onSelectionChange: setSelectedTypes,
              placeholder: 'Selecione tipos...',
              position: 'left'
            }
          ] : []}
        />
      )}
      
      {/* Tabela */}
      <Table
        columns={promotionColumns}
        dataSource={paginatedData}
        rowSelection={showSelection ? {
          selectedRowKeys: selectedKeys,
          onChange: setSelectedKeys,
        } : undefined}
      />
      
      {/* Paginação condicional */}
      {showPagination && totalItems > 0 && (
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

// ✅ STORY BÁSICA - Apenas a tabela
export const Basic: StoryFn = () => (
  <div style={{ padding: '20px' }}>
    <Table 
      columns={promotionColumns}
      dataSource={promotionData.slice(0, 5)}
    />
  </div>
);

// ✅ STORY LOADING - Estado de carregamento
export const Loading: StoryFn = () => (
  <div style={{ padding: '20px' }}>
    <Table 
      columns={promotionColumns}
      dataSource={[]}
      loading={true}
    />
  </div>
);

// ✅ STORY EMPTY - Sem dados
export const Empty: StoryFn = () => (
  <div style={{ padding: '20px' }}>
    <Table 
      columns={promotionColumns}
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
        columns={promotionColumns}
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
