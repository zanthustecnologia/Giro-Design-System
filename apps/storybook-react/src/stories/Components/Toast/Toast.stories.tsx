import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast, Button } from '@giro/react';
import type { ToastType } from '@giro/react';



const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '60vh', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    maxToasts: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número máximo de toasts simultâneos',
      defaultValue: 5,
    },
  },
};
export default meta;

const ToastDemo: React.FC<{
  variant: ToastType;
  message: string;
  persistent: boolean;
  duration: number;
}> = ({ variant = 'alert', message, persistent, duration }) => {
  const { showToast, hideAllToasts } = useToast();

  const handleShowToast = () => {
    showToast(message, variant, {
      persistent,
      duration: persistent ? undefined : duration,
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <Button onClick={handleShowToast}>
        Exibir Toast {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Button>
      
      <Button variant="outlined" onClick={hideAllToasts}>
        Limpar Todos
      </Button>
    </div>
  );
};

// ✅ COMPONENTE PARA DEMONSTRAR MÚLTIPLOS TIPOS
const MultipleToastDemo: React.FC = () => {
  const { showToast, hideAllToasts } = useToast();

  const handleSuccess = () => {
    showToast('Operação realizada com sucesso!', 'success');
  };

  const handleAlert = () => {
    showToast('Atenção: algo requer sua atenção', 'alert');
  };

  const handleInfo = () => {
    showToast('Informação importante para você', 'info');
  };

  const handlePersistent = () => {
    showToast('Este toast não desaparece automaticamente', 'info', {
      persistent: true
    });
  };

  const handleLongDuration = () => {
    showToast('Este toast fica visível por 10 segundos', 'success', {
      duration: 10000
    });
  };

  const handleLongMessage = () => {
    showToast(
      'Esta é uma mensagem muito longa para testar como o toast se comporta com textos extensos que podem quebrar em múltiplas linhas',
      'info'
    );
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      padding: '16px'
    }}>
      <Button onClick={handleSuccess} variant="primary">
        Toast Sucesso
      </Button>
      
      <Button onClick={handleAlert} variant="outlined">
        Toast Alerta
      </Button>
      
      <Button onClick={handleInfo} variant="secondary">
        Toast Info
      </Button>
      
      <Button onClick={handlePersistent} variant="primary">
        Toast Persistente
      </Button>
      
      <Button onClick={handleLongDuration} variant="outlined">
        Toast 10s
      </Button>
      
      <Button onClick={handleLongMessage} variant="secondary">
        Mensagem Longa
      </Button>
      
      <Button onClick={hideAllToasts} variant="outlined">
        Limpar Todos
      </Button>
    </div>
  );
};


type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: (args) => (
    <ToastProvider maxToasts={args.maxToasts}>
      <ToastDemo
        variant="info"
        message="Mensagem de toast padrão"
        persistent={false}
        duration={5000}
      />
    </ToastProvider>
  ),
  args: {
    maxToasts: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast básico com comportamento padrão (desaparece automaticamente em 5 segundos).',
      },
      source: {
        code: `
import { ToastProvider, useToast } from './Toast';
import Button from '../Button/Button';

const MyComponent = () => {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast('Mensagem de toast padrão', 'info');
  };

  return (
    <Button onClick={handleClick}>
      Exibir Toast
    </Button>
  );
};

// Wrapper da aplicação
<ToastProvider>
  <MyComponent />
</ToastProvider>
        `.trim(),
      },
    },
  },
};


export const Success: Story = {
  render: (args) => (
    <ToastProvider maxToasts={args.maxToasts}>
      <ToastDemo
        variant="success"
        message="Operação realizada com sucesso!"
        persistent={false}
        duration={5000}
      />
    </ToastProvider>
  ),
  args: {
    maxToasts: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast de sucesso com ícone de checkmark e cor verde.',
      },
    },
  },
};

export const Alert: Story = {
  render: (args) => (
    <ToastProvider maxToasts={args.maxToasts}>
      <ToastDemo
        variant="alert"
        message="Atenção: algo requer sua atenção"
        persistent={false}
        duration={5000}
      />
    </ToastProvider>
  ),
  args: {
    maxToasts: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast de alerta com ícone de warning e cor vermelha.',
      },
    },
  },
};

export const Persistent: Story = {
  render: (args) => (
    <ToastProvider maxToasts={args.maxToasts}>
      <ToastDemo
        variant="info"
        message="Este toast não desaparece automaticamente"
        persistent={true}
        duration={5000}
      />
    </ToastProvider>
  ),
  args: {
    maxToasts: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast persistente que só desaparece quando o usuário clica no botão de fechar ou pressiona ESC.',
      },
      source: {
        code: `
const { showToast } = useToast();

showToast('Este toast não desaparece automaticamente', 'info', {
  persistent: true
});
        `.trim(),
      },
    },
  },
};

export const CustomDuration: Story = {
  render: (args) => (
    <ToastProvider maxToasts={args.maxToasts}>
      <ToastDemo
        variant="success"
        message="Este toast fica visível por 10 segundos"
        persistent={false}
        duration={10000}
      />
    </ToastProvider>
  ),
  args: {
    maxToasts: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast com duração customizada de 10 segundos.',
      },
      source: {
        code: `
const { showToast } = useToast();

showToast('Este toast fica visível por 10 segundos', 'success', {
  duration: 10000
});
        `.trim(),
      },
    },
  },
};
