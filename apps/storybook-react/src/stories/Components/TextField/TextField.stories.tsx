import { Mail16Regular, Clock16Regular, ArrowUpload16Regular } from '@fluentui/react-icons';
import { TextField } from '@giro-ds/react';
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: 'O Text Field é um campo de entrada de texto que suporta validação, ícones e feedback visual de estado. Pode ser usado para capturar texto livre, e-mail, senha, número, telefone ou URL.',
      },
    },
    controls: {
      sort: 'alpha'
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
    tooltipSide: {
      control: 'select',
      options: ['top','bottom', 'left', 'right'],
      if: { arg: 'tooltipText', truthy: true },
      description: 'Lado em que o tooltip será exibido'
    },
    tooltipAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      if: { arg: 'tooltipText', truthy: true },
      description: 'Alinhamento do tooltip'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Tipo do input'
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
    tooltipText: {
      control: 'text',
      description: 'Texto do tooltip — exibe o tooltip automaticamente quando preenchido'
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
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente'
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
    disableAutoComplete: {
      control: 'boolean',
      description: 'Habilita ou desabilita o autocomplete nativo do browser',
    },
    attachedToVirtualKeyboard: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: 'Ex.: João da Silva',
    disabled: false,
    className: '',
    required: false,
    helperText: 'Optional support text',
    label: 'Label',
    tooltipText: 'Tooltip text',
    scale: 1,
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
    </div>
  ),
};

export const ComIcone: Story = {
  args: {
    placeholder: 'Ex.: joao@empresa.com',
    label: 'Email',
    helperText: 'Insira um email válido',
    icon: <Mail16Regular />,
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
    </div>
  ),
};

export const ComTooltip: Story = {
  args: {
    label: 'CPF',
    placeholder: 'Ex.: 000 000 000-00',
    tooltipText: 'O CPF é usado para identificar sua conta. Você pode encontrá-lo no seu documento de identidade.',
    tooltipSide: 'bottom',
    tooltipAlign: 'start',
    helperText: 'Somente números, sem pontos ou traços',
    type: 'text',
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
    </div>
  ),
};

export const Desabilitado: Story = {
  args: {
    placeholder: 'Ex.: João da Silva',
    label: 'Campo desabilitado',
    disabled: true,
    helperText: 'Este campo está desabilitado',
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
    </div>
  ),
};

export const Obrigatorio: Story = {
  args: {
    placeholder: 'Ex.: João da Silva',
    label: 'Nome',
    required: true,
    helperText: 'Este campo é obrigatório',
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
    </div>
  ),
};
Obrigatorio.storyName = 'Obrigatório';

export const DiferentesIcones: Story = {
  render: () => (
    <div className='storybook__container' style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <TextField 
        label="Email" 
        placeholder="Ex.: joao@empresa.com" 
        icon={<Mail16Regular />}
      />
      <TextField 
        label="Horário" 
        placeholder="Ex.: 14:30" 
        icon={<Clock16Regular />}
      />
      <TextField 
        label="Arquivo" 
        placeholder="Ex.: relatorio-2024.pdf" 
        icon={<ArrowUpload16Regular />}
      />
    </div>
  ),
};

export const ComTecladoVirtual: Story = {
  args: {
    label: 'Campo de texto',
    placeholder: 'Clique aqui para abrir o teclado...',
    virtualKeyboard: 'default',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '420px' }}>
        <TextField
          {...args}
          value={value}
          onChange={setValue}
          helperText="Clique no campo para abrir o teclado virtual"
        />
      </div>
    );
  },
};
export const Escalas: Story = {
  render: () => (
    <div className='storybook__container' style={{ display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'flex-start' }}>
      <TextField label="Scale 1.0" placeholder="Texto" scale={1} />
      <TextField label="Scale 1.5" placeholder="Texto" scale={1.5} />
      <TextField label="Scale 2.0" placeholder="Texto" scale={2} />
    </div>
  ),
};