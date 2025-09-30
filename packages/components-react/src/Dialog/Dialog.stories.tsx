import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Dialog, { DialogProps } from './Dialog';
import Button from '../Button/Button';

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
    tags: ['autodocs'],
  },
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Controla a visibilidade do Dialog'
    },
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

/**
 * Props para o DialogStoryWrapper
 */
interface DialogStoryWrapperArgs extends Omit<DialogProps, 'show'> {
  [key: string]: any;
}

/**
 * Storybook wrapper para exibir o Dialog ao clicar no botão.
 * O Dialog só fecha via ESC ou pelos botões.
 */
const DialogStoryWrapper: StoryFn<DialogStoryWrapperArgs> = (args) => {
  const [show, setShow] = useState<boolean>(false);

  // Handler para ação OK
  const handleOk = (): void => {
    if (args.fnOk) args.fnOk();
    setShow(false);
  };

  // Handler para ação Cancelar
  const handleCancel = (): void => {
    if (args.fnCancel) args.fnCancel();
    setShow(false);
  };

  // Handler para fechar o dialog (ESC ou ação externa)
  const handleClose = (): void => {
    if (args.onClose) args.onClose();
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Abrir Dialog</Button>
      <Dialog
        {...args}
        show={show}
        fnConfirm={handleOk}
        fnCancel={handleCancel}
        onClose={handleClose}
        text={args.text || 'Conteúdo do diálogo'}
      />
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
  textCancel: 'Cancelar',
};

Default.parameters = {
  docs: {
    source: {
      code: `
/**
 * Exemplo de uso do componente Dialog.
 * - O Dialog é aberto ao clicar no botão.
 * - O fechamento pode ser feito pelos botões ou via ESC.
 * - Não é possível fechar o dialogo clicando fora dele.
 */

import React, { useState } from "react";
import Dialog from "./Dialog";
import Button from "../Button/Button";

/**
 * Exemplo de uso do Dialog.
 */
function Example() {
  const [show, setShow] = useState<boolean>(false);

  // Handler para ação OK
  const handleOk = (): void => {
    setShow(false);
  };

  // Handler para ação Cancelar
  const handleCancel = (): void => {
    setShow(false);
  };

  // Handler para fechar o dialog (ESC ou ação externa)
  const handleClose = (): void => {
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Abrir Dialog</Button>
      <Dialog
        show={show}
        title="Título do dialogo"
        text="Mensagem do dialogo"
        textOk="Ação"
        textCancel=""
        fnOk={handleOk}
        fnCancel={handleCancel}
        onClose={handleClose}
      />
    </>
  );
}
      `.trim(),
    },
  },
};

/**
 * Story: Dialog com duas ações (OK e Cancelar)
 */
export const TwoActions = DialogStoryWrapper.bind({});
TwoActions.args = {
  title: 'Título do dialogo',
  text: 'Mensagem do dialogo',
  textOk: 'Ação',
  textCancel: 'Ação',
};

TwoActions.parameters = {
  docs: {
    source: {
      code: `
/**
 * Exemplo de uso do componente Dialog com duas ações.
 * - O Dialog é aberto ao clicar no botão.
 * - O fechamento pode ser feito pelos botões ou via ESC.
 * - Não é possível fechar o dialogo clicando fora dele.
 */

import React, { useState } from "react";
import Dialog from "./Dialog";
import Button from "../Button/Button";

function Example() {
  const [show, setShow] = useState<boolean>(false);

  const handleOk = (): void => {
    setShow(false);
  };

  const handleCancel = (): void => {
    setShow(false);
  };

  const handleClose = (): void => {
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Abrir Dialog</Button>
      <Dialog
        show={show}
        title="Título do dialogo"
        text="Mensagem do dialogo"
        textOk="Ação"
        textCancel="Ação"
        fnOk={handleOk}
        fnCancel={handleCancel}
        onClose={handleClose}
      />
    </>
  );
}
      `.trim(),
    },
  },
};