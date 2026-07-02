import { MoreVertical16Regular } from '@fluentui/react-icons';
import { TableV2, Chips, Button, Menu, Avatar, createTableColumnHelper, type TableV2HeaderProps } from '@giro-ds/react';
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
  | { id: string; type: 'multiple'; buttonText: string; items: { id: string; text: string }[] }
  | { id: string; type: 'calendar'; buttonText: string; minDate?: string; maxDate?: string };

type DefaultArgs = {
  rowSelection: Record<string, unknown> | undefined;
  enableSorting: boolean;
  loading: boolean;
  headerSearch: { searchPlaceholder?: string } | undefined;
  headerFilterItems: FilterItemConfig[] | undefined;
  footer: { defaultPageSize?: number; pageSizeOptions?: number[] } | undefined;
  bulkActions: { actions?: Array<{ label: string; variant?: string }> } | undefined;
};

const meta: Meta<DefaultArgs> = {
  title: 'Components/TableV2',
  component: TableV2 as unknown as React.ComponentType<DefaultArgs>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'O TableV2 é a nova implementação da tabela, construída com TanStack Table. Oferece uma API declarativa baseada em `createColumnHelper`, com suporte a tipagem genérica, renderização customizada por célula e extensibilidade nativa da biblioteca.',
      },
    },
  },
  argTypes: {
    rowSelection: {
      description:
        'Habilita seleção de linhas via checkbox. Passe um objeto para ativar (o callback `onRowChange` é adicionado pela story). ' +
        'Exemplos: seleção padrão `{}`, sem "Selecionar todos" `{ "disableSelectAll": true }`, ' +
        'todas desabilitadas `{ "disabled": true }`.',
      control: 'object',
      table: {
        type: { summary: 'TableV2RowSelectionProps | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    enableSorting: {
      description: 'Habilita ordenação ao clicar no cabeçalho das colunas.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: 'Exibe skeleton animado no lugar dos dados.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    headerSearch: {
      name: 'onSearchChange',
      description:
        'Habilita o campo de busca global. Passe um objeto para ativar: `{ "searchPlaceholder": "Buscar..." }`. ' +
        'A presença do objeto é o que renderiza o campo de busca. ' +
        'Combinável com `header.filterItems`.',
      control: 'object',
      table: {
        type: { summary: '{ searchPlaceholder?: string } | undefined' },
        defaultValue: { summary: 'undefined' },
        category: 'header',
      },
    },
    headerFilterItems: {
      name: 'filterItems',
      description:
        'Filtros do cabeçalho: `header={{ filterItems: FilterItem[] }}`. ' +
        '`FilterItem` é a union de `CheckboxFilterItem` (`type: "multiple" | "single"`), `CalendarFilterItem` (`type: "calendar"`) ' +
        'e `CombinedFilterItem` (`type: "combined"` — abre um Drawer lateral com conteúdo via `children`). ' +
        'Cole o JSON do array. Ex: `[{"id":"status","type":"multiple","buttonText":"Status","items":[{"id":"ativa","text":"Ativa"}]},{"id":"inicio","type":"calendar","buttonText":"Data de início","minDate":"2024-01-01","maxDate":"2024-12-31"}]`',
      control: 'object',
      table: {
        type: { summary: '"multiple" | "single" | "calendar" | "combined"' },
        defaultValue: { summary: 'undefined' },
        category: 'header',
      },
    },
    footer: {
      description:
        'Exibe o rodapé de paginação. Passe um objeto para ativar: `{ "defaultPageSize": 5, "pageSizeOptions": [5, 10] }`. ' +
        'O componente não faz paginação interna — o pai deve fatiar os dados antes de passar para `data`. ' +
        '`totalItems`, `currentPage` e os callbacks são gerenciados pela story.',
      control: 'object',
      table: {
        type: { summary: 'TableV2FooterProps | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    bulkActions: {
      description:
        'Exibe barra de ações em massa quando há linhas selecionadas (requer `rowSelection`). ' +
        'Passe um objeto para ativar, opcionalmente com ações customizadas: `{ "actions": [{ "label": "Ativar", "variant": "filled" }] }`. ' +
        'Se `actions` estiver ausente, usa ações padrão (Ativar, Pausar, Excluir).',
      control: 'object',
      table: {
        type: { summary: 'TableV2BulkActionsProps | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;

export const Default: StoryFn<DefaultArgs> = ({
  rowSelection: rowSelectionArg,
  enableSorting,
  loading,
  headerSearch: headerSearchArg,
  headerFilterItems: filterItemsArg,
  footer: footerArg,
  bulkActions: bulkActionsArg,
}) => {
  const [selecionados, setSelecionados] = React.useState<Promocao[]>([]);

  const rowSelectionConfig = rowSelectionArg && typeof rowSelectionArg === 'object' ? rowSelectionArg : undefined;

  const [checkboxSelections, setCheckboxSelections] = React.useState<Record<string, string[]>>({});
  const [calendarDates, setCalendarDates] = React.useState<Record<string, Date | null>>({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const filterItemsConfig = useMemo((): FilterItemConfig[] => {
    if (!Array.isArray(filterItemsArg)) return [];
    return filterItemsArg;
  }, [filterItemsArg]);

  const dadosFiltrados = useMemo(() => {
    let result = promocoes;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q),
      );
    }
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
  }, [searchQuery, checkboxSelections, calendarDates]);

  const resolvedFilterItems = filterItemsConfig?.map((item) => {
    if (item.type === 'multiple') {
      const selected = checkboxSelections[item.id] ?? [];
      return {
        ...item,
        buttonText: selected.length > 0 ? `${item.buttonText} (${selected.length})` : item.buttonText,
        selectedIds: selected,
        onSelectionChange: (ids: string[]) => {
          setCheckboxSelections((prev) => ({ ...prev, [item.id]: ids }));
          setCurrentPage(1);
        },
      };
    }
    const date = calendarDates[item.id] ?? null;
    return {
      ...item,
      selectedDate: date,
      minDate: item.minDate ? new Date(item.minDate) : undefined,
      maxDate: item.maxDate ? new Date(item.maxDate) : undefined,
      buttonText: date ? `A partir de ${date.toLocaleDateString('pt-BR')}` : item.buttonText,
      onDateSelect: (d: Date) => { setCalendarDates((prev) => ({ ...prev, [item.id]: d })); setCurrentPage(1); },
      onClear: () => { setCalendarDates((prev) => ({ ...prev, [item.id]: null })); setCurrentPage(1); },
    };
  });

  const hasFilters = !!resolvedFilterItems?.length;

  const paginatedData = useMemo(() => {
    if (!footerArg) return dadosFiltrados;
    const start = (currentPage - 1) * pageSize;
    return dadosFiltrados.slice(start, start + pageSize);
  }, [dadosFiltrados, footerArg, currentPage, pageSize]);

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasCompletas}
        data={paginatedData}
        rowSelection={rowSelectionConfig !== undefined ? { ...(rowSelectionConfig as any), onRowChange: setSelecionados } : undefined}
        enableSorting={enableSorting}
        loading={loading}
        header={
          headerSearchArg || hasFilters
            ? {
                ...(headerSearchArg ? { searchPlaceholder: headerSearchArg.searchPlaceholder ?? 'Buscar promoções...', onSearchChange: (v: string) => { setSearchQuery(v); setCurrentPage(1); } } : {}),
                ...(hasFilters ? { filterItems: resolvedFilterItems } : {}),
              }
            : undefined
        }
        footer={
          footerArg
            ? { totalItems: dadosFiltrados.length, ...(footerArg.defaultPageSize !== undefined ? { defaultPageSize: footerArg.defaultPageSize } : {}), pageSizeOptions: footerArg.pageSizeOptions ?? [5, 10, 25], currentPage, onPageChange: setCurrentPage, onPageSizeChange: (size: number) => { setPageSize(size); setCurrentPage(1); } }
            : undefined
        }
        bulkActions={
          bulkActionsArg
            ? {
                actions: (bulkActionsArg.actions ?? [
                  { label: 'Ativar', variant: 'filled' as const },
                  { label: 'Pausar', variant: 'outlined' as const },
                  { label: 'Excluir', variant: 'outlined' as const },
                ]).map((action) => ({
                  label: action.label,
                  variant: action.variant as 'filled' | 'outlined' | 'text' | undefined,
                  onClick: () => console.warn(action.label + ':', selecionados.map((r) => r.nome)),
                })),
              }
            : undefined
        }
      />
    </div>
  );
};

Default.args = {
  rowSelection: undefined,
  enableSorting: false,
  loading: false,
  headerSearch: undefined,
  headerFilterItems: undefined,
  footer: undefined,
  bulkActions: undefined,
};

export const ComBuscaEFiltros: StoryFn = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [selected, setSelected] = useState<Promocao[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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

  const filterItems: NonNullable<TableV2HeaderProps['filterItems']> = [
    {
      id: 'status',
      buttonText: selectedStatus.length > 0 ? `Status (${selectedStatus.length})` : 'Status',
      type: 'multiple',
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

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return dadosFiltrados.slice(start, start + pageSize);
  }, [dadosFiltrados, currentPage, pageSize]);

  return (
    <div style={{ width: 800, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TableV2
        columns={colunasCompletas}
        data={paginatedData}
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
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
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

export const ComFiltroCombinado: StoryFn = () => {
  const [draftStatus, setDraftStatus] = useState<string[]>([]);
  const [draftTipo, setDraftTipo] = useState<string[]>([]);
  const [appliedStatus, setAppliedStatus] = useState<string[]>([]);
  const [appliedTipo, setAppliedTipo] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const activeCount = appliedStatus.length + appliedTipo.length;

  const dadosFiltrados = useMemo(() => {
    let result = promocoes;
    if (appliedStatus.length > 0) {
      result = result.filter((p) =>
        appliedStatus.includes(p.status.toLowerCase().replace(' ', '-'))
      );
    }
    if (appliedTipo.length > 0) {
      result = result.filter((p) =>
        appliedTipo.includes(p.tipo.toLowerCase().replace(' ', '-'))
      );
    }
    return result;
  }, [appliedStatus, appliedTipo]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return dadosFiltrados.slice(start, start + pageSize);
  }, [dadosFiltrados, currentPage, pageSize]);

  const toggleChip = (
    selected: string[],
    setter: (v: string[]) => void,
    id: string,
  ) => setter(selected.includes(id) ? selected.filter((v) => v !== id) : [...selected, id]);

  const handleApply = () => {
    setAppliedStatus(draftStatus);
    setAppliedTipo(draftTipo);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setDraftStatus([]);
    setDraftTipo([]);
    setAppliedStatus([]);
    setAppliedTipo([]);
    setCurrentPage(1);
  };

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasPadrao}
        data={paginatedData}
        header={{
          filterItems: [
            {
              type: 'combined' as const,
              buttonText: 'Filtros',
              activeCount,
              title: 'Filtrar promoções',
              drawerWidth: '320px',
              onApply: handleApply,
              onClear: handleClear,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 500 }}>Status</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {[
                        { id: 'ativa', label: 'Ativa' },
                        { id: 'inativa', label: 'Inativa' },
                        { id: 'agendada', label: 'Agendada' },
                        { id: 'expirada', label: 'Expirada' },
                      ].map(({ id, label }) => (
                        <Chips
                          key={id}
                          variant={draftStatus.includes(id) ? 'success' : 'neutral'}
                          onClick={() => toggleChip(draftStatus, setDraftStatus, id)}
                          style={{ cursor: 'pointer' }}
                          role="checkbox"
                          aria-checked={draftStatus.includes(id)}
                        >
                          {label}
                        </Chips>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 500 }}>Tipo</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {[
                        { id: 'desconto', label: 'Desconto' },
                        { id: 'frete-gratis', label: 'Frete Grátis' },
                        { id: 'cashback', label: 'Cashback' },
                      ].map(({ id, label }) => (
                        <Chips
                          key={id}
                          variant={draftTipo.includes(id) ? 'success' : 'neutral'}
                          onClick={() => toggleChip(draftTipo, setDraftTipo, id)}
                          style={{ cursor: 'pointer' }}
                          role="checkbox"
                          aria-checked={draftTipo.includes(id)}
                        >
                          {label}
                        </Chips>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
          ]}}
        footer={{
          totalItems: dadosFiltrados.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
          currentPage,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
        }}
      />
    </div>
  );
};

ComFiltroCombinado.storyName = 'Com Filtro Combinado (Drawer)';

export const SomenteFiltros: StoryFn = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return dadosFiltrados.slice(start, start + pageSize);
  }, [dadosFiltrados, currentPage, pageSize]);

  const filterItems: NonNullable<TableV2HeaderProps['filterItems']> = [
    {
      id: 'status',
      buttonText: selectedStatus.length > 0 ? `Status (${selectedStatus.length})` : 'Status',
      type: 'multiple',
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
      buttonText: dataInicio
        ? `A partir de ${dataInicio.toLocaleDateString('pt-BR')}`
        : 'Data de início',
      type: 'calendar',
      selectedDate: dataInicio,
      onDateSelect: (date: Date) => { setDataInicio(date); setCurrentPage(1); },
      onClear: () => { setDataInicio(null); setCurrentPage(1); },
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
    },
  ];

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasCompletas}
        data={paginatedData}
        header={{ filterItems }}
        footer={{
          totalItems: dadosFiltrados.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
          currentPage,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
        }}
      />
    </div>
  );
};

export const SomenteBusca: StoryFn = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredData = useMemo(() => {
    if (!search) return promocoes;
    const q = search.toLowerCase();
    return promocoes.filter(
      (p) => p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q),
    );
  }, [search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasCompletas}
        data={paginatedData}
        header={{
          searchPlaceholder: 'Buscar promoções...',
          onSearchChange: (val) => { setSearch(val); setCurrentPage(1); },
        }}
        footer={{
          totalItems: filteredData.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
          currentPage,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
        }}
      />
    </div>
  );
};

export const SemHeader: StoryFn = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return promocoes.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasCompletas}
        data={paginatedData}
        footer={{
          totalItems: promocoes.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
          currentPage,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
        }}
      />
    </div>
  );
};

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredData = useMemo(() => {
    if (!search) return promocoes;
    const q = search.toLowerCase();
    return promocoes.filter((p) => p.nome.toLowerCase().includes(q));
  }, [search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div style={{ width: 500 }}>
      <TableV2
        columns={colunasLargas}
        data={paginatedData}
        header={{
          searchPlaceholder: 'Buscar...',
          onSearchChange: (val) => { setSearch(val); setCurrentPage(1); },
        }}
        footer={{
          totalItems: filteredData.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
          currentPage,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
        }}
      />
    </div>
  );
};

