// Filter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Filter, { useFilterState } from './Filter';
import Calendar from '../Calendar/Calendar';
import Dropdown from '../Dropdown/Dropdown';
import type { FilterProps } from './Filter';
import type { DropdownItem } from '../Dropdown/Dropdown';
import { Calendar16Regular } from '@fluentui/react-icons';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de filtro com dropdown para seleção de opções.',
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
    filterPosition: {
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
    icon: {
      control: false,
      description: 'Ícone do botão',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    children: {
      control: false,
      description: 'Conteúdo do filtro',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback quando o estado muda',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
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

// Template for interactive stories
const Template = (args: FilterProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedValues(selectedIds);
  };


  const displayText = selectedValues.length > 0
    ? `${selectedValues.length} selected`
    : args.buttonText || 'Filter';

  return (
    <div style={{ padding: '2rem', minHeight: '300px' }}>
      <Filter
        {...args}
        buttonText={displayText}
        
        >
        <Dropdown
          items={[
            { id: '1', text: 'Option 1' },
            { id: '2', text: 'Option 2' },
            { id: '3', text: 'Option 3' },
          ]}
          type="checkbox"
          applySearch={true}
          placeholder="Select options..."
          onSelectionChange={handleSelectionChange}
          showSubText={true}
          defaultSelectedIds={selectedValues}
        />
      </Filter>
    </div>
  );
};

// Stories
export const Default: Story = {
  render: Template,
  args: {
    buttonText: 'Filter',
    filterPosition: 'left',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter básico sem conteúdo específico, ideal para demonstrar o comportamento base do componente.'
      }
    }
  }
};

export const RightPosition: Story = {
  render: Template,
  args: {
    buttonText: 'Filter',
    filterPosition: 'right',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter com dropdown posicionado à direita, útil quando o componente está próximo à borda direita da tela.'
      }
    }
  }
};

export const FilledVariant: Story = {
  render: Template,
  args: {
    buttonText: 'Filter',
    variant: 'filled',
    filterPosition: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter com variante filled (preenchida), proporcionando maior destaque visual.'
      }
    }
  }
};


export const WithCalendar: Story = {
  render: (args: FilterProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (date: Date | null) => {
      if (!date) return 'Selecionar Data';
      return date.toLocaleDateString('pt-BR');
    };

    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
      setIsOpen(false); // Fecha o filtro após seleção
    };

    return (
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <Filter
          {...args}
          buttonText={formatDate(selectedDate)}
          icon={<Calendar16Regular />}
          onToggle={(open) => setIsOpen(open)}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          {isOpen && (
            <Calendar
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              onDaySelect={handleDateChange}
              locale="pt-br"
              format="dd/mm/yyyy"
            />
          )}
        </Filter>
      </div>
    );
  },
  args: {
    filterPosition: 'left',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter integrado com Calendar para seleção de datas. O filtro fecha automaticamente após a seleção de uma data.'
      }
    }
  }
};

// ✅ Story com Dropdown
export const WithDropdown: Story = {
  render: (args: FilterProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const dropdownItems: DropdownItem[] = [
      { id: '1', text: 'Categoria A', subText: 'Descrição da categoria A' },
      { id: '2', text: 'Categoria B', subText: 'Descrição da categoria B' },
      { id: '3', text: 'Categoria C', subText: 'Descrição da categoria C' },
      { id: '4', text: 'Categoria D', subText: 'Descrição da categoria D' },
      { id: '5', text: 'Categoria E', subText: 'Descrição da categoria E' },
    ];

    const getButtonText = () => {
      if (selectedItems.length === 0) return 'Selecionar Categorias';
      if (selectedItems.length === 1) {
        const item = dropdownItems.find(item => item.id === selectedItems[0]);
        return item?.text || 'Categoria selecionada';
      }
      return `${selectedItems.length} categorias selecionadas`;
    };

    const handleSelectionChange = (selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    };

    return (
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <Filter
          {...args}
          buttonText={getButtonText()}
        >
          <Dropdown
            items={dropdownItems}
            type="checkbox"
            applySearch={true}
            placeholder="Buscar categorias..."
            onSelectionChange={handleSelectionChange}
            showSubText={true}
            defaultSelectedIds={selectedItems}
          />
        </Filter>
      </div>
    );
  },
  args: {
    filterPosition: 'left',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter integrado com Dropdown multi-seleção. Permite busca e exibe o número de itens selecionados no botão.'
      }
    }
  }
};


