import { VirtualKeyboard, TextField } from '@giro-ds/react';
import React, { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

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
    variant: {
      control: 'select',
      options: ['native', 'fixed'],
      description:
        'Modo de exibicao do teclado. `native` aparece ao focar no campo referenciado por `targetRef` e permite fechar pelo botao {downkeyboard}. `fixed` exibe o teclado sempre visivel com um TextField proprio acima e sem o botao {downkeyboard}.',
    },
    textFieldPlaceholder: {
      control: 'text',
      description: 'Placeholder do TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'variant', eq: 'fixed' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text do TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'variant', eq: 'fixed' },
    },
    error: {
      control: 'boolean',
      description: 'Ativa o estado de erro no TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'variant', eq: 'fixed' },
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro do TextField interno. Disponivel apenas no modo `fixed`.',
      if: { arg: 'variant', eq: 'fixed' },
    },
    type: {
      control: 'select',
      options: [
        'default', 'numeric',
      ],
      description: 'Layout do teclado',
    },
    Emoji: {
      control: 'boolean',
      description: 'Exibe ou oculta o botao {emoticon} nos layouts suportados.',
    },
    maxLength: {
      control: 'number',
      description: 'Limite maximo de caracteres',
      if: { arg: 'variant', eq: 'fixed' },
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

const KeyboardWrapper = (args: React.ComponentProps<typeof VirtualKeyboard>) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: args.type === 'numeric' ? '320px' : '500px' }}>
      {args.variant === 'native' && (
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
      <VirtualKeyboard
        {...args}
        targetRef={inputRef as React.RefObject<HTMLInputElement>}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    variant: 'native',
    type: 'default',
    Emoji: false,
  },
  render: (args) => <KeyboardWrapper {...args} />,
};

export const ModoFixed: Story = {
  args: {
    variant: 'fixed',
    type: 'default',
    Emoji: false,
    textFieldPlaceholder: 'Digite aqui...',
  },
  render: (args) => <KeyboardWrapper {...args} />,
};

export const ModoNative: Story = {
  args: {
    variant: 'native',
    type: 'default',
    Emoji: false,
  },
  render: (args) => <KeyboardWrapper {...args} />,
};

export const ShiftECapsLock: Story = {
  args: {
    variant: 'native',
    type: 'default',
    Emoji: false,
  },
  render: (args) => <KeyboardWrapper {...args} />,
};

export const Numerico: Story = {
  args: {
    variant: 'native',
    type: 'numeric',
    Emoji: false,
  },
  render: (args) => <KeyboardWrapper {...args} />,
};

export const SemEmoji: Story = {
  args: {
    variant: 'native',
    type: 'default',
    Emoji: false,
  },
  render: (args) => <KeyboardWrapper {...args} />,
};
