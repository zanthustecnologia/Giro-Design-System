import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Container } from '@giro-ds/react';

interface ContainerProps {
  children: React.ReactNode
}

const meta: Meta<ContainerProps> = {
  title: 'Components/Container',
  component: Container,
  args: {
    children: 'Conteúdo do Container'
  }
}

export default meta;

type Story = StoryObj<ContainerProps>

export const Default: Story = {
  render: () => (
    <Container>
      <h1>Container Padrão</h1>
      <p>“Ser, ou não ser: eis a questão:<br/>
        Será mais nobre em nosso espírito sofrer <br/>
        pedradas e flechadas do destino feroz, <br/>
        ou insurgir-nos contra um mar de angústias <br/>
        e, combatendo-o, dar-lhe fim?”
      </p>
      <p>— William Shakespeare, Hamlet (Ato III, Cena I)</p>
      <p>Texto adicional no container padrão.</p>
    </Container>
  )
}