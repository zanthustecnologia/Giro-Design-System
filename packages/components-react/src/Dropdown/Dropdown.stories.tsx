import React from "react";
import { UsbPlug24Regular } from "@fluentui/react-icons";
import type { Meta, StoryFn } from '@storybook/react';
import DropDown, { DropdownItem, DropdownProps } from "./Dropdown";

import { Person16Regular, UsbPlug20Filled } from '@fluentui/react-icons';

const mockValues: DropdownItem[] = [
  { id: 'item-1', text: '1', subText: 'List-item', icon: <Person16Regular /> },
  { id: 'item-2', text: 'List-item 2', disabled: true, icon: <Person16Regular /> },
  { id: 'item-3', text: 'L 3', disabled: true, subText: 'L', icon: <Person16Regular /> },
  { id: 'item-4', text: 'L 4', subText: 'L', icon: <Person16Regular /> },
  { id: 'item-5', text: 'L 5', subText: 'L', icon: <UsbPlug20Filled /> },
  { id: 'item-6', text: 'L 6', subText: 'L', icon: <Person16Regular /> },
  { id: 'item-7', text: 'L 7', subText: 'L', icon: <Person16Regular /> },
  { id: 'item-8', text: 'L 8', subText: 'L', icon: <UsbPlug24Regular /> },
];

const meta: Meta<typeof DropDown> = {
  title: "Components/DropDown",
  component: DropDown,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    applySearch: {
      control: 'boolean',
      description: 'Habilita campo de busca'
    },
    type: {
      control: 'select',
      options: ['checkbox', 'text', 'icon'],
      description: 'Tipo do dropdown'
    },
    showSubText: {
      control: 'boolean',
      description: 'Exibe subtexto dos itens'
    },
    items: {
      table: {
        disable: true,
      },
    },
    onSelectionChange: {
      action: 'selection changed',
      table: {
        disable: true,
      },
    },
  },
}

export default meta;

interface TemplateArgs extends Omit<DropdownProps, 'items'> {
  // Propriedades específicas do template se necessário
}

const Template: StoryFn<TemplateArgs> = (args) => {
  const { applySearch, type, showSubText, ...restArgs } = args;

  const handleSelectionChange = (selectedIds: string[]): void => {
    console.log('Selected items:', selectedIds);
  };

  return (
    <div style={{ width: '300px' }}>
      <DropDown
        {...restArgs}
        items={mockValues}
        applySearch={applySearch}
        placeholder='Buscar'
        type={type}
        onSelectionChange={handleSelectionChange}
        showSubText={showSubText}
      />
    </div>
  );
};

export const DropdownSimple = Template.bind({});
DropdownSimple.args = {
  applySearch: true,
  type: 'text',
  showSubText: true,
  placeholder: 'Buscar',
};

export const DropdownCheckbox = Template.bind({});
DropdownCheckbox.args = {
  type: 'checkbox',
  showSubText: true,
  placeholder: 'Selecione múltiplos itens',
};

export const DropdownIcon = Template.bind({});
DropdownIcon.args = {
  applySearch: false,
  type: 'icon',
  showSubText: true,
  placeholder: 'Buscar com ícones',
};