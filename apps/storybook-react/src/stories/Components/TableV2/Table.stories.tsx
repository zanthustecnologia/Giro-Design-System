import { MoreVertical16Regular } from '@fluentui/react-icons';
import { TableV2, Chips, Button, Menu, Avatar, createTableColumnHelper } from '@giro-ds/react';
import React, { useState, useMemo } from 'react';

import type { Meta, StoryFn } from '@storybook/react-vite';

type Promocao = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  status: string;
  inicio: string;
  inicioObj: Date;
};

const promocoes: Promocao[] = [
  { id: 1,  nome: 'Black Friday',         descricao: 'Desconto progressivo de 20%',             tipo: 'Desconto',     status: 'Ativa',     inicio: '24/11/2024', inicioObj: new Date(2024, 10, 24) },
  { id: 2,  nome: 'Frete Grátis Natal',   descricao: 'Frete grátis acima de R$ 100',            tipo: 'Frete Grátis', status: 'Agendada',  inicio: '01/12/2024', inicioObj: new Date(2024, 11, 1)  },
  { id: 3,  nome: 'Cliente VIP',          descricao: '15% exclusivo para clientes VIP',         tipo: 'Desconto',     status: 'Ativa',     inicio: '01/11/2024', inicioObj: new Date(2024, 10, 1)  },
  { id: 4,  nome: 'Liquidação Verão',     descricao: 'Queima de estoque sazonal',               tipo: 'Desconto',     status: 'Expirada',  inicio: '15/01/2024', inicioObj: new Date(2024, 0,  15) },
  { id: 5,  nome: 'Cashback Especial',    descricao: '10% de volta em toda compra',             tipo: 'Cashback',     status: 'Inativa',   inicio: '01/10/2024', inicioObj: new Date(2024, 9,  1)  },
  { id: 6,  nome: 'Primeira Compra',      descricao: 'Desconto para novos clientes',            tipo: 'Desconto',     status: 'Ativa',     inicio: '01/01/2024', inicioObj: new Date(2024, 0,  1)  },
  { id: 7,  nome: 'Semana do Consumidor', descricao: '25% em toda a loja',                      tipo: 'Desconto',     status: 'Expirada',  inicio: '15/03/2024', inicioObj: new Date(2024, 2,  15) },
  { id: 8,  nome: 'Dia das Mães',         descricao: 'Brindes especiais nas compras acima R$80',tipo: 'Frete Grátis', status: 'Expirada',  inicio: '12/05/2024', inicioObj: new Date(2024, 4,  12) },
  { id: 9,  nome: 'Volta às Aulas',       descricao: 'Kits escolares com 30% de desconto',     tipo: 'Desconto',     status: 'Expirada',  inicio: '20/01/2024', inicioObj: new Date(2024, 0,  20) },
  { id: 10, nome: 'Dia dos Namorados',    descricao: 'Frete grátis para presentes selecionados',tipo: 'Frete Grátis', status: 'Expirada',  inicio: '12/06/2024', inicioObj: new Date(2024, 5,  12) },
  { id: 11, nome: 'Aniversário da Loja',  descricao: 'Duplo cashback no mês de aniversário',   tipo: 'Cashback',     status: 'Expirada',  inicio: '01/07/2024', inicioObj: new Date(2024, 6,  1)  },
  { id: 12, nome: 'Cyber Monday',         descricao: '35% em eletrônicos e acessórios',        tipo: 'Desconto',     status: 'Agendada',  inicio: '02/12/2024', inicioObj: new Date(2024, 11, 2)  },
  { id: 13, nome: 'Páscoa',               descricao: 'Combo especial de chocolates grátis',     tipo: 'Frete Grátis', status: 'Expirada',  inicio: '31/03/2024', inicioObj: new Date(2024, 2,  31) },
  { id: 14, nome: 'Fidelidade Platinum',  descricao: '20% para clientes Platinum recorrentes',  tipo: 'Desconto',     status: 'Ativa',     inicio: '15/09/2024', inicioObj: new Date(2024, 8,  15) },
  { id: 15, nome: 'Flash Sale 12h',       descricao: 'Desconto relâmpago por 12 horas',        tipo: 'Desconto',     status: 'Inativa',   inicio: '05/08/2024', inicioObj: new Date(2024, 7,  5)  },
  { id: 16, nome: 'Cashback Recorrente',  descricao: '5% de cashback em todas as compras',     tipo: 'Cashback',     status: 'Ativa',     inicio: '01/06/2024', inicioObj: new Date(2024, 5,  1)  },
  { id: 17, nome: 'Indicação Amigo',      descricao: 'R$ 20 de crédito por indicação',         tipo: 'Cashback',     status: 'Ativa',     inicio: '01/04/2024', inicioObj: new Date(2024, 3,  1)  },
  { id: 18, nome: 'Assinatura Premium',   descricao: 'Frete grátis ilimitado por 3 meses',     tipo: 'Frete Grátis', status: 'Agendada',  inicio: '15/12/2024', inicioObj: new Date(2024, 11, 15) },
  { id: 19, nome: 'Fim de Ano',           descricao: '40% em itens de casa e decoração',       tipo: 'Desconto',     status: 'Agendada',  inicio: '26/12/2024', inicioObj: new Date(2024, 11, 26) },
  { id: 20, nome: 'Queima de Estoque',    descricao: 'Últimas unidades com até 50% de desconto',tipo: 'Desconto',     status: 'Inativa',   inicio: '10/09/2024', inicioObj: new Date(2024, 8,  10) },
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

const col = createTableColumnHelper<Promocao>();

const colunasPadrao = [
  col.accessor('nome', {
    header: 'Nome',
    cell: (info) => info.getValue(),
  }),
  col.accessor('tipo', {
    header: 'Tipo',
    cell: (info) => (
      <Chips variant={tipoColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Chips variant={statusColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
];

const colunasCompletas = [
  col.display({
    id: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const initials = row.original.nome.split(' ').map((w) => w[0]).slice(0, 2).join('');
      return <Avatar initialLetters={initials} size="sm" />;
    },
  }),
  col.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  col.accessor('nome', {
    header: 'Nome',
    cell: (info) => info.getValue(),
  }),
  col.accessor('descricao', {
    header: 'Descrição',
    cell: (info) => info.getValue(),
  }),
  col.accessor('tipo', {
    header: 'Tipo',
    cell: (info) => (
      <Chips variant={tipoColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Chips variant={statusColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.accessor('inicio', {
    header: 'Data de Início',
    cell: (info) => info.getValue(),
  }),
  col.display({
    id: 'actions',
    header: '',
    meta: { align: 'center' },
    cell: ({ row }) => (
      <Menu
        items={[
          { id: 'edit', text: 'Editar' },
          { id: 'pause', text: row.original.status === 'Ativa' ? 'Pausar' : 'Ativar' },
          { id: 'delete', text: 'Excluir' },
        ]}
        onItemSelect={(item) => console.warn(item.text, row.original.nome)}
      >
        <Button variant="text" iconOnly icon={<MoreVertical16Regular />} tooltipText="Mais ações" />
      </Menu>
    ),
  }),
];

type FilterItemConfig =
  | { id: string; type: 'checkbox'; buttonText: string; items: { id: string; text: string }[] }
  | { id: string; type: 'calendar'; buttonText: string; minDate?: string; maxDate?: string };

type DefaultArgs = {
  enableRowSelection: boolean;
  enableSorting: boolean;
  loading: boolean;
  showSearch: boolean;
  filterItems?: string;
  footer: boolean;
  bulkActions: boolean;
};

const meta: Meta<DefaultArgs> = {
  title: 'Components/TableV2',
  component: TableV2 as unknown as React.ComponentType<DefaultArgs>,
  parameters: { layout: 'centered' },
  argTypes: {
    enableRowSelection: {
      description: 'Habilita checkboxes para seleção de linhas',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    enableSorting: {
      description: 'Habilita ordenação ao clicar no cabeçalho das colunas',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    loading: {
      description: 'Exibe skeleton animado no lugar dos dados da tabela',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    showSearch: {
      description: 'Exibe o campo de busca global no cabeçalho da tabela',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    filterItems: {
      description:
        'JSON dos itens de filtro. Cole o array diretamente no campo. ' +
        'Exemplo: `[{"id":"status","type":"checkbox","buttonText":"Status","items":[{"id":"ativa","text":"Ativa"}]},{"id":"inicio","type":"calendar","buttonText":"Data de início","minDate":"2024-01-01","maxDate":"2024-12-31"}]`',
      control: 'text',
      table: { defaultValue: { summary: '""' } },
    },
    footer: {
      description: 'Exibe o rodapé com controles de paginação abaixo da tabela',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    bulkActions: {
      description: 'Exibe barra de ações em massa ao selecionar linhas (requer enableRowSelection)',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

export const Default: StoryFn<DefaultArgs> = ({
  enableRowSelection,
  enableSorting,
  loading,
  showSearch,
  filterItems: filterItemsJson,
  footer: showFooter,
  bulkActions: showBulkActions,
}) => {
  const [selecionados, setSelecionados] = React.useState<Promocao[]>([]);
  const [checkboxSelections, setCheckboxSelections] = React.useState<Record<string, string[]>>({});
  const [calendarDates, setCalendarDates] = React.useState<Record<string, Date | null>>({});

  const filterItemsConfig = useMemo((): FilterItemConfig[] => {
    if (!filterItemsJson?.trim()) return [];
    try {
      const parsed = JSON.parse(filterItemsJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [filterItemsJson]);

  const dadosFiltrados = useMemo(() => {
    let result = promocoes;
    const statusIds = checkboxSelections['status'];
    if (statusIds?.length > 0) {
      result = result.filter((p) =>
        statusIds.includes(p.status.toLowerCase().replace(' ', '-')),
      );
    }
    const dateFrom = calendarDates['inicio'];
    if (dateFrom) {
      result = result.filter((p) => p.inicioObj >= dateFrom);
    }
    return result;
  }, [checkboxSelections, calendarDates]);

  const resolvedFilterItems = filterItemsConfig?.map((item) => {
    if (item.type === 'checkbox') {
      const selected = checkboxSelections[item.id] ?? [];
      return {
        ...item,
        buttonText: selected.length > 0 ? `${item.buttonText} (${selected.length})` : item.buttonText,
        selectedIds: selected,
        onSelectionChange: (ids: string[]) =>
          setCheckboxSelections((prev) => ({ ...prev, [item.id]: ids })),
      };
    }
    const date = calendarDates[item.id] ?? null;
    return {
      ...item,
      selectedDate: date,
      minDate: item.minDate ? new Date(item.minDate) : undefined,
      maxDate: item.maxDate ? new Date(item.maxDate) : undefined,
      buttonText: date ? `A partir de ${date.toLocaleDateString('pt-BR')}` : item.buttonText,
      onDateSelect: (d: Date) => setCalendarDates((prev) => ({ ...prev, [item.id]: d })),
      onClear: () => setCalendarDates((prev) => ({ ...prev, [item.id]: null })),
    };
  });

  const hasFilters = !!resolvedFilterItems?.length;

  return (
    <div style={{ width: 600 }}>
      <TableV2
        columns={colunasPadrao}
        data={dadosFiltrados}
        enableRowSelection={enableRowSelection}
        enableSorting={enableSorting}
        loading={loading}
        onRowSelectionChange={setSelecionados}
        header={
          showSearch || hasFilters
            ? {
                ...(showSearch ? { searchPlaceholder: 'Buscar promoções...' } : { showSearch: false }),
                ...(hasFilters ? { filterItems: resolvedFilterItems } : {}),
              }
            : undefined
        }
        footer={
          showFooter
            ? { totalItems: dadosFiltrados.length, defaultPageSize: 5, pageSizeOptions: [5, 10] }
            : undefined
        }
        bulkActions={
          showBulkActions
            ? {
                actions: [
                  {
                    label: 'Ativar',
                    variant: 'filled',
                    onClick: () => console.warn('Ativar:', selecionados.map((r) => r.nome)),
                  },
                  {
                    label: 'Pausar',
                    variant: 'outlined',
                    onClick: () => console.warn('Pausar:', selecionados.map((r) => r.nome)),
                  },
                  {
                    label: 'Excluir',
                    variant: 'outlined',
                    onClick: () => console.warn('Excluir:', selecionados.map((r) => r.nome)),
                  },
                ],
              }
            : undefined
        }
      />
    </div>
  );
};

Default.args = {
  enableRowSelection: false,
  enableSorting: false,
  loading: false,
  showSearch: false,
  filterItems: '',
  footer: false,
  bulkActions: false,
};

Default.storyName = 'Default';

export const ComBuscaEFiltros: StoryFn = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [selected, setSelected] = useState<Promocao[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const dadosFiltrados = useMemo(() => {
    let result = promocoes;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q),
      );
    }
    if (selectedStatus.length > 0) {
      result = result.filter((p) =>
        selectedStatus.includes(p.status.toLowerCase().replace(' ', '-')),
      );
    }
    if (dataInicio) {
      result = result.filter((p) => p.inicioObj >= dataInicio);
    }
    return result;
  }, [searchQuery, selectedStatus, dataInicio]);

  const filterItems = [
    {
      id: 'status',
      buttonText: selectedStatus.length > 0 ? `Status (${selectedStatus.length})` : 'Status',
      type: 'multiple' as const,
      items: [
        { id: 'ativa', text: 'Ativa' },
        { id: 'inativa', text: 'Inativa' },
        { id: 'agendada', text: 'Agendada' },
        { id: 'expirada', text: 'Expirada' },
      ],
      selectedIds: selectedStatus,
      onSelectionChange: (ids: string[]) => { setSelectedStatus(ids); setCurrentPage(1); },
    },
    {
      id: 'inicio',
      buttonText: dataInicio ? `A partir de ${dataInicio.toLocaleDateString('pt-BR')}` : 'Data de início',
      type: 'calendar' as const,
      selectedDate: dataInicio,
      onDateSelect: (date: Date) => { setDataInicio(date); setCurrentPage(1); },
      onClear: () => { setDataInicio(null); setCurrentPage(1); },
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
    },
  ];

  return (
    <div style={{ width: 800, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TableV2
        columns={colunasCompletas}
        data={dadosFiltrados}
        rowSelection={{ onRowChange: (rows) => setSelected(rows) }}
        header={{
          searchPlaceholder: 'Buscar promoções...',
          onSearchChange: (val) => { setSearchQuery(val); setCurrentPage(1); },
          filterItems,
        }}
        footer={{
          totalItems: dadosFiltrados.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
          currentPage,
          onPageChange: setCurrentPage,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--color-neutral-low-light)', fontStyle: 'italic' }}>
          ↳ Valor retornado pelo callback <code>rowSelection.onRowChange</code> (externo à tabela)
        </span>
        <div
          style={{
            padding: '12px 16px',
            border: '2px dashed var(--color-neutral-high-dark)',
            borderRadius: 'var(--border-radius-8)',
            background: 'var(--color-neutral-high-pure, #f5f5f5)',
            minHeight: 56,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
        <span style={{ fontSize: 12, color: 'var(--color-neutral-low-medium)', fontWeight: 600 }}>
          ITENS SELECIONADOS ({selected.length})
        </span>
        {selected.length === 0 ? (
          <span style={{ fontSize: 14, color: 'var(--color-neutral-low-light)' }}>
            Nenhum item selecionado
          </span>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selected.map((r) => (
              <Chips key={r.id} variant={statusColor[r.status] ?? 'neutral'}>
                {r.nome}
              </Chips>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export const SomenteFiltros: StoryFn = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);

  const dadosFiltrados = useMemo(() => {
    let result = promocoes;
    if (selectedStatus.length > 0) {
      result = result.filter((p) =>
        selectedStatus.includes(p.status.toLowerCase().replace(' ', '-')),
      );
    }
    if (dataInicio) {
      result = result.filter((p) => p.inicioObj >= dataInicio);
    }
    return result;
  }, [selectedStatus, dataInicio]);

  const filterItems = [
    {
      id: 'status',
      buttonText: selectedStatus.length > 0 ? `Status (${selectedStatus.length})` : 'Status',
      type: 'checkbox' as const,
      items: [
        { id: 'ativa', text: 'Ativa' },
        { id: 'inativa', text: 'Inativa' },
        { id: 'agendada', text: 'Agendada' },
        { id: 'expirada', text: 'Expirada' },
      ],
      selectedIds: selectedStatus,
      onSelectionChange: setSelectedStatus,
    },
    {
      id: 'inicio',
      buttonText: dataInicio
        ? `A partir de ${dataInicio.toLocaleDateString('pt-BR')}`
        : 'Data de início',
      type: 'calendar' as const,
      selectedDate: dataInicio,
      onDateSelect: (date: Date) => setDataInicio(date),
      onClear: () => setDataInicio(null),
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
    },
  ];

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasCompletas}
        data={dadosFiltrados}
        header={{ showSearch: false, filterItems }}
        footer={{
          totalItems: dadosFiltrados.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
        }}
      />
    </div>
  );
};

SomenteFiltros.storyName = 'Somente Filtros';

export const SomenteBusca: StoryFn = () => (
  <div style={{ width: 800 }}>
    <TableV2
      columns={colunasCompletas}
      data={promocoes}
      header={{ searchPlaceholder: 'Buscar promoções...' }}
      footer={{
        totalItems: promocoes.length,
        defaultPageSize: 5,
        pageSizeOptions: [5, 10],
      }}
    />
  </div>
);

export const SemHeader: StoryFn = () => (
  <div style={{ width: 800 }}>
    <TableV2
      columns={colunasCompletas}
      data={promocoes}
      footer={{
        totalItems: promocoes.length,
        defaultPageSize: 5,
        pageSizeOptions: [5, 10],
      }}
    />
  </div>
);

export const Carregando: StoryFn = () => (
  <div style={{ width: 800 }}>
    <TableV2 columns={colunasCompletas} data={[]} loading />
  </div>
);

export const Vazia: StoryFn = () => (
  <div style={{ width: 800 }}>
    <TableV2 columns={colunasCompletas} data={[]}  />
  </div>
);

const colunasLargas = [
  col.accessor('nome', {
    header: 'Nome',
    size: 200,
    cell: (info) => info.getValue(),
  }),
  col.accessor('descricao', {
    header: 'Descrição',
    size: 300,
    meta: { maxHeight: 120 },
    cell: (info) => info.getValue(),
  }),
  col.accessor('tipo', {
    header: 'Tipo',
    cell: (info) => (
      <Chips variant={tipoColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Chips variant={statusColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.accessor('inicio', {
    header: 'Data de Início',
    cell: (info) => info.getValue(),
  }),
  col.display({
    id: 'extra1',
    header: 'Coluna Extra 1',
    cell: () => 'Dado extra A',
  }),
  col.display({
    id: 'extra2',
    header: 'Coluna Extra 2',
    cell: () => 'Dado extra B',
  }),
  col.display({
    id: 'actions',
    header: '',
    size: 40,
    meta: { align: 'center' },
    cell: ({ row }) => (
      <Menu
        items={[
          { id: 'edit', text: 'Editar' },
          { id: 'delete', text: 'Excluir' },
        ]}
        onItemSelect={(item) => console.warn(item.text, row.original.nome)}
      >
        <Button variant="text" iconOnly icon={<MoreVertical16Regular />} tooltipText="Mais ações" />
      </Menu>
    ),
  }),
];

export const TabelaResponsiva: StoryFn = () => {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!search) return promocoes;
    const q = search.toLowerCase();
    return promocoes.filter((p) => p.nome.toLowerCase().includes(q));
  }, [search]);

  return (
    <div style={{ width: 500 }}>
      <TableV2
        columns={colunasLargas}
        data={filteredData}
        header={{
          searchPlaceholder: 'Buscar...',
          onSearchChange: setSearch,
        }}
        footer={{
          totalItems: filteredData.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
        }}
      />
    </div>
  );
};

TabelaResponsiva.storyName = 'Tabela Responsiva';

export const AcoesEmMassa: StoryFn = () => {
  const [selected, setSelected] = useState<Promocao[]>([]);
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!search) return promocoes;
    const q = search.toLowerCase();
    return promocoes.filter((p) => p.nome.toLowerCase().includes(q));
  }, [search]);

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasPadrao}
        data={filteredData}
        rowSelection={{ onRowChange: (rows) => setSelected(rows) }}
        bulkActions={{
          onClear: () => setSelected([]),
          actions: [
            {
              label: 'Ativar',
              variant: 'filled',
              onClick: () =>
                console.warn(
                  'Ativar:',
                  selected.map((r) => r.nome),
                ),
            },
            {
              label: 'Pausar',
              variant: 'outlined',
              onClick: () =>
                console.warn(
                  'Pausar:',
                  selected.map((r) => r.nome),
                ),
            },
            {
              label: 'Excluir',
              variant: 'outlined',
              onClick: () =>
                console.warn(
                  'Excluir:',
                  selected.map((r) => r.nome),
                ),
            },
          ],
        }}
        header={{
          searchPlaceholder: 'Buscar promoções...',
          onSearchChange: setSearch,
        }}
        footer={{
          totalItems: filteredData.length,
          defaultPageSize: 10,
          pageSizeOptions: [5, 10, 25],
        }}
      />
    </div>
  );
};

AcoesEmMassa.storyName = 'Ações em Massa';

// ─── Seleção com Linhas Desabilitadas ────────────────────────────────────────
export const SelecaoComLinhasDesabilitadas: StoryFn = () => {
  const [selected, setSelected] = useState<Promocao[]>([]);

  return (
    <div style={{ width: 800, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 13, color: 'var(--color-neutral-low-medium)', margin: 0 }}>
        Promoções <strong>Expiradas</strong> têm o checkbox desabilitado —{' '}
        <code>{`rowSelection={{ disabled: (row) => row.status === 'Expirada' }}`}</code>
      </p>
      <TableV2
        columns={colunasPadrao}
        data={promocoes}
        rowSelection={{
          disabled: (row) => row.status === 'Expirada',
          onRowChange: (rows) => setSelected(rows),
        }}
        bulkActions={{
          onClear: () => setSelected([]),
          actions: [
            {
              label: 'Ativar selecionadas',
              variant: 'filled',
              onClick: () => console.warn('Ativar:', selected.map((r) => r.nome)),
            },
          ],
        }}
        footer={{
          totalItems: promocoes.length,
          defaultPageSize: 10,
          pageSizeOptions: [5, 10, 25],
        }}
      />
      <div
        style={{
          padding: '12px 16px',
          border: '2px dashed var(--color-neutral-high-dark)',
          borderRadius: 'var(--border-radius-8)',
          background: 'var(--color-neutral-high-pure, #f5f5f5)',
          minHeight: 48,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--color-neutral-low-medium)', fontWeight: 600 }}>
          ITENS SELECIONADOS ({selected.length})
        </span>
        {selected.length === 0 ? (
          <span style={{ fontSize: 14, color: 'var(--color-neutral-low-light)' }}>
            Nenhum item selecionado
          </span>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selected.map((r) => (
              <Chips key={r.id} variant={statusColor[r.status] ?? 'neutral'}>
                {r.nome}
              </Chips>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SelecaoComLinhasDesabilitadas.storyName = 'Seleção com Linhas Desabilitadas';

// ─── Paginação Server-side (Controlada) ──────────────────────────────────────
export const PaginacaoServidor: StoryFn = () => {
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return promocoes;
    const q = searchQuery.toLowerCase();
    return promocoes.filter(
      (p) => p.nome.toLowerCase().includes(q) || p.tipo.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div style={{ width: 800, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontSize: 13, color: 'var(--color-neutral-low-medium)', margin: 0 }}>
        Paginação e busca totalmente controladas pelo pai via <code>currentPage</code> e
        <code>onSearchChange</code>. Ao buscar, o pai reseta <code>currentPage</code> para 1.
      </p>
      <TableV2
        columns={colunasPadrao}
        data={paginatedData}
        header={{
          searchPlaceholder: 'Buscar promoções...',
          onSearchChange: handleSearch,
        }}
        footer={{
          totalItems: filteredData.length,
          defaultPageSize: PAGE_SIZE,
          currentPage,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
};

PaginacaoServidor.storyName = 'Paginação Server-side (Controlada)';

