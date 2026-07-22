import { TextArea } from '@giro-ds/react';
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof TextArea>;

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: 'O Text Area é um campo de entrada de texto multilinha que suporta validação, tooltip e controle de redimensionamento. Use-o quando o usuário precisar digitar textos longos, como descrições, comentários ou observações.',
      },
    },
    // layout: 'centered',
  },
  
  argTypes: {
    placeholder: { 
      control: 'text',
      description: 'Texto placeholder do campo'
    },
    label: { 
      control: 'text',
      description: 'Rótulo do campo'
    },
    disabled: { 
      control: 'boolean',
      description: 'Estado desabilitado do campo'
    },
    tooltipText: {
      control: 'text',
      description: 'Texto do tooltip — exibe o tooltip automaticamente quando preenchido'
    },
    tooltipSide: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      if: { arg: 'tooltipText', truthy: true },
      description: 'Lado em que o tooltip será exibido'
    },
    tooltipAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      if: { arg: 'tooltipText', truthy: true },
      description: 'Alinhamento do tooltip'
    },
    resize: {
      control: 'select',
      options: ['none', 'both', 'vertical'],
      description: 'Controle de redimensionamento do campo'
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda'
    },
    maxLength: {
      control: 'number',
      description: 'Número máximo de caracteres'
    },
    height: {
      control: 'number',
      description: 'Altura do campo'
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório'
    },
    className: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      }
    },
    value: {
      table: {
        disable: true
      }
    },
    id: {
      table: {
        disable: true
      }
    },
    name: {
      table: {
        disable: true
      }
    },
    virtualKeyboard: {
      control: 'select',
      options: [
        'default', 'numeric', 'none',
      ],
      description: 'Layout do teclado virtual',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder text',
    disabled: false,
    maxLength: 100,
    className: '',
    required: false,
    helperText: 'Optional support text',
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextArea {...args} />
    </div>
  ),
};

export const Desabilitado: Story = {
  args: {
    placeholder: 'Campo desabilitado',
    label: 'Campo Desabilitado',
    disabled: true,
    helperText: 'Este campo está desabilitado',
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextArea {...args} />
    </div>
  ),
};

export const ComTecladoVirtual: Story = {
  args: {
    label: 'Comentário',
    placeholder: 'Clique aqui para abrir o teclado...',
    virtualKeyboard: 'default',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '420px' }}>
        <TextArea
          {...args}
          value={value}
          onChange={setValue}
          helperText="Clique no campo para abrir o teclado virtual"
        />
      </div>
    );
  },
};

export const Obrigatorio: Story = {
  args: {
    placeholder: 'Campo obrigatório',
    label: 'Nome ',
    required: true,
    helperText: 'Este campo é obrigatório',
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextArea {...args} />
    </div>
  ),
};
Obrigatorio.storyName = 'Obrigatório';