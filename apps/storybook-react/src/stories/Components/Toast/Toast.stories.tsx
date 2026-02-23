import { ToastProvider, ToastContainer, useToast, Button } from '@giro-ds/react';
import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Toast',
  component: ToastContainer,
  parameters: {
    docs: {
      description: {
        component:
          'Sistema de notificações toast que suporta até 5 toasts simultâneos. Use o hook `useToast()` para exibir notificações de forma programática.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider maxToasts={5}>
        <Story />
        <ToastContainer />
      </ToastProvider>
    ),
  ],
};

export default meta;

// Componente de exemplo para usar dentro do Provider
const ToastExample: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          showToast({
            title: 'Informação!',
            iconType: 'Info',
            duration: 5000,
          })
        }
      >
        Mostrar Info
      </Button>

      <Button
        onClick={() =>
          showToast({
            title: 'Sucesso!',
            iconType: 'Success',
            duration: 5000,
          })
        }
      >
        Mostrar Sucesso
      </Button>

      <Button
        onClick={() =>
          showToast({
            title: 'Atenção!',
            iconType: 'Alert',
            duration: 5000,
          })
        }
      >
        Mostrar Alerta
      </Button>

      <Button
        onClick={() =>
          showToast({
            title: 'Sem auto-close',
            iconType: 'Info',
            automaticClose: false,
          })
        }
      >
        Toast Sem Auto-close
      </Button>

      <Button
        onClick={() =>
          showToast({
            title: 'Sem auto-close',
            iconType: 'Info',
            automaticClose: false,
          })
        }
      >
        Toast Sem Descrição
      </Button>

      <Button
        onClick={() =>
          showToast({
            title: 'Informação Informação Informação Informação Informação Informação Informação Informação Informação Informação',
            iconType: 'Info',
            duration: 5000,
          })
        }
      >
        Quebra de linha automática
      </Button>
    </div>
  );
};

export const Default: StoryFn = () => <ToastExample />;

export const MultipleToasts: StoryFn = () => {
  const { showToast } = useToast();

  const showMultiple = () => {
    const tipos: Array<'Info' | 'Success' | 'Alert'> = ['Info', 'Success', 'Alert'];
    
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        showToast({
          title: `Toast ${i}`,
          iconType: tipos[i % 3],
          duration: 8000,
        });
      }, i * 300);
    }
  };

  return (
    <div>
      <Button onClick={showMultiple}>
        Mostrar 5 Toasts
      </Button>
      <p style={{ marginTop: '16px', color: '#666' }}>
        Clique para ver 5 toasts aparecendo em sequência. O sistema limita em 5 simultâneos.
      </p>
    </div>
  );
};

export const StressTest: StoryFn = () => {
  const { showToast } = useToast();
  const [count, setCount] = React.useState(0);

  const addToast = () => {
    setCount((prev) => prev + 1);
    showToast({
      title: `Toast #${count + 1}`,
      iconType: count % 3 === 0 ? 'Info' : count % 3 === 1 ? 'Success' : 'Alert',
      duration: 10000,
    });
  };

  return (
    <div>
      <Button onClick={addToast}>
        Adicionar Toast ({count} toasts criados)
      </Button>
      <p style={{ marginTop: '16px', color: '#666' }}>
        Continue clicando! Quando passar de 5 toasts simultâneos, o mais antigo será removido automaticamente.
      </p>
    </div>
  );
};