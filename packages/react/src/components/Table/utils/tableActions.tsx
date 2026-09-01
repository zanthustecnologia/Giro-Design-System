import { MoreVertical16Regular } from '@fluentui/react-icons';
import React, { useMemo, useCallback } from 'react';

import Menu from '../../Menu/Menu';

import type { MenuItemProps } from '../../Menu/Menu.types';
import type { TableColumn, TableRowData } from '../Table.types';

// ✅ Interface para definir ações da tabela
export interface TableAction<T extends TableRowData = TableRowData> {
  key: string;
  label: string | ((row: T) => string);
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: (row: T) => boolean;
  onClick: (row: T) => void;
}

// ✅ Helper function para criar coluna de ações
export const createActionsColumn = <T extends TableRowData = TableRowData>(
  actions: TableAction<T>[]
): TableColumn<T> => ({
  key: 'actions',
  label: '',
  style: { width: 60 },
  align: 'center' as const,
  render: (row: T) => (
    <TableActionsMenu row={row} actions={actions} />
  ),
});

interface TableActionsMenuProps<T extends TableRowData> {
  row: T;
  actions: TableAction<T>[];
}

const TableActionsMenu = <T extends TableRowData>({
  row,
  actions,
}: TableActionsMenuProps<T>) => {
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
  const handleClick = useCallback((item: MenuItemProps) => {
    const action = actions.find(a => a.key === item.id);
    if (action && !action.disabled?.(row)) {
      action.onClick(row);
    }
  }, [actions, row]);

  return (
    <Menu
      items={menuItems}
      onItemSelect={handleClick}
    >
      <MoreVertical16Regular 
        style={{ cursor: 'pointer' }}
        aria-label={`Menu de ações`}
        tabIndex={0}
      />
    </Menu>
  );
};

export default TableActionsMenu;
