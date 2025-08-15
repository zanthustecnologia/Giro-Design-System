import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, toast, ToastType } from './Toast';
import Button from '../Button/Button';

// Tipos para as props do story
interface ToastStoryArgs {
  variant: ToastType;
  message: string;
  persistent: boolean;
  duration: number;
}

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  decorators: [
    (Story) => (
      <div style={{ height: '50vh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'alert'] as ToastType[],
    },
    message: {
      control: { type: 'text' },
      defaultValue: 'Mensagem de exemplo',
    },
    persistent: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    duration: {
      control: { type: 'number' },
      defaultValue: 5000,
    },
  },
};

export default meta;
type Story = StoryObj<ToastStoryArgs>;

const getMessageByVariant = (variant: ToastType): string => {
  switch (variant) {
    case 'success':
      return 'Texto do toast de sucesso';
    case 'alert':
      return 'Texto do toast de alerta';
    case 'info':
    default:
      return 'Texto do toast informativo';
  }
};

export const Default: Story = {
  render: (args) => (
    <ToastProvider>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={() => toast(getMessageByVariant(args.variant), args.variant, 5000, false)}>
          Exibir toast
        </Button>
      </div>
    </ToastProvider>
  ),
  args: {
    variant: 'info',
    persistent: false,
    duration: 5000,
    message: 'Mensagem de exemplo',
  },
  parameters: {
    docs: {
      source: {
        code: `
import { ToastProvider, toast } from './Toast';

<ToastProvider>
  <Button onClick={() => toast('Mensagem de exemplo', 'info', 5000, false)}>
    Exibir toast
  </Button>
</ToastProvider>
        `.trim(),
      },
    },
  },
};

export const Persistent: Story = {
  render: (args) => (
    <ToastProvider>
      <Button onClick={() => toast(getMessageByVariant(args.variant), args.variant, args.duration, args.persistent)}>
        Exibir toast
      </Button>
    </ToastProvider>
  ),
  args: {
    variant: 'info',
    message: 'Texto do toast informativo',
    persistent: true,
    duration: 5000,
  },
  parameters: {
    docs: {
      source: {
        code: `
import { ToastProvider, toast } from './Toast';

<ToastProvider>
  <Button onClick={() => toast('Texto do toast informativo', 'info', 5000, true)}>
    Exibir toast persistente
  </Button>
</ToastProvider>
        `.trim(),
      },
    },
  },
};