import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import DropdownRadix from './DropdownRadix';
import type { DropdownItem } from './DropdownRadix';

const meta: Meta<typeof DropdownRadix> = {
  title: 'Components/DropdownRadix',
  component: DropdownRadix,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dropdown sempre visível usando padrões de acessibilidade melhorados. Este dropdown é controlado externamente e sempre renderiza seu conteúdo quando montado.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array de itens para exibir no dropdown',
      control: 'object'
    },
    type: {
      description: 'Tipo do dropdown',
      control: 'radio',
      options: ['text', 'checkbox', 'icon']
    },
    position: {
      description: 'Posição do dropdown',
      control: 'radio',
      options: ['top', 'bottom']
    },
    applySearch: {
      description: 'Habilita campo de busca',
      control: 'boolean'
    },
    filter: {
      description: 'Modo de filtro com botões aplicar/limpar',
      control: 'boolean'
    },
    maxHeight: {
      description: 'Altura máxima do dropdown',
      control: 'text'
    },
    width: {
      description: 'Largura do dropdown',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DropdownRadix>;

// Sample data
const mockValues: DropdownItem[] = [
  { id: 'item-1', text: 'List-item 1', subText: 'List-item 1' },
  { id: 'item-2', text: 'List-item 2', disabled: true },
  { id: 'item-3', text: 'List-item 3', disabled: true, subText: 'List-item 3' },
  { id: 'item-4', text: 'List-item 4', subText: 'List-item 4' },
  { id: 'item-5', text: 'List-item 5', subText: 'List-item 5' },
  { id: 'item-6', text: 'List-item 6', subText: 'List-item 6' },
  { id: 'item-7', text: 'List-item 7', subText: 'List-item 7' },
  { id: 'item-8', text: 'List-item 8', subText: 'List-item 8' },
];

const iconItems: DropdownItem[] = [
  { id: '1', text: 'Home', icon: '🏠' },
  { id: '2', text: 'Settings', icon: '⚙️' },
  { id: '3', text: 'Profile', icon: '👤' },
  { id: '4', text: 'Logout', icon: '🚪', disabled: true },
];

// Basic story
export const Default: Story = {
  args: {
    items: mockValues,
    type: 'text',
    applySearch: false,
    showSubText: true,
    maxHeight: '300px',
    width: '250px'
  }
};