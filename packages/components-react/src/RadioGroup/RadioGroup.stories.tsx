import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import RadioGroup, { RadioGroupProps } from './RadioGroup';
import Radio from '../Radio/Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direção do layout dos radio buttons'
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita todo o grupo'
    },
    error: {
      control: 'boolean',
      description: 'Estado de erro'
    },
    label: {
      control: 'text',
      description: 'Label do grupo'
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda'
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro'
    }
  }
};

export default meta;

// Template base
const Template: StoryFn<RadioGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState('option1');
  
  return (
    <div style={{ padding: '20px' }}>
      <RadioGroup {...args} value={selectedValue} onChange={setSelectedValue}>
        <Radio value="option1" label="Opção 1" />
        <Radio value="option2" label="Opção 2" />
        <Radio value="option3" label="Opção 3" />
      </RadioGroup>
      <p style={{ marginTop: '20px', color: '#666' }}>
        Valor selecionado: <strong>{selectedValue}</strong>
      </p>
    </div>
  );
};

// Story padrão
export const Default = Template.bind({});
Default.args = {
  label: 'Escolha uma opção',
  helperText: 'Selecione apenas uma das opções disponíveis'
};
