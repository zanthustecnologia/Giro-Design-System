import { useCallback } from "react";
import type { DropdownItem, DropdownType } from './Dropdown.types';

/**
 * Valida e filtra itens do dropdown baseado no tipo especificado
 * @param items - Array de itens para validar
 * @param type - Tipo do dropdown ('text' | 'checkbox' | 'icon')
 * @returns Array de itens válidos filtrados
 */
export const validateItems = (items: unknown, type: DropdownType): DropdownItem[] => {
    
    if (!Array.isArray(items)) return [];
    
    return items.filter((item: unknown, index: number): item is DropdownItem => {
        // Remove items inválidos
        if (!item || typeof item !== 'object') {
            console.warn(`Dropdown: Item ${index} inválido`);
            return false;
        }
        
        // Type assertion segura após verificação de tipo
        const dropdownItem = item as Partial<DropdownItem>;
        
        // Validação específica para tipo icon
        if (type === 'icon' && !dropdownItem.icon) {
            console.error(`Dropdown: Item ${index} precisa de ícone quando type='icon'`);
            return false;
        }
        
        // Precisa ter text ou id
        if (!dropdownItem.text && !dropdownItem.id) {
            console.warn(`Dropdown: Item ${index} precisa de text ou id`);
            return false;
        }
        
        return true;
    });
};