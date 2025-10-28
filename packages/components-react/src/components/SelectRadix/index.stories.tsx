import type { Meta, StoryFn } from '@storybook/react';
import SelectRadix from './SelectRadix';
import { SelectRadixProps } from './SelectRadix.types';
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
  },
  tags: ['autodocs'],
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
  },
};

export default meta;

const mockItems = [
  {
    id: '1',
    value: 'item1',
    text: 'List item',
    subTitle: 'Sub item 1',
    icon: <Channel16Regular />,
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