export const WithDropdownRightPosition: Story = {
  render: (args: FilterProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['2']);

    const dropdownItems: DropdownItem[] = [
      { id: '1', text: 'Todos', subText: 'Mostrar todos os itens' },
      { id: '2', text: 'Ativos', subText: 'Itens ativos apenas' },
      { id: '3', text: 'Inativos', subText: 'Itens inativos apenas' },
      { id: '4', text: 'Pendentes', subText: 'Itens pendentes de aprovação' },
    ];

    const getButtonText = () => {
      if (selectedItems.length === 0) return 'Status';
      const item = dropdownItems.find(item => item.id === selectedItems[0]);
      return item?.text || 'Status';
    };

    const handleSelectionChange = (selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    };

    return (
      <div style={{ padding: '2rem', minHeight: '400px', display: 'flex', justifyContent: 'flex-end' }}>
        <Filter
          {...args}
          buttonText={getButtonText()}
        >
          <Dropdown
            items={dropdownItems}
            type="text"
            applySearch={false}
            onSelectionChange={handleSelectionChange}
            showSubText={true}
            defaultSelectedIds={selectedItems}
          />
        </Filter>
      </div>
    );
  },
  args: {
    filterPosition: 'right',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter com Dropdown posicionado à direita, ideal para filtros de status ou single-selection.'
      }
    }
  }
};

// ✅ Story com contador incremental
export const WithIncrementalBadge: Story = {
  render: (args: FilterProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['1', '3', '5', '7']);
    const baseCount = 1; // Valor base (ex: 1 item já selecionado por padrão)

    const dropdownItems: DropdownItem[] = [
      { id: '1', text: 'JavaScript', subText: 'Linguagem principal' },
      { id: '2', text: 'TypeScript', subText: 'Superset do JavaScript' },
      { id: '3', text: 'React', subText: 'Biblioteca para UI' },
      { id: '4', text: 'Vue.js', subText: 'Framework progressivo' },
      { id: '5', text: 'Angular', subText: 'Plataforma completa' },
      { id: '6', text: 'Node.js', subText: 'Runtime JavaScript' },
      { id: '7', text: 'Express', subText: 'Framework web' },
      { id: '8', text: 'Next.js', subText: 'Framework React' },
    ];

    const handleSelectionChange = (selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    };

    const handleBadgeClick = () => {
      // Mantém apenas o item base selecionado
      setSelectedItems(['1']);
    };

    const incrementalCount = selectedItems.length - baseCount;

    return (
      <div style={{ padding: '2rem', minHeight: '500px' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
          <h4>Contador Incremental</h4>
          <p><strong>Base:</strong> {baseCount} item(s) sempre selecionado(s)</p>
          <p><strong>Total selecionado:</strong> {selectedItems.length}</p>
          <p><strong>Incremento:</strong> +{incrementalCount > 0 ? incrementalCount : 0}</p>
          <p><strong>Badge mostra:</strong> {incrementalCount > 0 ? `+${incrementalCount}` : 'Somente texto'}</p>
        </div>

        <Filter
          {...args}
          buttonText="Tecnologias"
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
        >
          <Dropdown
            items={dropdownItems}
            type="checkbox"
            applySearch={true}
            placeholder="Buscar tecnologias..."
            onSelectionChange={handleSelectionChange}
            showSubText={true}
            defaultSelectedIds={selectedItems}
          />
        </Filter>
      </div>
    );
  },
  args: {
    filterPosition: 'left',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter com badge incremental que mostra "+X" onde X é a diferença entre o total selecionado e o valor base. Útil quando há itens pré-selecionados e você quer mostrar apenas os adicionais.'
      }
    }
  }
};

// ✅ Story demonstrando badge automático
export const AutomaticBadge: Story = {
  render: (args: FilterProps) => {
    const dropdownItems: DropdownItem[] = [
      { id: '1', text: 'JavaScript', subText: 'Linguagem versátil' },
      { id: '2', text: 'TypeScript', subText: 'JavaScript tipado' },
      { id: '3', text: 'React', subText: 'Biblioteca para UI' },
      { id: '4', text: 'Vue.js', subText: 'Framework progressivo' },
      { id: '5', text: 'Angular', subText: 'Plataforma completa' },
    ];

    return (
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0c4a6e' }}>🎯 Badge Automático</h4>
          <p>O Filter detecta automaticamente quando é um filtro múltiplo (Dropdown com type="checkbox") e mostra o badge apenas quando há mais de 1 item selecionado.</p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>✅ Badge aparece automaticamente para filtros múltiplos</li>
            <li>✅ Só mostra quando há mais de 1 item selecionado</li>
            <li>✅ Não precisa de configuração adicional</li>
            <li>✅ Estado interno gerenciado automaticamente</li>
          </ul>
        </div>

        <Filter
          {...args}
          buttonText="Tecnologias"
        >
          <Dropdown
            items={dropdownItems}
            type="checkbox"
            applySearch={true}
            placeholder="Buscar tecnologias..."
            showSubText={true}
          />
        </Filter>
      </div>
    );
  },
  args: {
    filterPosition: 'left',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração do comportamento automático do badge. O Filter detecta automaticamente que é um filtro múltiplo e exibe o badge quando há mais de 1 item selecionado. Não requer configuração adicional.'
      }
    }
  }
};

