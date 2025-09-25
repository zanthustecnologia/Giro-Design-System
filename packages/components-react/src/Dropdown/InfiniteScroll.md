# Dropdown com Infinite Scroll

Este documento explica como usar o componente `Dropdown` com a funcionalidade de **infinite scroll** (paginação infinita).

## 🚀 Funcionalidades

- ✅ **IntersectionObserver**: Performance otimizada usando IntersectionObserver em vez de eventos de scroll
- ✅ **Configuração flexível**: Threshold, rootMargin e debug customizáveis  
- ✅ **Proteção contra race conditions**: Evita requisições duplicadas
- ✅ **Status visual**: Indicador de carregamento automático
- ✅ **TypeScript**: Interfaces totalmente tipadas
- ✅ **Compatibilidade**: Funciona com busca e filtros existentes

## 📦 Hook useInfiniteScroll

### Interface

```typescript
interface UseInfiniteScrollProps {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  page: number;
  lastPage: number;
  onLoadMore: () => void;
  threshold?: number;      // 0-1, padrão: 0.1
  rootMargin?: string;     // padrão: '100px'
  enabled?: boolean;       // padrão: true
  debug?: boolean;         // padrão: false
}

interface UseInfiniteScrollReturn {
  observerRef: React.RefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
  hasNextPage: boolean;
  isCompleted: boolean;
  reset: () => void;
}
```

### Exemplo de uso standalone

```typescript
import { useInfiniteScroll } from '@/hooks/InfiniteScroll';

const MyComponent = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  
  const loadMore = async () => {
    setStatus('loading');
    try {
      const newData = await api.loadPage(page + 1);
      setData(prev => [...prev, ...newData]);
      setPage(p => p + 1);
      setStatus('succeeded');
    } catch (error) {
      setStatus('failed');
    }
  };

  const infiniteScroll = useInfiniteScroll({
    status,
    page,
    lastPage: 10,
    onLoadMore: loadMore,
    threshold: 0.2,
    debug: true
  });

  return (
    <div>
      {data.map(item => <div key={item.id}>{item.text}</div>)}
      {infiniteScroll.hasNextPage && (
        <div ref={infiniteScroll.observerRef}>
          {status === 'loading' ? 'Carregando...' : 'Fim da lista'}
        </div>
      )}
    </div>
  );
};
```

## 🎯 Dropdown com Infinite Scroll

### Interface

```typescript
interface DropdownProps {
  // ... outras props existentes
  infiniteScroll?: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    page: number;
    lastPage: number;
    onLoadMore: () => void;
    threshold?: number;
    rootMargin?: string;
    debug?: boolean;
  };
}
```

### Exemplo completo

```typescript
import React, { useState, useCallback } from 'react';
import Dropdown, { DropdownItem } from './Dropdown';

const InfiniteDropdownExample = () => {
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const totalPages = 20;

  // Função para carregar mais dados
  const handleLoadMore = useCallback(async () => {
    if (loadingStatus === 'loading' || currentPage >= totalPages) {
      return;
    }

    setLoadingStatus('loading');

    try {
      const response = await fetch(`/api/items?page=${currentPage + 1}`);
      const newItems = await response.json();
      
      setItems(prev => [...prev, ...newItems]);
      setCurrentPage(prev => prev + 1);
      setLoadingStatus('succeeded');
    } catch (error) {
      console.error('Erro ao carregar mais itens:', error);
      setLoadingStatus('failed');
    }
  }, [currentPage, loadingStatus, totalPages]);

  return (
    <Dropdown
      items={items}
      id="infinite-dropdown"
      type="checkbox"
      applySearch={true}
      placeholder="Buscar itens..."
      onSelectionChange={setSelectedIds}
      showSubText={true}
      infiniteScroll={{
        status: loadingStatus,
        page: currentPage,
        lastPage: totalPages,
        onLoadMore: handleLoadMore,
        threshold: 0.1,
        rootMargin: '50px',
        debug: process.env.NODE_ENV === 'development'
      }}
    />
  );
};
```

## ⚙️ Configurações

