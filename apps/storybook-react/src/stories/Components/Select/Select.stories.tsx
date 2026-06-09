import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Select } from '@giro-ds/react';
import type { SelectProps } from '@giro-ds/react';
import { Channel16Regular } from '@fluentui/react-icons';

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'O Select é um campo de seleção que abre uma lista de opções ao ser clicado. O usuário escolhe uma ou mais opções e a lista fecha automaticamente. Suporta busca interna, ícones, subtítulos e agrupamento de itens em categorias expansíveis.',
      },
    },
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
      description: 'Lado em que o dropdown abre em relação ao campo'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alinhamento do dropdown em relação ao campo'
    },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente',
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
    subTitle: 'Subtítulo do item 1',
  },
  {
    id: '2',
    value: 'item2',
    text: 'List-item 2',
    icon: <Channel16Regular />,
    subTitle: 'Subtítulo do item 2',
  },
  {
    id: '3',
    value: 'item3',
    text: 'List-item 3',
    icon: <Channel16Regular />,
    subTitle: 'Subtítulo do item 3',
  },
  {
    id: '4',
    value: 'item4',
    text: 'List-item 4',
    icon: <Channel16Regular />,
    subTitle: 'Subtítulo do item 4',
  },
  {
    id: '5',
    value: 'item5',
    text: 'List-item 5',
    icon: <Channel16Regular />,
    subTitle: 'Subtítulo do item 5',
  },
];

const mockItemsWithChildren = [
  {
    id: '1',
    value: 'item1',
    text: 'List item',
    children: [
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
      }
    ],
  },
  {
    id: '2',
    value: 'item2',
    text: 'List-item 2',
    children: [
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
      }
    ],
  },
  {
    id: '3',
    value: 'item3',
    text: 'List-item 3',
    children: [
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
      }
    ],
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

export const Default: StoryFn<SelectProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Select 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)}
    />
  </div>
);

Default.args = {
  items: mockItems,
  variant: 'text',
  label: 'Selecione uma opção',
  placeholder: 'Escolha um item',
  helperText: 'Texto de ajuda aqui',
  scale: 1,
};

export const ComBusca: StoryFn<SelectProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Select 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
    />
  </div>
);

ComBusca.args = {
  ...Default.args,
  search: true,
  label: 'Select com busca',
};

export const ComIcone: StoryFn<SelectProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Select 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
      items={mockItemsWithIcon} 
    />
  </div>
);

ComIcone.args = {
  ...Default.args,
  variant: 'icon',
  label: 'Select com ícones',
};

export const VarianteCheckbox: StoryFn<SelectProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Select 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)}
    />
  </div>
);

VarianteCheckbox.args = {
  ...Default.args,
  variant: 'checkbox',
  label: 'Select múltiplo',
  search: false,
};

export const Obrigatorio: StoryFn<SelectProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Select 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
    />
  </div>
);

Obrigatorio.args = {
  ...Default.args,
  required: true,
  label: 'Campo obrigatório',
  helperText: 'Este campo é obrigatório',
};
Obrigatorio.storyName = 'Obrigatório';

export const Desabilitado: StoryFn<SelectProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Select 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
    />
  </div>
);

Desabilitado.args = {
  ...Default.args,
  disabled: true,
  label: 'Campo desabilitado',
  value: 'item1',
};

export const ComFilhos: StoryFn<SelectProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Select 
      {...args} 
      onValueChange={(value) => console.log('Selected:', value)} 
      items={mockItemsWithChildren}
    />
  </div>
);

ComFilhos.args = {
  ...Default.args,
  label: 'Itens agrupados',
  placeholder: 'Selecione um item',
};

export const Escalas: StoryFn<SelectProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', alignItems: 'flex-start', width: 420 }}>
    <Select items={mockItems} variant="text" label="Scale 1.0" placeholder="Selecione" scale={1} />
    <Select items={mockItems} variant="text" label="Scale 1.5" placeholder="Selecione" scale={1.5} />
    <Select items={mockItems} variant="text" label="Scale 2.0" placeholder="Selecione" scale={2} />
  </div>
);

export const Position: StoryFn<SelectProps> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '300px', padding: '20px' }}>
    <Select
      {...args}
      label="Select no topo"
      placeholder="Clique para testar"
    />
    <Select
      {...args}
      label="Select próximo ao final"
      placeholder="Clique para testar"
    />
  </div>
);

Posicionamento.args = {
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

export const ScrollInfinito: StoryFn<SelectProps> = () => {
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
      <Select
        items={items}
        variant="text"
        label="Select com Scroll Infinito"
        placeholder="Selecione um item..."
        search
        enableInfiniteScroll={hasMore}
        onScrollEnd={handleScrollEnd}
        isLoadingMore={isLoadingMore}
      />
    </div>
  );
};

// Story para demonstrar a busca em API
export const BuscaAPI: StoryFn<SelectProps> = () => {
  const [items, setItems] = React.useState([
    { id: '1', value: '1', text: 'Item 1', subTitle: 'Resultado inicial' },
    { id: '2', value: '2', text: 'Item 2', subTitle: 'Resultado inicial' },
    { id: '3', value: '3', text: 'Item 3', subTitle: 'Resultado inicial' },
  ]);
  
  const [isSearching, setIsSearching] = React.useState(false);

  const handleApiSearch = React.useCallback((term: string) => {
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
      <Select
        items={items}
        variant="text"
        label="Select com Busca em API"
        placeholder="Selecione um item..."
        search
        enableApiSearch={true}
        onApiSearch={handleApiSearch}
        isSearching={isSearching}
      />
    </div>
  );
};
