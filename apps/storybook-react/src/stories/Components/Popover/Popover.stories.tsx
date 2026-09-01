import {
  Info16Regular,
  Person16Regular,
  Mail16Regular,
  Phone16Regular,
  Location16Regular,
  Warning16Regular,
} from '@fluentui/react-icons';
import { Popover, Button } from '@giro-ds/react';
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: 'O Popover é um painel flutuante ancorado a um gatilho. Diferente do Tooltip, exibe conteúdo interativo: informações estruturadas, ações rápidas ou confirmações simples.',
      },
    },
  },
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Lado onde o Popover é exibido em relação ao gatilho.',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alinhamento do Popover ao longo do eixo perpendicular ao side.',
    },
    trigger: { table: { disable: true } },
    content: { table: { disable: true } },
  },
  args: {
    side: 'bottom',
    align: 'start',
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

const infoCard = (
  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '240px' }}>
    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-neutral-low-medium)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      Informações do contato
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-neutral-low-dark)' }}>
      <Person16Regular /><span>Ana Paula Souza</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-neutral-low-dark)' }}>
      <Mail16Regular /><span>ana.souza@empresa.com</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-neutral-low-dark)' }}>
      <Phone16Regular /><span>(11) 98765-4321</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-neutral-low-dark)' }}>
      <Location16Regular /><span>Sao Paulo, SP</span>
    </div>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button variant="outlined" icon={<Info16Regular />}>Detalhes</Button>}
      content={infoCard}
    />
  ),
};

export const ComConfirmacao: Story = {
  render: () => {
    const [confirmed, setConfirmed] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Popover
          side="top"
          align="center"
          trigger={
            <Button variant="outlined" icon={<Warning16Regular />}>
              {confirmed ? 'Arquivado' : 'Arquivar registro'}
            </Button>
          }
          content={
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '220px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-neutral-low-dark)' }}>
                Tem certeza que deseja arquivar este registro? Esta ação pode ser revertida.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" variant="outlined" onClick={() => setConfirmed(false)}>Cancelar</Button>
                <Button size="sm" onClick={() => setConfirmed(true)}>Confirmar</Button>
              </div>
            </div>
          }
        />
        {confirmed && (
          <span style={{ fontSize: '13px', color: 'var(--color-success-default)' }}>Registro arquivado com sucesso.</span>
        )}
      </div>
    );
  },
};

export const Posicionamento: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', padding: '32px' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover
          key={side}
          side={side}
          align="center"
          trigger={
            <Button variant="outlined" style={{ width: '120px' }}>
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          }
          content={
            <div style={{ padding: '12px', fontSize: '13px', color: 'var(--color-neutral-low-dark)' }}>
              Abre pelo lado <strong>{side}</strong>
            </div>
          }
        />
      ))}
    </div>
  ),
};