import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@giro-ds/react';
import { Source } from '@storybook/addon-docs/blocks';

type Story = StoryObj<typeof TextArea>;

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    
    layout: 'centered',
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
    tooltip: {
      control: 'boolean',
      description: 'Exibir tooltip'
    },
    tooltipText: {
      control: 'text',
      if: { arg: 'tooltip', truthy: true },
      description: 'Texto do tooltip'
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda'
    },
    maxLength: {
      control: 'number',
      description: 'Número máximo de caracteres'
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
    }
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
    tooltip: true,
    helperText: 'Optional support text',
    label: 'Label',
    tooltipText: 'Tooltip text'
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextArea {...args} />
    </div>
  ),
};

export const WithoutTooltip: Story = {
  args: {
    placeholder: 'Digite seu email',
    label: 'Email',
    tooltip: false,
    helperText: 'Insira um email válido',
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextArea {...args} />
    </div>
  ),
};

export const Disabled: Story = {
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

export const Required: Story = {
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