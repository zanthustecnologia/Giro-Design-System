import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button, TextField, VirtualKeyboard } from '@giro-ds/react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: 'O Modal é uma janela sobreposta ao conteúdo da página que exibe informações ou formulários sem remover o usuário do contexto atual. Diferente do Dialog, aceita qualquer conteúdo livre no corpo e pode ser fechado pelo botão X, pela tecla Escape ou clicando no overlay.',
      },
    },
    // layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    closingButton: {
      control: 'boolean',
      description: 'Define se o botão de fechar é exibido (padrão: true)',
    },
    closeOnOverlayClick: { control: 'boolean' },
    customWidth: {
      control: 'text',
      description: 'Largura customizada do modal (ex: \'500px\', \'80%\')',
    },
    customHeight: {
      control: 'text',
      description: 'Altura customizada do modal (ex: \'500px\', \'80%\')',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Ocupa toda a tela. Tem prioridade sobre customWidth',
    },
    children: { table: { disable: true } },
    headerContent: { table: { disable: true } },
    footer: { table: { disable: true } },
    onClose: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = ({
  title = 'Título do Modal',
  closeOnOverlayClick = true,
  closingButton = true,
  customWidth,
  customHeight,
  fullscreen,
  children,
  headerContent,
  footer,
}: Partial<React.ComponentProps<typeof Modal>>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Abrir Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        closeOnOverlayClick={closeOnOverlayClick}
        closingButton={closingButton}
        customWidth={customWidth}
        customHeight={customHeight}
        fullscreen={fullscreen}
        headerContent={headerContent}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalDemo
      title={args.title}
      closeOnOverlayClick={args.closeOnOverlayClick}
      closingButton={args.closingButton}
      customWidth={args.customWidth}
      customHeight={args.customHeight}
      fullscreen={args.fullscreen}
    >
      Conteúdo interno do Modal. Qualquer elemento React pode ser inserido aqui.
    </ModalDemo>
  ),
  args: {
    title: 'Título do Modal',
    closeOnOverlayClick: true,
    closingButton: true,
    fullscreen: false,
  },
};

export const ConteudoLongo: Story = {
  render: () => (
    <ModalDemo title="Termos de uso">
        Ao utilizar esta plataforma, você concorda com os termos de uso e a política de privacidade
        descritos neste documento. Leia atentamente antes de prosseguir.
        <br/>
        O uso indevido das informações disponibilizadas pode resultar na suspensão temporária ou
        permanente da sua conta, a critério da administração da plataforma.
        <br/>
        Reservamo-nos o direito de atualizar estes termos a qualquer momento. Você será notificado
        em caso de alterações significativas.
        <br/>
        Para dúvidas ou solicitações relacionadas à privacidade dos seus dados, entre em contato
        pelo canal de suporte disponível na plataforma.
        <br/>
        Ao continuar utilizando a plataforma após a publicação de novas versões dos termos, você
        automaticamente concorda com as alterações efetuadas.

    </ModalDemo>
  ),
};

export const SemFechamentoPorOverlay: Story = {
  render: () => (
    <ModalDemo title="Formulário" closeOnOverlayClick={false}>

        Este Modal só pode ser fechado pelo botão X. Clicar fora não tem efeito.
        <br/>
        Útil para fluxos onde o usuário pode perder dados ao fechar acidentalmente.

    </ModalDemo>
  ),
};

export const SemTitulo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          Abrir Modal sem título
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          Modal sem título definido. O cabeçalho exibe apenas o botão de fechar.
        </Modal>
      </>
    );
  },
};

export const TelaCheia: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          Abrir Modal Fullscreen
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal em tela cheia"
          fullscreen
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button variant="filled" onClick={() => setIsOpen(false)}>
                Confirmar
              </Button>
            </div>
          }
        >
          Este modal ocupa toda a tela. Útil para fluxos complexos ou visualização de conteúdo extenso.
        </Modal>
      </>
    );
  },
};

export const ComVirtualKeyboard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Reproduz o cenário de conflito entre `Modal` e `VirtualKeyboard` (modo `native`): o teclado é ' +
          'portalizado em `document.body`, fora da árvore DOM do `Dialog.Content` do Radix. Use este story ' +
          'para validar que clicar nas teclas não fecha o Modal nem o teclado, e que o teclado permanece ' +
          'visível/funcional enquanto o campo está focado.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          Abrir Modal com VirtualKeyboard
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal + VirtualKeyboard"
        >
          <p style={{ marginTop: 0 }}>
            Clique no campo abaixo para abrir o teclado virtual e, em seguida, toque nas teclas.
            Nem o teclado, nem o Modal devem fechar sozinhos.
          </p>
          {/*
            O VirtualKeyboard não define z-index próprio (fica a cargo de quem o consome).
            Neste story, garantimos que o teclado fique acima do Modal via className + CSS local.
          */}
          <style>{'.vk-demo-zindex { z-index: 1100; }'}</style>
          <TextField
            label="Campo de texto"
            value={value}
            onChange={setValue}
            placeholder="Clique aqui para abrir o teclado..."
            readOnly
            helperText="Clique no campo para abrir o teclado virtual"
            ref={inputRef}
          />
          <VirtualKeyboard
            variant="native"
            type="default"
            targetRef={inputRef as React.RefObject<HTMLInputElement>}
            value={value}
            onChange={setValue}
            className="vk-demo-zindex"
          />
        </Modal>
      </>
    );
  },
};
