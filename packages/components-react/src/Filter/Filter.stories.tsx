import React, { useState, useRef, useMemo } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Filter from './Filter';
import type { FilterProps } from './Filter';
import Button from '../Button/Button';
import Drawer from '../Drawer/Drawer';
import Badge from '../Badge/Badge';
import TextField from '../TextField/TextField';
import Calendar from '../Calendar/Calendar';
import Dropdown from '../Dropdown';
import './styles.scss';
import { Filter16Regular, Calendar16Regular, ChevronDown16Regular } from '@fluentui/react-icons';

// ✅ Types para os stories
interface DropdownOption {
  id: string;
  text: string;
}

interface FilterStoryProps extends FilterProps {
  locale?: 'pt-br' | 'en-us';
}

// ✅ Meta configuration para Storybook
const meta: Meta<typeof Filter> = {
  title: 'Pattern/Filter',
  component: Filter,
  decorators: [
    (Story) => (
      <div style={{ height: '60vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      sort: 'alpha',
    },
  },
  argTypes: {
    locale: {
      control: {
        type: 'select',
      },
      options: ['pt-br', 'en-us'],
      defaultValue: 'pt-br',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pt-br' },
      },
    },
    filterPosition: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      defaultValue: 'left',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    buttonText: {
      control: 'text',
      defaultValue: 'Filtro',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Filtro' },
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['filled', 'outlined', 'text'],
      defaultValue: 'outlined',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
  },
};

export default meta;

/**
 * Story do componente Filter com Drawer integrado
 * Demonstra o uso do Filter com um drawer lateral para filtros avançados
 */
export const FilterWithDrawer: StoryFn = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * Abre o drawer de filtros
   */
  const handleOpenDrawer = (): void => {
    setIsOpen(true);
  };

  /**
   * Fecha o drawer de filtros
   */
  const handleCloseDrawer = (): void => {
    setIsOpen(false);
  };

  /**
   * Limpa os filtros aplicados
   */
  const handleClearFilters = (): void => {
    setIsOpen(false);
  };

  /**
   * Aplica os filtros selecionados
   */
  const handleApplyFilters = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        variant="outlined" 
        type="button" 
        onClick={handleOpenDrawer} 
        icon={<Filter16Regular />}
      >
        Filtros
        <Badge type="status" value={1} />
      </Button>
      <Drawer 
        isOpen={isOpen} 
        onOpen={handleOpenDrawer} 
        onClose={handleCloseDrawer} 
        pWidth="500px"
      >
        <div className="zds-filter-drawer">
          <div className="zds-filter-drawer--content">
            <TextField 
              label="Emissão" 
              maxLength={100} 
              placeholder="DD/MM/AAAA" 
              trailingIcon 
              validateDate 
            />
            <TextField 
              label="Vencimento" 
              maxLength={100} 
              placeholder="DD/MM/AAAA" 
              trailingIcon 
              validateDate 
            />
          </div>
          <div className="zds-filter-drawer--actions">
            <Button variant="outlined" type="button" onClick={handleClearFilters}>
              Limpar
            </Button>
            <Button variant="filled" type="button" onClick={handleApplyFilters}>
              Filtrar
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

/**
 * Story do componente Filter com Calendar integrado
 * Demonstra o uso do Filter com um calendário como conteúdo
 */
export const FilterWithCalendar: StoryFn<FilterStoryProps> = (args): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  /**
   * Manipula a mudança de data no calendário
   * @param date - Nova data selecionada
   */
  const handleDateChange = (date: Date): void => {
    setSelectedDate(date);
    console.log('Data selecionada:', date);
  };

  /**
   * Formata a data para exibição no botão
   */
  const formatButtonText = (): string => {
    if (!selectedDate) return 'Selecionar Data';
    
    const locale = args.locale || 'pt-br';
    return selectedDate.toLocaleDateString(locale);
  };

  return (
    <Filter 
      {...args} 
      buttonText={formatButtonText()} 
      icon={<Calendar16Regular />}
    >
      <Calendar 
        selectedDate={selectedDate} 
        onDateChange={handleDateChange} 
        locale={args.locale} 
      />
    </Filter>
  );
};

/**
 * Story do componente Filter com Dropdown integrado
 * Demonstra o uso do Filter com um dropdown como conteúdo
 */
export const FilterWithUniqueSelection: StoryFn<FilterStoryProps> = (args): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  // Opções do dropdown
  const options: DropdownOption[] = [
    { id: 'option1', text: 'Ativo' },
    { id: 'option2', text: 'Inativo' },
    { id: 'option3', text: 'Pendente' },
  ];

  /**
   * Manipula a mudança de seleção no dropdown
   * @param selectedIds - Array com IDs dos itens selecionados
   */
  const handleSelectionChange = (selectedIds: string[]): void => {
    if (selectedIds.length > 0) {
      // Encontra a opção selecionada baseada no ID
      const selectedItem = options.find((option) => option.id === selectedIds[0]);
      setSelectedOption(selectedItem || null);
      console.log('Opção selecionada:', selectedItem);
    } else {
      setSelectedOption(null);
      console.log('Nenhuma opção selecionada');
    }
  };

  return (
    <Filter 
      {...args} 
      buttonText={selectedOption ? selectedOption.text : 'Selecionar Opção'} 
      icon={<ChevronDown16Regular />}
    >
      <Dropdown 
        items={options} 
        type="text" 
        onSelectionChange={handleSelectionChange} 
        placeholder="Buscar opção..." 
        applySearch={false} 
        id="filter-dropdown" 
      />
    </Filter>
  );
};

