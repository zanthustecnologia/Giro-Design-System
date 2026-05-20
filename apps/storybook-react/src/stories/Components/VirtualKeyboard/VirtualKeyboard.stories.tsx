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
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '420px' }}>
        <TextField
          label="Campo de texto (externo)"
          value={value}
          onChange={setValue}
          placeholder="O teclado preenche este campo..."
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Numerico: Story = {
  args: {
    layout: 'numeric',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '240px' }}>
        <TextField
          label="PIN"
          value={value}
          onChange={setValue}
          placeholder="Digite o PIN..."
          maxLength={6}
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} maxLength={6} />
      </div>
    );
  },
};

export const Telefone: Story = {
  args: {
    layout: 'numeric',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '240px' }}>
        <TextField
          label="Número"
          value={value}
          onChange={setValue}
          placeholder="Digite o número..."
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '420px' }}>
        <TextField
          label="Campo desabilitado"
          value={value}
          onChange={setValue}
          placeholder="Teclado desabilitado"
          disabled
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '240px' }}>
        <TextField
          label="Código de 4 dígitos"
          value={value}
          onChange={setValue}
          placeholder="Ex.: 1234"
          maxLength={4}
          helperText="Máximo 4 dígitos"
          readOnly
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '860px' }}>
        <TextField
          label="Teclado completo"
          value={value}
          onChange={setValue}
          placeholder="Digite no teclado abaixo..."
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '340px' }}>
        <TextField
          label="Mobile"
          value={value}
          onChange={setValue}
          placeholder="Digite no teclado abaixo..."
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '380px' }}>
        <TextField
          label="iOS"
          value={value}
          onChange={setValue}
          placeholder="Digite no teclado abaixo..."
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '420px' }}>
        <TextField
          label="Idioma"
          value={value}
          onChange={setValue}
          placeholder="Selecione um idioma no painel de controles..."
          readOnly
          helperText='↳ Campo de texto externo ao teclado virtual'
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
