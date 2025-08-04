import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Select, { SelectProps, SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'alpha',
    },
  },
  argTypes: {
    helperText: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    type: {
      control: 'select',
      options: ['text', 'checkbox', 'icon']
    },
    label: {
      control: {
        type: 'text'
      }
    },
    errorMessage: {
      control: {
        type: 'text'
      }
    },
    required: {
      control: {
        type: 'boolean'
      }
    },
    className: {
      control: {
        type: 'text'
      }
    },
    onChange: {
      action: 'changed'
    }
  }
};

export default meta;

// Mock data tipado
const mockValues: SelectOption[] = [
  { 
    id: 'item-1', 
    text: 'List-item 1', 
    subText: 'Descrição do item 1'
  },
  { 
    id: 'item-2', 
    text: 'List-item 2', 
    disabled: true, 
    subText: 'Item desabilitado'
  },
  { 
    id: 'item-3', 
    text: 'List-item 3', 
    disabled: true,
    subText: 'Outro item desabilitado'
  },
  { 
    id: 'item-4', 
    text: 'List-item 4', 
    subText: 'Descrição do item 4'
  },
  { 
    id: 'item-5', 
    text: 'List-item 5', 
    subText: 'Descrição do item 5'
  },
  { 
    id: 'item-6', 
    text: 'List-item 6', 
    subText: 'Descrição do item 6'
  },
  { 
    id: 'item-7', 
    text: 'List-item 7', 
    subText: 'Descrição do item 7'
  },
  { 
    id: 'item-8', 
    text: 'List-item 8', 
    subText: 'Descrição do item 8'
  }
];

// Template tipado
const template: StoryFn<SelectProps> = (args) => {
  const { type, helperText, placeholder, ...restArgs } = args;
  
  return (
    <Select 
      {...restArgs}
      options={mockValues} 
      type={type} 
      helperText={helperText} 
      placeholder={placeholder} 
    />
  );
};

/**
 * Story padrão - Select básico
 * Demonstra o componente Select em seu estado padrão
 */
export const Default: StoryFn<SelectProps> = template.bind({});
Default.args = {
  type: 'text',
  helperText: 'Este é um campo de seleção',
  placeholder: 'Selecione uma opção',
  label: 'Selecione um item',
  required: false
};

Default.parameters = {
  docs: {
    source: {
      code: `
/**
 * Exemplo de uso do componente Select básico.
 * - Tipo 'text' para seleção única.
 * - Helper text para orientação do usuário.
 * - Campo obrigatório.
 */
function Example() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  
  const options: SelectOption[] = [
    { id: '1', text: 'Opção 1', subText: 'Descrição 1' },
    { id: '2', text: 'Opção 2', subText: 'Descrição 2' },
    { id: '3', text: 'Opção 3', disabled: true }
  ];

  const handleChange = (selectedItems: SelectOption[]): void => {
    setSelectedValue(selectedItems[0]?.id || '');
    console.log('Item selecionado:', selectedItems[0]);
  };

  return (
    <Select
      options={options}
      type="text"
      label="Selecione um item"
      placeholder="Escolha uma opção"
      helperText="Campo obrigatório"
      required
      onChange={handleChange}
    />
  );
}
      `.trim(),
    },
  },
};