import React from 'react';
import { Delete16Regular, Add16Regular } from '@fluentui/react-icons';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { ToastRadix, Button } from '@giro-ds/react';
import type { ToastProps } from '@giro-ds/react';



const meta: Meta<ToastProps> = {
  title: 'Components/ToastRadix',
  component: ToastRadix,
  parameters: {
    docs: {
      description: {
        component:
          'Componente Select usando Radix UI com estilização customizada e melhor organização de código.',
      },
    },
  },
  argTypes: {
    titulo: {
      control: 'text',
      description: 'Titulo a ser exibido no toast',
    },
    descricao: {
      control: 'text',
      description: 'Descrição a ser exibida no toast',
    },
    acao: {
      control: 'text',
      description: 'Texto da ação no toast',
    },
    close: {
      control: 'text',
      description: 'Texto do botão de fechar no toast',
    },
    duration: {
      control: 'number',
      description: 'Duração do toast em milissegundos',
    },
    automaticClose: { 
      control: 'boolean',
      description: 'Define se o toast deve fechar automaticamente após a duração definida',
    },
    iconType: {
          control: { type: 'select' },
          options: ['', "Info", 'Sucess', 'Alert'],
          description: 'Ícone a ser exibido no toast',
    },
  },
};

export default meta;

export const Default: StoryFn<ToastProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <ToastRadix {...args}>
       <Button>
          Show Toast
      </Button>
    </ToastRadix>
  </div>
);