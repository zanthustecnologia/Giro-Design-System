// Filter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Filter } from '@giro-ds/react';
import type { FilterProps } from '@giro-ds/react';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    docs: {
      description: {
        component: 'Componente de filtro que encapsula o Dropdown com modo filter automático.',
      },
    },
  },
  argTypes: {
    buttonText: {
      control: { type: 'text' },
      description: 'Texto exibido no botão do filtro',
      table: {
        type: { summary: 'string | ReactNode' },
        defaultValue: { summary: 'Filter' },
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Lado de abertura do popover em relação ao botão',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Alinhamento do popover em relação ao botão',
      table: {
        type: { summary: "'start' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'Variante do botão',
      table: {
        type: { summary: "'filled' | 'outlined' | 'text'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    type: {
      control: 'select',
      options: ['checkbox', 'text', 'icon'],
      description: 'Tipo do dropdown',
      table: {
        type: { summary: "'checkbox' | 'text' | 'icon'" },
        defaultValue: { summary: 'checkbox' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Se o filtro está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    enableSearch: {
      control: { type: 'boolean' },
      description: 'Habilita busca no dropdown',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onApplyFilter: {
      action: 'filter-applied',
      description: 'Callback quando filtros são aplicados',
      table: {
        type: { summary: '(selectedIds: string[]) => void' },
      },
    },
    onOpen: {
      action: 'opened',
      description: 'Callback quando abre',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback quando fecha',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Dados de exemplo para os filtros
const statusItems = [
  { id: 'ativo', text: 'Ativo' },
  { id: 'inativo', text: 'Inativo' },
  { id: 'pendente', text: 'Pendente' },
  { id: 'bloqueado', text: 'Bloqueado' },
];

const categoryItems = [
  { id: 'tecnologia', text: 'Tecnologia', subText: 'Produtos de tecnologia' },
  { id: 'casa', text: 'Casa e Jardim', subText: 'Itens para o lar' },
  { id: 'moda', text: 'Moda', subText: 'Roupas e acessórios' },
  { id: 'esportes', text: 'Esportes', subText: 'Equipamentos esportivos' },
  { id: 'livros', text: 'Livros', subText: 'Literatura e educação' },
  { id: 'alimentacao', text: 'Alimentação', subText: 'Produtos alimentícios' },
  { id: 'beleza', text: 'Beleza', subText: 'Cosméticos e cuidados' },
  { id: 'eletronicos', text: 'Eletrônicos', subText: 'Gadgets e acessórios' },
  { id: 'automotivo', text: 'Automotivo', subText: 'Peças e acessórios' },
];

// Template básico com Dropdown integrado
const FilterTemplate = (args: FilterProps) => {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const handleApplyFilter = (selectedIds: string[]) => {
    setAppliedFilters(selectedIds);
    console.log('✅ Filtros APLICADOS e GUARDADOS:', selectedIds);
  };

  return (
      <Filter
        {...args}
        selectedIds={appliedFilters}
        onApplyFilter={handleApplyFilter}
      />
  );
};

// ✅ STORIES ATUALIZADAS

export const Default: Story = {
  render: FilterTemplate,
  args: {
    items: statusItems,
    buttonText: 'Status',
    type: 'checkbox',
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
    disabled: false,
  },
};

export const WithSearch: Story = {
  render: FilterTemplate,
  args: {
    items: categoryItems,
    buttonText: 'Categoria',
    type: 'checkbox',
    enableSearch: true,
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
  },
};

export const Disabled: Story = {
  render: FilterTemplate,
  args: {
    items: statusItems,
    buttonText: 'Status',
    type: 'checkbox',
    disabled: true,
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
  },
};

// ✅ NOVO: Story para testar o filtro de calendário
export const CalendarFilter: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
    };

    const handleClearDate = () => {
      setSelectedDate(null);
    };

    return (
      <div style={{ padding: '2rem' }}>
        <Filter
          type="calendar"
          buttonText={selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Selecionar Data'}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          locale="pt-br"
          variant="outlined"
          position="left"
          onClearDate={handleClearDate}
        />
      </div>
    );
  },
};

// ✅ EXEMPLO AVANÇADO - Múltiplos filtros trabalhando juntos
export const MultipleFilters: Story = {
  render: () => {
    const [statusFilters, setStatusFilters] = useState<string[]>([]);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Filter
            items={statusItems}
            buttonText='Status'
            selectedIds={statusFilters}
            onApplyFilter={setStatusFilters}
            type="checkbox"
            variant="outlined"
          />
          <Filter
            items={categoryItems}
            buttonText='Categoria'
            selectedIds={categoryFilters}
            onApplyFilter={setCategoryFilters}
            type="checkbox"
            variant="outlined"
            enableSearch={true}
          />
        </div>
      </div>
    );
  },
};