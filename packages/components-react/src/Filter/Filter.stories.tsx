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
        options: ['left', 'right'], // ✅ Correct placement
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
        options: ['filled', 'outlined', 'text'], // ✅ Correct placement
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

  const handleOptionToggle = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
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

// ✅ Story com Calendar
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

// ✅ Story com Dropdown de posição direita
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
          selectedCount={selectedItems.length}
          baseCount={baseCount}
          showIncremental={true}
          onBadgeClick={handleBadgeClick}
          badgeAriaLabel={`${incrementalCount} tecnologias adicionais selecionadas. Clique para resetar.`}
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

// // ✅ Story demonstrando contador incremental simples
// export const IncrementalCounterDemo: Story = {
//   render: (args: FilterProps) => {
//     const [totalCount, setTotalCount] = useState(1); // Começa com 1 (base)
//     const baseCount = 1;

//     const addItem = () => setTotalCount(prev => prev + 1);
//     const removeItem = () => setTotalCount(prev => Math.max(baseCount, prev - 1));
//     const reset = () => setTotalCount(baseCount);

//     return (
//       <div style={{ padding: '2rem', minHeight: '400px' }}>
//         <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
//           <button onClick={addItem} style={{ padding: '0.5rem 1rem', background: '#3b45f2', color: 'white', border: 'none', borderRadius: '4px' }}>
//             + Adicionar Item
//           </button>
//           <button onClick={removeItem} style={{ padding: '0.5rem 1rem', background: '#e81e42', color: 'white', border: 'none', borderRadius: '4px' }}>
//             - Remover Item
//           </button>
//           <button onClick={reset} style={{ padding: '0.5rem 1rem', background: '#88898c', color: 'white', border: 'none', borderRadius: '4px' }}>
//             Reset
//           </button>
//         </div>

//         <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
//           <h4>📊 Status do Contador</h4>
//           <p><strong>Base (sempre ativo):</strong> {baseCount}</p>
//           <p><strong>Total selecionado:</strong> {totalCount}</p>
//           <p><strong>Incremento:</strong> +{totalCount - baseCount}</p>
//           <p><strong>Regra:</strong> Badge só aparece com mais de 1 item selecionado</p>
//           <p><strong>Badge exibe:</strong> {totalCount > 1 ? `+${totalCount - baseCount}` : 'Oculto (≤1 item)'}</p>
//         </div>

//         <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
//           <div>
//             <h5>🎯 Exemplo: 5 itens (base=1)</h5>
//             <Filter
//               {...args}
//               buttonText="Categorias"
//               selectedCount={5}
//               baseCount={1}
//               showIncremental={true}
//               badgeAriaLabel="4 categorias adicionais selecionadas"
//             >
//               <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', width: '200px' }}>
//                 <p>Badge mostra: <strong>+4</strong></p>
//                 <p>(5 total - 1 base = +4)</p>
//               </div>
//             </Filter>
//           </div>

//           <div>
//             <h5>🔄 Contador Dinâmico</h5>
//             <Filter
//               {...args}
//               buttonText="Produtos"
//               selectedCount={totalCount}
//               baseCount={baseCount}
//               showIncremental={true}
//               badgeAriaLabel={`${totalCount - baseCount} produtos adicionais`}
//             >
//               <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', width: '200px' }}>
//                 <p>Use os botões acima para testar</p>
//                 <p>Badge: {totalCount > 1 ? `+${totalCount - baseCount}` : 'Oculto (≤1 item)'}</p>
//               </div>
//             </Filter>
//           </div>
//         </div>
//       </div>
//     );
//   },
//   args: {
//     filterPosition: 'left',
//     variant: 'outlined',
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Demonstração interativa do contador incremental. O badge mostra "+X" onde X = total - base. **Regra importante:** O badge só aparece quando há mais de 1 item selecionado, caso contrário apenas o texto é exibido.'
//       }
//     }
//   }
// };

// // ✅ Story demonstrando o gerenciamento interno de itens
// export const InternalStateManagement: Story = {
//   render: (args: FilterProps) => {
//     // ✅ Usando o hook personalizado para gerenciar estado
//     const filterState = useFilterState(['1', '3']); // Inicia com 2 itens selecionados

