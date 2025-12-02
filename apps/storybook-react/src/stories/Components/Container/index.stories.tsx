import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Container } from '@giro/react';

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
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga placeat earum perferendis quam harum ut saepe rem explicabo expedita ipsum inventore nemo eaque voluptatum molestiae non aut labore, necessitatibus nobis.</p>
      <p>Texto adicional no container padrão.</p>
    </Container>
  )
}