import {Meta, StoryObj} from '@storybook/react';
import { useEffect, useState } from 'react';
import { Checkbox } from '@giro-ds/react';


const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Components/Checkbox',
  parameters:{
    docs: {
      description: {
        component: 'Checkbox é um controle de formulário que permite ao usuário selecionar ou desmarcar uma opção de forma independente. Use-o quando o usuário precisar confirmar uma escolha binária ou selecionar múltiplos itens de uma lista.',
      },
    },
    // layout: 'centered'
  },
  argTypes:{
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    onCheckedChange: { action: 'checked changed' },
    indeterminate: { control: 'boolean'},
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente.',
    },
  },
}
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) =>{
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
  },
  args:{
    label: 'Checkbox',
    disabled: false,
    indeterminate: false,
    scale: 1,

  }   
}
export const Desmarcado: Story = {
  args: {
    label: 'Opção desmarcada',
    disabled: false,
    indeterminate: false,
  },
};

export const Marcado: Story = {
  args: {
    label: 'Opção marcada',
    defaultChecked: true,
    disabled: false,
    indeterminate: false,
  },
};

export const Indeterminado: Story = {
  args: {
    label: 'Seleção parcial',
    defaultChecked: true,
    indeterminate: true,
    disabled: false,
  },
};

export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Desmarcado e desabilitado" disabled />
      <Checkbox label="Marcado e desabilitado" defaultChecked disabled />
    </div>
  ),
};

export const SelecionarTodos: Story = {
  render: (args) => {

    // Estado dos 3 checkboxes individuais
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
    });

    // Calcula o estado do Select All
    const allChecked = items.item1 && items.item2 && items.item3;    
    const indeterminate = (items.item1 || items.item2 || items.item3) && !allChecked;

    // Handler para fazer Select All
    const handleSelectAll = () => {
      if (!allChecked) {
        setItems({
          item1: true,
          item2: true,
          item3: true,
        });
      }
    };

    // Handler para fazer deselect All
    const handleDeselectAll = () => {
      if (allChecked) {
        setItems({
          item1: false,
          item2: false,
          item3: false,
        });
      }
    };

    // Controle para o Select All
    const selectAllController = () => {
      if (allChecked) {
        handleDeselectAll();
      } else {
        handleSelectAll();
      }  
    }

    // Handler para items individuais
    const handleItemChange = (itemKey: keyof typeof items) => {
      setItems((prev) => ({
        ...prev,
        [itemKey]: !prev[itemKey],
      }));
    };

    // visualizador de se o estado someChecked está funcionando
    useEffect(() =>{
      console.log(indeterminate)
    },[indeterminate])

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem',
          borderRadius: '8px',
          minWidth: '300px',
        }}
      >
        {/* Select All Checkbox */}
        <div
          style={{
            paddingBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
          }}
        >
          <Checkbox
            id="select-all"
            label="Select All"
            checked={allChecked || indeterminate}
            indeterminate={indeterminate}
            onCheckedChange={selectAllController}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            paddingLeft: '1.5rem',
          }}
        >
          <Checkbox
            id="item-1"
            label="Item 1"
            checked={items.item1}
            onCheckedChange={() => handleItemChange('item1')}
          />
          <Checkbox
            id="item-2"
            label="Item 2"
            checked={items.item2}
            onCheckedChange={() => handleItemChange('item2')}
          />
          <Checkbox
            id="item-3"
            label="Item 3"
            checked={items.item3}
            onCheckedChange={() => handleItemChange('item3')}
          />
        </div>        
      </div>
    );
  },
};

export const Escalas: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
      <Checkbox label="Scale 1.0" scale={1} />
      <Checkbox label="Scale 1.5" scale={1.5} />
      <Checkbox label="Scale 2.0" scale={2} />
    </div>
  ),
};