//     const dropdownItems: DropdownItem[] = [
//       { id: '1', text: 'JavaScript', subText: 'Linguagem base' },
//       { id: '2', text: 'TypeScript', subText: 'Superset tipado' },
//       { id: '3', text: 'React', subText: 'Biblioteca UI' },
//       { id: '4', text: 'Vue.js', subText: 'Framework progressivo' },
//       { id: '5', text: 'Angular', subText: 'Plataforma completa' },
//     ];

//     return (
//       <div style={{ padding: '2rem', minHeight: '500px' }}>
//         <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
//           <h4>🔧 Gerenciamento Interno de Estado</h4>
//           <p><strong>Itens selecionados:</strong> {filterState.selectedItems.join(', ') || 'Nenhum'}</p>
//           <p><strong>Contagem:</strong> {filterState.count}</p>
//           <p><strong>Regra do Badge:</strong> Só aparece com mais de 1 item selecionado</p>
//           <p><strong>Badge mostra:</strong> {filterState.count > 1 ? `+${filterState.count - 1} (${filterState.count} total)` : 'Oculto (≤1 item)'}</p>
          
//           <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
//             <button onClick={() => filterState.clearItems()} style={{ padding: '0.25rem 0.5rem', fontSize: '12px' }}>
//               Limpar Tudo
//             </button>
//             <button onClick={() => filterState.addItem('2')} style={{ padding: '0.25rem 0.5rem', fontSize: '12px' }}>
//               + TypeScript
//             </button>
//             <button onClick={() => filterState.toggleItem('4')} style={{ padding: '0.25rem 0.5rem', fontSize: '12px' }}>
//               Toggle Vue.js
//             </button>
//           </div>
//         </div>

//         {/* ✅ Filter com gerenciamento automático */}
//         <Filter
//           {...args}
//           buttonText="Tecnologias"
//           selectedItems={filterState.selectedItems}
//           onSelectionChange={filterState.setSelectedItems}
//           baseCount={1}
//           showIncremental={true}
//           badgeAriaLabel={`${filterState.count - 1} tecnologias adicionais selecionadas`}
//         >
//           <Dropdown
//             items={dropdownItems}
//             type="checkbox"
//             applySearch={true}
//             placeholder="Buscar tecnologias..."
//             showSubText={true}
//             defaultSelectedIds={filterState.selectedItems}
//           />
//         </Filter>
//       </div>
//     );
//   },
//   args: {
//     filterPosition: 'left',
//     variant: 'outlined',
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Demonstra o gerenciamento interno de itens selecionados usando o hook `useFilterState`. O Filter sincroniza automaticamente com o Dropdown e atualiza o badge baseado na seleção.'
//       }
//     }
//   }
// };

// ✅ Story demonstrando modo não controlado (mais simples)
export const UncontrolledFilter: Story = {
  render: (args: FilterProps) => {
    const dropdownItems: DropdownItem[] = [
      { id: '1', text: 'Ativo', subText: 'Itens ativos' },
      { id: '2', text: 'Inativo', subText: 'Itens inativos' },
      { id: '3', text: 'Pendente', subText: 'Aguardando aprovação' },
      { id: '4', text: 'Arquivado', subText: 'Itens arquivados' },
    ];

    return (
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e8f4fd', borderRadius: '8px' }}>
          <h4>🎯 Modo Não Controlado (Simples)</h4>
          <p>O Filter gerencia seu próprio estado interno automaticamente.</p>
          <p>Ideal para casos simples onde você não precisa acessar o estado externamente.</p>
          <ul>
            <li>✅ Sem necessidade de useState</li>
            <li>✅ Badge atualiza automaticamente</li>
            <li>✅ Integração automática com Dropdown</li>
          </ul>
        </div>

        <Filter
          {...args}
          buttonText="Status"
          defaultSelectedItems={['1']} // Estado inicial
          baseCount={1}
          showIncremental={true}
          onSelectionChange={(items) => console.log('Seleção mudou:', items)}
        >
          <Dropdown
            items={dropdownItems}
            type="checkbox"
            placeholder="Filtrar por status..."
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
        story: 'Modo não controlado onde o Filter gerencia o estado interno automaticamente. Use `defaultSelectedItems` para definir o estado inicial e `onSelectionChange` para monitorar mudanças.'
      }
    }
  }
};