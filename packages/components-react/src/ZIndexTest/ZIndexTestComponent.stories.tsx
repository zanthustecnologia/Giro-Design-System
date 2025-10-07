import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ZIndexTestComponent from './ZIndexTestComponent';

const meta: Meta<typeof ZIndexTestComponent> = {
  title: 'Tests/Z-Index Test',
  component: ZIndexTestComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Teste de Z-Index

Este componente testa se os problemas de z-index foram resolvidos.

## Problemas que foram corrigidos:
- Menu e Dropdown passando por trás do TextField
- Inconsistência nos valores de z-index
- Falta de sistema organizado de camadas

## Como testar:
1. Abra os dropdowns do Menu e Select
2. Verifique se eles aparecem SOBRE o TextField
3. Confirme que a hierarquia de z-index está correta

## Sistema de Z-Index implementado:
- **Content (TextField, SelectField)**: z-index: 1
- **Dropdowns (Menu, Select, Filter)**: z-index: 15  
- **Tooltips**: z-index: 25
- **Drawers**: z-index: 1000
- **Dialogs**: z-index: 2000
- **Toasts**: z-index: 9000
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ZIndexTestComponent>;

export const ZIndexTest: Story = {
  render: () => <ZIndexTestComponent />,
};