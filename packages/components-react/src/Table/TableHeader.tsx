import React, { useState, useEffect, useCallback, useMemo, KeyboardEvent, ChangeEvent } from 'react';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Button from '../Button/Button';
import Drawer from '../Drawer/Drawer';
import Badge from '../Badge/Badge';
import Calendar from '../Calendar/Calendar';
import Dropdown from '../Dropdown/Dropdown';
import TextField from '../TextField/TextField';
import { Filter16Regular, Calendar16Regular, ChevronDown16Regular } from '@fluentui/react-icons';
import './styles.scss';

// Tipos para as opções dos dropdowns
export interface DropdownOption {
  id: string;
  text: string;
}

// Props do componente TableHeader
export interface TableHeaderProps {
  /** Valor atual da pesquisa controlado externamente */
  searchValue?: string;
  /** Função chamada quando o usuário submete uma pesquisa (Enter) */
  onSearchChange: (value: string) => void;
  /** Texto placeholder para o campo de pesquisa */
  searchPlaceholder?: string;
  /** Define se os filtros devem ser exibidos */
  showFilters?: boolean;
  /** Define se a busca deve ser exibida */
  showSearch?: boolean;
}

/**
 * Componente de cabeçalho da tabela com funcionalidade de pesquisa e filtros
 * Permite busca através de pressionar Enter no campo de pesquisa
 * Segue padrões do Zanthus Design System
 * Responsivo: em telas menores que 1024px, exibe FilterWithDrawer
 */
