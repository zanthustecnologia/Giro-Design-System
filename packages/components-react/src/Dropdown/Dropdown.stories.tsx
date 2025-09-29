import React, { useState, useEffect, useCallback } from "react";
import { UsbPlug24Regular } from "@fluentui/react-icons";
import type { Meta, StoryFn } from '@storybook/react';
import DropDown, { DropdownItem, DropdownProps } from "./Dropdown";
import { Person16Regular, UsbPlug20Filled } from '@fluentui/react-icons';

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

const meta: Meta<typeof DropDown> = {
  title: "Components/DropDown",
  component: DropDown,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    applySearch: {
      control: 'boolean',
      description: 'Habilita campo de busca'
    },
    type: {
      control: 'select',
      options: ['checkbox', 'text', 'icon'],
      description: 'Tipo do dropdown'
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
      description: 'Largura máxima do dropdown',
    },
    width: {
      control: 'number',
      description: 'Largura do dropdown',
    },
    minWidth: {
      control: 'number',
      description: 'Largura mínima do dropdown',
    },
    onSelectionChange: {
      action: 'selection changed',
      table: {
        disable: true,
      },
    },
    // ✅ NOVO: Argumento para infinite scroll
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
  const { applySearch, type, showSubText, maxWidth, minWidth, width, ...restArgs } = args;

  const handleSelectionChange = (selectedIds: string[]): void => {
    console.log('Selected items:', selectedIds);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{ position: 'relative', width: '210px' }}>
        <DropDown
          {...restArgs}
          items={mockValues}
          applySearch={applySearch}
          placeholder='Buscar'
          type={type}
          onSelectionChange={handleSelectionChange}
          showSubText={showSubText}
          maxWidth={maxWidth}
          minWidth={minWidth}
          width={width}
        />
      </div>
    </div >
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

// ✅ NOVA: Story com Infinite Scroll
export const DropdownInfiniteScroll: StoryFn<TemplateArgs> = () => {
  // Estados para controlar o infinite scroll
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <DropDown
          items={allItems}
          id="infinite-scroll-dropdown"
          type="checkbox"
          applySearch={true}
          placeholder="Buscar pessoas... (digite e pressione Enter)"
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
        />
      </div>
    </div>
  );
};