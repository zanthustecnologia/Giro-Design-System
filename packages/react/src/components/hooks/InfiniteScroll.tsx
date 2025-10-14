import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Props para o hook useInfiniteScroll
 */
interface UseInfiniteScrollProps {
  /** Status atual do carregamento */
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  /** Página atual */
  page: number;
  /** Última página disponível */
  lastPage: number;
  /** Callback para carregar próxima página */
  onLoadMore: () => void;
  /** Threshold para IntersectionObserver (0-1) */
  threshold?: number;
  /** Margem raiz para IntersectionObserver */
  rootMargin?: string;
  /** Habilita/desabilita o hook */
  enabled?: boolean;
  /** Debug mode - logs no console */
  debug?: boolean;
}

/**
 * Retorno do hook useInfiniteScroll
 */
interface UseInfiniteScrollReturn {
  /** Ref para o elemento observador */
  observerRef: React.RefObject<HTMLDivElement | null>;
  /** Se o elemento está visível */
  isIntersecting: boolean;
  /** Se há próxima página */
  hasNextPage: boolean;
  /** Se todas as páginas foram carregadas */
  isCompleted: boolean;
  /** Função para reset manual */
  reset: () => void;
}

/**
 * Hook otimizado para scroll infinito usando IntersectionObserver
 */
export function useInfiniteScroll({
  status,
  page,
  lastPage,
  onLoadMore,
  threshold = 0.1,
  rootMargin = '100px',
  enabled = true,
  debug = false
}: UseInfiniteScrollProps): UseInfiniteScrollReturn {
  const observerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // Refs para controle de estado
  const loadingRef = useRef(false);
  const lastTriggeredPageRef = useRef(0);
  const onLoadMoreRef = useRef(onLoadMore);

  // Manter referência atualizada do callback
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  // ✅ NOVO: Debug logger
  const debugLog = useCallback((message: string, data?: any) => {
    if (debug) {
      console.log(`🔄 [InfiniteScroll] ${message}`, data || '');
    }
  }, [debug]);

  // ✅ MELHORADO: Callback do IntersectionObserver com mais controles
  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    const isVisible = target.isIntersecting;
    
    setIsIntersecting(isVisible);
    debugLog('Element intersecting:', isVisible);

    // Verificar se pode carregar mais
    const canLoadMore = enabled &&
                       isVisible && 
                       status !== 'loading' && 
                       !loadingRef.current &&
                       page < lastPage &&
                       page !== lastTriggeredPageRef.current;

    debugLog('Can load more check:', {
      enabled,
      isVisible,
      status,
      isLoading: loadingRef.current,
      page,
      lastPage,
      lastTriggered: lastTriggeredPageRef.current,
      canLoad: canLoadMore
    });

    if (canLoadMore) {
      debugLog('Triggering load more for next page');
      loadingRef.current = true;
      lastTriggeredPageRef.current = page;
      onLoadMoreRef.current();
    }
  }, [enabled, status, page, lastPage, debugLog]);

  // ✅ MELHORADO: Observer com configurações personalizáveis
  useEffect(() => {
    if (!enabled) {
      debugLog('Hook disabled, skipping observer setup');
      return;
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin,
      threshold,
    });

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
      debugLog('IntersectionObserver attached', { rootMargin, threshold });
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
        debugLog('IntersectionObserver detached');
      }
    };
  }, [handleIntersect, rootMargin, threshold, enabled, debugLog]);

  // ✅ NOVO: Reset do loading flag quando status muda
  useEffect(() => {
    if (status !== 'loading') {
      loadingRef.current = false;
      debugLog('Loading flag reset', { status });
    }
  }, [status, debugLog]);

  // ✅ NOVO: Função de reset manual
  const reset = useCallback(() => {
    loadingRef.current = false;
    lastTriggeredPageRef.current = 0;
    setIsIntersecting(false);
    debugLog('Hook manually reset');
  }, [debugLog]);

  // Estados calculados
  const hasNextPage = page < lastPage;
  const isCompleted = page >= lastPage;

  return {
    observerRef,
    isIntersecting,
    hasNextPage,
    isCompleted,
    reset
  };
}