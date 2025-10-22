import type { Meta, StoryFn } from '@storybook/react';
import SelectRadix from './index';
import { Channel16Regular } from '@fluentui/react-icons';

const meta: Meta<typeof SelectRadix> = {
  title: 'Components/SelectRadix',
  component: SelectRadix,
  parameters: {
    docs: {
      description: {
        component:
          'Componente Select usando Radix UI com estilização customizada.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array de opções do select',
      control: { type: 'object' },
    },
  },
};

export default meta;

const mockItems = [
  {
    id: '1',
    value: 'item1',
    text: 'List item',
    subTitle: 'Sub item 1',
    icon: <Channel16Regular />,
  },
  {
    id: '2',
    value: 'item2',
    text: 'List-item 2',
    disabled: true,
    subTitle: 'Sub item 1',
    icon: <Channel16Regular />,
  },
  {
    id: '3',
    value: 'item3',
    text: 'List-item 3',
    // subTitle: 'Sub item 1',
    icon: <Channel16Regular />,
  },
  {
    id: '4',
    value: '4141',
    text: 'List-item 4',
    // subTitle: 'Sub item 1',
  },
  {
    id: '5',
    value: 'item5',
    text: 'List-item 5',
    subTitle: 'teste',
  },
];

export const Default: StoryFn<typeof SelectRadix> = (args) => (
  <SelectRadix {...args} onValueChange={(e) => console.log(e)} />
);

Default.args = {
  items: mockItems,
};

Default.parameters = {
  docs: {
    description: {
      story:
        'Exemplo padrão do SelectRadix com múltiplas opções, incluindo uma opção desabilitada.',
    },
  },
};
