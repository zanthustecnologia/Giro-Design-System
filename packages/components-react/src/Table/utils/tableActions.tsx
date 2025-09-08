import React, { useMemo, useCallback } from 'react';
import { MoreVertical16Regular } from '@fluentui/react-icons';
import Menu from '../../Menu/Menu';

// ✅ Interface para definir ações da tabela
export interface TableAction {
  key: string;
  label: string | ((row: any) => string);
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: (row: any) => boolean;
  onClick: (row: any) => void;
}

// ✅ Helper function para criar coluna de ações
export const createActionsColumn = (actions: TableAction[]) => ({
  key: 'actions',
  label: '',
  width: 60,
  align: 'center' as const,
  render: (row: any) => (
    <TableActionsMenu row={row} actions={actions} />
  ),
});

// ✅ Componente interno memoizado para performance
const TableActionsMenu = React.memo<{ 
  row: any; 
  actions: TableAction[];
}>(({ row, actions }) => {
  // Memoizar items do menu para evitar re-renders
  const menuItems = useMemo(() => 
    actions.map(action => ({
      id: action.key,
      text: typeof action.label === 'function' ? action.label(row) : action.label,
      disabled: action.disabled?.(row) || false,
      danger: action.danger || false,
      icon: action.icon,
    }))
  , [actions, row]);

  // Handler memoizado para cliques
  const handleClick = useCallback((item: any) => {
    const action = actions.find(a => a.key === item.id);
    if (action && !action.disabled?.(row)) {
      action.onClick(row);
    }
  }, [actions, row]);

  return (
    <Menu
      position="right"
      menuItems={menuItems}
      onMenuItemClick={handleClick}
    >
      <MoreVertical16Regular 
        style={{ cursor: 'pointer' }}
        aria-label={`Menu de ações`}
        tabIndex={0}
      />
    </Menu>
  );
});

// Adicionar displayName para debugging
TableActionsMenu.displayName = 'TableActionsMenu';

export default TableActionsMenu;
