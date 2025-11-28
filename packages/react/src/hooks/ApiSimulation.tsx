import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Configurações para simulação de API
 */
export interface ApiSimulationConfig {
    /** Items por página */
    itemsPerPage?: number;
    /** Total de items no dataset */
    totalItems?: number;
    /** Delay em ms para simular latência */
    delay?: number;
    /** Taxa de erro (0-1) para simular falhas */
    errorRate?: number;
    /** Função geradora de items customizada */
    itemGenerator?: (index: number, searchQuery?: string) => any;
    /** Debug mode */
    debug?: boolean;
}

/**
 * Estado da simulação de API
 */
export interface ApiSimulationState<T> {
    /** Items carregados */
    items: T[];
    /** Página atual */
    currentPage: number;
    /** Total de páginas */
    totalPages: number;
    /** Status do carregamento */
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    /** Erro atual (se houver) */
    error: string | null;
    /** Query de busca atual */
    searchQuery: string;
    /** Se há próxima página */
    hasNextPage: boolean;
    /** Se é a primeira página */
    isFirstPage: boolean;
}

export interface ApiSimulationActions {
    /** Carregar próxima página */
    loadNextPage: () => Promise<void>;
    /** Realizar nova busca */
    search: (query: string) => Promise<void>;
    /** Reset completo */
    reset: () => void;
    /** Retry da última operação */
    retry: () => Promise<void>;
}

export interface UseApiSimulationReturn<T> extends ApiSimulationState<T> {
    actions: ApiSimulationActions;
}


export function useApiSimulation<T = any>(
    config: ApiSimulationConfig = {}
): UseApiSimulationReturn<T> {
    const {
        itemsPerPage = 20,
        totalItems = 500,
        delay = 800,
        errorRate = 0,
        itemGenerator,
        debug = false
    } = config;

    // Estados
    const [items, setItems] = useState<T[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Refs para evitar re-criações
    const abortControllerRef = useRef<AbortController | null>(null);
    const lastOperationRef = useRef<'load' | 'search'>('load');

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const isFirstPage = currentPage === 0;

    // ✅ Debug logger
    const debugLog = useCallback((message: string, data?: any) => {
        if (debug) {
            console.log(`🔄 [ApiSimulation] ${message}`, data || '');
        }
    }, [debug]);

    // ✅ Gerador padrão de items
    const defaultItemGenerator = useCallback((index: number, search?: string) => {
        const departments = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro', 'Operações'];
        const locations = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre'];
        const itemNumber = index + 1;

        return {
            id: `item-${itemNumber}`,
            text: search
                ? `${search} - Item ${itemNumber}`
                : `Item ${itemNumber}`,
            subText: search
                ? `Resultado para "${search}" - ${departments[itemNumber % departments.length]}`
                : `${departments[itemNumber % departments.length]} • ${locations[itemNumber % locations.length]}`,
            disabled: itemNumber % 25 === 0,
            category: departments[itemNumber % departments.length],
            location: locations[itemNumber % locations.length]
        };
    }, []);

    // ✅ Simular chamada de API
    const simulateApiCall = useCallback(async (
        page: number,
        search: string = ''
    ): Promise<T[]> => {
        debugLog('Iniciando simulação de API', { page, search, delay });

        // Cancelar requisição anterior se existir
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Criar novo controller
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            // Simular delay de rede
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(resolve, delay);
                controller.signal.addEventListener('abort', () => {
                    clearTimeout(timeout);
                    reject(new Error('Request aborted'));
                });
            });

            // Verificar se foi cancelada
            if (controller.signal.aborted) {
                throw new Error('Request was cancelled');
            }

            // Simular erro aleatório
            if (Math.random() < errorRate) {
                throw new Error('Simulated network error');
            }

            // Calcular range de items
            const startIndex = page * itemsPerPage;
            const generator = itemGenerator || defaultItemGenerator;

            // Gerar items da página
            const pageItems = Array.from({ length: itemsPerPage }, (_, index) => {
                const globalIndex = startIndex + index;
                if (globalIndex >= totalItems) return null;
                return generator(globalIndex, search);
            }).filter(Boolean) as T[];

            debugLog('API simulada com sucesso', {
                page,
                itemsReturned: pageItems.length,
                search
            });

            return pageItems;

        } catch (err) {
            if (err instanceof Error && err.message === 'Request was cancelled') {
                debugLog('Request cancelada');
                throw err;
            }

            debugLog('Erro na simulação de API', err);
            throw new Error('Falha ao carregar dados. Tente novamente.');
        }
    }, [delay, errorRate, itemsPerPage, totalItems, itemGenerator, defaultItemGenerator, debugLog]);

    // ✅ Carregar próxima página
    const loadNextPage = useCallback(async () => {
        if (status === 'loading' || !hasNextPage) {
            debugLog('Load next page ignorado', { status, hasNextPage });
            return;
        }

        lastOperationRef.current = 'load';
        setStatus('loading');
        setError(null);

        try {
            const nextPage = currentPage + 1;
            const newItems = await simulateApiCall(nextPage - 1, searchQuery);

            setItems(prev => nextPage === 1 ? newItems : [...prev, ...newItems]);
            setCurrentPage(nextPage);
            setStatus('succeeded');

            debugLog('Página carregada com sucesso', {
                page: nextPage,
                totalItems: items.length + newItems.length
            });
        } catch (err) {
            if (err instanceof Error && err.message === 'Request was cancelled') {
                return; // Ignore cancelled requests
            }

            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            setStatus('failed');
            debugLog('Erro ao carregar página', err);
        }
    }, [status, hasNextPage, currentPage, searchQuery, simulateApiCall, items.length, debugLog]);

    const search = useCallback(async (query: string) => {
        debugLog('Iniciando busca', { query });

        lastOperationRef.current = 'search';
        setSearchQuery(query);
        setCurrentPage(0);
        setItems([]);
        setStatus('loading');
        setError(null);

        try {
            const searchResults = await simulateApiCall(0, query);
            setItems(searchResults);
            setCurrentPage(1);
            setStatus('succeeded');

            debugLog('Busca concluída', {
                query,
                results: searchResults.length
            });
        } catch (err) {
            if (err instanceof Error && err.message === 'Request was cancelled') {
                return;
            }

            setError(err instanceof Error ? err.message : 'Erro na busca');
            setStatus('failed');
            debugLog('Erro na busca', err);
        }
    }, [simulateApiCall, debugLog]);

    const reset = useCallback(() => {
        debugLog('Reset completo da simulação');

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        setItems([]);
        setCurrentPage(0);
        setStatus('idle');
        setError(null);
        setSearchQuery('');
    }, [debugLog]);

    const retry = useCallback(async () => {
        debugLog('Retry da última operação', {
            lastOperation: lastOperationRef.current
        });

        if (lastOperationRef.current === 'search') {
            await search(searchQuery);
        } else {
            await loadNextPage();
        }
    }, [search, searchQuery, loadNextPage, debugLog]);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        // Estado
        items,
        currentPage,
        totalPages,
        status,
        error,
        searchQuery,
        hasNextPage,
        isFirstPage,

        // Ações
        actions: {
            loadNextPage,
            search,
            reset,
            retry
        }
    };
}

export default useApiSimulation;