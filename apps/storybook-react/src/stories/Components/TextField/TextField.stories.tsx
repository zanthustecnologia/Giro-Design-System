import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@giro-ds/react';
import { Mail16Regular, Clock16Regular, ArrowUpload16Regular } from '@fluentui/react-icons';

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
    }
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: 'Ex.: João da Silva',
    disabled: false,
    maxLength: 100,
    className: '',
    required: false,
    tooltip: true,
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

export const ComTooltip: Story = {
  args: {
    label: 'CPF',
    placeholder: 'Ex.: 000 000 000-00',
    tooltip: true,
    tooltipText: 'O CPF é usado para identificar sua conta. Você pode encontrá-lo no seu documento de identidade.',
    side: 'bottom',
    align: 'start',
    helperText: 'Somente números, sem pontos ou traços',
    type: 'text',
    maxLength: 11,
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

export const Escalas: Story = {
  render: () => (
    <div className='storybook__container' style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'flex-start' }}>
      <TextField label="Scale 1.0" placeholder="Texto" scale={1} />
      <TextField label="Scale 1.5" placeholder="Texto" scale={1.5} />
      <TextField label="Scale 2.0" placeholder="Texto" scale={2} />
    </div>
  ),
};