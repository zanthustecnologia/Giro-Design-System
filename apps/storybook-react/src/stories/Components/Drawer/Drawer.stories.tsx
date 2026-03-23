import React, { useState, ReactNode, JSX } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Drawer, Button } from '@giro-ds/react';
import type { DrawerProps } from '@giro-ds/react';
import { Filter16Regular } from '@fluentui/react-icons';

interface DrawerStoryProps extends DrawerProps {
  children?: ReactNode;
}

interface DrawerExampleProps {
  children?: ReactNode;
  title?: string;
  customWidth?: string;
  noPadding?: boolean;
  className?: string;

}
const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: 'Componente Drawer que desliza da lateral direita. Pode conter qualquer conteúdo. A função de abertura deve ser controlada externamente.',
      },
    },
  },
  argTypes: {
    title: { 
      control: 'text',
      defaultValue: 'Título',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Título' },
      },
    },
    customWidth: { 
      control: 'text',
      defaultValue: '400px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0px' },
      },
    },
    children: { 
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  
  },
  decorators: [
    (Story) => (
      <div style={{ height: '60vh', position: 'relative', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

/**
 * Componente de exemplo que demonstra o uso básico do Drawer
 * Implementa controle externo de abertura e fechamento
 */
const DrawerExample: React.FC<DrawerExampleProps> = ({ 
  children, 
  title = 'Título do Drawer',
  customWidth = '400px',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDrawer = (): void => {
    setIsOpen(true);
  };

  const handleCloseDrawer = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        variant="outlined" 
        onClick={handleOpenDrawer} 
        icon={<Filter16Regular />}
        data-testid="drawer-trigger"
      >
        Abrir Drawer
      </Button>
      <Drawer 
        isOpen={isOpen} 
        onOpen={handleOpenDrawer} 
        onClose={handleCloseDrawer} 
        title={title}
        customWidth={customWidth}
        className={className}
        headerContent={(<>
          <Button iconOnly variant="outlined" icon={<Filter16Regular />} /> 
          <Button iconOnly variant="outlined" icon={<Filter16Regular />} /> 
        </>)}
      >
        {children || (
  
            <h3>Titulo</h3>
        )}
      </Drawer>
    </>
  );
};

/**
 * Story padrão do Drawer
 * Demonstra o uso básico com controle externo
 */
export const Default: StoryFn<DrawerStoryProps> = (args): JSX.Element => (
  <DrawerExample {...args} />
);

Default.parameters = {
  docs: {
    description: {
      story: 'Exemplo básico do Drawer com controle externo de abertura e fechamento. O botão abre o drawer e o usuário pode fechá-lo clicando no X ou fora do drawer.',
    },
    source: {
      code: `
const [isOpen, setIsOpen] = useState(false);

/**
 * Função para abrir o drawer
 * Esta função é obrigatória e deve ser passada como prop para o Drawer
 */
const handleOpenDrawer = () => {
  setIsOpen(true);
};

/**
 * Função para fechar o drawer
 */
const handleCloseDrawer = () => {
  setIsOpen(false);
};

<Button variant="outlined" onClick={handleOpenDrawer} icon={<Filter16Regular />}>
  Abrir Drawer
</Button>
<Drawer 
  isOpen={isOpen} 
  onOpen={handleOpenDrawer} 
  onClose={handleCloseDrawer} 
  title="Título do Drawer" 
  pWidth="400px"
>
  {/* Conteúdo do drawer */}
</Drawer>
      `,
    },
  },
};

// ✅ Args padrão para todas as stories
Default.args = {
  title: 'Drawer Interativo',
  customWidth: '400px',
  closeOnOverlayClick: true,
  closeOnEscape: true,
};
