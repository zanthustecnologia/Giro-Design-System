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
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['native', 'fixed'],
      description:
        'Modo de exibicao do teclado. `native` aparece ao focar no campo referenciado por `targetRef` e permite fechar pelo botao {downkeyboard}. `fixed` exibe o teclado sempre visivel com um TextField proprio acima e sem o botao {downkeyboard}.',
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
    showTypeSwitchKey: {
      control: 'boolean',
      description:
        'Exibe ou oculta a tecla de alternância entre os layouts default ("123") e numeric ("ABC"). Quando `false`, a tecla "123" é removida no layout default (a tecla espaço cresce) e a tecla "ABC" é substituída por espaço vazio no layout numeric.',
    },
    numpadWithEnter: {
      control: 'boolean',
      description:
        'Exibe o numpad numérico no formato de 4 colunas (estilo iOS nativo), com as teclas `-`, `↵` (newline), `⌫` e `→|` (enter/submit). Só tem efeito com `type="numeric"` e `variant="native"`.',
    },
    maxLength: {
      control: 'number',
      description: 'Limite maximo de caracteres',
      if: { arg: 'variant', eq: 'fixed' },
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onKeyPress: { table: { disable: true } },
    onEnterPress: { action: 'onEnterPress' },
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
    placeholder: 'Digite aqui...',
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
    variant: 'fixed',
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

const BREAKPOINTS = [
  { label: '≤ 360px', subtitle: 'iPhone SE · Moto G · Galaxy A', width: 360 },
  { label: '≤ 390px', subtitle: 'iPhone 14/15 · Galaxy S22/S23', width: 390 },
  { label: '≤ 480px', subtitle: 'iPhone Pro Max · Galaxy Ultra', width: 480 },
  { label: '≤ 768px', subtitle: 'Tablet · Landscape', width: 768 },
];

const DeviceFrame = ({
  label,
  subtitle,
  width,
  type,
}: {
  label: string;
  subtitle: string;
  width: number;
  type: 'default' | 'numeric';
}) => {
  const [value, setValue] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: '0 0 auto',
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'monospace',
          color: '#1a1a1a',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 10,
          color: '#666',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          width,
          border: '2px solid #ccc',
          borderRadius: 12,
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <VirtualKeyboard
          variant="fixed"
          type={type}
          value={value}
          onChange={setValue}
          placeholder="Digite aqui..."
        />
      </div>
    </div>
  );
};

export const ResponsividadeMobile: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    viewport: { disable: true },
  },
  render: () => (
    <div
      style={{
        padding: 24,
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', width: 'max-content' }}>
          {BREAKPOINTS.map((bp) => (
            <DeviceFrame key={bp.width} {...bp} type="default" />
          ))}
        </div>
      </div>
    </div>
  ),
};
