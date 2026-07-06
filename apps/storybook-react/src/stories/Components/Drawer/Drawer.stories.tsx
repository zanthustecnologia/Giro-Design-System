import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, Button } from '@giro-ds/react';
import { Filter16Regular } from '@fluentui/react-icons';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: 'O Drawer é um painel deslizante que aparece pela lateral direita da tela sobre um overlay semitransparente. É usado para exibir conteúdo secundário, formulários, filtros ou configurações sem remover o usuário do contexto principal da página.',
      },
    },
    // layout: 'centered',
  },
  argTypes: {
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onOpen: { table: { disable: true } },
    onOverlayClick: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerDemo = ({
  title = 'Configuracoes',
  customWidth = '400px',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  disabled = false,
  children,
  footer,
}: Partial<React.ComponentProps<typeof Drawer>>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" icon={<Filter16Regular />} onClick={() => setIsOpen(true)}>
        Abrir Drawer
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        customWidth={customWidth}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
        disabled={disabled}
        footer={footer}
      >
        {children}
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <DrawerDemo
      title={args.title}
      customWidth={args.customWidth}
      closeOnOverlayClick={args.closeOnOverlayClick}
      closeOnEscape={args.closeOnEscape}
      disabled={args.disabled}
    >
      <p>Conteudo interno do Drawer. Qualquer elemento React pode ser inserido aqui.</p>
    </DrawerDemo>
  ),
  args: {
    title: 'Configuracoes',
    customWidth: '400px',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    disabled: false,
  },
};

export const LarguraCustomizada: Story = {
  render: () => (
    <DrawerDemo title="Painel expandido" customWidth="600px">
      <p>Este Drawer utiliza uma largura maior para exibir conteudos que precisam de mais espaco.</p>
    </DrawerDemo>
  ),
};

export const SemFechamentoPorOverlay: Story = {
  render: () => (
    <DrawerDemo title="Formulario" closeOnOverlayClick={false} closeOnEscape={false}>
      <p>Este Drawer so pode ser fechado pelo botao X. Clique fora ou pressione Escape nao tem efeito.</p>
      <p>Util para formularios onde o usuario pode perder dados acidentalmente.</p>
    </DrawerDemo>
  ),
};

export const ComHeaderCustomizado: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const headerContent = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: '12px',
            background: 'var(--color-brand-primary-light, #e8f0fd)',
            color: 'var(--color-brand-primary-default, #1a6ce8)',
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          Avançado
        </span>
        <Button variant="text" size="lg" onClick={() => alert('Exportar clicado')}>
          Exportar
        </Button>
      </div>
    );

    return (
      <>
        <Button variant="outlined" icon={<Filter16Regular />} onClick={() => setIsOpen(true)}>
          Abrir Drawer
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Configurações"
          customWidth="fit-content"
          headerContent={headerContent}
        >
          <div style={{width: "500px"}}>
            <p>
              Este Drawer exibe conteúdo adicional no cabeçalho, entre o título e o botão de fechar. Use{' '}
              <code>headerContent</code> para incluir tags, badges ou ações rápidas.
            </p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const ComFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="outlined" icon={<Filter16Regular />} onClick={() => setIsOpen(true)}>
          Abrir Drawer
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Com footer fixo"
          customWidth="400px"
          footer={
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '16px 24px',
              borderTop: '1px solid var(--color-neutral-high-dark)',
              background: 'var(--color-neutral-high-default)',
            }}>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsOpen(false)}>Confirmar</Button>
            </div>
          }
        >
          <p>Role o conteudo abaixo para ver o footer sempre visivel na base do Drawer.</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: '8px 0', color: 'var(--color-neutral-low-medium)' }}>
              Item de conteudo {i + 1}
            </p>
          ))}
        </Drawer>
      </>
    );
  },
};
