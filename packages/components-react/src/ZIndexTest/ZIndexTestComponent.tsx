import React, { useState } from 'react';
import TextField from '../TextField/TextField';
import Menu from '../Menu/Menu';
import Button from '../Button/Button';
import Select from '../Select/Select';
import { MoreVertical16Regular } from '@fluentui/react-icons';

/**
 * Componente de teste para verificar se os z-index foram corrigidos
 * Este componente renderiza TextField, Menu e Select juntos para testar sobreposições
 */
const ZIndexTestComponent = () => {
  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const menuItems = [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ];

  const selectOptions = [
    { id: '1', text: 'Opção 1' },
    { id: '2', text: 'Opção 2' },
    { id: '3', text: 'Opção 3' },
  ];

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Teste de Z-Index - Design System</h2>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* TextField que causava problemas */}
        <div>
          <TextField
            label="TextField (z-index: 1)"
            placeholder="Digite algo..."
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            helperText="Este campo agora tem z-index correto"
          />
        </div>

        {/* Menu que deveria aparecer sobre TextField */}
        <div>
          <Menu
            menuItems={menuItems}
            onMenuItemClick={(item) => console.log('Menu item clicked:', item)}
          >
            <Button
              variant="outlined"
              icon={<MoreVertical16Regular />}
              text="Menu (z-index: 15)"
            />
          </Menu>
        </div>

        {/* Select que deveria aparecer sobre TextField */}
        <div>
          <Select
            label="Select (z-index: 15)"
            placeholder="Selecione uma opção"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            helperText="Este dropdown agora aparece corretamente"
          />
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Instruções de Teste:</h3>
        <ul>
          <li>1. Abra o Menu - deve aparecer sobre o TextField</li>
          <li>2. Abra o Select - deve aparecer sobre o TextField</li>
          <li>3. Os dropdowns NÃO devem aparecer atrás do TextField</li>
          <li>4. A hierarquia deve ser: Toast {'>'} Dialog {'>'} Drawer {'>'} Dropdown {'>'} Content</li>
        </ul>
      </div>

      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        background: '#f0f0f0', 
        padding: '10px', 
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        <strong>Z-Index Hierarchy:</strong><br />
        Content: 1<br />
        Dropdown: 15<br />
        Tooltip: 25<br />
        Drawer: 1000<br />
        Dialog: 2000<br />
        Toast: 9000
      </div>
    </div>
  );
};

export default ZIndexTestComponent;