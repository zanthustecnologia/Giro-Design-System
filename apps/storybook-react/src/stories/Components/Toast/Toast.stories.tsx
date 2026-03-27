import { ToastProvider, ToastContainer, useToast, Button } from '@giro-ds/react';
import type { ToastProps } from '@giro-ds/react';
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
        Toast info
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
        Toast success
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
        Toast alert
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
            title: 'Quebra de linha automática, este é um texto mais longo para demonstrar como o toast lida com conteúdos extensos. Ele deve quebrar a linha automaticamente e ajustar seu tamanho conforme necessário.',
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

// Helper: exibe toasts automaticamente ao montar, sem interação
type AutoItem = Pick<ToastProps, 'title' | 'iconType'>;
const AutoToast: React.FC<{ items: AutoItem[]; height?: number }> = ({ items, height = 280 }) => {
  const { showToast } = useToast();

  React.useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    items.forEach((item, i) => {
      const t = setTimeout(
        () => showToast({ ...item, automaticClose: false }),
        i * 80,
      );
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return <div style={{ minHeight: height }} />;
};

// Tipos — os três tipos visuais já abertos
export const Tipos: StoryFn = () => (
  <AutoToast
    items={[
      { title: 'Arquivo exportado com sucesso.', iconType: 'Success' },
      { title: 'Sessão expira em 5 minutos.', iconType: 'Alert' },
      { title: 'Sincronização em andamento.', iconType: 'Info' },
    ]}
    height={320}
  />
);

// Persistente — toast que não fecha automaticamente
export const Persistente: StoryFn = () => (
  <AutoToast
    items={[
      { title: 'Código de ativação: AB-1234-XZ. Salve antes de continuar.', iconType: 'Info' },
    ]}
    height={140}
  />
);

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