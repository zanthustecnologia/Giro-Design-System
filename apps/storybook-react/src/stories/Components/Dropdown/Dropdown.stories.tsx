import React, { useState, useEffect, useCallback } from "react";
import { UsbPlug24Regular, Person16Regular, UsbPlug20Filled } from "@fluentui/react-icons";
import type { Meta, StoryFn } from '@storybook/react';
import { Dropdown } from "@giro-ds/react";
import type { DropdownItem, DropdownProps } from "@giro-ds/react";

const mockValues: DropdownItem[] = [
  { id: 'item-1', text: 'List-item 1', subText: 'List-item 1', icon: <Person16Regular /> },
  { id: 'item-2', text: 'List-item 2', disabled: true, icon: <Person16Regular /> },
  { id: 'item-3', text: 'List-item 3', disabled: true, subText: 'List-item 3', icon: <Person16Regular /> },
  { id: 'item-4', text: 'List-item 4', subText: 'List-item 4', icon: <Person16Regular /> },
  { id: 'item-5', text: 'List-item 5', subText: 'List-item 5', icon: <UsbPlug20Filled /> },
  { id: 'item-6', text: 'List-item 6', subText: 'List-item 6', icon: <Person16Regular /> },
  { id: 'item-7', text: 'List-item 7', subText: 'List-item 7', icon: <Person16Regular /> },
  { id: 'item-8', text: 'List-item 8', subText: 'List-item 8', icon: <UsbPlug24Regular /> },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    applySearch: {
      control: 'boolean',
      description: 'Habilita campo de busca'
    },
    type: {
      control: 'select',
      options: ['checkbox', 'text', 'icon'],
      description: 'Tipo do Dropdown'
    },
    showSubText: {
      control: 'boolean',
      description: 'Exibe subtexto dos itens'
    },
    items: {
      table: {
        disable: true,
      },
    },
    maxWidth: {
      control: 'number',
      description: 'Largura máxima do Dropdown',
    },
    width: {
      control: 'number',
      description: 'Largura do Dropdown',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Força posição do Dropdown: top (para cima) ou bottom (para baixo). Se não especificado, usa detecção automática'
    },
    minWidth: {
      control: 'number',
      description: 'Largura mínima do Dropdown',
    },
    onSelectionChange: {
      action: 'selection changed',
      table: {
        disable: true,
      },
    },
    infiniteScroll: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta;

interface TemplateArgs extends Omit<DropdownProps, 'items'> {
  // Propriedades específicas do template se necessário
}

const Template: StoryFn<TemplateArgs> = (args) => {
  const { type, position } = args;
  const [allItems, setAllItems] = useState<DropdownItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Configurações da paginação
  const ITEMS_PER_PAGE = 20;
  const TOTAL_ITEMS = 500; // Simular um grande dataset
  const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  // ✅ Função para simular API que retorna dados paginados
  const simulateApiCall = useCallback(async (page: number, search: string = ''): Promise<DropdownItem[]> => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 800));

    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Gerar itens simulados
    return Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const itemNumber = startIndex + index + 1;
      const icons = [<Person16Regular />, <UsbPlug20Filled />, <UsbPlug24Regular />];
      const departments = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro'];

      return {
        id: `person-${itemNumber}`,
        text: search
          ? `${search} - Pessoa ${itemNumber}`
          : `Pessoa ${itemNumber}`,
        subText: search
          ? `Resultado para "${search}" - ${departments[itemNumber % departments.length]}`
          : `${departments[itemNumber % departments.length]} - ID: ${itemNumber}`,
        icon: icons[itemNumber % icons.length],
        disabled: itemNumber % 25 === 0 // Alguns itens desabilitados
      };
    }).filter((_, index) => startIndex + index < TOTAL_ITEMS);
  }, []);

  // ✅ Carregar próxima página
  const loadNextPage = useCallback(async () => {
    if (isLoading || currentPage >= TOTAL_PAGES) return;

    setIsLoading(true);

    try {
      const nextPage = currentPage + 1;
      const newItems = await simulateApiCall(nextPage - 1, searchQuery);

      if (nextPage === 1) {
        // Primeira página ou nova busca - substitui items
        setAllItems(newItems);
      } else {
        // Páginas subsequentes - adiciona aos existentes
        setAllItems(prev => [...prev, ...newItems]);
      }

      setCurrentPage(nextPage);

    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, isLoading, searchQuery, simulateApiCall]);

  useEffect(() => {
    loadNextPage();
  }, []);
  const handleSelectionChange = (selectedIds: string[]): void => {
    console.log(`🎯 Selecionados: ${selectedIds.length} itens`, selectedIds);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      minHeight: '100vh',
      padding: '40px 20px',
    }}>

      <div style={{ position: 'relative', width: '350px' }}>
        <Dropdown
          items={allItems}
          id="infinite-scroll-Dropdown"
          type={type}
          applySearch={true}
          placeholder="Buscar"
          showSubText={true}
          width="100%"
          onSelectionChange={handleSelectionChange}
          // ✅ INFINITE SCROLL CONFIG
          infiniteScroll={{
            status: isLoading ? 'loading' : 'idle',
            page: currentPage,
            lastPage: TOTAL_PAGES,
            onLoadMore: loadNextPage,
            threshold: 0.1,
            rootMargin: '50px',
            debug: true
          }}
          position={position}
        />
      </div>
    </div>
  );
};
// ✅ STORY: Teste de posicionamento com controles
export const DropdownPositionComparison: StoryFn<TemplateArgs> = (args) => {
  return (
    <div style={{
      minHeight: '180vh',
      padding: '20px',
      background: 'linear-gradient(to bottom, #e8f5e8, #fff3e0, #ffebee)'
    }}>
      {/* Dropdown 1: Topo */}
      <div style={{
        position: 'relative',
        width: '350px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#e8f5e8',
        borderRadius: '8px',
        border: '2px solid #4caf50'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#2e7d32' }}>
          🟢 Dropdown 1 - TOPO da página
        </h4>
        <p style={{ margin: '0 0 12px 0', fontSize: '13px' }}>
          Deve abrir PARA BAIXO (borda verde)
        </p>
        <Dropdown
          items={mockValues.slice(0, 4)}
          id="top-comparison-Dropdown"
          type="text"
          applySearch={true}
          placeholder="Dropdown no topo"
          width="100%"
          onSelectionChange={(ids) => console.log('🟢 Top:', ids)}
        />
      </div>

      {/* Espaçamento */}
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <h3>📏 Área de Rolagem</h3>
          <p>Role para baixo para testar o Dropdown do final</p>
          <div style={{ fontSize: '24px' }}>⬇️</div>
        </div>
      </div>

      {/* Dropdown 2: Final */}
      <div style={{
        position: 'relative',
        width: '350px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#ffebee',
        borderRadius: '8px',
        border: '2px solid #f44336'
      }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#c62828' }}>
          🔴 Dropdown 2 - FINAL da página
        </h4>
        <p style={{ margin: '0 0 12px 0', fontSize: '13px' }}>
          Deve abrir PARA CIMA (borda vermelha)
        </p>
        <Dropdown
          items={mockValues.slice(3, 7)}
          id="bottom-comparison-Dropdown"
          type="checkbox"
          applySearch={true}
          placeholder="Dropdown no final"
          width="100%"
          onSelectionChange={(ids) => console.log('🔴 Bottom:', ids)}
          position="bottom"
        />
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center'
      }}>
        Footer - Fim da página
      </div>
    </div>
  );
};


export const DropdownSimple = Template.bind({});
DropdownSimple.args = {
  applySearch: true,
  type: 'text',
  showSubText: true,
  placeholder: 'Buscar',
  width: '210px'
};

export const DropdownCheckbox = Template.bind({});
DropdownCheckbox.args = {
  type: 'checkbox',
  showSubText: true,
  placeholder: 'Buscar',
  width: '210px'
};

export const DropdownIcon = Template.bind({});
DropdownIcon.args = {
  applySearch: false,
  type: 'icon',
  showSubText: true,
  placeholder: 'Buscar',
  width: '210px'
};

// Story para demonstrar o uso da prop position
export const DropdownPositioned: StoryFn<DropdownProps> = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '300px' }}>
      <div>
        <h3>Dropdown forçado para baixo (position="bottom")</h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button style={{ padding: '10px 20px', background: '#007ACC', color: 'white', border: 'none', borderRadius: '4px' }}>
            Clique para ver Dropdown
          </button>
          <Dropdown
            items={mockValues}
            position="bottom"
            applySearch={true}
            type="text"
            showSubText={true}
            placeholder="Buscar"
            width="250px"
          />
        </div>
      </div>
      
      <div>
        <h3>Dropdown forçado para cima (position="top")</h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button style={{ padding: '10px 20px', background: '#007ACC', color: 'white', border: 'none', borderRadius: '4px' }}>
            Clique para ver Dropdown
          </button>
          <Dropdown
            items={mockValues}
            position="top"
            applySearch={true}
            type="text"
            showSubText={true}
            placeholder="Buscar"
            width="250px"
          />
        </div>
      </div>
      
      <div>
        <h3>Dropdown automático (sem prop position)</h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button style={{ padding: '10px 20px', background: '#007ACC', color: 'white', border: 'none', borderRadius: '4px' }}>
            Clique para ver Dropdown
          </button>
          <Dropdown
            items={mockValues}
            applySearch={true}
            type="text"
            showSubText={true}
            placeholder="Buscar"
            width="250px"
          />
        </div>
      </div>
    </div>
  );
};
