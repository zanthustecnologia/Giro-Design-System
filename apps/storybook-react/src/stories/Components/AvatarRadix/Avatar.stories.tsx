import { Person16Regular, Add16Regular, Add16Filled, ArrowCircleDown12Regular } from "@fluentui/react-icons";
import { Avatar } from "@giro-ds/react";
import React from "react";

import type { AvatarProps } from "@giro-ds/react";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ["sm", "lg"],
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'add16R', 'add16F', 'arrow'],
      mapping: {
        none: <Person16Regular />,
        add16R: <Add16Regular />,
        add16F: <Add16Filled />,
        arrow: <ArrowCircleDown12Regular />,
      },
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
  },
};

export const ComImagem: Story = {
  render: Template,
  args: {
    icon: <Person16Regular />,
    size: 'lg',
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80', // Imagem de exemplo do Radix UI
  },
};