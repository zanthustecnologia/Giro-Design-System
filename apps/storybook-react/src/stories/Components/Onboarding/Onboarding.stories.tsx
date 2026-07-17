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
          'O Onboarding suporta dois modos: **tour** (guia passo a passo) e **hint** (marcadores fixos clicáveis). É ideal para onboarding de novos usuários e apresentação de funcionalidades.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['tour', 'hint'],
      description: 'Modo de exibição do onboarding',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controla se o onboarding está ativo',
    },
    initialStep: {
      control: 'number',
      description: 'Índice do passo inicial (somente modo tour)',
    },
    steps: {
      control: false,
      description: 'Lista de passos (somente modo tour)',
    },
    hints: {
      control: false,
      description: 'Lista de hints (somente modo hint)',
    },
    onExit: {
      control: false,
      description: 'Disparado quando o usuário encerra o tour antes de concluir',
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

export const HintMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button onClick={() => setIsOpen(true)}>Mostrar hints</Button>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Ocultar hints
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          <Button id="hint-btn-salvar" variant="outlined">
            Salvar
          </Button>
          <Button id="hint-btn-exportar" variant="outlined">
            Exportar
          </Button>
          <Button id="hint-btn-configurar" variant="outlined">
            Configurar
          </Button>
        </div>
        <Onboarding
          mode="hint"
          isOpen={isOpen}
          hints={[
            {
              element: '#hint-btn-salvar',
              hint: 'Salva todas as alterações feitas no formulário.',
              hintPosition: 'top-middle',
            },
            {
              element: '#hint-btn-exportar',
              hint: 'Exporta os dados em formato CSV ou PDF.',
              hintPosition: 'middle-right',
            },
            {
              element: '#hint-btn-configurar',
              hint: 'Acesse as configurações avançadas do painel.',
              hintPosition: 'bottom-middle',
            },
          ]}
        />
      </div>
    );
  },
};
HintMode.storyName = 'Modo Hint';
