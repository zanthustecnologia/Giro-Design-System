import Avatar from "./Avatar";
import React from "react";
import { Person16Regular, Add16Regular, Add16Filled, ArrowCircleDown12Regular } from "@fluentui/react-icons";
import { Icon } from "../../../icons/src/Icon";
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
      options: ['none', 'add', 'usb', 'arrowDown'],
      mapping: {
        none: null,
        add: <Icon name="add" size={20} />,
        usb: <Icon name="usb" size={20} />,
        arrowDown: <Icon name="arrowDown" size={20} />,
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
  icon: 'usb',
  size: "lg"
}




