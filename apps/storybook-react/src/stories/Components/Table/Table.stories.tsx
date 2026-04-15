import React, { useState, useMemo } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Table, TableHeader, TablePagination, Chips, Button, Menu, Avatar } from '@giro-ds/react';
import type { FilterItem } from '@giro-ds/react';
import { MoreVertical16Regular } from '@fluentui/react-icons';

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'centered' },
};

export default meta;

// --- Dataset ---
const promocoes = [
  { id: 1, nome: 'Black Friday', descricao: 'Desconto progressivo de 20%', tipo: 'Desconto', status: 'Ativa', inicio: '24/11/2024', inicioObj: new Date(2024, 10, 24) },
  { id: 2, nome: 'Frete Grátis Natal', descricao: 'Frete grátis acima de R$ 100', tipo: 'Frete Grátis', status: 'Agendada', inicio: '01/12/2024', inicioObj: new Date(2024, 11, 1) },
  { id: 3, nome: 'Cliente VIP', descricao: '15% exclusivo para clientes VIP', tipo: 'Desconto', status: 'Ativa', inicio: '01/11/2024', inicioObj: new Date(2024, 10, 1) },
  { id: 4, nome: 'Liquidação Verão', descricao: 'Queima de estoque sazonal', tipo: 'Desconto', status: 'Expirada', inicio: '15/01/2024', inicioObj: new Date(2024, 0, 15) },
  { id: 5, nome: 'Cashback Especial', descricao: '10% de volta em toda compra', tipo: 'Cashback', status: 'Inativa', inicio: '01/10/2024', inicioObj: new Date(2024, 9, 1) },
  { id: 6, nome: 'Primeira Compra', descricao: 'Desconto para novos clientes', tipo: 'Desconto', status: 'Ativa', inicio: '01/01/2024', inicioObj: new Date(2024, 0, 1) },
];

const statusColor: Record<string, 'success' | 'alert' | 'brand' | 'neutral'> = {
  Ativa: 'success',
  Inativa: 'alert',
  Agendada: 'brand',
  Expirada: 'neutral',
};

const tipoColor: Record<string, 'success' | 'alert' | 'brand' | 'neutral'> = {
  Desconto: 'success',
  'Frete Grátis': 'brand',
  Cashback: 'neutral',
};

// --- Colunas ---
const colunas = [
  { key: 'nome', label: 'Nome' },
  {
    key: 'tipo',
    label: 'Tipo',
    render: (row: any) => (
      <Chips label={row.tipo} title={row.tipo} type={tipoColor[row.tipo] ?? 'neutral'} />
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: any) => (
      <Chips label={row.status} title={row.status} type={statusColor[row.status] ?? 'neutral'} />
    ),
  },
  {
    key: 'actions',
    label: '',
    render: (row: any) => (
      <Menu
        items={[
          { id: 'edit', text: 'Editar' },
          { id: 'pause', text: row.status === 'Ativa' ? 'Pausar' : 'Ativar' },
          { id: 'delete', text: 'Excluir' },
        ]}
        onItemSelect={(item: any) => console.log(item.text, row.nome)}
      >
        <Button variant="text" iconOnly icon={<MoreVertical16Regular />} tooltipText="Mais ações" />
      </Menu>
    ),
  },
];

const colunasComData = [
  { key: 'nome', label: 'Nome' },
  { key: 'inicio', label: 'Início' },
  {
    key: 'status',
    label: 'Status',
    render: (row: any) => (
      <Chips label={row.status} title={row.status} type={statusColor[row.status] ?? 'neutral'} />
    ),
  },
  {
    key: 'actions',
    label: '',
    render: (row: any) => (
      <Menu
        items={[{ id: 'edit', text: 'Editar' }, { id: 'delete', text: 'Excluir' }]}
        onItemSelect={(item: any) => console.log(item.text, row.nome)}
      >
        <Button variant="text" iconOnly icon={<MoreVertical16Regular />} tooltipText="Mais ações" />
      </Menu>
    ),
  },
];

// Colunas completas: avatar · 1 linha · 2 linhas · chips · ações (+ checkbox via rowSelection)
const colunasCompletas = [
  {
    key: 'avatar',
    label: 'Avatar',
    render: (row: any) => {
      const initials = row.nome.split(' ').map((w: string) => w[0]).slice(0, 2).join('');
      return <Avatar initialLetters={initials} size="sm" />;
    },
  },
  { key: 'nome', label: 'Nome' },
  {
    key: 'detalhes',
    label: 'Detalhes',
    render: (row: any) => (
      <div>
        <div>{row.nome}</div>
        <div style={{ fontSize: '12px', color: 'var(--color-neutral-low-medium)' }}>{row.descricao}</div>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: any) => (
      <Chips label={row.status} title={row.status} type={statusColor[row.status] ?? 'neutral'} />
    ),
  },
  {
    key: 'actions',
    label: '',
    render: (row: any) => (
      <Menu
        items={[
          { id: 'edit', text: 'Editar' },
          { id: 'pause', text: row.status === 'Ativa' ? 'Pausar' : 'Ativar' },
          { id: 'delete', text: 'Excluir' },
        ]}
        onItemSelect={(item: any) => console.log(item.text, row.nome)}
      >
        <Button variant="text" iconOnly icon={<MoreVertical16Regular />} tooltipText="Mais ações" />
      </Menu>
    ),
  },
];