export const AcoesEmMassa: StoryFn = () => {
  const [selected, setSelected] = useState<Promocao[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    if (!search) return promocoes;
    const q = search.toLowerCase();
    return promocoes.filter((p) => p.nome.toLowerCase().includes(q));
  }, [search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div style={{ width: 800 }}>
      <TableV2
        columns={colunasPadrao}
        data={paginatedData}
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
          onSearchChange: (val) => { setSearch(val); setCurrentPage(1); },
        }}
        footer={{
          totalItems: filteredData.length,
          defaultPageSize: 10,
          pageSizeOptions: [5, 10, 25],
          currentPage,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
        }}
      />
    </div>
  );
};

AcoesEmMassa.storyName = 'Ações em Massa';

// ─── Seleção com Linhas Desabilitadas ────────────────────────────────────────
export const SelecaoComLinhasDesabilitadas: StoryFn = () => {
  const [selected, setSelected] = useState<Promocao[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return promocoes.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

  return (
    <div style={{ width: 800, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 13, color: 'var(--color-neutral-low-medium)', margin: 0 }}>
        Promoções <strong>Expiradas</strong> têm o checkbox desabilitado —{' '}
        <code>{`rowSelection={{ disabled: (row) => row.status === 'Expirada' }}`}</code>
      </p>
      <TableV2
        columns={colunasPadrao}
        data={paginatedData}
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
          currentPage,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); },
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

