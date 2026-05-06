import { MoreVertical16Regular } from '@fluentui/react-icons';
import { Table2, Chips, Button, Menu, Avatar } from '@giro-ds/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useState, useMemo } from 'react';

import type { Meta, StoryFn } from '@storybook/react-vite';

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Promocao = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  status: string;
  inicio: string;
  inicioObj: Date;
};

// ─── Dataset ──────────────────────────────────────────────────────────────────
const promocoes: Promocao[] = [
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

// ─── Colunas ──────────────────────────────────────────────────────────────────
const col = createColumnHelper<Promocao>();

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
  col.display({
    id: 'actions',
    header: '',
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

const colunasComData = [
  col.accessor('nome', {
    header: 'Nome',
    cell: (info) => info.getValue(),
  }),
  col.accessor('inicio', {
    header: 'Início',
    cell: (info) => info.getValue(),
  }),
  col.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Chips variant={statusColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.display({
    id: 'actions',
    header: '',
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

const colunasCompletas = [
  col.display({
    id: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const initials = row.original.nome.split(' ').map((w) => w[0]).slice(0, 2).join('');
      return <Avatar initialLetters={initials} size="sm" />;
    },
  }),
  col.accessor('nome', {
    header: 'Nome',
    cell: (info) => info.getValue(),
  }),
  col.display({
    id: 'detalhes',
    header: 'Detalhes',
    cell: ({ row }) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <div>{row.original.nome}</div>
        <div style={{ fontSize: '12px', color: 'var(--color-neutral-low-medium)' }}>
          {row.original.descricao}
        </div>
      </div>
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
  col.display({
    id: 'actions',
    header: '',
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

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/Table2',
  component: Table2,
  parameters: { layout: 'centered' },
  argTypes: {
    enableRowSelection: {
      name: 'Checkbox de seleção',
      description: 'Exibe checkboxes para seleção de linhas',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    enableFilters: {
      name: 'Filtros por coluna',
      description: 'Exibe inputs de filtro em cada coluna do cabeçalho',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

// ─── Padrão (com controles) ───────────────────────────────────────────────────
export const Padrao: StoryFn<{
  enableRowSelection: boolean;
  enableFilters: boolean;
}> = ({ enableRowSelection, enableFilters }) => (
  <div style={{ width: 700 }}>
    <Table2
      columns={colunasPadrao}
      data={promocoes}
      enableRowSelection={enableRowSelection}
      enableFilters={enableFilters}
      onRowSelectionChange={(rows) =>
        console.warn('Selecionados:', rows.map((r) => r.nome))
      }
    />
  </div>
);

Padrao.args = {
  enableRowSelection: false,
  enableFilters: false,
};

Padrao.storyName = 'Padrão';

// ─── Com Busca e Filtros ──────────────────────────────────────────────────────
export const ComBuscaEFiltros: StoryFn = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [selecionados, setSelecionados] = useState<Promocao[]>([]);

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
      buttonText: dataInicio ? `A partir de ${dataInicio.toLocaleDateString('pt-BR')}` : 'Data de início',
      type: 'calendar' as const,
      selectedDate: dataInicio,
      onDateSelect: (date: Date) => setDataInicio(date),
      onClear: () => setDataInicio(null),
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
    },
  ];

  return (
    <div style={{ width: 900 }}>
      <Table2
        columns={colunasCompletas}
        data={dadosFiltrados}
        enableRowSelection
        onRowSelectionChange={setSelecionados}
        header={{
          searchPlaceholder: 'Buscar promoções...',
          filterItems,
        }}
        footer={{
          totalItems: dadosFiltrados.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
        }}
      />
      {selecionados.length > 0 && (
        <p style={{ marginTop: 12, fontSize: 14, color: '#555' }}>
          {selecionados.length} selecionado(s): {selecionados.map((r) => r.nome).join(', ')}
        </p>
      )}
    </div>
  );
};

// ─── Com Filtro de Calendário ─────────────────────────────────────────────────
export const ComFiltroCalendario: StoryFn = () => {
  const [dataInicio, setDataInicio] = useState<Date | null>(null);

  const dadosFiltrados = useMemo(() => {
    if (!dataInicio) return promocoes;
    return promocoes.filter((p) => p.inicioObj >= dataInicio);
  }, [dataInicio]);

  const filterItems = [
    {
      id: 'inicio',
      buttonText: dataInicio ? `A partir de ${dataInicio.toLocaleDateString('pt-BR')}` : 'Data de início',
      type: 'calendar' as const,
      selectedDate: dataInicio,
      onDateSelect: (date: Date) => setDataInicio(date),
      onClear: () => setDataInicio(null),
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
    },
  ];

  return (
    <div style={{ width: 700 }}>
      <Table2
        columns={colunasComData}
        data={dadosFiltrados}
        header={{
          showSearch: false,
          filterItems,
        }}
        footer={{
          totalItems: dadosFiltrados.length,
          defaultPageSize: 5,
          pageSizeOptions: [5, 10],
        }}
      />
    </div>
  );
};

// ─── Somente Busca ────────────────────────────────────────────────────────────
export const SomenteBusca: StoryFn = () => (
  <div style={{ width: 800 }}>
    <Table2
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

// ─── Sem Header ───────────────────────────────────────────────────────────────
export const SemHeader: StoryFn = () => (
  <div style={{ width: 800 }}>
    <Table2
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

// ─── Carregando ───────────────────────────────────────────────────────────────
export const Carregando: StoryFn = () => (
  <div style={{ width: 800 }}>
    <Table2 columns={colunasCompletas} data={[]} loading />
  </div>
);

// ─── Vazia ────────────────────────────────────────────────────────────────────
export const Vazia: StoryFn = () => (
  <div style={{ width: 800 }}>
    <Table2 columns={colunasCompletas} data={[]}  />
  </div>
);

// ─── Scroll Horizontal ────────────────────────────────────────────────────────
const colunasLargas = [
  col.accessor('nome', {
    header: 'Nome',
    size: 200,
    cell: (info) => info.getValue(),
  }),
  col.accessor('descricao', {
    header: 'Descrição',
    size: 300,
    cell: (info) => info.getValue(),
  }),
  col.accessor('tipo', {
    header: 'Tipo',
    size: 150,
    cell: (info) => (
      <Chips variant={tipoColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.accessor('status', {
    header: 'Status',
    size: 150,
    cell: (info) => (
      <Chips variant={statusColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  col.accessor('inicio', {
    header: 'Data de Início',
    size: 150,
    cell: (info) => info.getValue(),
  }),
  col.display({
    id: 'extra1',
    header: 'Coluna Extra 1',
    size: 200,
    cell: () => 'Dado extra A',
  }),
  col.display({
    id: 'extra2',
    header: 'Coluna Extra 2',
    size: 200,
    cell: () => 'Dado extra B',
  }),
  col.display({
    id: 'actions',
    header: '',
    size: 60,
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

export const ScrollHorizontal: StoryFn = () => (
  <div style={{ width: 500 }}>
    <Table2
      columns={colunasLargas}
      data={promocoes}
      header={{ searchPlaceholder: 'Buscar...' }}
      footer={{
        totalItems: promocoes.length,
        defaultPageSize: 5,
        pageSizeOptions: [5, 10],
      }}
    />
  </div>
);

ScrollHorizontal.storyName = 'Scroll Horizontal';