// ✅ Story demonstrando o comportamento: Primeiro item + contador incremental
export const FirstItemPlusIncrement: Story = {
  render: (args: FilterProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['javascript', 'react', 'typescript']);

    const dropdownItems: DropdownItem[] = [
      { id: 'javascript', text: 'JavaScript', subText: 'Linguagem de programação' },
      { id: 'typescript', text: 'TypeScript', subText: 'Superset do JavaScript' },
      { id: 'react', text: 'React', subText: 'Biblioteca para UI' },
      { id: 'vue', text: 'Vue.js', subText: 'Framework progressivo' },
      { id: 'angular', text: 'Angular', subText: 'Plataforma completa' },
      { id: 'svelte', text: 'Svelte', subText: 'Framework compilado' },
      { id: 'nextjs', text: 'Next.js', subText: 'Framework React' },
      { id: 'nuxt', text: 'Nuxt.js', subText: 'Framework Vue' },
    ];

    const handleSelectionChange = (newSelection: string[]) => {
      setSelectedItems(newSelection);
    };

    const addRandomItem = () => {
      const unselectedItems = dropdownItems.filter(item => item.id && !selectedItems.includes(item.id));
      if (unselectedItems.length > 0) {
        const randomItem = unselectedItems[Math.floor(Math.random() * unselectedItems.length)];
        if (randomItem.id) {
          setSelectedItems([...selectedItems, randomItem.id]);
        }
      }
    };

    const removeLastItem = () => {
      if (selectedItems.length > 0) {
        setSelectedItems(selectedItems.slice(0, -1));
      }
    };

    const reset = () => setSelectedItems([]);

    return (
      <div style={{ padding: '2rem', minHeight: '500px' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🎯 Comportamento: Primeiro Item + Contador</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <strong>Regras:</strong>
              <ul style={{ fontSize: '14px', marginTop: '0.5rem' }}>
                <li>0 itens: Texto padrão</li>
                <li>1 item: Nome do item</li>
                <li>2+ itens: Primeiro item + badge (+X)</li>
              </ul>
            </div>
            
            <div>
              <strong>Estado Atual:</strong>
              <br />Selecionados: {selectedItems.length}
              <br />Primeiro: {selectedItems[0] ? dropdownItems.find(item => item.id === selectedItems[0])?.text : 'Nenhum'}
              <br />Badge: {selectedItems.length > 1 ? `+${selectedItems.length - 1}` : 'Oculto'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={addRandomItem}
              disabled={selectedItems.length >= dropdownItems.length}
              style={{ 
                padding: '0.5rem 1rem', 
                background: selectedItems.length >= dropdownItems.length ? '#94a3b8' : '#10b981', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: selectedItems.length >= dropdownItems.length ? 'not-allowed' : 'pointer'
              }}
            >
              ➕ Adicionar Item
            </button>
            <button 
              onClick={removeLastItem}
              disabled={selectedItems.length === 0}
              style={{ 
                padding: '0.5rem 1rem', 
                background: selectedItems.length === 0 ? '#94a3b8' : '#ef4444', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ➖ Remover Item
            </button>
            <button 
              onClick={reset}
              style={{ 
                padding: '0.5rem 1rem', 
                background: '#6366f1', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        <Filter
          {...args}
          buttonText="Selecionar Tecnologias"
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
        >
          <Dropdown
            items={dropdownItems}
            type="checkbox"
            applySearch={true}
            placeholder="Buscar tecnologias..."
            showSubText={true}
          />
        </Filter>
      </div>
    );
  },
  args: {
    filterPosition: 'left',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: '**Comportamento Automático**: O Filter mostra o nome do primeiro item selecionado como texto do botão e um badge com "+X" para os itens adicionais. Esse comportamento é completamente automático e interno ao componente.'
      }
    }
  }
};