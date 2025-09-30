import React, { useState, useCallback, useEffect } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Select, { SelectProps, SelectOption } from './Select';
import useApiSimulation from '../Hooks/ApiSimulation';


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
    showSubText: {
      control: {
        type: 'boolean'
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
    maxWidth: {
      control: 'number'
    },
    onChange: {
      action: 'changed'
    },
    tooltip: {
      control: {
        type: 'boolean'
      }
    },
    tooltipText: {
      control: {
        type: 'text'
      }
    },
    width: {
      control: {
        type: 'number'
      }
    },
    positionTooltip: {
      control: {
        type: 'select',
        options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right']
      }
    }
  }
};

export default meta;

// Mock data tipado
const mockValues: SelectOption[] = [
  {
    id: 'item-1',
    text: 'List item',
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
  },
  {
    id: 'item-9',
    text: 'List-item 9',
    subText: 'Descrição do item 9'
  },
  {
    id: 'item-10',
    text: 'List-item 10',
    disabled: true,
    subText: 'Item desabilitado'
  },
  {
    id: 'item-11',
    text: 'List-item 11',
    subText: 'Descrição do item 11'
  },
  {
    id: 'item-12',
    text: 'List-item 12',
    subText: 'Descrição do item 12'
  },
  {
    id: 'item-13',
    text: 'List-item 13',
    subText: 'Descrição do item 13'
  },
  {
    id: 'item-14',
    text: 'List-item 14',
    subText: 'Descrição do item 14'
  },
  {
    id: 'item-15',
    text: 'List-item 15',
    disabled: true,
    subText: 'Item desabilitado'
  },
  {
    id: 'item-16',
    text: 'List-item 16',
    subText: 'Descrição do item 16'
  },
  {
    id: 'item-17',
    text: 'List-item 17',
    subText: 'Descrição do item 17'
  },
  {
    id: 'item-18',
    text: 'List-item 18',
    subText: 'Descrição do item 18'
  },
  {
    id: 'item-19',
    text: 'List-item 19',
    subText: 'Descrição do item 19'
  },
  {
    id: 'item-20',
    text: 'List-item 20',
    subText: 'Descrição do item 20'
  },
  {
    id: 'item-21',
    text: 'List-item 21',
    disabled: true,
    subText: 'Item desabilitado'
  },
  {
    id: 'item-22',
    text: 'List-item 22',
    subText: 'Descrição do item 22'
  },
  {
    id: 'item-23',
    text: 'List-item 23',
    subText: 'Descrição do item 23'
  },
  {
    id: 'item-24',
    text: 'List-item 24',
    subText: 'Descrição do item 24'
  },
  {
    id: 'item-25',
    text: 'List-item 25',
    subText: 'Descrição do item 25'
  },
  {
    id: 'item-26',
    text: 'List-item 26',
    subText: 'Descrição do item 26'
  },
  {
    id: 'item-27',
    text: 'List-item 27',
    subText: 'Descrição do item 27'
  },
  {
    id: 'item-28',
    text: 'List-item 28',
    disabled: true,
    subText: 'Item desabilitado'
  },
  {
    id: 'item-29',
    text: 'List-item 29',
    subText: 'Descrição do item 29'
  },
  {
    id: 'item-30',
    text: 'List-item 30',
    subText: 'Descrição do item 30'
  },
  {
    id: 'item-31',
    text: 'List-item 31',
    subText: 'Descrição do item 31'
  },
  {
    id: 'item-32',
    text: 'List-item 32',
    subText: 'Descrição do item 32'
  },
  {
    id: 'item-33',
    text: 'List-item 33',
    subText: 'Descrição do item 33'
  },
  {
    id: 'item-34',
    text: 'List-item 34',
    subText: 'Descrição do item 34'
  },
  {
    id: 'item-35',
    text: 'List-item 35',
    disabled: true,
    subText: 'Item desabilitado'
  },
  {
    id: 'item-36',
    text: 'List-item 36',
    subText: 'Descrição do item 36'
  },
  {
    id: 'item-37',
    text: 'List-item 37',
    subText: 'Descrição do item 37'
  },
  {
    id: 'item-38',
    text: 'List-item 38',
    subText: 'Descrição do item 38'
  },
  {
    id: 'item-39',
    text: 'List-item 39',
    subText: 'Descrição do item 39'
  },
  {
    id: 'item-40',
    text: 'List-item 40',
    subText: 'Descrição do item 40'
  },
  {
    id: 'item-41',
    text: 'List-item 41',
    subText: 'Descrição do item 41'
  },
  {
    id: 'item-42',
    text: 'List-item 42',
    disabled: true,
    subText: 'Item desabilitado'
  },
  {
    id: 'item-43',
    text: 'List-item 43',
    subText: 'Descrição do item 43'
  },
  {
    id: 'item-44',
    text: 'List-item 44',
    subText: 'Descrição do item 44'
  },
  {
    id: 'item-45',
    text: 'List-item 45',
    subText: 'Descrição do item 45'
  },
  {
    id: 'item-46',
    text: 'List-item 46',
    subText: 'Descrição do item 46'
  },
  {
    id: 'item-47',
    text: 'List-item 47',
    subText: 'Descrição do item 47'
  },
  {
    id: 'item-48',
    text: 'List-item 48',
    subText: 'Descrição do item 48'
  },
  {
    id: 'item-49',
    text: 'List-item 49',
    disabled: true,
    subText: 'Último item desabilitado'
  },
  {
    id: 'item-50',
    text: 'List-item 50',
    subText: 'Descrição do último item'
  }
];

