import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Onboarding, Button } from '@giro-ds/react';

type Story = StoryObj<typeof Onboarding>;

const meta: Meta<typeof Onboarding> = {
  title: 'Components/Onboarding',
  component: Onboarding,
  parameters: {
    docs: {
      description: {
        component:
          'O Onboarding exibe um guia passo a passo interativo na página, destacando elementos e exibindo instruções ao usuário. É ideal para onboarding e apresentação de novas funcionalidades.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controla se o onboarding está ativo',
    },
    initialStep: {
      control: 'number',
      description: 'Índice do passo inicial',
    },
    steps: {
      control: false,
      description: 'Lista de passos do onboarding',
    },
    onExit: {
      control: false,
      description: 'Disparado quando o usuário encerra o onboarding antes de concluir',
    },
    onComplete: {
      control: false,
      description: 'Disparado quando o usuário conclui todos os passos',
    },
  },
};

export default meta;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '32px' }}>
        <Button id="onboarding-btn-start" onClick={() => setIsOpen(true)}>
          Iniciar onboarding
        </Button>
        <Button id="onboarding-btn-action" variant="outlined">
          Ação principal
        </Button>
        <Onboarding
          isOpen={isOpen}
          steps={[
            {
              element: '#onboarding-btn-start',
              title: 'Bem-vindo!',
              intro: 'Este botão inicia o guia interativo pela interface.',
            },
            {
              element: '#onboarding-btn-action',
              title: 'Ação principal',
              intro: 'Use este botão para executar a ação principal da página.',
            },
          ]}
          onComplete={() => setIsOpen(false)}
          onExit={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
Default.storyName = 'Padrão';

export const MultiplasetapasPositionadas: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
        <Button id="onboarding-multi-start" onClick={() => setIsOpen(true)}>
          Iniciar onboarding completo
        </Button>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button id="onboarding-multi-a" variant="outlined">
            Funcionalidade A
          </Button>
          <Button id="onboarding-multi-b" variant="outlined">
            Funcionalidade B
          </Button>
          <Button id="onboarding-multi-c" variant="outlined">
            Funcionalidade C
          </Button>
        </div>
        <Onboarding
          isOpen={isOpen}
          steps={[
            {
              element: '#onboarding-multi-start',
              title: 'Passo 1 — Início',
              intro: 'Clique aqui sempre que quiser reiniciar o onboarding.',
              position: 'bottom',
            },
            {
              element: '#onboarding-multi-a',
              title: 'Passo 2 — Funcionalidade A',
              intro: 'Esta função faz X. Explore as opções disponíveis.',
              position: 'bottom',
            },
            {
              element: '#onboarding-multi-b',
              title: 'Passo 3 — Funcionalidade B',
              intro: 'Esta função faz Y. Pode ser usada em conjunto com A.',
              position: 'bottom',
            },
            {
              element: '#onboarding-multi-c',
              title: 'Passo 4 — Funcionalidade C',
              intro: 'Esta função finaliza o fluxo. Certifique-se de revisar antes.',
              position: 'bottom',
            },
          ]}
          onComplete={() => setIsOpen(false)}
          onExit={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
MultiplasetapasPositionadas.storyName = 'Múltiplas etapas';

export const SemElementoAlvo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '32px' }}>
        <Button onClick={() => setIsOpen(true)}>Abrir aviso centralizado</Button>
        <Onboarding
          isOpen={isOpen}
          steps={[
            {
              title: 'Atenção',
              intro: 'Este balão não está ancorado a nenhum elemento — aparece centralizado na tela.',
            },
          ]}
          onComplete={() => setIsOpen(false)}
          onExit={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
SemElementoAlvo.storyName = 'Sem elemento alvo';
