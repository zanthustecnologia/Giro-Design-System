// Filter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Filter from './Filter';
import type { FilterProps } from './Filter';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
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
    position: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
      description: 'Posição do dropdown',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outlined', 'text'],
      },
      description: 'Variante do botão',
      table: {
        type: { summary: "'filled' | 'outlined' | 'text'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['checkbox', 'text', 'icon'],
      },
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
];

const priorityItems = [
  { id: 'alta', text: 'Alta' },
  { id: 'media', text: 'Média' },
  { id: 'baixa', text: 'Baixa' },
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
    position: 'left',
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
    position: 'left',
    variant: 'outlined',
  },
};

export const RightPosition: Story = {
  render: FilterTemplate,
  args: {
    items: priorityItems,
    buttonText: 'Prioridade',
    type: 'checkbox',
    position: 'right',
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
    position: 'left',
    variant: 'outlined',
  },
};

// ✅ NOVO: Story para testar o filtro de calendário
export const CalendarFilter: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    
    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      console.log(date);
      console.log('✅ Data selecionada no Filter:', date.toLocaleDateString('pt-BR'));
    };

    const handleClearDate = () => {
      setSelectedDate(null);
      console.log('✅ Data limpa no Filter');
    };

    return (
      <div style={{ padding: '2rem', minHeight: '500px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Filter
            type="calendar"
            buttonText={selectedDate ? selectedDate.toLocaleDateString('pt-BR') : "Selecionar Data"}
            selectedDate={selectedDate}
            onDateSelect={date=> console.log(date)}
            locale="pt-br"
            variant="outlined"
            position="left"
          />
        </div>
        
        {/* ✅ Botão para limpar data para testes */}
        {selectedDate && (
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={handleClearDate} style={{
              padding: '8px 16px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Limpar Data
            </button>
          </div>
        )}
        
        {/* ✅ Debug info */}
        <div style={{ 
          padding: '1rem', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>Estado do Filtro:</h4>
          <p><strong>Data Selecionada:</strong> {selectedDate ? selectedDate.toString() : 'Nenhuma'}</p>
          <p><strong>Data Formatada (pt-BR):</strong> {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'N/A'}</p>
          <p><strong>Timestamp:</strong> {selectedDate ? selectedDate.getTime() : 'N/A'}</p>
        </div>
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
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
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
        
        {/* Mostrar filtros ativos */}
        <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4>Filtros Aplicados:</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {statusFilters.map(id => (
              <span key={`status-${id}`} style={{
                padding: '4px 8px',
                background: '#007bff',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                Status: {id}
              </span>
            ))}
            {categoryFilters.map(id => (
              <span key={`category-${id}`} style={{
                padding: '4px 8px',
                background: '#28a745',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                Categoria: {id}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
};