// Template tipado
const template: StoryFn<SelectProps> = (args) => {
  const { type, helperText, placeholder, maxWidth, minWidth, width, ...restArgs } = args;

  return (
    <div style={{ width: '210px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Select
        {...restArgs}
        options={mockValues}
        type={type}
        helperText={helperText}
        placeholder={placeholder}
        maxWidth={maxWidth}
        minWidth={minWidth}
        width={width}
      />
    </div>

  );
};
export const templateInfiniteScroll: StoryFn<SelectProps> = (args) => {
  const {
    items,
    currentPage,
    totalPages,
    status,
    error,
    hasNextPage,
    actions
  } = useApiSimulation<SelectOption>({
    itemsPerPage: 20,
    totalItems: 500,
    delay: 800,
    debug: true,
    itemGenerator: (index, search) => {
      const itemNumber = index + 1;
      const departments = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro'];

      return {
        id: `option-${itemNumber}`,
        text: search
          ? `${search} - Opção ${itemNumber}`
          : `Opção ${itemNumber}`,
        subText: search
          ? `Resultado para "${search}" - ${departments[itemNumber % departments.length]}`
          : `${departments[itemNumber % departments.length]} - Item ${itemNumber}`,
        disabled: itemNumber % 25 === 0
      };
    }
  });

  const [selectedValue, setSelectedValue] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (items.length === 0 && status === 'idle') {
      actions.loadNextPage();
    }
  }, [items.length, status, actions]);

  const handleSelectionChange = (selectedItems: SelectOption[]) => {
    setSelectedValue(selectedItems);
    console.log('Opções selecionadas:', selectedItems);
  };




  return (
    <Select
      options={items}
      type="checkbox"
      placeholder="Selecione opções..."
      onChange={handleSelectionChange}
      value={selectedValue.map(item => item.id!)}
      showSubText={true}
      infiniteScroll={{
        status: status,
        page: currentPage,
        lastPage: totalPages,
        onLoadMore: actions.loadNextPage,
        threshold: 0.1,
        rootMargin: '50px',
      }}
      minWidth='250px'
      maxWidth='250px'
    />
  );
};

export const Default: StoryFn<SelectProps> = template.bind({});
Default.args = {
  type: 'text',
  helperText: 'Este é um campo de seleção',
  placeholder: 'Selecione',
  label: 'Selecione um item',
  required: false,
  tooltip: true,
  tooltipText: 'Selecione um item da lista',
  maxWidth: '250px',
  minWidth: '250px'
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

/**
 * Story com Valor Inicial - Select com initialValue
 * Demonstra o componente Select com um valor pré-selecionado
 */
export const WithInitialValue: StoryFn<SelectProps> = template.bind({});
WithInitialValue.args = {
  type: 'text',
  helperText: 'Select com valor inicial pré-selecionado',
  placeholder: 'Selecione',
  label: 'Selecione um item',
  initialValue: 'item-3',
  required: false,
  tooltip: true,
  tooltipText: 'Este select tem um valor inicial',
  maxWidth: '250px',
  minWidth: '250px'
};

WithInitialValue.parameters = {
  docs: {
    source: {
      code: `
/**
 * Exemplo de uso do componente Select com valor inicial.
 * - Prop initialValue para definir seleção inicial.
 * - Útil para formulários com valores padrão.
 * - Não interfere com controle por value.
 */
function Example() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  
  const options: SelectOption[] = [
    { id: 'item-1', text: 'List item', subText: 'Descrição do item 1' },
    { id: 'item-2', text: 'List-item 2', subText: 'Item desabilitado' },
    { id: 'item-3', text: 'List-item 3', subText: 'Item inicial selecionado' },
    { id: 'item-4', text: 'List-item 4', subText: 'Descrição do item 4' }
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
      helperText="Select com valor inicial pré-selecionado"
      initialValue="item-3"
      onChange={handleChange}
    />
  );
}
      `.trim(),
    },
  },
};
