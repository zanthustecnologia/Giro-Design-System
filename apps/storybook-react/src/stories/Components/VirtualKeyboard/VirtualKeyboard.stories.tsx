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
    layout: {
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
    layout: 'default',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '420px' }}>
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
        <VirtualKeyboard {...args} targetRef={inputRef as React.RefObject<HTMLInputElement>} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const ModoFixed: Story = {
  args: {
    mode: 'fixed',
    layout: 'default',
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
  args: {
    mode: 'native',
    layout: 'default',
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
