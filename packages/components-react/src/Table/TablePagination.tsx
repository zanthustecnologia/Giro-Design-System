import React, { useId, useState, useMemo, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { ChevronLeft16Regular, ChevronRight16Regular } from '@fluentui/react-icons';
import './styles.scss';

// Tipos e interfaces
interface ValidationError {
  type: 'INVALID_CURRENT_PAGE' | 'MISSING_TOTAL_ITEMS' | 'INVALID_TOTAL_ITEMS' | 'MISSING_ON_PAGE_CHANGE' | 'INVALID_ITEMS_PER_PAGE' | 'INVALID_PAGE_RANGE';
  message: string;
  value: any;
}

interface ValidationProps {
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  startItem: number;
  endItem: number;
}

interface TablePaginationProps {
  /** Array de dados completos (para controle interno) */
  data?: any[];
  /** Número inicial de itens por página */
  initialItemsPerPage?: number;
  /** Opções disponíveis para itens por página */
  perPageOptions?: number[];
  /** Callback executado quando a página muda */
  onPageChange?: (page: number) => void;
  /** Callback executado quando os dados paginados mudam (controle interno) */
  onDataChange?: (data: any[]) => void;
  /** Classes CSS adicionais */
  className?: string;
  /** Desabilita a paginação */
  disabled?: boolean;
  /** Página atual (controle externo) - quando definido ativa o controle externo */
  currentPage?: number;
  /** Total de itens (controle externo) - obrigatório quando currentPage é definido */
  totalItems?: number;
  /** Itens por página (controle externo) */
  itemsPerPage?: number;
  /** Callback para mudança de itens por página (controle externo) - recebe (newItemsPerPage, newPage) */
  onPerPageChange?: (newItemsPerPage: number, newPage: number) => void;
}

interface ValidationErrorComponentProps {
  error: ValidationError;
}

/**
 * Valida se as props obrigatórias para controle externo estão presentes e válidas
 * @param props - Props do componente
 * @returns Retorna objeto de erro se inválido, null se válido
 */
const validateExternalControlProps = (props: ValidationProps): ValidationError | null => {
  const { currentPage: externalCurrentPage, totalItems: externalTotalItems, onPageChange, itemsPerPage: externalItemsPerPage } = props;

  // Se currentPage está definido, assume controle externo
  if (externalCurrentPage !== undefined) {
    // Validação de currentPage
    if (typeof externalCurrentPage !== 'number' || externalCurrentPage < 1) {
      return {
        type: 'INVALID_CURRENT_PAGE',
        message: 'currentPage deve ser um número maior que 0 para controle externo',
        value: externalCurrentPage,
      };
    }

    // Validação de totalItems (obrigatório quando currentPage está definido)
    if (externalTotalItems === undefined) {
      return {
        type: 'MISSING_TOTAL_ITEMS',
        message: 'totalItems é obrigatório quando currentPage está definido',
        value: externalTotalItems,
      };
    }

    if (typeof externalTotalItems !== 'number' || externalTotalItems < 0) {
      return {
        type: 'INVALID_TOTAL_ITEMS',
        message: 'totalItems deve ser um número maior ou igual a 0',
        value: externalTotalItems,
      };
    }

    // Validação de onPageChange (obrigatório para controle externo)
    if (!onPageChange || typeof onPageChange !== 'function') {
      return {
        type: 'MISSING_ON_PAGE_CHANGE',
        message: 'onPageChange é obrigatório e deve ser uma função para controle externo',
        value: onPageChange,
      };
    }

    // Validação de itemsPerPage (se fornecido)
    if (externalItemsPerPage !== undefined) {
      if (typeof externalItemsPerPage !== 'number' || externalItemsPerPage < 1) {
        return {
          type: 'INVALID_ITEMS_PER_PAGE',
          message: 'itemsPerPage deve ser um número maior que 0',
          value: externalItemsPerPage,
        };
      }
    }

    // Validação de lógica: currentPage não pode ser maior que o total de páginas
    const itemsPerPageValue = externalItemsPerPage || 10;
    const totalPages = Math.ceil(externalTotalItems / itemsPerPageValue);

    if (totalPages > 0 && externalCurrentPage > totalPages) {
      return {
        type: 'INVALID_PAGE_RANGE',
        message: `currentPage (${externalCurrentPage}) não pode ser maior que o total de páginas (${totalPages})`,
        value: { currentPage: externalCurrentPage, totalPages },
      };
    }
  }

  return null; // Todas as validações passaram
};

/**
 * Componente de erro para exibir problemas de validação
 * @param error - Objeto de erro da validação
 * @returns Componente de erro
 */
const ValidationErrorComponent: React.FC<ValidationErrorComponentProps> = ({ error }) => {
  console.error(`TablePagination: ${error.message}`, error.value);

  return (
    <div className='zds-table__pagination-error' data-testid='pagination-validation-error'>
      <span>⚠️ Erro de Configuração: {error.message}</span>
      {process.env.NODE_ENV === 'development' && (
        <details style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          <summary>Detalhes do erro (desenvolvimento)</summary>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </details>
      )}
    </div>
  );
};

const TablePagination: React.FC<TablePaginationProps> = ({
  data = [],
  initialItemsPerPage = 10,
  perPageOptions = [10, 25, 50, 100],
  onPageChange,
  onDataChange,
  className,
  disabled = false,
  currentPage: externalCurrentPage,
  totalItems: externalTotalItems,
  itemsPerPage: externalItemsPerPage,
  onPerPageChange: externalOnPerPageChange,
}) => {
  // Validação das props antes de qualquer processamento
  const validationError = validateExternalControlProps({
    currentPage: externalCurrentPage,
    totalItems: externalTotalItems,
    onPageChange,
    itemsPerPage: externalItemsPerPage,
  });

  // Se houver erro de validação, retorna componente de erro
  if (validationError) {
    return <ValidationErrorComponent error={validationError} />;
  }

  const generatedId = useId();
  const previousExternalItemsPerPage = useRef<number | undefined>(externalItemsPerPage);
  const isInitialMount = useRef<boolean>(true);
  const lastValidPage = useRef<number>(1);
  const isMountedRef = useRef<boolean>(true);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup de memory leaks
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Estados internos para controle da paginação
  const [internalCurrentPage, setInternalCurrentPage] = useState<number>(1);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState<number>(initialItemsPerPage);

  // Determina se está usando controle externo ou interno
  const isExternalControl = externalCurrentPage !== undefined && externalTotalItems !== undefined;

  // Validação adicional para perPageOptions - memoizada
  const validatedPerPageOptions = useMemo<number[]>(() => {
    if (!Array.isArray(perPageOptions) || perPageOptions.length === 0) {
      console.error('TablePagination: perPageOptions deve ser um array não vazio');
      return [10, 25, 50, 100]; // fallback
    }
    return perPageOptions;
  }, [perPageOptions]);

  // Valores finais baseados no tipo de controle - memoizados
  const paginationState = useMemo<PaginationState>(() => {
    const currentItemsPerPage = isExternalControl ? externalItemsPerPage || initialItemsPerPage : internalItemsPerPage;
    const currentPage = isExternalControl ? Math.max(1, externalCurrentPage || 1) : internalCurrentPage;
    const totalItems = isExternalControl ? Math.max(0, externalTotalItems || 0) : data.length;

    return {
      currentPage,
      itemsPerPage: currentItemsPerPage,
      totalItems,
      totalPages: Math.ceil(totalItems / currentItemsPerPage),
      startItem: totalItems > 0 ? (currentPage - 1) * currentItemsPerPage + 1 : 0,
      endItem: Math.min(currentPage * currentItemsPerPage, totalItems),
    };
  }, [isExternalControl, externalCurrentPage, externalItemsPerPage, externalTotalItems, internalCurrentPage, internalItemsPerPage, data.length, initialItemsPerPage]);

  // Classes com clsx - memoizadas
  const classes = useMemo(
    () => ({
      container: clsx('zds-table__pagination-container', className, {
        'zds-table__pagination-container--disabled': disabled,
      }),
      select: clsx('zds-table__pagination-select', {
        'zds-table__pagination-select--disabled': disabled,
      }),
      prevButton: clsx('zds-pagination-btn', {
        'zds-pagination-btn--disabled': paginationState.currentPage <= 1 || disabled,
      }),
      nextButton: clsx('zds-pagination-btn', {
        'zds-pagination-btn--disabled': paginationState.currentPage >= paginationState.totalPages || disabled,
      }),
    }),
    [className, disabled, paginationState.currentPage, paginationState.totalPages]
  );

  // Dados paginados (apenas para controle interno) - memoizados
  const paginatedData = useMemo<any[] | null>(() => {
    if (isExternalControl) return null;

    const startIndex = (paginationState.currentPage - 1) * paginationState.itemsPerPage;
    const endIndex = startIndex + paginationState.itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, paginationState.currentPage, paginationState.itemsPerPage, isExternalControl]);

  /**
   * Manipula mudança de página de forma segura com debounce
   * @param newPage - Nova página
   */
  const handlePageChange = useCallback(
    (newPage: number): void => {
      if (!isMountedRef.current || disabled || newPage < 1 || newPage > paginationState.totalPages) return;

      const validPage = Math.max(1, Math.min(newPage, paginationState.totalPages));

      // Debounce para evitar múltiplas chamadas
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        if (isExternalControl) {
          // Previne loops infinitos verificando se a página realmente mudou
          if (validPage !== paginationState.currentPage && validPage !== lastValidPage.current) {
            lastValidPage.current = validPage;
            onPageChange?.(validPage);
          }
        } else {
          setInternalCurrentPage(validPage);
          onPageChange?.(validPage);
        }
      }, 50);
    },
    [disabled, paginationState.totalPages, paginationState.currentPage, isExternalControl, onPageChange]
  );

  /**
   * Manipula mudança de itens por página com debounce
   * @param newItemsPerPage - Novo número de itens por página
   */
  const handlePerPageChange = useCallback(
    (newItemsPerPage: number): void => {
      if (!isMountedRef.current || disabled || !validatedPerPageOptions.includes(newItemsPerPage)) return;

      // Debounce para evitar múltiplas chamadas
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        if (isExternalControl) {
          externalOnPerPageChange?.(newItemsPerPage, 1);
        } else {
          setInternalItemsPerPage(newItemsPerPage);
          setInternalCurrentPage(1);
          onPageChange?.(1);
        }
      }, 100);
    },
    [disabled, validatedPerPageOptions, isExternalControl, externalOnPerPageChange, onPageChange]
  );

  // Efeito para atualizar dados paginados no controle interno
  useEffect(() => {
    if (!isExternalControl && onDataChange && paginatedData && isMountedRef.current) {
      onDataChange(paginatedData);
    }
  }, [paginatedData, isExternalControl, onDataChange]);

  // Efeito otimizado para sincronização sem race conditions
  useEffect(() => {
    if (!isMountedRef.current) return;

    if (isExternalControl && externalItemsPerPage !== undefined) {
      // Verifica se realmente houve mudança para evitar loops
      if (previousExternalItemsPerPage.current !== externalItemsPerPage) {
        previousExternalItemsPerPage.current = externalItemsPerPage;

        // Calcula nova página total com o novo itemsPerPage
        const newTotalPages = Math.ceil(paginationState.totalItems / externalItemsPerPage);

        // Se a página atual ficou inválida, ajusta para a última página válida
        if (paginationState.currentPage > newTotalPages && newTotalPages > 0) {
          lastValidPage.current = newTotalPages;
          onPageChange?.(newTotalPages);
        }
      }
    }
  }, [externalItemsPerPage, paginationState.totalItems, paginationState.currentPage, isExternalControl, onPageChange]);

  // Validação para página atual quando totalItems muda
  useEffect(() => {
    if (!isMountedRef.current) return;

    // Ignora a primeira renderização
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isExternalControl && paginationState.totalPages > 0 && paginationState.currentPage > paginationState.totalPages) {
      // Verifica se não foi o último ajuste feito para evitar loops
      if (lastValidPage.current !== paginationState.totalPages) {
        lastValidPage.current = paginationState.totalPages;
        onPageChange?.(paginationState.totalPages);
      }
    }
  }, [paginationState.totalPages, paginationState.currentPage, isExternalControl, onPageChange]);

  return (
    <div className={classes.container}>
      <div className={classes.select}>
        <label htmlFor={`items-per-page-${generatedId}`}>Itens por página</label>
        <select
          id={`items-per-page-${generatedId}`}
          value={paginationState.itemsPerPage}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handlePerPageChange(Number(e.target.value))}
          disabled={disabled}
          aria-describedby={`pagination-info-${generatedId}`}
        >
          {validatedPerPageOptions.map((option: number) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className='zds-table__pagination-info' id={`pagination-info-${generatedId}`}>
        <span>{paginationState.totalItems > 0 ? `${paginationState.startItem}–${paginationState.endItem} de ${paginationState.totalItems}` : '0 itens'}</span>

        <div className='zds-table__pagination-controls'>
          <button
            className={classes.prevButton}
            onClick={() => handlePageChange(paginationState.currentPage - 1)}
            disabled={paginationState.currentPage <= 1 || disabled}
            aria-label='Página anterior'
            type='button'
          >
            <ChevronLeft16Regular />
          </button>
          <button
            className={classes.nextButton}
            onClick={() => handlePageChange(paginationState.currentPage + 1)}
            disabled={paginationState.currentPage >= paginationState.totalPages || disabled}
            aria-label='Próxima página'
            type='button'
          >
            <ChevronRight16Regular />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TablePagination);
