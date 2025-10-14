import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { validateItems } from '../Dropdown/DropdownUtils';
import './DropdownRadix.scss';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { useInfiniteScroll } from '../hooks/InfiniteScroll';
import { Flex, DropdownMenu } from '@radix-ui/themes';
export interface DropdownItem {
    /** ID único do item (opcional, será gerado automaticamente se não fornecido) */
    id?: string;
    /** Texto principal do item */
    text: string;
    /** Texto secundário/descrição do item */
    subText?: string;
    /** Ícone do item (React node) */
    icon?: React.ReactNode;
    /** Define se o item está desabilitado */
    disabled?: boolean;
}

export type DropdownType = 'text' | 'checkbox' | 'icon';

export interface DropdownProps {
    /** Classes CSS adicionais */
    className?: string;

    /** Força posição do dropdown: 'top' abre para cima, 'bottom' abre para baixo. Se não especificado, usa detecção automática */
    position?: 'top' | 'bottom';
    /** Array de itens para o dropdown - obrigatório */
    items: DropdownItem[];
    /** ID único do componente */
    id?: string;
    /** Tipo do dropdown */
    type?: DropdownType;
    /** Habilita campo de busca */
    applySearch?: boolean;
    /** Placeholder do campo de busca */
    placeholder?: string;
    /** Callback para mudanças na seleção */
    onSelectionChange?: (selectedIds: string[]) => void;
    /** Controla exibição do subtexto */
    showSubText?: boolean;
    /** IDs dos itens selecionados por padrão */
    defaultSelectedIds?: string[];
    /** Estado inicial dos itens selecionados (objeto com chave-valor) */
    initialItemsSelected?: Record<string, boolean>;
    width?: string | number;
    maxWidth?: string | number;
    minWidth?: string | number;
    /** Altura máxima do dropdown */
    maxHeight?: string | number;
    /** Define se o componente esta sendo usado para filtro */
    filter?: boolean;
    /**
     * Configurações para paginação infinita
     */
    infiniteScroll?: {
        /** Status atual do carregamento */
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        /** Página atual */
        page: number;
        /** Última página disponível */
        lastPage: number;
        /** Callback para carregar próxima página */
        onLoadMore: () => void;
        /** Threshold para trigger (0-1) */
        threshold?: number;
        /** Margem para trigger */
        rootMargin?: string;
        /** Debug mode */
        debug?: boolean;
    };
}

interface SelectedItemsState {
    [key: string]: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    className,
    items = [],
    id,
    type = 'text',
    applySearch = false,
    placeholder = '',
    onSelectionChange,
    showSubText = false,
    defaultSelectedIds = [],
    initialItemsSelected = {},
    maxWidth,
    minWidth,
    width,
    maxHeight,
    filter = false,
    position,
    infiniteScroll
}) => {
    const [selectedItems, setSelectedItems] = useState<SelectedItemsState>({});
    const [allItems, setAllItems] = useState<DropdownItem[]>(items);
    return (
        <Flex gap="3" align="center">
            <DropdownMenu.Root>
           [     <DropdownMenu.Trigger>
                    <Button variant="solid">
                        Options
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>]
                <DropdownMenu.Content variant="solid" className='zds-dropdown__container'>
                    {allItems.map((item) =>{
                        return(
                            <DropdownMenu.Item key={item.id} className='zds-dropdown__item'>
                                <div>
                                    {item.text}
                                    {item.subText && <span>{item.subText}</span>}

                                </div>
                                {/* {item.icon && <span>{item.icon}</span>} */}
                            </DropdownMenu.Item>
                        )
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        
        </Flex>
    );
};

const MemoizedDropdown = React.memo(Dropdown);
MemoizedDropdown.displayName = 'Dropdown';
export default MemoizedDropdown;