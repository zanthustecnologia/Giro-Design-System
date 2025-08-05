import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Select, { SelectOption } from './Select';
import { Person16Regular, Building16Regular, Mail16Regular } from '@fluentui/react-icons';

const meta = {
  title: 'Components/Select/Variants',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Select com Variantes

O componente Select suporta três variantes visuais principais:

- **Outlined** (padrão): Bordas definidas, ideal para a maioria dos casos
- **Filled**: Fundo preenchido, melhor contraste em alguns layouts
- **Standard**: Apenas linha inferior, design minimalista

### Características das Variantes

| Variante | Uso Recomendado | Características |
|----------|-----------------|-----------------|
| Outlined | Formulários gerais | Bordas bem definidas, boa separação visual |
| Filled | Interfaces densas | Fundo colorido, destaque visual |
| Standard | Layouts minimalistas | Apenas linha inferior, clean |

### Estados Suportados

Todas as variantes suportam os mesmos estados:
- Normal, Hover, Focus, Disabled
- Error, Required
- Single e Multiple selection
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['outlined', 'filled', 'standard'],
      description: 'Variante visual do select'
    },
    options: { control: false },
    onChange: { action: 'changed' }
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Dados de exemplo
const basicOptions: SelectOption[] = [
  { id: '1', text: 'Opção 1' },
  { id: '2', text: 'Opção 2' },
  { id: '3', text: 'Opção 3' },
  { id: '4', text: 'Opção 4' },
  { id: '5', text: 'Opção 5' }
];

const richOptions: SelectOption[] = [
  {
    id: 'user1',
    text: 'João Silva',
    subText: 'Desenvolvedor Frontend',
    icon: <Person16Regular />
  },
  {
    id: 'user2',
    text: 'Maria Santos',
    subText: 'Designer UX/UI',
    icon: <Person16Regular />
  },
  {
    id: 'company1',
    text: 'Empresa A',
    subText: 'Tecnologia',
    icon: <Building16Regular />
  },
  {
    id: 'company2',
    text: 'Empresa B',
    subText: 'Consultoria',
    icon: <Building16Regular />
  }
];

const emailOptions: SelectOption[] = [
  {
    id: 'gmail',
    text: 'Gmail',
    subText: 'usuario@gmail.com',
    icon: <Mail16Regular />
  },
  {
    id: 'outlook',
    text: 'Outlook',
    subText: 'usuario@outlook.com',
    icon: <Mail16Regular />
  },
  {
    id: 'corporate',
    text: 'Email Corporativo',
    subText: 'usuario@empresa.com',
    icon: <Mail16Regular />
  }
];

// Stories das variantes
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    options: basicOptions,
    placeholder: 'Selecione uma opção',
    label: 'Select Outlined'
  }
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    options: basicOptions,
    placeholder: 'Selecione uma opção',
    label: 'Select Filled'
  }
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    options: basicOptions,
    placeholder: 'Selecione uma opção',
    label: 'Select Standard'
  }
};

// Comparação lado a lado
export const VariantsComparison = {
  render: () => {
    const [selectedOutlined, setSelectedOutlined] = useState<SelectOption[]>([]);
    const [selectedFilled, setSelectedFilled] = useState<SelectOption[]>([]);
    const [selectedStandard, setSelectedStandard] = useState<SelectOption[]>([]);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '20px' }}>
        <div>
          <h3>Outlined (Padrão)</h3>
          <Select
            variant="outlined"
            options={basicOptions}
            onChange={setSelectedOutlined}
            placeholder="Selecione outlined"
            label="Variante Outlined"
            helperText="Bordas bem definidas"
          />
          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Selecionado: {selectedOutlined.map(opt => opt.text).join(', ') || 'Nenhum'}
          </p>
        </div>
        
        <div>
          <h3>Filled</h3>
          <Select
            variant="filled"
            options={basicOptions}
            onChange={setSelectedFilled}
            placeholder="Selecione filled"
            label="Variante Filled"
            helperText="Fundo preenchido"
          />
          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Selecionado: {selectedFilled.map(opt => opt.text).join(', ') || 'Nenhum'}
          </p>
        </div>
        
        <div>
          <h3>Standard</h3>
          <Select
            variant="standard"
            options={basicOptions}
            onChange={setSelectedStandard}
            placeholder="Selecione standard"
            label="Variante Standard"
            helperText="Apenas linha inferior"
          />
          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Selecionado: {selectedStandard.map(opt => opt.text).join(', ') || 'Nenhum'}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparação lado a lado das três variantes disponíveis.'
      }
    }
  }
};

