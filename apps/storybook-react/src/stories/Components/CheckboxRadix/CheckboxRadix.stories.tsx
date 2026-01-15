import {Meta, StoryObj} from '@storybook/react';
import { useEffect, useState } from 'react';
import { Checkbox } from '@giro-ds/react';


const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Components/Checkbox',
  parameters:{
    layout: 'centered'
  },
  argTypes:{
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    onCheckedChange: { action: 'checked changed' },
    indeterminate: { control: 'boolean'}
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

  }   
}
export const SelectAll: Story = {
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
          backgroundColor: '#f9fafb',
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

        {/* Status Box */}
        <div
          style={{
            marginTop: '0.5rem',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#374151',
            border: '1px solid #e5e7eb',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div>
              <strong>Estado "Select All":</strong>{' '}
              {allChecked ? (
                <span style={{ color: '#10b981' }}>✓ Todos selecionados</span>
              ) : indeterminate ? (
                <span style={{ color: '#f59e0b' }}>
                  ⊟ Parcialmente selecionado (indeterminate)
                </span>
              ) : (
                <span style={{ color: '#6b7280' }}>☐ Nenhum selecionado</span>
              )}
            </div>
            <div>
              <strong>Items marcados:</strong>{' '}
              {Object.values(items).filter(Boolean).length} de 3
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.5rem' }}>
              💡 <em>Marque 1 ou 2 items para ver o estado indeterminate</em>
            </div>
          </div>
        </div>
      </div>
    );
  },
};