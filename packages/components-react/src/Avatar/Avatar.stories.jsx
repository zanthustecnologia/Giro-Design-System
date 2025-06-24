import Avatar from "./Avatar";
import React from "react";
import { Person16Regular, Add16Regular, Add16Filled, ArrowCircleDown12Regular } from "@fluentui/react-icons";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: { variant: 'select' },
      options: ["small", "large"],
    },
    icon: {
      control: { variant: 'select' },
      options: ['none', 'add16R', 'add16F', 'arrow'],
      mapping: {
        none: null, // Sem ícone
        add16R: <Add16Regular />, // Ícone Add16Regular
        add16F: <Add16Filled />, // Ícone Add12Regular
        arrow: <ArrowCircleDown12Regular />,
      },
    },
  },
};


const Template = ({ icon, ...args }) => {
  return (
    <div className="storybook-container">
      <Avatar {...args} icon={icon} />

    </div>
  )
}
export const Default = Template.bind({});
Default.args = {
  icon: <Person16Regular />,
  size: "lg"
}




