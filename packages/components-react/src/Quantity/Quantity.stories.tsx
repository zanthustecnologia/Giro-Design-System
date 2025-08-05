import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Quantity, { QuantityProps } from './Quantity';

const meta: Meta<typeof Quantity> = {
  title: 'Components/Quantity',
  component: Quantity,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente **Quantity** permite incrementar e decrementar valores numéricos com controles visuais.

### Características principais:
- ✅ Suporte para modo **controlado** e **não controlado**
- ✅ Valores **inteiros** e **decimais** com precisão configurável
- ✅ **Acessibilidade WCAG 2.1 AA** (ARIA, navegação por teclado)
- ✅ **Responsivo** com breakpoints mobile-first
- ✅ Validação robusta de entrada
- ✅ Performance otimizada com React.memo

### Tokens de Design utilizados:
- \`--spacing-4\`, \`--spacing-8\` (gaps e espaçamento)
- \`--color-neutral-low-*\` (texto e estados)
- \`--color-brand-primary-*\` (foco)
- \`--font-family-primary\`, \`--font-size-*\` (tipografia)
- \`--border-width-2\`, \`--border-radius-4\` (bordas e foco)
        `.trim(),
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Valor inicial para modo não controlado',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Valor controlado externamente (modo controlado)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Desabilita todas as interações do componente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    decimal: {
      control: { type: 'boolean' },
      description: 'Permite valores decimais (ponto flutuante)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    decimalPlaces: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description: 'Número de casas decimais (apenas quando decimal=true)',
      if: { arg: 'decimal', eq: true },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'sm'],
      description: 'Tamanho do componente (afeta botões e input)',
      table: {
        type: { summary: "'lg' | 'sm'" },
        defaultValue: { summary: "'lg'" },
      },
    },
    step: {
      control: { type: 'number', min: 0.01, max: 10, step: 0.01 },
      description: 'Valor do incremento/decremento por ação',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1 (inteiro) | 0.01 (decimal)' },
      },
    },
    onChange: {
      action: 'quantity-changed',
      description: 'Callback chamado quando o valor muda',
      table: {
        type: { summary: '(value: number) => void' },
      },
    },
    id: {
      control: { type: 'text' },
      description: 'ID customizado para o input (gerado automaticamente se não fornecido)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto-generated' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Classe CSS adicional para customização',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Quantity>;

// ===============================================
// 🎯 STORIES PRINCIPAIS
// ===============================================

/**
 * **História padrão** - Componente não controlado básico
 * 
 * Demonstra o uso mais comum com valor inicial zero e incrementos de 1.
 * O componente gerencia seu próprio estado interno.
 */
export const Default: Story = {
  args: {
    defaultValue: 0,
    disabled: false,
    decimal: false,
    size: 'lg',
    step: 1,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Quantity 
  defaultValue={0}
  onChange={(value) => console.log('Novo valor:', value)}
  size="lg"
  step={1}
/>`,
      },
    },
  },
};

/**
 * **Modo Controlado** - Estado gerenciado externamente
 * 
 * Demonstra como usar o componente em modo controlado,
 * onde o estado é gerenciado pelo componente pai.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Valor atual: <strong>{value}</strong>
        </div>
        <Quantity 
          value={value}
          onChange={setValue}
          size="lg"
        />
        <button 
          onClick={() => setValue(0)}
          style={{ padding: '8px 16px', fontSize: '12px' }}
        >
          Reset para 0
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
function ControlledExample() {
  const [value, setValue] = useState(5);
  
  return (
    <>
      <p>Valor atual: {value}</p>
      <Quantity value={value} onChange={setValue} />
      <button onClick={() => setValue(0)}>Reset</button>
    </>
  );
}`,
      },
    },
  },
};

/**
 * **Variantes de Tamanho** - Demonstra os tamanhos disponíveis
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Large (lg)</label>
        <Quantity defaultValue={3} size="lg" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Small (sm)</label>
        <Quantity defaultValue={3} size="sm" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Quantity defaultValue={3} size="lg" />
<Quantity defaultValue={3} size="sm" />`,
      },
    },
  },
};

/**
 * **Valores Decimais** - Suporte a números com casas decimais
 */
export const Decimal: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>2 casas decimais (padrão)</label>
        <Quantity 
          defaultValue={1.50} 
          decimal={true} 
          decimalPlaces={2} 
          step={0.25}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>4 casas decimais (precisão alta)</label>
        <Quantity 
          defaultValue={0.0001} 
          decimal={true} 
          decimalPlaces={4} 
          step={0.0001}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
// 2 casas decimais
<Quantity 
  defaultValue={1.50} 
  decimal={true} 
  decimalPlaces={2} 
  step={0.25}
/>

// 4 casas decimais (alta precisão)
<Quantity 
  defaultValue={0.0001} 
  decimal={true} 
  decimalPlaces={4} 
  step={0.0001}
