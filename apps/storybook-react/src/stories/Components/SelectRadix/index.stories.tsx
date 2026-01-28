import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { SelectRadix } from '@giro-ds/react';
import type { SelectRadixProps } from '@giro-ds/react';
import { Channel16Regular } from '@fluentui/react-icons';

const meta: Meta<SelectRadixProps> = {
  title: 'Components/SelectRadix',
  component: SelectRadix,
  parameters: {
    docs: {
      description: {
        component:
          'Componente Select usando Radix UI com estilização customizada e melhor organização de código.',
      },
    },
    // layout: 'centered',
  },
  argTypes: {
    items: {
      description: 'Array de opções do select',
      control: { type: 'object' },
    },
    variant: {
      description: 'Variante visual do select',
      control: { type: 'select' },
      options: ['text', 'icon', 'checkbox'],
    },
    search: {
      description: 'Habilita funcionalidade de busca',
      control: { type: 'boolean' },
    },
    required: {
      description: 'Campo obrigatório',
      control: { type: 'boolean' },
    },
    disabled: {
      description: 'Campo desabilitado',
      control: { type: 'boolean' },
    },
    tooltip: {
      control: 'boolean',
      description: 'Exibir tooltip'
    },
    
    tooltipText: {
      control: 'text',
      if: { arg: 'tooltip', truthy: true },
      description: 'Texto do tooltip'
    },
    side: {
      control: 'select',
      options: ['top','bottom', 'left', 'right'],
      description: 'Posição do tooltip'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Posição do tooltip'
    },
  },
};

export default meta;

const mockItems = [
  {
    id: '1',
    value: 'item1',
    text: 'List item',
  },
  {
    id: '2',
    value: 'item2',
    text: 'List-item 2'
  },
  {
    id: '3',
    value: 'item3',
    text: 'List-item 3'
  },
  {
    id: '4',
    value: 'item4',
    text: 'List-item 4',
  },
  {
    id: '5',
    value: 'item5',
    text: 'List-item 5',
  },
];

const mockItemsWithIcon = [
  {
    id: '1',
    value: 'item1',
    text: 'List item',
    icon: <Channel16Regular />,
  },
  {
    id: '2',
    value: 'item2',
    text: 'List-item 2',
    icon: <Channel16Regular />,
  },
  {
    id: '3',
    value: 'item3',
    text: 'List-item 3',
    icon: <Channel16Regular />,
  },
  {
    id: '4',
    value: 'item4',
    text: 'List-item 4',
    icon: <Channel16Regular />,
  },
  {
    id: '5',
    value: 'item5',
    text: 'List-item 5',
    icon: <Channel16Regular />,
  },
];

const mockItemsWithAllOptions = [
  {
    id: '1',
    value: 'item1',
    text: 'List item',
    icon: <Channel16Regular />,
    children: [
      { value: 'maca', text: 'Maçã' },
      { value: 'banana', text: 'Banana' }
    ]
  },
  {
    id: '2',
    value: 'item2',
    text: 'List-item 2',
    disabled: true,
    subTitle: 'Sub item 2 (disabled)',
    icon: <Channel16Regular />,
  },
  {
    id: '3',
    value: 'item3',
    text: 'List-item 3',
    icon: <Channel16Regular />,
  },
  {
    id: '4',
    value: 'item4',
    text: 'List-item 4',
  },
  {
    id: '5',
    value: 'item5',
    text: 'List-item 5',
    subTitle: 'Com subtitle',
  },
];

export const Default: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <SelectRadix 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)}
    />
  </div>
);

export const WithAllOptions: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <SelectRadix 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)}
      items={mockItemsWithAllOptions}  
    />
  </div>
);

Default.args = {
  items: mockItems,
  variant: 'text',
  label: 'Selecione uma opção',
  placeholder: 'Escolha um item',
  helperText: 'Texto de ajuda aqui',
};

export const WithSearch: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <SelectRadix 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
    />
  </div>
);

WithSearch.args = {
  ...Default.args,
  search: true,
  label: 'Select com busca',
};

export const WithIcon: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <SelectRadix 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
      items={mockItemsWithIcon} 
    />
  </div>
);

WithIcon.args = {
  ...Default.args,
  variant: 'icon',
  label: 'Select com ícones',
};

export const Checkbox: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <SelectRadix 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)}
    />
  </div>
);

Checkbox.args = {
  ...Default.args,
  variant: 'checkbox',
  label: 'Select múltiplo',
  search: true,
};

export const Required: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <SelectRadix 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
    />
  </div>
);

Required.args = {
  ...Default.args,
  required: true,
  label: 'Campo obrigatório',
  helperText: 'Este campo é obrigatório',
};

export const Disabled: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <SelectRadix 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
    />
  </div>
);

Disabled.args = {
  ...Default.args,
  disabled: true,
  label: 'Campo desabilitado',
  value: 'item1',
};

