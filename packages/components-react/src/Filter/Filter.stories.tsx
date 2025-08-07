// Filter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Filter from './Filter';
import type { FilterProps } from './Filter';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de filtro com dropdown para seleção de opções.',
      },
    },
  },
  argTypes: {
    buttonText: {
      control: { type: 'text' },
      description: 'Texto exibido no botão do filtro',
      table: {
        type: { summary: 'string | ReactNode' },
        defaultValue: { summary: 'Filter' },
      },
    },
    position: {
      control: {
        type: 'select',
        options: ['left', 'right'], // ✅ Correct placement
      },
      description: 'Posição do dropdown',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outlined', 'text'], // ✅ Correct placement
      },
      description: 'Variante do botão',
      table: {
        type: { summary: "'filled' | 'outlined' | 'text'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Se o filtro está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: false,
      description: 'Ícone do botão',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    children: {
      control: false,
      description: 'Conteúdo do filtro',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback quando o estado muda',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
      },
    },
    onOpen: {
      action: 'opened',
      description: 'Callback quando abre',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback quando fecha',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Template for interactive stories
const Template = (args: FilterProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleOptionToggle = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const displayText = selectedValues.length > 0 
    ? `${selectedValues.length} selected`
    : args.buttonText || 'Filter';

  return (
    <div style={{ padding: '2rem', minHeight: '300px' }}>
      <Filter
        {...args}
        buttonText={displayText}
      >
        <div style={{ padding: '1rem', minWidth: '200px' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>Filter Options</h4>
          
          {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map(option => (
            <label
              key={option}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0.5rem 0',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleOptionToggle(option)}
                style={{ marginRight: '0.5rem' }}
              />
              {option}
            </label>
          ))}
          
          <hr style={{ margin: '1rem 0' }} />
          
          <button
            onClick={() => setSelectedValues([])}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: 'transparent',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </div>
      </Filter>
    </div>
  );
};

// Stories
export const Default: Story = {
  render: Template,
  args: {
    buttonText: 'Filter',
    position: 'left',
    variant: 'outlined',
    disabled: false,
  },
};

export const RightPosition: Story = {
  render: Template,
  args: {
    buttonText: 'Filter',
    position: 'right',
    variant: 'outlined',
  },
};

export const FilledVariant: Story = {
  render: Template,
  args: {
    buttonText: 'Filter',
    variant: 'filled',
    position: 'left',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    buttonText: 'Filter',
    disabled: true,
    position: 'left',
    variant: 'outlined',
  },
};