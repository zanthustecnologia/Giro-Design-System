import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button } from '@giro-ds/react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    closeOnOverlayClick: { control: 'boolean' },
    customWidth: {
      control: 'text',
      description: 'Largura customizada do modal (ex: \'500px\', \'80%\')',
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
  customWidth,
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
        customWidth={customWidth}
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
      customWidth={args.customWidth}
      fullscreen={args.fullscreen}
    >
      <p>Conteúdo interno do Modal. Qualquer elemento React pode ser inserido aqui.</p>
    </ModalDemo>
  ),
  args: {
    title: 'Título do Modal',
    closeOnOverlayClick: true,
    fullscreen: false,
  },
};

export const ConteudoLongo: Story = {
  render: () => (
    <ModalDemo title="Termos de uso">
      <p>
        Ao utilizar esta plataforma, você concorda com os termos de uso e a política de privacidade
        descritos neste documento. Leia atentamente antes de prosseguir.
      </p>
      <p style={{ marginTop: '16px' }}>
        O uso indevido das informações disponibilizadas pode resultar na suspensão temporária ou
        permanente da sua conta, a critério da administração da plataforma.
      </p>
      <p style={{ marginTop: '16px' }}>
        Reservamo-nos o direito de atualizar estes termos a qualquer momento. Você será notificado
        em caso de alterações significativas.
      </p>
      <p style={{ marginTop: '16px' }}>
        Para dúvidas ou solicitações relacionadas à privacidade dos seus dados, entre em contato
        pelo canal de suporte disponível na plataforma.
      </p>
      <p style={{ marginTop: '16px' }}>
        Ao continuar utilizando a plataforma após a publicação de novas versões dos termos, você
        automaticamente concorda com as alterações efetuadas.
      </p>
    </ModalDemo>
  ),
};

export const SemFechamentoPorOverlay: Story = {
  render: () => (
    <ModalDemo title="Formulário" closeOnOverlayClick={false}>
      <p>
        Este Modal só pode ser fechado pelo botão X. Clicar fora não tem efeito.
      </p>
      <p style={{ marginTop: '16px' }}>
        Útil para fluxos onde o usuário pode perder dados ao fechar acidentalmente.
      </p>
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
          <p>Modal sem título definido. O cabeçalho exibe apenas o botão de fechar.</p>
        </Modal>
      </>
    );
  },
};

export const ComFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          Abrir Modal
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirmar ação"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', flexShrink: 0, padding: '24px', paddingTop: '0' }}>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button variant="filled" onClick={() => setIsOpen(false)}>
                Confirmar
              </Button>
            </div>
          }
        >
          <p>Tem certeza que deseja realizar esta ação? Esta operação não pode ser desfeita.</p>
        </Modal>
      </>
    );
  },
};

export const Fullscreen: Story = {
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
          <p>Este modal ocupa toda a tela. Útil para fluxos complexos ou visualização de conteúdo extenso.</p>
        </Modal>
      </>
    );
  },
};
