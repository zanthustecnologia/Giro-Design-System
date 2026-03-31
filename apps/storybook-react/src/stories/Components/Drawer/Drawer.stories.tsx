import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, Button } from '@giro-ds/react';
import { Filter16Regular } from '@fluentui/react-icons';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    customWidth: { control: 'text' },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { table: { disable: true } },
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
