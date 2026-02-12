import { ToastRadixProvider, ToastContainer, useToastRadix, Button } from '@giro-ds/react';
import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'Components/ToastRadix',
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
      <ToastRadixProvider maxToasts={5}>
        <Story />
        <ToastContainer />
      </ToastRadixProvider>
    ),
  ],
};

export default meta;

// Componente de exemplo para usar dentro do Provider
const ToastExample: React.FC = () => {
  const { showToast } = useToastRadix();

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          showToast({
            titulo: 'Informação',
            descricao: 'Esta é uma notificação informativa.',
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
            titulo: 'Sucesso!',
            descricao: 'Operação realizada com sucesso.',
            iconType: 'Sucess',
            duration: 5000,
          })
        }
      >
        Mostrar Sucesso
      </Button>

      <Button
        onClick={() =>
          showToast({
            titulo: 'Atenção!',
            descricao: 'Algo precisa da sua atenção.',
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
            titulo: 'Sem auto-close',
            descricao: 'Este toast não fecha automaticamente.',
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
            titulo: 'Sem auto-close',
            iconType: 'Info',
            automaticClose: false,
          })
        }
      >
        Toast Sem Descrição
      </Button>
    </div>
  );
};

export const Default: StoryFn = () => <ToastExample />;

export const MultipleToasts: StoryFn = () => {
  const { showToast } = useToastRadix();

  const showMultiple = () => {
    const tipos: Array<'Info' | 'Sucess' | 'Alert'> = ['Info', 'Sucess', 'Alert'];
    
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        showToast({
          titulo: `Toast ${i}`,
          descricao: `Esta é a notificação número ${i}`,
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
  const { showToast } = useToastRadix();
  const [count, setCount] = React.useState(0);

  const addToast = () => {
    setCount((prev) => prev + 1);
    showToast({
      titulo: `Toast #${count + 1}`,
      descricao: 'Quando passar de 5, o mais antigo é removido automaticamente.',
      iconType: count % 3 === 0 ? 'Info' : count % 3 === 1 ? 'Sucess' : 'Alert',
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