const TableHeader: React.FC<TableHeaderProps> = ({
  searchValue = '',
  onSearchChange,
  showFilters = false,
  showSearch = false,
  searchPlaceholder = 'Pesquisar...'
}) => {
  // Estado interno para controlar o valor do input durante a digitação
  const [internalSearchValue, setInternalSearchValue] = useState<string>(searchValue);

  // Estados para controle responsivo
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Estados para Filter 1 - Seleção única
  const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);

  // Estados simplificados para Filter 2 - seguindo padrão do FilterWithMultipleSelection
  const [selectedStatuses, setSelectedStatuses] = useState<DropdownOption[]>([]);
  const [firstSelectedStatus, setFirstSelectedStatus] = useState<DropdownOption | null>(null);

  // Estados para Filter 3 - Calendar
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Estados para Filter 4 - Seleção única
  const [selectedFilter4, setSelectedFilter4] = useState<DropdownOption | null>(null);

  // Estados simplificados para Filter 5 - seguindo padrão do FilterWithMultipleSelection
  const [selectedFilter5, setSelectedFilter5] = useState<DropdownOption[]>([]);
  const [firstSelectedFilter5, setFirstSelectedFilter5] = useState<DropdownOption | null>(null);

  // Opções dos dropdowns memoizadas para performance
  const categoryOptions = useMemo<DropdownOption[]>(
    () => [
      { id: 'electronics', text: 'Eletrônicos' },
      { id: 'clothing', text: 'Roupas' },
      { id: 'home', text: 'Casa' },
    ],
    []
  );

  const statusOptions = useMemo<DropdownOption[]>(
    () => [
      { id: 'active', text: 'Ativo' },
      { id: 'inactive', text: 'Inativo' },
      { id: 'pending', text: 'Pendente' },
    ],
    []
  );

  const filter4Options = useMemo<DropdownOption[]>(
    () => [
      { id: 'option1', text: 'Opção 1' },
      { id: 'option2', text: 'Opção 2' },
      { id: 'option3', text: 'Opção 3' },
    ],
    []
  );

  const filter5Options = useMemo<DropdownOption[]>(
    () => [
      { id: 'tag1', text: 'Tag 1' },
      { id: 'tag2', text: 'Tag 2' },
      { id: 'tag3', text: 'Tag 3' },
    ],
    []
  );

  /**
   * Hook para detectar mudanças no tamanho da tela
   * Atualiza o estado isMobile baseado na largura da viewport
   */
  useEffect(() => {
    /**
     * Função para lidar com redimensionamento da tela
     */
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Manipula a mudança no campo de pesquisa
   * Atualiza apenas o estado interno, não dispara a pesquisa
   * Otimizada com useCallback para evitar re-renders desnecessários
   */
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      setInternalSearchValue(newValue);

      // Se o campo foi limpo (valor vazio), executa a pesquisa imediatamente
      if (newValue.trim() === '' && onSearchChange) {
        onSearchChange('');
      }
    },
    [onSearchChange]
  );

  /**
   * Manipula o evento de pressionar Enter no campo de pesquisa
   * Consolidado em uma única função para evitar duplicação de código
   * Memoizada para melhor performance
   */
  const handleSearchSubmit = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter' && onSearchChange) {
        e.preventDefault(); // Previne comportamento padrão do formulário
        onSearchChange(internalSearchValue);
      }
    },
    [internalSearchValue, onSearchChange]
  );

  /**
   * Sincroniza o estado interno com o valor externo da pesquisa
   * Útil quando o componente pai reseta ou altera o valor da pesquisa
   */
  useEffect(() => {
    setInternalSearchValue(searchValue);
  }, [searchValue]);

  /**
   * Manipula a seleção de categoria (Filter 1)
   */
  const handleCategorySelectionChange = useCallback(
    (selectedIds: string[]): void => {
      if (selectedIds.length > 0) {
        const selectedItem = categoryOptions.find((option) => option.id === selectedIds[0]);
        setSelectedCategory(selectedItem || null);
        console.log('Categoria selecionada:', selectedItem);
      } else {
        setSelectedCategory(null);
        console.log('Filtro de categoria removido');
      }
    },
    [categoryOptions]
  );

  /**
   * Manipula a seleção múltipla de status (Filter 2)
   * Segue padrão do FilterWithMultipleSelection
   */
  const handleStatusSelectionChange = useCallback(
    (selectedIds: string[]): void => {
      if (selectedIds.length > 0) {
        // Encontra todas as opções selecionadas baseadas nos IDs
        const selectedItems = statusOptions.filter((option) => selectedIds.includes(option.id));
        setSelectedStatuses(selectedItems);

        // Define a primeira opção selecionada se ainda não tiver uma ou se as seleções mudaram
        if (!firstSelectedStatus || selectedItems.length === 0) {
          setFirstSelectedStatus(selectedItems[0] || null);
        } else {
          // Verifica se a primeira opção ainda está nas seleções atuais
          const firstStillSelected = selectedItems.find((item) => item.id === firstSelectedStatus.id);
          if (!firstStillSelected) {
            // Se a primeira opção foi removida, define a nova primeira
            setFirstSelectedStatus(selectedItems[0] || null);
          }
        }

        console.log('Status selecionados:', selectedItems);
        console.log('Primeira opção:', selectedItems[0]);
      } else {
        setSelectedStatuses([]);
        setFirstSelectedStatus(null);
        console.log('Nenhum status selecionado');
      }
    },
    [statusOptions, firstSelectedStatus]
  );

  /**
   * Manipula a mudança de data (Filter 3)
   */
  const handleDateChange = useCallback((date: Date): void => {
    setSelectedDate(date);
    console.log('Data selecionada:', date);
  }, []);

  /**
   * Manipula a seleção do Filter 4
   */
  const handleFilter4SelectionChange = useCallback(
    (selectedIds: string[]): void => {
      if (selectedIds.length > 0) {
        const selectedItem = filter4Options.find((option) => option.id === selectedIds[0]);
        setSelectedFilter4(selectedItem || null);
        console.log('Filter 4 selecionado:', selectedItem);
      } else {
        setSelectedFilter4(null);
        console.log('Filtro 4 removido');
      }
    },
    [filter4Options]
  );

  /**
   * Manipula a seleção múltipla do Filter 5
   * Segue padrão do FilterWithMultipleSelection
   */
  const handleFilter5SelectionChange = useCallback(
    (selectedIds: string[]): void => {
      if (selectedIds.length > 0) {
        // Encontra todas as opções selecionadas baseadas nos IDs
        const selectedItems = filter5Options.filter((option) => selectedIds.includes(option.id));
        setSelectedFilter5(selectedItems);

        // Define a primeira opção selecionada se ainda não tiver uma ou se as seleções mudaram
        if (!firstSelectedFilter5 || selectedItems.length === 0) {
          setFirstSelectedFilter5(selectedItems[0] || null);
        } else {
          // Verifica se a primeira opção ainda está nas seleções atuais
          const firstStillSelected = selectedItems.find((item) => item.id === firstSelectedFilter5.id);
          if (!firstStillSelected) {
            // Se a primeira opção foi removida, define a nova primeira
            setFirstSelectedFilter5(selectedItems[0] || null);
          }
        }

        console.log('Filter 5 selecionados:', selectedItems);
        console.log('Primeira opção:', selectedItems[0]);
      } else {
        setSelectedFilter5([]);
        setFirstSelectedFilter5(null);
        console.log('Filtro 5 removido');
      }
    },
    [filter5Options, firstSelectedFilter5]
  );

  /**
   * Abre o drawer de filtros (versão mobile)
   */
  const handleOpenDrawer = useCallback((): void => {
    setIsDrawerOpen(true);
  }, []);

  /**
   * Fecha o drawer de filtros (versão mobile)
   */
  const handleCloseDrawer = useCallback((): void => {
    setIsDrawerOpen(false);
  }, []);

  /**
   * Limpa todos os filtros aplicados
   */
  const handleClearFilters = useCallback((): void => {
    setSelectedCategory(null);
    setSelectedStatuses([]);
    setFirstSelectedStatus(null);
    setSelectedDate(new Date());
    setSelectedFilter4(null);
    setSelectedFilter5([]);
    setFirstSelectedFilter5(null);
    setIsDrawerOpen(false);
    console.log('Todos os filtros foram limpos');
  }, []);

  /**
   * Aplica os filtros selecionados (versão mobile)
   */
  const handleApplyFilters = useCallback((): void => {
    console.log('Aplicando filtros:', {
      category: selectedCategory,
      statuses: selectedStatuses,
      date: selectedDate,
      filter4: selectedFilter4,
      filter5: selectedFilter5,
    });
    setIsDrawerOpen(false);
  }, [selectedCategory, selectedStatuses, selectedDate, selectedFilter4, selectedFilter5]);

  /**
   * Calcula o número total de filtros ativos
   */
  const getActiveFiltersCount = useCallback((): number => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedFilter4) count++;
    if (selectedFilter5.length > 0) count++;
    return count;
  }, [selectedCategory, selectedStatuses, selectedFilter4, selectedFilter5]);

  /**
   * Gera o texto do botão baseado na primeira seleção - Filter 2
   * Sempre mostra a primeira opção escolhida
   */
  const getStatus2ButtonText = useCallback((): string => {
    if (selectedStatuses.length === 0) {
      return 'Filter 2';
    }
    // Sempre retorna o texto da primeira opção selecionada
    return firstSelectedStatus ? firstSelectedStatus.text : 'Filter 2';
  }, [selectedStatuses, firstSelectedStatus]);

  /**
   * Gera o texto do botão baseado na primeira seleção - Filter 5
   * Sempre mostra a primeira opção escolhida
   */
  const getFilter5ButtonText = useCallback((): string => {
    if (selectedFilter5.length === 0) {
      return 'Filter 5';
    }
    // Sempre retorna o texto da primeira opção selecionada
    return firstSelectedFilter5 ? firstSelectedFilter5.text : 'Filter 5';
  }, [selectedFilter5, firstSelectedFilter5]);

  /**
   * Renderiza o conteúdo do botão com Badge para múltiplas seleções - Filter 2
   * Mostra primeira opção selecionada + Badge com quantidade
   * Usa React.useMemo para manter estabilidade
   */
  const renderStatus2ButtonContent = useMemo((): React.ReactNode => {
    const text = getStatus2ButtonText();

    // Se há mais de uma seleção, renderiza com Badge usando classe CSS
    if (selectedStatuses.length > 1) {
      return (
        <div className='zds-filter-button-content'>
          <span>{text}</span>
          <Badge type='status' value={selectedStatuses.length} />
        </div>
      );
    }

    // Para 0 ou 1 seleção, retorna apenas o texto
    return text;
  }, [selectedStatuses, getStatus2ButtonText]);

  /**
   * Renderiza o conteúdo do botão com Badge para múltiplas seleções - Filter 5
   * Mostra primeira opção selecionada + Badge com quantidade
   * Usa React.useMemo para manter estabilidade
   */
  const renderFilter5ButtonContent = useMemo((): React.ReactNode => {
    const text = getFilter5ButtonText();

    // Se há mais de uma seleção, renderiza com Badge usando classe CSS
    if (selectedFilter5.length > 1) {
      return (
        <div className='zds-filter-button-content'>
          <span>{text}</span>
          <Badge type='status' value={selectedFilter5.length} />
        </div>
      );
    }

    // Para 0 ou 1 seleção, retorna apenas o texto
    return text;
  }, [selectedFilter5, getFilter5ButtonText]);

  /**
   * Converte array de objetos para array de IDs - Filter 2
   */
  const getSelectedStatus2Ids = useMemo((): string[] => {
    return selectedStatuses.map((option) => option.id);
  }, [selectedStatuses]);

  /**
   * Converte array de objetos para array de IDs - Filter 5
   */
  const getSelectedFilter5Ids = useMemo((): string[] => {
    return selectedFilter5.map((option) => option.id);
  }, [selectedFilter5]);

  /**
   * Renderiza os filtros para desktop (largura >= 1024px)
   */
  const renderDesktopFilters = useCallback(
    (): React.ReactNode => (
      <>
        {/* Filter 1 - Dropdown simples (seleção única) */}
        <Filter 
          buttonText={selectedCategory ? selectedCategory.text : 'Filter 1'} 
          icon={<ChevronDown16Regular />} 
          variant='outlined' 
          position='left'
        >
          <Dropdown
            className='zds-dropdown--filter'
            items={categoryOptions}
            type='text'
            onSelectionChange={handleCategorySelectionChange}
            applySearch={false}
            id='category-filter-dropdown'
           
          />
        </Filter>

        {/* Filter 2 - Dropdown com múltipla seleção simplificado */}
        <Filter 
          buttonText={renderStatus2ButtonContent} 
          icon={<ChevronDown16Regular />} 
          variant='outlined' 
         position='left'
        >
          <Dropdown
            className='zds-dropdown--filter'
            items={statusOptions}
            type='checkbox'
            onSelectionChange={handleStatusSelectionChange}
            defaultSelectedIds={getSelectedStatus2Ids}
            applySearch={false}
            id='status-filter-dropdown'
            showSubText={false}
         
          />
        </Filter>

        {/* Filter 3 - Calendar */}
        <Filter 
          buttonText={selectedDate ? selectedDate.toLocaleDateString('pt-br') : 'Filter 3'} 
          icon={<Calendar16Regular />} 
          variant='outlined' 
          position='left'
        >
          <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} locale='pt-br' currentDate={new Date()} />
        </Filter>

        {/* Filter 4 - Dropdown simples (seleção única) */}
        <Filter 
          buttonText={selectedFilter4 ? selectedFilter4.text : 'Filter 4'} 
          icon={<ChevronDown16Regular />} 
          variant='outlined' 
          position='right'
        >
          <Dropdown 
            className='zds-dropdown--filter' 
            items={filter4Options} 
            type='text' 
            onSelectionChange={handleFilter4SelectionChange} 
            applySearch={false} 
            id='filter4-dropdown' 
          
          />
        </Filter>

        {/* Filter 5 - Dropdown com múltipla seleção simplificado */}
        <Filter 
          buttonText={renderFilter5ButtonContent} 
          icon={<ChevronDown16Regular />} 
          variant='outlined' 
          position='right'
        >
          <Dropdown
            className='zds-dropdown--filter'
            items={filter5Options}
            type='checkbox'
            onSelectionChange={handleFilter5SelectionChange}
            defaultSelectedIds={getSelectedFilter5Ids}
            applySearch={false}
            id='filter5-dropdown'
            showSubText={false}
          />
        </Filter>
      </>
    ),
    [
      selectedCategory,
      categoryOptions,
      handleCategorySelectionChange,
      renderStatus2ButtonContent,
      statusOptions,
      handleStatusSelectionChange,
      getSelectedStatus2Ids,
      selectedDate,
      handleDateChange,
      selectedFilter4,
      filter4Options,
      handleFilter4SelectionChange,
      renderFilter5ButtonContent,
      filter5Options,
      handleFilter5SelectionChange,
      getSelectedFilter5Ids,
    ]
  );

  /**
   * Renderiza o FilterWithDrawer para mobile (largura < 1024px)
   */
  const renderMobileFilter = useCallback(
    (): React.ReactNode => (
      <>
        <Button variant='outlined' type='button' onClick={handleOpenDrawer} icon={<Filter16Regular />}>
          Filtros
          {getActiveFiltersCount() > 0 && <Badge type='status' value={getActiveFiltersCount()} />}
        </Button>

        <Drawer isOpen={isDrawerOpen} onOpen={handleOpenDrawer} onClose={handleCloseDrawer} pWidth='500px'>
          <div className='zds-filter-drawer'>
            <div className='zds-filter-drawer--content'>
              <div className='zds-filter-drawer--group'>
                <TextField 
                  label='Emissão' 
                  value={selectedCategory ? selectedCategory.text : ''} 
                  placeholder='DD/MM/AAAA' 
                  
                />

                <TextField 
                  label='Vencimento' 
                  value={selectedStatuses.length > 0 ? selectedStatuses.map((s) => s.text).join(', ') : ''} 
                  placeholder='DD/MM/AAAA' 
                 
                />
              </div>

              <div className='zds-filter-drawer-group--calendar'>
                <TextField 
                  label='Filter 3 - Data' 
                  value={selectedDate ? selectedDate.toLocaleDateString('pt-br') : ''} 
                  placeholder='DD/MM/AAAA' 
                 
                />
              </div>

              <div className='zds-filter-drawer--group'>
                <TextField 
                  label='Filter 4' 
                  value={selectedFilter4 ? selectedFilter4.text : ''} 
                  placeholder='Selecione uma opção' 
               
                />

                <TextField 
                  label='Filter 5' 
                  value={selectedFilter5.length > 0 ? selectedFilter5.map((f) => f.text).join(', ') : ''} 
                  placeholder='Múltipla seleção' 
                
                />
              </div>
            </div>

            <div className='zds-filter-drawer--actions'>
              <Button variant='outlined' type='button' onClick={handleClearFilters}>
                Limpar
              </Button>
              <Button variant='filled' type='button' onClick={handleApplyFilters}>
                Filtrar
              </Button>
            </div>
          </div>
        </Drawer>
      </>
    ),
    [
      handleOpenDrawer,
      getActiveFiltersCount,
      isDrawerOpen,
      handleCloseDrawer,
      selectedCategory,
      selectedStatuses,
      selectedDate,
      selectedFilter4,
      selectedFilter5,
      handleClearFilters,
      handleApplyFilters,
    ]
  );

  return (
    <div className='zds-table-header'>
      {/* Seção de pesquisa otimizada */}
      <div className='zds-table-header__search'>
        {showSearch && (
          <Search 
            value={internalSearchValue} 
            onChange={handleInputChange} 
            onKeyDown={handleSearchSubmit} 
            placeholder={searchPlaceholder} 
            aria-label='Pesquisar na tabela' 
          />
        )}
      </div>

      {/* Seção de filtros - responsiva */}
      {showFilters && (
        <div className='zds-table-header__filters'>
          {!isMobile && <span className='zds-table-header__label'>Filtros</span>}
          {isMobile ? renderMobileFilter() : renderDesktopFilters()}
        </div>
      )}
    </div>
  );
};

export default TableHeader;