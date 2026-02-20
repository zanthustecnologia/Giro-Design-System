import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Dialog, Button } from '@giro-ds/react';
import type { DialogProps } from '@giro-ds/react';

/**
 * Meta configuração do Storybook para o componente Dialog
 */
const meta: Meta<typeof Dialog> = {
  title: 'Pattern/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dialog é um componente de modal/dialog acessível e customizável.',
      },
    },
    },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do Dialog'
    },
    text: {
      control: 'text',
      description: 'Conteúdo do Dialog'
    },
    textConfirm: {
      control: 'text',
      description: 'Texto do botão Confirmar'
    },
    textCancel: {
      control: 'text',
      description: 'Texto do botão Cancelar'
    },
    fnConfirm: {
      action: 'Confirmar clicado',
      description: 'Função executada ao clicar Confirmar'
    },
    fnCancel: {
      action: 'Cancelar clicado',
      description: 'Função executada ao cancelar'
    },
    onClose: {
      action: 'Fechado',
      description: 'Função executada ao fechar'
    },
  },
};

export default meta;

interface DialogStoryWrapperArgs extends DialogProps {
  [key: string]: any;
}

const DialogStoryWrapper: StoryFn<DialogStoryWrapperArgs> = (args) => {
  
  return (
    <>
      
      <Dialog
        {...args}
        text={args.text || 'Conteúdo do diálogo'}>  
        <Button>Abrir Dialog</Button>
      </Dialog>
    </>
  );
};

/**
 * Story: Dialog com ação única (apenas botão OK)
 */
export const Default = DialogStoryWrapper.bind({});
Default.args = {
  title: 'Título do dialogo',
  text: 'Mensagem do dialogo',
  textConfirm: 'Ação',
};

/**
 * Story: Dialog com duas ações (OK e Cancelar)
 */
export const TwoActions = DialogStoryWrapper.bind({});
TwoActions.args = {
  title: 'Título do dialogo',
  text: 'Mensagem do dialogo',
  textConfirm: 'Ação',
  textCancel: 'Cancelar',
};