/>`,
      },
    },
  },
};

// ===============================================
// 🧪 EDGE CASES & TESTES VISUAIS
// ===============================================

/**
 * **Estados de Interação** - Disabled, focus, etc.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Normal</label>
        <Quantity defaultValue={5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Disabled</label>
        <Quantity defaultValue={5} disabled={true} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Valor mínimo (0) - botão - desabilitado</label>
        <Quantity defaultValue={0} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Quantity defaultValue={5} />
<Quantity defaultValue={5} disabled={true} />
<Quantity defaultValue={0} /> {/* botão - desabilitado */}`,
      },
    },
  },
};

/**
 * **Steps Customizados** - Diferentes incrementos
 */
export const CustomSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Step 5 (inteiros)</label>
        <Quantity defaultValue={10} step={5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Step 0.5 (decimais)</label>
        <Quantity defaultValue={2.5} decimal={true} step={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Step 0.1 (precisão)</label>
        <Quantity defaultValue={1.0} decimal={true} decimalPlaces={1} step={0.1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Quantity defaultValue={10} step={5} />
<Quantity defaultValue={2.5} decimal={true} step={0.5} />
<Quantity defaultValue={1.0} decimal={true} decimalPlaces={1} step={0.1} />`,
      },
    },
  },
};

// ===============================================
// 📱 RESPONSIVIDADE & MOBILE
// ===============================================

/**
 * **Responsividade Mobile** - Testa em diferentes viewports
 */
export const MobileViewport: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (360px)',
          styles: { width: '360px', height: '640px' },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
        },
      },
      defaultViewport: 'mobile',
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px', 
      padding: '16px',
      backgroundColor: '#f5f5f5',
      minHeight: '150px',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        📱 Teste de responsividade em mobile (360px)
      </div>
      <Quantity defaultValue={1} size="lg" />
      <Quantity defaultValue={1} size="sm" />
      <div style={{ fontSize: '10px', color: '#999', textAlign: 'center', maxWidth: '280px' }}>
        Verifique se os botões e input são facilmente tocáveis (min 44px) e se o texto é legível.
      </div>
    </div>
  ),
};

// ===============================================
// 🔬 CASOS EXTREMOS & STRESS TESTS  
// ===============================================

/**
 * **Valores Extremos** - Testa limites do componente
 */
export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Valor alto (9999)</label>
        <Quantity defaultValue={9999} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Decimal com 6 casas</label>
        <Quantity 
          defaultValue={123.456789} 
          decimal={true} 
          decimalPlaces={6} 
          step={0.000001}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>Step muito pequeno</label>
        <Quantity 
          defaultValue={0.001} 
          decimal={true} 
          decimalPlaces={3} 
          step={0.001}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### ⚠️ Casos Extremos Testados:

- **Valores altos**: Teste com 9999 (limite máximo)
- **Alta precisão**: 6 casas decimais
- **Micro incrementos**: Steps de 0.001

### 🐛 Possíveis Issues:
- Input pode ficar estreito demais para valores longos
- Problemas de precisão com floating point em JavaScript
- Performance com muitos cliques rápidos
        `,
      },
    },
  },
};

/**
 * **Testes de Acessibilidade** - ARIA, keyboard navigation
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', maxWidth: '500px' }}>
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        <strong>🔍 Teste de Acessibilidade</strong>
        <br />
        Use Tab para navegar, setas ←→ para incrementar/decrementar
        <br />
        Screen readers anunciarão o valor atual e limites
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: '500' }}>
          Quantidade de itens (mín: 0, máx: 100)
        </label>
        <Quantity 
          defaultValue={5} 
          id="accessibility-test"
          aria-label="Selecionar quantidade de itens"
        />
      </div>

      <div style={{ fontSize: '12px', color: '#666', textAlign: 'left', maxWidth: '400px' }}>
        <strong>✅ Recursos de Acessibilidade:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>role="spinbutton" no input</li>
          <li>aria-valuenow, aria-valuemin, aria-valuemax</li>
          <li>aria-label descritivos nos botões</li>
          <li>Navegação por teclado (←→)</li>
          <li>Estados disabled corretamente anunciados</li>
          <li>Focus visível com outline</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### ♿ Checklist de Acessibilidade WCAG 2.1 AA:

✅ **Keyboard Navigation**: Tab, setas ←→  
✅ **Screen Reader**: ARIA labels e roles apropriados  
✅ **Focus Management**: Outline visível e contrastante  
✅ **Color Contrast**: Atende requisitos mínimos  
✅ **Touch Targets**: Botões com área mínima 44px  
✅ **States Communication**: Estados disabled anunciados  

### 🧪 Como Testar:
1. Use apenas o teclado para navegar
2. Ative um screen reader (NVDA, JAWS, VoiceOver)
3. Verifique se valores e limites são anunciados
4. Teste em modo de alto contraste
        `,
      },
    },
  },
};