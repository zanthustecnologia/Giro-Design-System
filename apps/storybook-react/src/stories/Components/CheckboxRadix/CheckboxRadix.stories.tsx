import {Meta, StoryObj} from '@storybook/react';
import { useEffect, useState } from 'react';
import { CheckboxRadix } from '@giro-ds/react';


const meta: Meta<typeof CheckboxRadix> = {
  component: CheckboxRadix,
  title: 'Components/CheckboxRadix',
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
type Story = StoryObj<typeof CheckboxRadix>;

export const Default: Story = {
  render: (args) =>{
    const [checked, setChecked] = useState(false);
    return <CheckboxRadix {...args} checked={checked} onCheckedChange={setChecked} />
  },
  args:{
    label: 'Checkbox',
    disabled: false,
    indeterminate: false,

  }   
}
export const SelectAll: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    // Estado dos 3 checkboxes individuais
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
    });

    // Calcula o estado do Select All
    const allChecked = items.item1 && items.item2 && items.item3;
    const someChecked = (items.item1 || items.item2 || items.item3) && !allChecked;
    

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
      if (!allChecked){
        handleSelectAll()
        setChecked(true)
        
      } else if(someChecked){
        handleSelectAll()
        setChecked(true)
        
      } else if(allChecked){ 
        handleDeselectAll()
        setChecked(false)
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
      console.log(someChecked)
    },[someChecked])

    // Atualiza o estado indeterminate e checked do Select All
    useEffect(() => {
      if (someChecked) {
        setIndeterminate(true);
        setChecked(true);
      } else if (allChecked) {
        setIndeterminate(false);
        setChecked(true);
      } else {
        setIndeterminate(false);
        setChecked(false);
      }
    }, [checked]);

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
          <CheckboxRadix
            id="select-all"
            label="Select All"
            indeterminate={indeterminate}
            checked={allChecked}
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
          <CheckboxRadix
            id="item-1"
            label="Item 1"
            checked={items.item1}
            onCheckedChange={() => handleItemChange('item1')}
         
          />

          <CheckboxRadix
            id="item-2"
            label="Item 2"
            checked={items.item2}
            onCheckedChange={() => handleItemChange('item2')}
            
          />

          <CheckboxRadix
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
              ) : someChecked ? (
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