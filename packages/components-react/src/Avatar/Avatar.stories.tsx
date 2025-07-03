import Avatar from "./Avatar";
import React from "react";
import { Person16Regular, Add16Regular, Add16Filled, ArrowCircleDown12Regular } from "@fluentui/react-icons";
import type { Meta, StoryObj } from '@storybook/react';

interface AvatarProps {
  id?: string;
  icon: React.ElementType;
  size?: 'small' | 'large';
  className?: string;
}
const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ["small", "large"],
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'add16R', 'add16F', 'arrow'],
      mapping: {
        none: Person16Regular,
        add16R: Add16Regular,
        add16F: Add16Filled,
        arrow: ArrowCircleDown12Regular,
      },
    },
    className: {
      table: {
        disable: true,
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
    icon: Person16Regular,
    size: 'large',
  },
};
// export const Small: Story = {
//   render: Template,
//   args: {
//     icon: Add16Regular,
//     size: 'small',
//   },
// };

// export const Large: Story = {
//   render: Template,
//   args: {
//     icon: Add16Filled,
//     size: 'large',
//   },
// };