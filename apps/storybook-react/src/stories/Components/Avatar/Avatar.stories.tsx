import { Person16Regular, Add16Regular, Add16Filled, ArrowCircleDown12Regular } from "@fluentui/react-icons";
import { Avatar } from "@giro-ds/react";
import React from "react";

import type { AvatarProps } from "@giro-ds/react";
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Avatar é um componente que representa um usuário ou entidade na interface. Exibe uma imagem, ícone ou iniciais como identificação visual, com suporte a fallback automático quando a imagem não está disponível.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ["sm", "lg"],
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'person', 'add16R', 'add16F', 'arrow'],
      mapping: {
        none: null,
        person: <Person16Regular />,
        add16R: <Add16Regular />,
        add16F: <Add16Filled />,
        arrow: <ArrowCircleDown12Regular />,
      },
    },
    text: {
      control: 'text',
      description: 'Texto exibido quando não há imagem ou ícone (máximo 2 caracteres)',
    },
  },
};

export default meta;

type Story = StoryObj<AvatarProps>;


const Template = ({ icon, ...args }: AvatarProps) => {
  return (
    <div>
      <Avatar {...args} icon={icon} />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    icon: <Person16Regular />,
    size: 'lg',
    text: 'GR',
  },
};

export const ComImagem: Story = {
  render: Template,
  args: {
    icon: <Person16Regular />,
    size: 'lg',
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80', // Imagem de exemplo do Radix UI
    text: 'GR',
  },
};

export const ComIniciais: Story = {
  render: Template,
  args: {
    text: 'GR',
    size: 'lg',
  },
};

export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Avatar icon={<Person16Regular />} size="lg" text="GR" />
      <Avatar icon={<Person16Regular />} size="sm" text="GR" />
    </div>
  ),
};