export const Position: StoryFn<SelectRadixProps> = (args) => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5' 
  }}>
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'white', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Select no topo (abre para baixo)</h3>
      <div style={{ maxWidth: 300 }}>
        <SelectRadix 
          {...args}
          label="Select no topo"
          placeholder="Clique para testar"
          onValueChange={(value) => console.log('Top Select:', value)} 
        />
      </div>
    </div>

    <div style={{ flex: 1 }} />

    <div style={{ 
      padding: '20px', 
      backgroundColor: 'white', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>
        Select próximo ao footer
      </h3>
      <div style={{ maxWidth: 300 }}>
        <SelectRadix 
          {...args}
          label="Select no footer"
          placeholder="Clique para testar"
          onValueChange={(value) => console.log('Bottom Select:', value)} 
        />
      </div>
      <p style={{ 
        margin: '16px 0 0 0', 
        fontSize: '14px', 
        color: '#666',
        fontStyle: 'italic' 
      }}>
        💡 O Radix UI com avoidCollisions=true detecta automaticamente e abre para cima
      </p>
    </div>

    <footer style={{ 
      padding: '20px', 
      backgroundColor: '#333', 
      color: 'white', 
      textAlign: 'center',
      borderRadius: '8px' 
    }}>
      <p style={{ margin: 0 }}>Footer da página</p>
    </footer>
  </div>
);

Position.args = {
  items: [
    ...mockItems,
    { id: '6', value: 'item6', text: 'List-item 6', subTitle: 'Item adicional' },
    { id: '7', value: 'item7', text: 'List-item 7', subTitle: 'Item adicional' },
    { id: '8', value: 'item8', text: 'List-item 8', subTitle: 'Item adicional' },
    { id: '9', value: 'item9', text: 'List-item 9', subTitle: 'Item adicional' },
    { id: '10', value: 'item10', text: 'List-item 10', subTitle: 'Item adicional' },
  ],
  variant: 'text',
  search: true,
};

export const InfiniteScroll: StoryFn<SelectRadixProps> = () => {
  const [items, setItems] = React.useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i + 1}`,
      value: `item-${i + 1}`,
      text: `Item ${i + 1}`,
      subTitle: `Descrição do item ${i + 1}`,
    }))
  );
  
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const handleScrollEnd = React.useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    setTimeout(() => {
      const newPage = page + 1;
      const newItems = Array.from({ length: 10 }, (_, i) => {
        const itemNumber = page * 20 + i + 1;
        return {
          id: `item-${itemNumber}`,
          value: `item-${itemNumber}`,
          text: `Item ${itemNumber}`,
          subTitle: `Descrição do item ${itemNumber}`,
        };
      });
      
      setItems(prev => [...prev, ...newItems]);
      setPage(newPage);
      setIsLoadingMore(false);
      
      if (newPage >= 5) {
        setHasMore(false);
      }
    }, 1000);
  }, [page, hasMore, isLoadingMore]);

  return (
    <div style={{ maxWidth: '400px' }}>
      <SelectRadix
        items={items}
        variant="text"
        label="Select com Scroll Infinito"
        placeholder="Selecione um item..."
        search
        enableInfiniteScroll={hasMore}
        onScrollEnd={handleScrollEnd}
        isLoadingMore={isLoadingMore}
        onValueChange={(value) => console.log('Selected:', value)}
      />
      <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        Total de itens: {items.length} | Página: {page} | Tem mais: {hasMore ? 'Sim' : 'Não'}
      </p>
    </div>
  );
};

// Story para demonstrar a busca em API
export const ApiSearch: StoryFn<SelectRadixProps> = () => {
  const [items, setItems] = React.useState([
    { id: '1', value: '1', text: 'Item 1', subTitle: 'Resultado inicial' },
    { id: '2', value: '2', text: 'Item 2', subTitle: 'Resultado inicial' },
    { id: '3', value: '3', text: 'Item 3', subTitle: 'Resultado inicial' },
  ]);
  
  const [isSearching, setIsSearching] = React.useState(false);
  const [lastSearchTerm, setLastSearchTerm] = React.useState('');

  const handleApiSearch = React.useCallback((term: string) => {
    setLastSearchTerm(term);
    setIsSearching(true);
    
    // Simula uma chamada de API
    setTimeout(() => {
      if (term === '') {
        // Volta aos dados iniciais quando campo estiver vazio
        setItems([
          { id: '1', value: '1', text: 'Item 1', subTitle: 'Resultado inicial' },
          { id: '2', value: '2', text: 'Item 2', subTitle: 'Resultado inicial' },
          { id: '3', value: '3', text: 'Item 3', subTitle: 'Resultado inicial' },
        ]);
      } else {
        // Simula resultados da API baseados no termo de busca
        const searchResults = Array.from({ length: 5 }, (_, i) => ({
          id: `search-${i + 1}`,
          value: `search-${i + 1}`,
          text: `${term} - Resultado ${i + 1}`,
          subTitle: `Encontrado via API para "${term}"`,
        }));
        
        setItems(searchResults);
      }
      
      setIsSearching(false);
    }, 800); // Simula delay da API
  }, []);

  return (
    <div style={{ maxWidth: '400px' }}>
      <SelectRadix
        items={items}
        variant="text"
        label="Select com Busca em API"
        placeholder="Selecione um item..."
        search
        enableApiSearch={true}
        onApiSearch={handleApiSearch}
        isSearching={isSearching}
        onValueChange={(value) => console.log('Selected:', value)}
      />
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <p><strong>Status:</strong> {isSearching ? 'Buscando...' : 'Pronto'}</p>
        <p><strong>Último termo:</strong> {lastSearchTerm || 'Nenhum'}</p>
        <p><strong>Total de resultados:</strong> {items.length}</p>
        <p><strong>Dica:</strong> Digite algo no campo de busca para ver a API em ação!</p>
      </div>
    </div>
  );
};
