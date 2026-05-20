import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@giro-ds/react';
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
      control: 'boolean',
      description: 'Exibe o teclado virtual ao clicar no campo'
    },
    virtualKeyboardLayout: {
      control: 'select',
      options: [
        'default', 'numeric', 'fullKeyboard', 'mobile', 'appleIOS',
        'arabic', 'armenianEastern', 'armenianWestern', 'assamese', 'balochi',
        'belarusian', 'bengali', 'brazilian', 'burmese', 'chinese', 'czech',
        'english', 'farsi', 'french', 'georgian', 'german', 'gilaki', 'greek',
        'hebrew', 'hindi', 'hungarian', 'italian', 'japanese', 'kannada',
        'korean', 'kurdish', 'macedonian', 'malayalam', 'nigerian', 'nko',
        'norwegian', 'odia', 'polish', 'punjabi', 'russian', 'russianOld',
        'sindhi', 'spanish', 'swedish', 'telugu', 'thai', 'turkish',
        'ukrainian', 'urdu', 'urduStandard', 'uyghur',
      ],
      description: 'Layout do teclado virtual',
      if: { arg: 'virtualKeyboard', truthy: true },
    },
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
    tooltipText: 'Tooltip text'
  },
  render: (args) => (
    <div className='storybook__container'>
      <TextField {...args} />
    </div>
  ),
};

export const WithIcon: Story = {
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

export const WithTooltip: Story = {
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

export const Disabled: Story = {
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

export const Required: Story = {
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

export const WithDifferentIcons: Story = {
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

export const WithVirtualKeyboard: Story = {
  args: {
    label: 'Campo de texto',
    placeholder: 'Clique aqui para abrir o teclado...',
    virtualKeyboard: true,
    virtualKeyboardLayout: 'default',
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