import React, { useState, ReactNode } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Drawer from './Drawer';
import type { DrawerProps } from './Drawer';
import Button from '../Button/Button';
import { Filter16Regular } from '@fluentui/react-icons';

// ✅ Types para os stories
interface DrawerStoryProps extends DrawerProps {
  children?: ReactNode;
}

interface DrawerExampleProps {
  children?: ReactNode;
  title?: string;
  pWidth?: string;
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
    pWidth: { 
      control: 'text',
      defaultValue: '400px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0px' },
      },
    },
    noPadding: { 
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
  pWidth = '400px',
  noPadding = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * Função para abrir o drawer
   * Esta função é obrigatória e deve ser passada como prop para o Drawer
   */
  const handleOpenDrawer = (): void => {
    setIsOpen(true);
    console.log('Drawer aberto');
  };

  /**
   * Função para fechar o drawer
   */
  const handleCloseDrawer = (): void => {
    setIsOpen(false);
    console.log('Drawer fechado');
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
        pWidth={pWidth}
        noPadding={noPadding}
        className={className}
      >
        {children || (
          <div style={{ padding: '16px' }}>
            <h3>Titulo</h3>
          </div>
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

/**
 * Story do Drawer com conteúdo customizado
 * Demonstra como passar children customizados
 */

/**
 * Story do Drawer sem padding
 * Demonstra o uso da prop noPadding
 */
export const NoPadding: StoryFn<DrawerStoryProps> = (args): JSX.Element => (
  <DrawerExample {...args} noPadding={true}>
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h3>Drawer sem Padding</h3>
        <p>Este drawer não possui padding interno.</p>
        <p>O conteúdo pode ocupar toda a área disponível.</p>
      </div>
    </div>
  </DrawerExample>
);

/**
 * Story do Drawer com largura customizada
 * Demonstra diferentes tamanhos de drawer
 */
export const CustomWidth: StoryFn<DrawerStoryProps> = (args): JSX.Element => (
  <DrawerExample {...args} pWidth="600px">
    <div style={{ padding: '24px' }}>
      <h2>Drawer Mais Largo</h2>
      <p>Este drawer possui 600px de largura.</p>
      
      <div style={{ marginTop: '24px' }}>
        <h4>Informações Detalhadas:</h4>
        <p>Com mais espaço disponível, podemos exibir mais informações detalhadas e uma interface mais rica.</p>
        
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h5>Seção 1</h5>
            <p>Conteúdo da primeira seção.</p>
          </div>
          <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h5>Seção 2</h5>
            <p>Conteúdo da segunda seção.</p>
          </div>
        </div>
      </div>
    </div>
  </DrawerExample>
);

/**
 * Story demonstrando drawer com formulário
 * Caso de uso comum para drawers
 */
export const WithForm: StoryFn<DrawerStoryProps> = (args): JSX.Element => {
  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });

  /**
   * Manipula mudanças nos campos do formulário
   * @param field - Campo que foi alterado
   * @param value - Novo valor
   */
  const handleInputChange = (field: keyof typeof formData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Manipula envio do formulário
   * @param event - Evento de submit
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Dados do formulário:', formData);
    alert('Formulário enviado! Verifique o console.');
  };

  return (
    <DrawerExample {...args} title="Formulário de Cadastro">
      <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
        <h3>Cadastro de Usuário</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Nome:
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button type="button" variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" variant="filled">
            Salvar
          </Button>
        </div>
      </form>
    </DrawerExample>
  );
};

// ✅ Parâmetros das stories para documentação
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



NoPadding.parameters = {
  docs: {
    description: {
      story: 'Drawer sem padding interno. Útil quando você quer controle total sobre o layout do conteúdo.',
    },
  },
};

CustomWidth.parameters = {
  docs: {
    description: {
      story: 'Drawer com largura customizada (600px). Permite criar drawers maiores para conteúdo mais extenso.',
    },
  },
};

WithForm.parameters = {
  docs: {
    description: {
      story: 'Drawer contendo um formulário. Caso de uso comum para cadastros, edições e filtros avançados.',
    },
  },
};

// ✅ Args padrão para todas as stories
Default.args = {
  title: 'Drawer Interativo',
  pWidth: '400px',
  noPadding: false,
  closeOnOverlayClick: true,
  closeOnEscape: true,
};


NoPadding.args = {
  ...Default.args,
  title: 'Sem Padding',
  noPadding: true,
};

CustomWidth.args = {
  ...Default.args,
  title: 'Largura Customizada',
  pWidth: '600px',
};

WithForm.args = {
  ...Default.args,
  title: 'Formulário de Cadastro',
  pWidth: '500px',
};