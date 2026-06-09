import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Radio } from '@giro-ds/react';
import type { RadioGroupProps } from '@giro-ds/react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: 'Radio é um controle de formulário que permite ao usuário selecionar exatamente uma opção dentro de um grupo. Ao contrário do Checkbox, selecionar um item automaticamente desmarca os demais.',
      },
    },
  },
  args: {
    orientation: 'vertical',
    defaultValue: 'option-1',
    ariaLabel: 'Selecione uma opção',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    defaultValue: {
      control: { type: 'text' },
    },
    ariaLabel: {
      control: { type: 'text' },
    },
    onValueChange: {
      action: 'valueChanged',
    },
    items: { table: { disable: true } },
    id: { table: { disable: true } },
    className: { table: { disable: true } },
    name: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

const basicItems: RadioGroupProps['items'] = [
  { value: 'option-1', label: 'Opção 1' },
  { value: 'option-2', label: 'Opção 2' },
  { value: 'option-3', label: 'Opção 3' },
];

export const Default: Story = {
  render: (args) => (
    <Radio
      {...args}
      items={basicItems}
    />
  ),
};

export const Horizontal: StoryFn = () => (
  <Radio
    orientation="horizontal"
    defaultValue="option-1"
    ariaLabel="Frequência de envio"
    items={[
      { value: 'option-1', label: 'Diário' },
      { value: 'option-2', label: 'Semanal' },
      { value: 'option-3', label: 'Mensal' },
    ]}
  />
);

export const ComItemDesabilitado: StoryFn = () => (
  <Radio
    defaultValue="option-1"
    ariaLabel="Método de pagamento"
    items={[
      { value: 'option-1', label: 'Cartão de crédito' },
      { value: 'option-2', label: 'Boleto bancário' },
      { value: 'option-3', label: 'Pix', disabled: true },
    ]}
  />
);

export const MultiplaSelecao: Story = {
  render: (args) => {
      const items = [
        { id: '1', value: '1', label: args.ariaLabel || 'Option 1' },
        { id: '2', value: '2', label: 'Option 2' },
        { id: '3', value: '3', label: 'Option 3' },
        { id: '4', value: '4', label: 'Option 4' },
        { id: '5', value: '5', label: 'Option 5' },
      ]

      return (
        <Radio
          items={items}
          orientation={args.orientation}
          ariaLabel={args.ariaLabel}
          onValueChange={(e) => console.log(e)}
        />
      );
  }
}
MultiplaSelecao.storyName = 'Múltipla Seleção';