// Estados com variantes
export const VariantsWithStates = {
  render: () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', padding: '20px' }}>
        <div>
          <h3>Estados - Outlined</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select
              variant="outlined"
              options={basicOptions}
              placeholder="Normal"
              label="Normal"
            />
            <Select
              variant="outlined"
              options={basicOptions}
              placeholder="Com erro"
              label="Com Erro"
              errorMessage="Campo obrigatório"
            />
            <Select
              variant="outlined"
              options={basicOptions}
              placeholder="Obrigatório"
              label="Obrigatório"
              required
            />
            <Select
              variant="outlined"
              options={basicOptions}
              placeholder="Desabilitado"
              label="Desabilitado"
              disabled
            />
          </div>
        </div>

        <div>
          <h3>Estados - Filled</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select
              variant="filled"
              options={basicOptions}
              placeholder="Normal"
              label="Normal"
            />
            <Select
              variant="filled"
              options={basicOptions}
              placeholder="Com erro"
              label="Com Erro"
              errorMessage="Campo obrigatório"
            />
            <Select
              variant="filled"
              options={basicOptions}
              placeholder="Obrigatório"
              label="Obrigatório"
              required
            />
            <Select
              variant="filled"
              options={basicOptions}
              placeholder="Desabilitado"
              label="Desabilitado"
              disabled
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração dos diferentes estados aplicados às variantes outlined e filled.'
      }
    }
  }
};

// Opções ricas com variantes
export const RichOptionsVariants = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);
    const [selectedEmails, setSelectedEmails] = useState<SelectOption[]>([]);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', padding: '20px' }}>
        <div>
          <h3>Usuários - Outlined</h3>
          <Select
            variant="outlined"
            options={richOptions}
            onChange={setSelectedUsers}
            placeholder="Selecione usuários"
            label="Usuários/Empresas"
            helperText="Com ícones e subtexto"
          />
          <pre style={{ marginTop: '12px', fontSize: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
            {selectedUsers.length > 0 ? JSON.stringify(selectedUsers, null, 2) : 'Nenhum selecionado'}
          </pre>
        </div>

        <div>
          <h3>Emails - Filled</h3>
          <Select
            variant="filled"
            options={emailOptions}
            onChange={setSelectedEmails}
            placeholder="Escolha um email"
            label="Contas de Email"
            helperText="Opções com ícones"
          />
          <pre style={{ marginTop: '12px', fontSize: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
            {selectedEmails.length > 0 ? JSON.stringify(selectedEmails, null, 2) : 'Nenhum selecionado'}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Opções ricas (com ícones e subtexto) aplicadas a diferentes variantes.'
      }
    }
  }
};

// Múltipla seleção com variantes
export const MultipleSelectionVariants = {
  render: () => {
    const [multipleStandard, setMultipleStandard] = useState<SelectOption[]>([]);
    const [multipleOutlined, setMultipleOutlined] = useState<SelectOption[]>([]);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', padding: '20px' }}>
        <div>
          <h3>Múltipla - Standard</h3>
          <Select
            variant="standard"
            type="checkbox"
            options={richOptions}
            onChange={setMultipleStandard}
            placeholder="Selecione múltiplos"
            label="Seleção Múltipla"
            helperText="Permite múltiplas seleções"
          />
          <div style={{ marginTop: '12px' }}>
            <strong>Selecionados ({multipleStandard.length}):</strong>
            <ul style={{ marginTop: '4px' }}>
              {multipleStandard.map(option => (
                <li key={option.id} style={{ fontSize: '14px' }}>
                  {option.text} - {option.subText}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3>Múltipla - Outlined</h3>
          <Select
            variant="outlined"
            type="checkbox"
            options={emailOptions}
            onChange={setMultipleOutlined}
            placeholder="Escolha emails"
            label="Múltiplos Emails"
            helperText="Checkbox para múltiplas opções"
          />
          <div style={{ marginTop: '12px' }}>
            <strong>Selecionados ({multipleOutlined.length}):</strong>
            <ul style={{ marginTop: '4px' }}>
              {multipleOutlined.map(option => (
                <li key={option.id} style={{ fontSize: '14px' }}>
                  {option.text} - {option.subText}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de seleção múltipla com diferentes variantes visuais.'
      }
    }
  }
};

// Formulário completo
export const FormExample = {
  render: () => {
    const [formData, setFormData] = useState({
      user: [] as SelectOption[],
      email: [] as SelectOption[],
      priority: [] as SelectOption[]
    });

    const priorityOptions = [
      { id: 'low', text: 'Baixa', subText: 'Não urgente' },
      { id: 'medium', text: 'Média', subText: 'Prazo normal' },
      { id: 'high', text: 'Alta', subText: 'Urgente' },
      { id: 'critical', text: 'Crítica', subText: 'Emergencial' }
    ];

    return (
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <h2>Formulário de Contato</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Select
            variant="outlined"
            options={richOptions}
            onChange={(selected: SelectOption[]) => setFormData(prev => ({ ...prev, user: selected }))}
            placeholder="Escolha um usuário"
            label="Usuário Responsável"
            helperText="Selecione o responsável pelo atendimento"
            required
          />

          <Select
            variant="filled"
            options={emailOptions}
            onChange={(selected: SelectOption[]) => setFormData(prev => ({ ...prev, email: selected }))}
            placeholder="Email de contato"
            label="Email Principal"
            helperText="Email para comunicação"
            required
          />

          <Select
            variant="standard"
            options={priorityOptions}
            onChange={(selected: SelectOption[]) => setFormData(prev => ({ ...prev, priority: selected }))}
            placeholder="Prioridade"
            label="Prioridade do Chamado"
            helperText="Nível de urgência"
          />

          <div style={{ marginTop: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Dados do Formulário:</h4>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de formulário completo usando as três variantes do Select em um contexto real.'
      }
    }
  }
};
