import React, { useState, useMemo } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Table2, Chips, Button, Menu } from '@giro-ds/react';
import type { FilterItem } from '@giro-ds/react';
import { MoreVertical16Regular } from '@fluentui/react-icons';
import { createColumnHelper } from '@tanstack/react-table';

const meta: Meta = {
  title: 'Components/Table2',
  component: Table2,
  parameters: { layout: 'centered' },
};

export default meta;

// --- Tipos ---
type Promocao = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  status: string;
  inicio: string;
};

// --- Dataset ---
const promocoes: Promocao[] = [
  { id: 1, nome: 'Black Friday', descricao: 'Desconto progressivo de 20%', tipo: 'Desconto', status: 'Ativa', inicio: '24/11/2024' },
  { id: 2, nome: 'Frete Grátis Natal', descricao: 'Frete grátis acima de R$ 100', tipo: 'Frete Grátis', status: 'Agendada', inicio: '01/12/2024' },
  { id: 3, nome: 'Cliente VIP', descricao: '15% exclusivo para clientes VIP', tipo: 'Desconto', status: 'Ativa', inicio: '01/11/2024' },
  { id: 4, nome: 'Liquidação Verão', descricao: 'Queima de estoque sazonal', tipo: 'Desconto', status: 'Expirada', inicio: '15/01/2024' },
  { id: 5, nome: 'Cashback Especial', descricao: '10% de volta em toda compra', tipo: 'Cashback', status: 'Inativa', inicio: '01/10/2024' },
  { id: 6, nome: 'Primeira Compra', descricao: 'Desconto para novos clientes', tipo: 'Desconto', status: 'Ativa', inicio: '01/01/2024' },
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

// --- Column Helpers ---
const columnHelper = createColumnHelper<Promocao>();

const colunasPadrao = [
  columnHelper.accessor('nome', {
    header: 'Nome',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('tipo', {
    header: 'Tipo',
    cell: (info) => (
      <Chips variant={tipoColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Chips variant={statusColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
  columnHelper.display({
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

const colunasComDescricao = [
  columnHelper.accessor('nome', {
    header: 'Nome',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('descricao', {
    header: 'Descrição',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('inicio', {
    header: 'Início',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Chips variant={statusColor[info.getValue()] ?? 'neutral'}>
        {info.getValue()}
      </Chips>
    ),
  }),
];

// --- Stories ---

// Padrão — tabela básica com chips e ações
export const Padrao: StoryFn = () => (
  <div style={{ width: 700 }}>
    <Table2 columns={colunasPadrao} data={promocoes} enableFilters />
  </div>
);

// Com descrição — colunas extras de texto
export const ComDescricao: StoryFn = () => (
  <div style={{ width: 800 }}>
    <Table2 columns={colunasComDescricao} data={promocoes} enableFilters />
  </div>
);

// Somente uma coluna
export const ColunaUnica: StoryFn = () => {
  const cols = [
    columnHelper.accessor('nome', {
      header: 'Nome da Promoção',
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div style={{ width: 400 }}>
      <Table2 columns={cols} data={promocoes} enableFilters />
    </div>
  );
};

// ComHeader — busca global + filtros de Status e Data de início
export const ComHeader: StoryFn = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);

  const dadosFiltrados = useMemo(() => {
    let result = promocoes;
    if (selectedStatus.length > 0) {
      result = result.filter((p) =>
        selectedStatus.includes(p.status.toLowerCase()),
      );
    }
    if (dataInicio) {
      result = result.filter(
        (p) =>
          new Date(
            p.inicio.split('/').reverse().join('-'),
          ) >= dataInicio,
      );
    }
    return result;
  }, [selectedStatus, dataInicio]);

  const filterItems: FilterItem[] = [
    {
      id: 'status',
      buttonText:
        selectedStatus.length > 0
          ? `Status (${selectedStatus.length})`
          : 'Status',
      type: 'checkbox',
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
      type: 'calendar',
      selectedDate: dataInicio,
      onDateSelect: setDataInicio,
      onClear: () => setDataInicio(null),
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
    },
  ];

  return (
    <div style={{ width: 800 }}>
      <Table2
        columns={colunasPadrao}
        data={dadosFiltrados}
        header={{
          searchPlaceholder: 'Buscar promoções...',
          filterItems,
        }}
      />
    </div>
  );
};

// Sem dados
export const Vazia: StoryFn = () => (
  <div style={{ width: 700 }}>
    <Table2 columns={colunasPadrao} data={[]} />
  </div>
);
