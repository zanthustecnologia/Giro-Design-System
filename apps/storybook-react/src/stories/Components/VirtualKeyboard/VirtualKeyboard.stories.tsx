import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VirtualKeyboard, TextField } from '@giro-ds/react';

type Story = StoryObj<typeof VirtualKeyboard>;

const meta: Meta<typeof VirtualKeyboard> = {
  title: 'Components/VirtualKeyboard',
  component: VirtualKeyboard,
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['native', 'fixed'],
      description: 'Modo de exibição do teclado. `native` age como teclado nativo (acionamento por foco — futuramente). `fixed` exibe o teclado sempre visível com um TextField próprio acima.',
    },
    textFieldLabel: {
      control: 'text',
      description: 'Label do TextField interno. Disponível apenas no modo `fixed`.',
      if: { arg: 'mode', eq: 'fixed' },
    },
    textFieldPlaceholder: {
      control: 'text',
      description: 'Placeholder do TextField interno. Disponível apenas no modo `fixed`.',
      if: { arg: 'mode', eq: 'fixed' },
    },
    layout: {
      control: 'select',
      options: [
        // Nativos
        'default', 'numeric', 'fullKeyboard', 'mobile', 'appleIOS',
        // Idiomas
        'arabic', 'armenianEastern', 'armenianWestern', 'assamese', 'balochi',
        'belarusian', 'bengali', 'brazilian', 'burmese', 'chinese', 'czech',
        'english', 'farsi', 'french', 'georgian', 'german', 'gilaki', 'greek',
        'hebrew', 'hindi', 'hungarian', 'italian', 'japanese', 'kannada',
        'korean', 'kurdish', 'macedonian', 'malayalam', 'nigerian', 'nko',
        'norwegian', 'odia', 'polish', 'punjabi', 'russian', 'russianOld',
        'sindhi', 'spanish', 'swedish', 'telugu', 'thai', 'turkish',
        'ukrainian', 'urdu', 'urduStandard', 'uyghur',
      ],
      description: 'Layout do teclado',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado do teclado',
    },
    maxLength: {
      control: 'number',
      description: 'Limite máximo de caracteres',
    },
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    onKeyPress: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    mode: 'native',
    layout: 'default',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '420px' }}>
        <div style={{ marginBottom: '20px'}}>
          <TextField
            label="Campo de texto"
            value={value}
            onChange={setValue}
            placeholder="Digite no teclado abaixo..."
            readOnly
            helperText='↳ Campo de texto externo ao teclado virtual'
          />
        </div>
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const ModoFixed: Story = {
  name: 'Modo Fixed',
  args: {
    mode: 'fixed',
    layout: 'default',
    textFieldLabel: 'Campo de texto',
    textFieldPlaceholder: 'Digite no teclado...',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '420px' }}>
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const ModoNative: Story = {
  name: 'Modo Native',
  args: {
    mode: 'native',
    layout: 'default',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '420px' }}>
        <TextField
          label="Campo de texto"
          placeholder="Clique aqui para abrir o teclado..."
          value={value}
          onChange={setValue}
          virtualKeyboard
          virtualKeyboardLayout={args.layout}
          maxLength={args.maxLength}
          disabled={args.disabled}
          helperText="Clique no campo para abrir o teclado virtual"
        />
      </div>
    );
  },
};

export const Numerico: Story = {
  args: {
    mode: 'fixed',
    layout: 'numeric',
    disabled: false,
    textFieldLabel: 'PIN',
    textFieldPlaceholder: 'Digite o PIN...',
    maxLength: 6,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '240px' }}>
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Telefone: Story = {
  args: {
    mode: 'fixed',
    layout: 'numeric',
    disabled: false,
    textFieldLabel: 'Número',
    textFieldPlaceholder: 'Digite o número...',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '240px' }}>
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    layout: 'default',
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '420px' }}>
        <TextField
          label="Campo desabilitado"
          placeholder="Campo desabilitado"
          value={value}
          onChange={setValue}
          virtualKeyboard
          virtualKeyboardLayout={args.layout}
          disabled
          helperText="O teclado virtual não abre em campos desabilitados"
        />
      </div>
    );
  },
};

export const ComLimiteDeCaracteres: Story = {
  args: {
    layout: 'numeric',
    maxLength: 4,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '240px' }}>
        <TextField
          label="Código de 4 dígitos"
          placeholder="Clique aqui para abrir o teclado..."
          value={value}
          onChange={setValue}
          virtualKeyboard
          virtualKeyboardLayout="numeric"
          maxLength={4}
          helperText="Máximo 4 dígitos — clique para abrir o teclado"
        />
      </div>
    );
  },
};

export const TecladoCompleto: Story = {
  args: {
    layout: 'fullKeyboard',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '860px' }}>
        <TextField
          label="Teclado completo"
          placeholder="Clique aqui para abrir o teclado..."
          value={value}
          onChange={setValue}
          virtualKeyboard
          virtualKeyboardLayout="fullKeyboard"
          disabled={args.disabled}
          helperText="Clique no campo para abrir o teclado completo"
        />
      </div>
    );
  },
};

export const Mobile: Story = {
  args: {
    layout: 'mobile',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '340px' }}>
        <TextField
          label="Mobile"
          placeholder="Clique aqui para abrir o teclado..."
          value={value}
          onChange={setValue}
          virtualKeyboard
          virtualKeyboardLayout="mobile"
          disabled={args.disabled}
          helperText="Clique no campo para abrir o teclado mobile"
        />
      </div>
    );
  },
};

export const AppleIOS: Story = {
  args: {
    layout: 'appleIOS',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '380px' }}>
        <TextField
          label="iOS"
          placeholder="Clique aqui para abrir o teclado..."
          value={value}
          onChange={setValue}
          virtualKeyboard
          virtualKeyboardLayout="appleIOS"
          disabled={args.disabled}
          helperText="Clique no campo para abrir o teclado iOS"
        />
      </div>
    );
  },
};

export const Idioma: Story = {
  args: {
    layout: 'russian',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '420px' }}>
        <TextField
          label="Idioma"
          placeholder="Clique aqui para abrir o teclado..."
          value={value}
          onChange={setValue}
          virtualKeyboard
          virtualKeyboardLayout={args.layout}
          disabled={args.disabled}
          helperText="Selecione um idioma no painel de controles e clique para abrir"
        />
      </div>
    );
  },
};
