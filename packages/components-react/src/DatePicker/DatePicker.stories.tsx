import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';
import type { DatePickerProps } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Pattern/Date Picker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <div style={{ height: '50vh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
    docs: {
      description: {
        component: `
DatePicker com máscara automática de data e proteção contra entrada inválida.

**✅ Funcionalidades Principais:**
- **🛡️ Proteção contra letras**: Aceita apenas números, impede entrada de letras
- **📱 Teclado numérico**: Em dispositivos móveis, abre teclado numérico automaticamente
- **Máscara automática**: Adiciona "/" automaticamente conforme o usuário digita
- **Validação em tempo real**: Valida a data apenas quando completa (DD/MM/YYYY)
- **Suporte a locales**: pt-br (DD/MM/YYYY) e en-us (MM/DD/YYYY)
- **Calendário integrado**: Clique no ícone ou campo para abrir
- **Acessibilidade**: ARIA completo e navegação por teclado (ESC, Enter, ↓)
- **Feedback visual**: Mostra erro apenas para datas inválidas completas

**🎯 Como usar:**
1. **Digite apenas números** - letras são automaticamente bloqueadas
2. **Em mobile**: Teclado numérico abre automaticamente
3. A máscara adiciona as barras automaticamente
4. Pressione ESC para fechar o calendário, Enter/↓ para abrir

**📋 Exemplos de formato:**
- pt-br: Digite "25122024" → Resultado "25/12/2024"
- en-us: Digite "12252024" → Resultado "12/25/2024"

**🚫 Entradas bloqueadas:**
- Letras (a-z, A-Z) são automaticamente filtradas
- Símbolos especiais (exceto números e teclas de controle)
        `,
      },
    },
  },
  argTypes: {
    locale: {
      control: { type: 'select' },
      options: ['pt-br', 'en-us'],
      description: 'Locale para formatação da data',
      table: {
        type: { summary: "'pt-br' | 'en-us'" },
        defaultValue: { summary: 'pt-br' },
      },
    },
    calendarPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Posição do calendário dropdown',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Se o campo é obrigatório',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda exibido abaixo do campo',
    },
    label: {
      control: 'text',
      description: 'Label do campo',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Template básico
const Template = (args: DatePickerProps) => <DatePicker {...args} />;

// Template para controlled components
const ControlledTemplate = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div style={{ padding: '1rem' }}>
      <DatePicker
        {...args}
        value={selectedDate}
        onChange={setSelectedDate}
      />
      
      <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Estado Controlado:</strong>
        <br />
        Data selecionada: {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Nenhuma'}
        <br />
        <button 
          onClick={() => setSelectedDate(new Date())}
          style={{ marginTop: '0.5rem', padding: '4px 8px' }}
        >
          Definir data atual
        </button>
        <button 
          onClick={() => setSelectedDate(null)}
          style={{ marginTop: '0.5rem', marginLeft: '0.5rem', padding: '4px 8px' }}
        >
          Limpar
        </button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarPosition: 'left',
    label: 'Data de nascimento',
    helperText: 'Selecione sua data de nascimento',
  },
};

export const WithBrazilianLocale: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarPosition: 'left',
    label: 'Data (Brasil)',
    helperText: 'Formato: DD/MM/AAAA',
  },
};

export const EnglishLocale: Story = {
  render: Template,
  args: {
    locale: 'en-us',
    calendarPosition: 'left',
    label: 'Date (US)',
    helperText: 'Format: MM/DD/YYYY',
  },
};

export const RightPositioned: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarPosition: 'right',
    label: 'Data (Calendário à direita)',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarPosition: 'left',
    label: 'Data com erro',
    required: true,
  },
};
