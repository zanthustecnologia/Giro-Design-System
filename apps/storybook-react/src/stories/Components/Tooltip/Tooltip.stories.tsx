import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, Avatar, Button } from '@giro-ds/react';
import { Person16Regular } from '@fluentui/react-icons';
type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'O Tooltip exibe uma mensagem de texto ao passar o mouse sobre um elemento. É usado para fornecer informações complementares sem ocupar espaço permanente na interface.',
      },
    },
  },

  argTypes: {
    side: {
      control: 'select',
      options: ['top','bottom', 'left', 'right'],
      description: 'Lado em que o tooltip aparece em relação ao elemento'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alinhamento do tooltip ao longo do eixo perpendicular ao side'
    },
    text: {
      control: 'text',
      description: 'Texto a ser exibido no tooltip',
    },
    children: {
      control: false,
      description: 'Elemento que receberá o tooltip',
    },
  },
};

export default meta;

// Template base
const Template = (args: React.ComponentProps<typeof Tooltip>) => (
  <Tooltip {...args}>
    <Avatar icon={<Person16Regular />}/>
  </Tooltip>
);

// Stories
export const Default: Story = {
  args: {
    text: 'Texto aqui',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Avatar icon={<Person16Regular />}/>
    </Tooltip>
  ),
};

export const ComBotao: Story = {
  args: {
    text: 'Clique no botão para realizar uma ação',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
ComBotao.storyName = 'Com Botão';

export const PosicaoAbaixo: Story = {
  args: {
    text: 'Abaixo do elemento',
    side: 'bottom',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
PosicaoAbaixo.storyName = 'Posição Abaixo';

export const PosicaoEsquerda: Story = {
  args: {
    text: 'À esquerda do elemento',
    side: 'left',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
PosicaoEsquerda.storyName = 'Posição Esquerda';

export const PosicaoDireita: Story = {
  args: {
    text: 'À direita do elemento',
    side: 'right',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};PosicaoDireita.storyName = 'Posição Direita';