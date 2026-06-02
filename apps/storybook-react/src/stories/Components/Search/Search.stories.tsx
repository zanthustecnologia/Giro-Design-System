import { Search } from '@giro-ds/react';
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    controls: { sort: 'alpha' },
  },
  argTypes: {
    placeholder: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    value: { control: false },
    onChange: { control: false },
    onKeyDown: { control: false },
    onFocus: { control: false },
    onBlur: { control: false },
    onClear: { control: false },
    onClick: { control: false },
    onMouseDown: { control: false },
    virtualKeyboard: {
      control: 'boolean',
      description: 'Exibe o teclado virtual ao clicar no campo'
    },
    virtualKeyboardType: {
      control: 'select',
      options: [
        'default', 'numeric',
      ],
      description: 'Layout do teclado virtual',
      if: { arg: 'virtualKeyboard', truthy: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: (args) => <Search {...args} />,
  args: {
    placeholder: 'Buscar produto',
  },
};

const produtosList = [
  'Notebook Gamer',
  'Mouse sem fio',
  'Teclado mecânico',
  'Monitor 4K',
  'Headset bluetooth',
  'Webcam Full HD',
];

export const Controlado: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const filtered = produtosList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Search
          placeholder="Filtrar produtos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery('')}
        />
        <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: 'var(--color-neutral-low-dark)' }}>
          {filtered.length > 0 ? (
            filtered.map((item) => <li key={item}>{item}</li>)
          ) : (
            <li style={{ listStyle: 'none', color: 'var(--color-neutral-low-medium)' }}>
              Nenhum resultado encontrado
            </li>
          )}
        </ul>
      </div>
    );
  },
};

export const Desabilitado: Story = {
  render: () => <Search placeholder="Busca indisponível no momento" disabled />,
};

export const ComoGatilho: Story = {
  render: () => {
    const [aberto, setAberto] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Search
          placeholder="Buscar na plataforma..."
          onClick={() => setAberto((prev) => !prev)}
        />
        {aberto && (
          <div
            style={{
              padding: '16px',
              background: 'var(--color-neutral-high-light)',
              borderRadius: '8px',
              border: '1px solid var(--color-neutral-high-dark)',
              fontSize: '13px',
              color: 'var(--color-neutral-low-dark)',
            }}
          >
            Painel de busca aberto — modal ou flyout apareceria aqui.
          </div>
        )}
      </div>
    );
  },
};

export const WithVirtualKeyboard: Story = {
  args: {
    placeholder: 'Clique aqui para abrir o teclado...',
    virtualKeyboard: true,
    virtualKeyboardType: 'default',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '420px' }}>
        <Search
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
      </div>
    );
  },
};