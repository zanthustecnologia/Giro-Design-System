import React from "react";
import { UsbPlug24Regular } from "@fluentui/react-icons";
import type { Meta, StoryFn } from '@storybook/react';
import DropDown, { DropdownItem, DropdownProps } from "./Dropdown";

import { Person16Regular, UsbPlug20Filled } from '@fluentui/react-icons';

const mockValues: DropdownItem[] = [
  { id: 'item-1', text: 'List-item 1', subText: 'List-item 1', icon: <Person16Regular /> },
  { id: 'item-2', text: 'List-item 2', disabled: true, icon: <Person16Regular /> },
  { id: 'item-3', text: 'List-item 3', disabled: true, subText: 'List-item 3', icon: <Person16Regular /> },
  { id: 'item-4', text: 'List-item 4', subText: 'List-item 4', icon: <Person16Regular /> },
  { id: 'item-5', text: 'List-item 5', subText: 'List-item 5', icon: <UsbPlug20Filled /> },
  { id: 'item-6', text: 'List-item 6', subText: 'List-item 6', icon: <Person16Regular /> },
  { id: 'item-7', text: 'List-item 7', subText: 'List-item 7', icon: <Person16Regular /> },
  { id: 'item-8', text: 'List-item 8', subText: 'List-item 8', icon: <UsbPlug24Regular /> },
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
    maxWidth: {
      control: 'number',
      description: 'Largura máxima do dropdown',
    },
    width: {
      control: 'number',
      description: 'Largura do dropdown',
    },
    minWidth: {
      control: 'number',
      description: 'Largura mínima do dropdown',
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
  const { applySearch, type, showSubText, maxWidth, minWidth, width, ...restArgs } = args;

  const handleSelectionChange = (selectedIds: string[]): void => {
    console.log('Selected items:', selectedIds);
  };

  return (
    <div>
      <DropDown
        {...restArgs}
        items={mockValues}
        applySearch={applySearch}
        placeholder='Buscar'
        type={type}
        onSelectionChange={handleSelectionChange}
        showSubText={showSubText}
        maxWidth={maxWidth}
        minWidth={minWidth}
        width={width}
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
  width: '210px'
};

export const DropdownCheckbox = Template.bind({});
DropdownCheckbox.args = {
  type: 'checkbox',
  showSubText: true,
  placeholder: 'Selecione múltiplos itens',
  width: '210px'
};

export const DropdownIcon = Template.bind({});
DropdownIcon.args = {
  applySearch: false,
  type: 'icon',
  showSubText: true,
  placeholder: 'Buscar com ícones',
  width: '210px'
};