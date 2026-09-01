import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Dialog, Button } from '@giro-ds/react';
import type { DialogProps } from '@giro-ds/react';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: 'O Dialog é uma janela modal que sobrepõe o conteúdo da página para solicitar uma decisão ou confirmação do usuário. O fluxo principal fica bloqueado até que o Dialog seja respondido ou fechado.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do Dialog',
    },
    bodyContent: {
      control: 'text',
      description: 'Conteúdo do Dialog',
    },
    textPrimaryAction: {
      control: 'text',
      description: 'Texto do botão de ação primária',
    },
    textSecondaryAction: {
      control: 'text',
      description: 'Texto do botão de ação secundária',
    },
    onPrimaryAction: { table: { disable: true } },
    onSecondaryAction: { table: { disable: true } },
  },
};

export default meta;

// Story com ação única — Dialog sempre aberto
export const Default: StoryFn<DialogProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Dialog</Button>
      <Dialog {...args} show={isOpen} onPrimaryAction={() => setIsOpen(false)} />
    </>
  );
};
Default.args = {
  title: 'Título do dialog',
  bodyContent: 'Mensagem do dialog',
  textPrimaryAction: 'Ok',
};

// Story interativa — abre o Dialog ao clicar no botão
export const Interativo: StoryFn<DialogProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Dialog</Button>
      <Dialog
        {...args}
        show={isOpen}
        onPrimaryAction={() => setIsOpen(false)}
        onSecondaryAction={() => setIsOpen(false)}
      />
    </>
  );
};
Interativo.args = {
  title: 'Título do dialog',
  bodyContent: 'Mensagem do dialog',
  textPrimaryAction: 'Confirmar',
  textSecondaryAction: 'Cancelar',
};

// Story com duas ações — Dialog sempre aberto
export const DuasAcoes: StoryFn<DialogProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Dialog</Button>
      <Dialog
        {...args}
        show={isOpen}
        onPrimaryAction={() => setIsOpen(false)}
        onSecondaryAction={() => setIsOpen(false)}
      />
    </>
  );
};
DuasAcoes.args = {
  title: 'Confirmar ação',
  bodyContent: 'Tem certeza que deseja continuar? Esta ação não pode ser desfeita.',
  textPrimaryAction: 'Confirmar',
  textSecondaryAction: 'Cancelar',
};

// Story com conteúdo longo — Dialog sempre aberto
export const ConteudoLongo: StoryFn<DialogProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Dialog</Button>
      <Dialog
        {...args}
        show={isOpen}
        onPrimaryAction={() => setIsOpen(false)}
        onSecondaryAction={() => setIsOpen(false)}
      />
    </>
  );
};
ConteudoLongo.args = {
  title: 'Termos de uso',
  bodyContent: 'Ao continuar, você concorda com os termos de uso e política de privacidade da plataforma. Leia atentamente antes de prosseguir. O uso indevido das informações pode resultar na suspensão da sua conta.',
  textPrimaryAction: 'Aceitar',
  textSecondaryAction: 'Recusar',
};
