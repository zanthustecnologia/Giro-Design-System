import { VirtualKeyboard, TextField } from '@giro-ds/react';
import React, { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

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
      description:
        'Modo de exibicao do teclado. `native` aparece ao focar no campo referenciado por `targetRef`. `fixed` exibe o teclado sempre visivel com um TextField proprio acima.',
    },
    textFieldPlaceholder: {
      control: 'text',
      description: 'Placeholder do TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'mode', eq: 'fixed' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text do TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'mode', eq: 'fixed' },
    },
    error: {
      control: 'boolean',
      description: 'Ativa o estado de erro no TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'mode', eq: 'fixed' },
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro do TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'mode', eq: 'fixed' },
    },
    variant: {
      control: 'select',
      options: [
        'default', 'numeric', 'fullKeyboard', 'mobile',
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
    showSmileysButton: {
      control: 'boolean',
      description: 'Exibe ou oculta o botao {smileys} nos layouts suportados.',
    },
    maxLength: {
      control: 'number',
      description: 'Limite maximo de caracteres',
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onKeyPress: { table: { disable: true } },
    targetRef: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;

export const Default: Story = {
  args: {
    mode: 'native',
    variant: 'default',
    showSmileysButton: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '420px' }}>
        {args.mode === 'native' && (
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Campo de texto"
              value={value}
              onChange={setValue}
            placeholder="Clique aqui para abrir o teclado..."
            readOnly
            helperText="Clique no campo para abrir o teclado virtual"
            ref={inputRef}
          />
        </div>
        )}
        <VirtualKeyboard {...args} targetRef={inputRef as React.RefObject<HTMLInputElement>} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const ModoFixed: Story = {
  args: {
    mode: 'fixed',
    variant: 'default',
    showSmileysButton: true,
    textFieldPlaceholder: 'Digite no teclado...',
    helperText: 'Use o teclado virtual para preencher o campo.',
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
  args: {
    mode: 'native',
    variant: 'default',
    showSmileysButton: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '420px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>
          Clique no campo abaixo — o teclado abrirá na parte inferior da tela.
        </p>
        <input
          ref={inputRef}
          value={value}
          readOnly
          placeholder="Clique aqui para abrir o teclado..."
          style={{
            width: '100%',
            height: '44px',
            padding: '0 16px',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
          }}
        />
        <VirtualKeyboard {...args} targetRef={inputRef as React.RefObject<HTMLInputElement>} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const SemSmileys: Story = {
  args: {
    mode: 'fixed',
    variant: 'default',
    showSmileysButton: false,
    textFieldPlaceholder: 'Teclado sem botao de smileys',
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

export const Numerico: Story = {
  args: {
    mode: 'fixed',
    variant: 'numeric',
    textFieldPlaceholder: 'Digite apenas numeros',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '320px' }}>
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    mode: 'fixed',
    variant: 'default',
    disabled: true,
    textFieldPlaceholder: 'Teclado desabilitado',
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

export const ComLimiteDeCaracteres: Story = {
  args: {
    mode: 'fixed',
    variant: 'numeric',
    maxLength: 4,
    textFieldPlaceholder: 'Maximo de 4 caracteres',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '320px' }}>
        <VirtualKeyboard {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const ShiftECapsLock: Story = {
  args: {
    mode: 'fixed',
    variant: 'default',
    showSmileysButton: true,
    textFieldPlaceholder: 'Teste Shift e CapsLock',
    helperText: 'Shift vale para uma tecla. CapsLock permanece ativo ate sair do layout caps.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comportamento esperado: Shift aplica maiusculas apenas na proxima tecla e volta ao layout default. CapsLock alterna para o layout caps e permanece ativo ate alternar de volta para o layout default.',
      },
    },
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