### threshold
- **Tipo**: `number` (0-1)
- **Padrão**: `0.1` 
- **Descrição**: Porcentagem do elemento que deve estar visível para disparar o carregamento
- **Exemplo**: `0.5` = disparar quando 50% do elemento estiver visível

### rootMargin  
- **Tipo**: `string`
- **Padrão**: `'100px'`
- **Descrição**: Margem ao redor da viewport para disparar antecipadamente
- **Exemplo**: `'200px 0px'` = disparar 200px antes do elemento aparecer

### debug
- **Tipo**: `boolean`
- **Padrão**: `false`
- **Descrição**: Habilita logs detalhados no console para debug
- **Logs incluem**: Estado do hook, triggers, carregamentos

## 🔧 Estados e Controles

### Status de Loading
```typescript
type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
```

- **idle**: Estado inicial ou após carregamento
- **loading**: Carregando dados  
- **succeeded**: Carregamento bem-sucedido
- **failed**: Erro no carregamento

### Controles Disponíveis
```typescript
const {
  observerRef,     // Ref para elemento trigger
  isIntersecting,  // Se elemento está visível
  hasNextPage,     // Se há próxima página
  isCompleted,     // Se todas as páginas foram carregadas
  reset           // Função para resetar o hook
} = useInfiniteScroll(config);
```

## 🎨 Customização CSS

### Classes disponíveis

```scss
.zds-dropdown__infinite-scroll-trigger {
  // Container do elemento trigger
}

.zds-dropdown__loading-indicator {
  // Indicador visual de carregamento
}
```

### Exemplo de customização

```scss
.zds-dropdown__loading-indicator {
  height: 40px;
  font-size: 14px;
  color: var(--color-primary);
  
  span {
    opacity: 1;
    font-weight: 500;
  }
}
```

## 🚨 Boas Práticas

### 1. **Performance**
```typescript
// ✅ Use useMemo para configs estáticas
const infiniteConfig = useMemo(() => ({
  status: loadingStatus,
  page: currentPage,
  lastPage: totalPages,
  onLoadMore: handleLoadMore,
  threshold: 0.1
}), [loadingStatus, currentPage, totalPages, handleLoadMore]);
```

### 2. **Error Handling**
```typescript
const handleLoadMore = useCallback(async () => {
  setLoadingStatus('loading');
  
  try {
    // ... carregamento
    setLoadingStatus('succeeded');
  } catch (error) {
    setLoadingStatus('failed');
    // Opcional: retry automático
    setTimeout(() => setLoadingStatus('idle'), 2000);
  }
}, []);
```

### 3. **Debounce para Busca**
```typescript
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback((query: string) => {
  // Reset pagination ao buscar
  setCurrentPage(1);
  setItems([]);
  searchItems(query);
}, 300);
```

### 4. **Prevenção de Memory Leaks**
```typescript
useEffect(() => {
  return () => {
    // Cleanup se necessário
    infiniteScrollHook?.reset();
  };
}, []);
```

## 🐛 Debug e Troubleshooting

### Habilitando Debug
```typescript
infiniteScroll={{
  // ... outras configs
  debug: true
}}
```

### Logs de Debug
```
🔄 [InfiniteScroll] Element intersecting: true
🔄 [InfiniteScroll] Can load more check: {enabled: true, ...}
🔄 [InfiniteScroll] Triggering load more for next page
🔄 [InfiniteScroll] Loading flag reset {status: 'succeeded'}
```

### Problemas Comuns

1. **Carregamento não dispara**
   - Verifique se `enabled: true`
   - Confirme que `page < lastPage`
   - Check threshold e rootMargin

2. **Múltiplos carregamentos**
   - Hook já tem proteção built-in
   - Se persistir, verifique race conditions no callback

3. **Performance ruim**  
   - Use `useMemo` para configs
   - Considere virtualização para listas muito grandes

## 📝 Exemplos no Storybook

Veja os exemplos interativos em:
- `Components/Dropdown/Infinite Scroll`
- Stories: `InfiniteScrollDemo` e `SimpleExample`

## 🔗 APIs Relacionadas

- [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React useRef](https://react.dev/reference/react/useRef) 
- [React useCallback](https://react.dev/reference/react/useCallback)