// ComBuscaEFiltros — busca + filtro de status + filtro de calendário + paginação
export const ComBuscaEFiltros: StoryFn = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const filtered = useMemo(() => promocoes.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase());
    const matchStatus = selectedStatus.length === 0 || selectedStatus.includes(item.status.toLowerCase().replace(' ', '-'));
    const matchDate = !dataInicio || item.inicioObj >= dataInicio;
    return matchSearch && matchStatus && matchDate;
  }), [search, selectedStatus, dataInicio]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const filters: FilterItem[] = [
    {
      id: 'status',
      buttonText: selectedStatus.length > 0 ? `Status (${selectedStatus.length})` : 'Status',
      type: 'checkbox',
      items: [
        { id: 'ativa', text: 'Ativa' },
        { id: 'inativa', text: 'Inativa' },
        { id: 'agendada', text: 'Agendada' },
        { id: 'expirada', text: 'Expirada' },
      ],
      selectedIds: selectedStatus,
      onSelectionChange: (ids) => { setSelectedStatus(ids); setPage(1); },
      position: 'left',
    },
    {
      id: 'inicio',
      buttonText: dataInicio ? `A partir de ${dataInicio.toLocaleDateString('pt-BR')}` : 'Data de início',
      type: 'calendar',
      selectedDate: dataInicio,
      onDateSelect: (date: Date) => { setDataInicio(date); setPage(1); },
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
      position: 'left',
    },
  ];

  return (
    <div style={{ width: 800 }}>
      <TableHeader
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Buscar promoções..."
        showSearch
        showFilters
        filterItems={filters}
      />
      <Table
        columns={colunasCompletas}
        dataSource={paginated}
        rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
      />
      <TablePagination
        currentPage={page}
        totalItems={filtered.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={(n) => { setPerPage(n); setPage(1); }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

// ComFiltroCalendario — filtro por data de início
export const ComFiltroCalendario: StoryFn = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);

  const filtered = useMemo(() => {
    if (!dataInicio) return promocoes;
    return promocoes.filter(item => item.inicioObj >= dataInicio);
  }, [dataInicio]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const filters: FilterItem[] = [{
    id: 'inicio',
    buttonText: dataInicio ? `A partir de ${dataInicio.toLocaleDateString('pt-BR')}` : 'Data de início',
    type: 'calendar',
    selectedDate: dataInicio,
    onDateSelect: (date: Date) => { setDataInicio(date); setPage(1); },
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
    position: 'left',
  }];

  return (
    <div style={{ width: 700 }}>
      <TableHeader
        searchValue=""
        onSearchChange={() => {}}
        showSearch={false}
        showFilters
        filterItems={filters}
      />
      <Table columns={colunasComData} dataSource={paginated} />
      <TablePagination
        currentPage={page}
        totalItems={filtered.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={(n) => { setPerPage(n); setPage(1); }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

// SomenteBusca — busca sem filtros
export const SomenteBusca: StoryFn = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(5);

  const filtered = useMemo(() =>
    promocoes.filter(item => item.nome.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div style={{ width: 800 }}>
      <TableHeader
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Buscar promoções..."
        showSearch
        showFilters={false}
        filterItems={[]}
      />
      <Table columns={colunasCompletas} dataSource={paginated} />
      <TablePagination
        currentPage={page}
        totalItems={filtered.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={(n) => { setPerPage(n); setPage(1); }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

// SemHeader — tabela e paginação sem cabeçalho
export const SemHeader: StoryFn = () => {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const paginated = promocoes.slice((page - 1) * perPage, page * perPage);

  return (
    <div style={{ width: 800 }}>
      <Table columns={colunasCompletas} dataSource={paginated} />
      <TablePagination
        currentPage={page}
        totalItems={promocoes.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={() => {}}
        pageSizeOptions={[5]}
      />
    </div>
  );
};

// ComSelecao — seleção de linhas
export const ComSelecao: StoryFn = () => {
  const [selected, setSelected] = useState<(string | number)[]>([]);

  return (
    <div style={{ width: 800 }}>
      <Table
        columns={colunasCompletas}
        dataSource={promocoes}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: setSelected,
        }}
      />
    </div>
  );
};

// Carregando — estado de carregamento
export const Carregando: StoryFn = () => (
  <div style={{ width: 800 }}>
    <Table columns={colunasCompletas} dataSource={[]} loading />
  </div>
);

// Vazia — tabela sem dados
export const Vazia: StoryFn = () => (
  <div style={{ width: 800 }}>
    <Table columns={colunasCompletas} dataSource={[]} />
  </div>
);