/**
 * Story do componente Filter com Dropdown integrado usando checkbox
 * Demonstra o uso do Filter com um dropdown de múltipla seleção e Badge
 * Mantém seleções ao clicar fora do dropdown
 */
export const FilterWithMultipleSelection: StoryFn<FilterStoryProps> = (args): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [firstSelectedOption, setFirstSelectedOption] = useState<DropdownOption | null>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Opções do dropdown para múltipla seleção
  const checkboxOptions: DropdownOption[] = [
    { id: 'checkbox1', text: 'Ativo' },
    { id: 'checkbox2', text: 'Inativo' },
    { id: 'checkbox3', text: 'Pendente' },
  ];

  /**
   * Manipula a mudança de seleção múltipla no dropdown
   * Mantém registro da primeira opção selecionada para exibir no botão
   * Estado é persistido mesmo ao fechar o dropdown
   * @param selectedIds - Array com IDs dos itens selecionados
   */
  const handleMultiSelectionChange = (selectedIds: string[]): void => {
    if (selectedIds.length > 0) {
      // Encontra todas as opções selecionadas baseadas nos IDs
      const selectedItems = checkboxOptions.filter((option) => 
        selectedIds.includes(option.id)
      );
      setSelectedOptions(selectedItems);

      // Define a primeira opção selecionada se ainda não tiver uma ou se as seleções mudaram
      if (!firstSelectedOption || selectedItems.length === 0) {
        setFirstSelectedOption(selectedItems[0] || null);
      } else {
        // Verifica se a primeira opção ainda está nas seleções atuais
        const firstStillSelected = selectedItems.find(
          (item) => item.id === firstSelectedOption.id
        );
        if (!firstStillSelected) {
          // Se a primeira opção foi removida, define a nova primeira
          setFirstSelectedOption(selectedItems[0] || null);
        }
      }

      console.log('Opções selecionadas:', selectedItems);
      console.log('Primeira opção:', selectedItems[0]);
    } else {
      setSelectedOptions([]);
      setFirstSelectedOption(null);
      console.log('Nenhuma opção selecionada');
    }
  };

  /**
   * Manipula a abertura do dropdown
   * Remove o foco do botão e transfere para o dropdown
   */
  const handleDropdownOpen = (): void => {
    setIsDropdownOpen(true);

    // Remove foco do botão e transfere para o dropdown usando setTimeout
    setTimeout(() => {
      // Remove foco do botão
      if (buttonRef.current) {
        (buttonRef.current as any).blur?.();
      }

      // Remove foco de qualquer elemento ativo
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement?.blur) {
        activeElement.blur();
      }

      // Transfere foco para o dropdown
      if (dropdownRef.current) {
        // Busca pelo input de busca ou primeiro elemento focável no dropdown
        const searchInput = dropdownRef.current.querySelector('input[type="text"]') as HTMLInputElement;
        const firstCheckbox = dropdownRef.current.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const firstFocusableElement = searchInput || firstCheckbox;

        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }
    }, 100); // Delay para garantir que o dropdown esteja renderizado
  };

  /**
   * Manipula o fechamento do dropdown
   * Restaura comportamento normal do botão
   * Mantém as seleções feitas pelo usuário
   */
  const handleDropdownClose = (): void => {
    setIsDropdownOpen(false);
    // Nota: selectedOptions e firstSelectedOption são mantidos intencionalmente
    console.log('Dropdown fechado. Seleções mantidas:', selectedOptions);
  };

  /**
   * Manipula o evento de foco no botão
   * Impede foco quando dropdown estiver aberto
   * @param event - Evento de foco
   */
  const handleButtonFocus = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (isDropdownOpen) {
      event.preventDefault();
      event.stopPropagation();
      // Remove o foco do botão quando dropdown está aberto
      (event.target as HTMLButtonElement).blur();

      // Redireciona foco para o dropdown se estiver aberto
      setTimeout(() => {
        if (dropdownRef.current) {
          const searchInput = dropdownRef.current.querySelector('input[type="text"]') as HTMLInputElement;
          const firstCheckbox = dropdownRef.current.querySelector('input[type="checkbox"]') as HTMLInputElement;
          const firstFocusableElement = searchInput || firstCheckbox;

          if (firstFocusableElement) {
            firstFocusableElement.focus();
          }
        }
      }, 0);
    }
  };

  /**
   * Gera o texto do botão baseado na primeira seleção
   * Sempre mostra a primeira opção escolhida
   */
  const getButtonText = (): string => {
    if (selectedOptions.length === 0) {
      return 'Status';
    }
    // Sempre retorna o texto da primeira opção selecionada
    return firstSelectedOption ? firstSelectedOption.text : 'Status';
  };

  /**
   * Renderiza o conteúdo do botão com Badge para múltiplas seleções
   * Mostra primeira opção selecionada + Badge com quantidade
   * Usa React.useMemo para manter estabilidade e aplica classe CSS adequada
   */
  const renderButtonContent = useMemo((): JSX.Element | string => {
    const text = getButtonText();

    // Se há mais de uma seleção, renderiza com Badge usando classe CSS
    if (selectedOptions.length > 1) {
      return (
        <div className="zds-filter-button-content">
          <span>{text}</span>
          <Badge type="status" value={selectedOptions.length} />
        </div>
      );
    }

    // Para 0 ou 1 seleção, retorna apenas o texto
    return text;
  }, [selectedOptions, firstSelectedOption]);

  /**
   * Força o dropdown a manter as seleções atuais
   * Converte o array de objetos para array de IDs para o componente Dropdown
   */
  const getSelectedIds = useMemo((): string[] => {
    return selectedOptions.map((option) => option.id);
  }, [selectedOptions]);

  return (
    <Filter
      {...args}
      buttonText={renderButtonContent}
      icon={<ChevronDown16Regular />}
      onOpen={handleDropdownOpen}
      onClose={handleDropdownClose}
      onButtonFocus={handleButtonFocus}
      buttonRef={buttonRef}
      className={isDropdownOpen ? 'zds-filter--dropdown-open' : ''}
    >
      <div ref={dropdownRef}>
        <Dropdown
          items={checkboxOptions}
          type="checkbox"
          onSelectionChange={handleMultiSelectionChange}
          selectedItems={getSelectedIds}
          placeholder="Buscar status..."
          applySearch={false}
          id="filter-dropdown-checkbox"
          showSubText={false}
        />
      </div>
    </Filter>
  );
};

// Configurações das stories para melhor documentação no Storybook
FilterWithDrawer.parameters = {
  docs: {
    description: {
      story: 'Filter integrado com Drawer para filtros avançados. O Badge mostra a quantidade de filtros aplicados.',
    },
  },
};

FilterWithCalendar.parameters = {
  docs: {
    description: {
      story: 'Filter integrado com Calendar para seleção de datas. O texto do botão é atualizado com a data selecionada.',
    },
  },
};

FilterWithUniqueSelection.parameters = {
  docs: {
    description: {
      story: 'Filter integrado com Dropdown para seleção única. O texto do botão mostra a opção selecionada.',
    },
  },
};

FilterWithMultipleSelection.parameters = {
  docs: {
    description: {
      story: 'Filter integrado com Dropdown de múltipla seleção. O Badge aparece apenas quando há mais de um item selecionado.',
    },
  },
};