import { ToastProvider, ToastContainer, useToast, Button } from '@giro-ds/react';
import React from 'react';

import type { ToastProps } from '@giro-ds/react';
import type { Meta, StoryFn } from '@storybook/react-vite';

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

export const Default: StoryFn = () => {
  const { showToast } = useToast();

  return (
    <Button
      onClick={() =>
        showToast({
          title: 'Arquivo exportado com sucesso.',
          iconType: 'Success',
          duration: 5000,
        })
      }
    >
      Exibir toast
    </Button>
  );
};

// Helper: exibe toasts automaticamente ao montar, sem interação
type AutoItem = Pick<ToastProps, 'title' | 'iconType'>;
const AutoToast: React.FC<{ items: AutoItem[]; height?: number }> = ({ items, height = 280 }) => {
  const { showToast } = useToast();
  const initialItems = React.useRef(items);
  const showToastRef = React.useRef(showToast);

  React.useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    initialItems.current.forEach((item, i) => {
      const t = setTimeout(
        () => showToastRef.current({ ...item, automaticClose: false }),
        i * 80,
      );
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return <div style={{ minHeight: height }} />;
};

export const Sucesso: StoryFn = () => (
  <AutoToast
    items={[{ title: 'Arquivo exportado com sucesso.', iconType: 'Success' }]}
    height={80}
  />
);

export const Alerta: StoryFn = () => (
  <AutoToast
    items={[{ title: 'Sessão expira em 5 minutos.', iconType: 'Alert' }]}
    height={80}
  />
);

export const Info: StoryFn = () => (
  <AutoToast
    items={[{ title: 'Sincronização em andamento.', iconType: 'Info' }]}
    height={80}
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

export const TesteDeCarga: StoryFn = () => {
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
TesteDeCarga.storyName = 'Teste de Carga';
