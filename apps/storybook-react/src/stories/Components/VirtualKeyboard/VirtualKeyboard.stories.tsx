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
    layout: 'default',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '420px' }}>
        <TextField
          label="Campo de texto"
          value={value}
          onChange={setValue}
          placeholder="Digite no teclado abaixo..."
          readOnly
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
        />
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
