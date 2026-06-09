import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search } from '@giro-ds/react';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    docs: {
      description: {
        component: 'O Search é um campo de busca com ícone de lupa à esquerda e botão de limpar à direita. Permite ao usuário filtrar conteúdo por digitação, tanto de forma autônoma quanto conectado a um estado externo.',
      },
    },
    controls: { sort: 'alpha' },
  },
  argTypes: {
    placeholder: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    searchMode: { control: { type: 'select' }, options: ['instant', 'on-enter'] },
    value: { control: false },
    onChange: { control: false },
    onSearch: { control: false },
    onKeyDown: { control: false },
    onFocus: { control: false },
    onBlur: { control: false },
    onClear: { control: false },
    onClick: { control: false },
    onMouseDown: { control: false },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: (args) => <Search {...args} />,
  args: {
    placeholder: 'Buscar produto',
    scale: 1,
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

export const ModoEnter: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [searchedQuery, setSearchedQuery] = useState('');
    const filtered = produtosList.filter((item) =>
      item.toLowerCase().includes(searchedQuery.toLowerCase())
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Search
          placeholder="Pesquisar e pressionar Enter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => {
            setQuery('');
            setSearchedQuery('');
          }}
          searchMode="on-enter"
          onSearch={(value) => setSearchedQuery(value)}
        />
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-neutral-low-medium)' }}>
          {searchedQuery
            ? `Resultados para: "${searchedQuery}"`
            : 'Digite algo e pressione Enter para pesquisar'}
        </p>
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

export const Escalas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', width: '360px' }}>
      <Search placeholder="Scale 1.0" scale={1} />
      <Search placeholder="Scale 1.5" scale={1.5} />
      <Search placeholder="Scale 2.0" scale={2} />
    </div>
  ),
};