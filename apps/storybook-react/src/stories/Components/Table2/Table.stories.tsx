import { MoreVertical16Regular } from '@fluentui/react-icons';
import { Table2, Chips, Button, Menu } from '@giro-ds/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useState, useMemo } from 'react';

import type { FilterItem } from '@giro-ds/react';
import type { Meta, StoryFn } from '@storybook/react-vite';

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Promocao = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  status: string;
  inicio: string;
};

// ─── Dataset ──────────────────────────────────────────────────────────────────
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

// ─── Com Checkbox ─────────────────────────────────────────────────────────────
export const ComCheckbox: StoryFn = () => {
  const [selecionados, setSelecionados] = useState<Promocao[]>([]);

  return (
    <div style={{ width: 700 }}>
      <Table2
        columns={colunasPadrao}
        data={promocoes}
        enableRowSelection
        onRowSelectionChange={setSelecionados}
      />
      {selecionados.length > 0 && (
        <p style={{ marginTop: 12, fontSize: 14, color: '#555' }}>
          Selecionados: {selecionados.map((r) => r.nome).join(', ')}
        </p>
      )}
    </div>
  );
};



// ─── Com Header ───────────────────────────────────────────────────────────────
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
        (p) => new Date(p.inicio.split('/').reverse().join('-')) >= dataInicio,
      );
    }
    return result;
  }, [selectedStatus, dataInicio]);

  const filterItems: FilterItem[] = [
    {
      id: 'status',
      buttonText: selectedStatus.length > 0
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



// ─── Com Footer ───────────────────────────────────────────────────────────────
export const ComFooter: StoryFn = () => (
  <div style={{ width: 700 }}>
    <Table2
      columns={colunasPadrao}
      data={promocoes}
      footer={{
        totalItems: promocoes.length,
        defaultPageSize: 3,
        pageSizeOptions: [3, 5, 10],
      }}
    />
  </div>
);



// ─── Completo ─────────────────────────────────────────────────────────────────
export const Completo: StoryFn = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selecionados, setSelecionados] = useState<Promocao[]>([]);

  const dadosFiltrados = useMemo(() => {
    if (selectedStatus.length === 0) return promocoes;
    return promocoes.filter((p) =>
      selectedStatus.includes(p.status.toLowerCase()),
    );
  }, [selectedStatus]);

  const filterItems: FilterItem[] = [
    {
      id: 'status',
      buttonText: selectedStatus.length > 0
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
  ];

  return (
    <div style={{ width: 900 }}>
      <Table2
        columns={colunasPadrao}
        data={dadosFiltrados}
        enableRowSelection
        onRowSelectionChange={setSelecionados}
        header={{
          searchPlaceholder: 'Buscar promoções...',
          filterItems,
        }}
        footer={{
          totalItems: dadosFiltrados.length,
          defaultPageSize: 3,
          pageSizeOptions: [3, 5, 10],
        }}
      />
      {selecionados.length > 0 && (
        <p style={{ marginTop: 12, fontSize: 14, color: '#555' }}>
          {selecionados.length} selecionado(s):{' '}
          {selecionados.map((r) => r.nome).join(', ')}
        </p>
      )}
    </div>
  );
};

Completo.storyName = 'Completo (Header + Checkbox + Footer)';

// ─── Vazia ────────────────────────────────────────────────────────────────────
export const Vazia: StoryFn = () => (
  <div style={{ width: 700 }}>
    <Table2 columns={colunasPadrao} data={[]} />
  </div>
);


