import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@giro-ds/react';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '32px', boxSizing: 'border-box' }}>
        <style>{`main { outline: 2px dashed var(--color-neutral-high-dark, #cfd0da); outline-offset: -2px; }`}</style>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <Container>
      <h1 className="heading-1">Titulo da pagina</h1>
      <p>Este e um exemplo de conteudo dentro do Container. O componente aplica padding horizontal responsivo e centraliza o conteudo na pagina.</p>
      <p>O Container utiliza o elemento semantico main, garantindo acessibilidade e estrutura adequada para leitores de tela.</p>
    </Container>
  ),
};