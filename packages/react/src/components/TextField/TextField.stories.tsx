import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';
import './textfield.scss';
import { Source } from '@storybook/addon-docs/blocks';
import { Mail16Regular, Clock16Regular, ArrowUpload16Regular } from '@fluentui/react-icons';

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    controls: {
      sort: 'alpha'
    },
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
    positionTooltip: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right'],
      description: 'Posição do tooltip'
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'Mail', 'Clock', 'Upload'],
      mapping: {
        none: null,
        Mail: <Mail16Regular />,
        Clock: <Clock16Regular />,
        Upload: <ArrowUpload16Regular />,
      },
      description: 'Ícone do campo'
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
    helper: {
      control: 'boolean',
      if: { arg: 'helperText', truthy: true },
      description: 'Exibir texto de ajuda'
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
    trailingIcon: {
      control: 'boolean',
      description: 'Exibir ícone à direita'
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
  tags: ['autodocs'],
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
    trailingIcon: true,
    label: 'Label',
    tooltipText: 'Tooltip text'
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
    </div>
  ),
};

export const WithoutTooltip: Story = {
  args: {
    placeholder: 'Digite seu email',
    label: 'Email',
    tooltip: false,
    helperText: 'Insira um email válido',
    icon: <Mail16Regular />,
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
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
      <TextField {...args} />
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
      <TextField {...args} />
    </div>
  ),
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className='storybook__container' style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <TextField 
        label="Email" 
        placeholder="Digite seu email" 
        icon={<Mail16Regular />}
      
      />
      <TextField 
        label="Horário" 
        placeholder="Selecione o horário" 
        icon={<Clock16Regular />}
      />
      <TextField 
        label="Upload" 
        placeholder="Envie um arquivo" 
        icon={<ArrowUpload16Regular />}
      />
    </div>
  ),
};