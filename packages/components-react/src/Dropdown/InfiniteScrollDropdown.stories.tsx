import React, { useState, useCallback, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownItem } from './Dropdown';

// Mock de dados para simular uma API
const generateMockItems = (page: number, pageSize: number = 20): DropdownItem[] => {
  const startIndex = (page - 1) * pageSize;
  return Array.from({ length: pageSize }, (_, i) => ({
    id: `item-${startIndex + i + 1}`,
    text: `Item ${startIndex + i + 1}`,
    subText: `Descrição do item ${startIndex + i + 1}`
  }));
};

const meta = {
  title: 'Components/Dropdown/Infinite Scroll',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dropdown com paginação infinita usando IntersectionObserver para performance otimizada.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component wrapper para demonstrar o infinite scroll
const InfiniteScrollDropdownDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [allItems, setAllItems] = useState<DropdownItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Configurações da paginação
  const pageSize = 15;
  const totalPages = 10; // Simular 10 páginas de dados

  // Carregar dados iniciais
  React.useEffect(() => {
    if (allItems.length === 0) {
      const initialItems = generateMockItems(1, pageSize);
      setAllItems(initialItems);
      setCurrentPage(1);
    }
  }, [allItems.length, pageSize]);

  // Função para carregar mais dados
  const handleLoadMore = useCallback(async () => {
    if (loadingStatus === 'loading' || currentPage >= totalPages) {
      return;
    }

    console.log(`🔄 Loading page ${currentPage + 1}...`);
    setLoadingStatus('loading');

    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const nextPage = currentPage + 1;
      const newItems = generateMockItems(nextPage, pageSize);
      
      setAllItems(prev => [...prev, ...newItems]);
      setCurrentPage(nextPage);
      setLoadingStatus('succeeded');
      
      console.log(`✅ Loaded page ${nextPage} with ${newItems.length} items`);
    } catch (error) {
      console.error('Error loading more items:', error);
      setLoadingStatus('failed');
    }
  }, [currentPage, loadingStatus, totalPages, pageSize]);

  // Configuração do infinite scroll
  const infiniteScrollConfig = useMemo(() => ({
    status: loadingStatus,
    page: currentPage,
    lastPage: totalPages,
    onLoadMore: handleLoadMore,
    threshold: 0.1,
    rootMargin: '50px',
    debug: true // Habilita logs de debug
  }), [loadingStatus, currentPage, totalPages, handleLoadMore]);

  const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
    setSelectedIds(newSelectedIds);
    console.log('Selected items:', newSelectedIds);
  }, []);

  return (
    <div style={{ height: '400px', padding: '20px' }}>
      <h3>Dropdown com Infinite Scroll ({allItems.length} itens carregados)</h3>
      <p>
        Página atual: {currentPage}/{totalPages} | 
        Status: {loadingStatus} |
        Selecionados: {selectedIds.length}
      </p>
      
      <div style={{ position: 'relative', width: '300px' }}>
        <Dropdown
          items={allItems}
          id="infinite-scroll-dropdown"
          type="checkbox"
          applySearch={true}
          placeholder="Buscar itens..."
          onSelectionChange={handleSelectionChange}
          showSubText={true}
          infiniteScroll={infiniteScrollConfig}
        />
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <details>
          <summary>Debug Info</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
            {JSON.stringify({
              totalItems: allItems.length,
              currentPage,
              totalPages,
              loadingStatus,
              selectedCount: selectedIds.length,
              hasNextPage: currentPage < totalPages
            }, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export const InfiniteScrollDemo: Story = {
  args: {} as any,
  render: () => <InfiniteScrollDropdownDemo />,
  parameters: {
    docs: {
      description: {
        story: `
### Dropdown com Infinite Scroll

Este exemplo demonstra um dropdown com paginação infinita:

**Recursos:**
- ✅ Carregamento automático quando o usuário chega próximo ao final
- ✅ IntersectionObserver para performance otimizada  
- ✅ Status de loading visual
- ✅ Configuração flexível (threshold, rootMargin)
- ✅ Debug mode com logs detalhados
- ✅ Prevenção de race conditions
- ✅ Suporte a busca com dados paginados

**Como usar:**
1. Configure o objeto \`infiniteScroll\` com:
   - \`status\`: Estado atual do carregamento
   - \`page\`: Página atual
   - \`lastPage\`: Última página disponível
   - \`onLoadMore\`: Callback para carregar mais dados
2. Opcional: customize \`threshold\`, \`rootMargin\` e \`debug\`

**Observações:**
- O hook usa IntersectionObserver em vez de scroll events para melhor performance
- Inclui proteção contra race conditions 
- Suporte completo a TypeScript com interfaces tipadas
        `
      }
    }
  }
};

// Exemplo mais simples
const SimpleInfiniteScrollDemo: React.FC = () => {
  const [items, setItems] = useState<DropdownItem[]>(generateMockItems(1, 10));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<'idle' | 'loading'>('idle');

  const loadMore = useCallback(async () => {
    if (loading === 'loading' || page >= 5) return;
    
    setLoading('loading');
    await new Promise(r => setTimeout(r, 800)); // Simular API
    
    const newItems = generateMockItems(page + 1, 10);
    setItems(prev => [...prev, ...newItems]);
    setPage(p => p + 1);
    setLoading('idle');
  }, [loading, page]);

  return (
    <div style={{ height: '300px', width: '250px' }}>
      <Dropdown
        items={items}
        id="simple-infinite"
        type="text" 
        onSelectionChange={(ids) => console.log('Selected:', ids)}
        infiniteScroll={{
          status: loading,
          page,
          lastPage: 5,
          onLoadMore: loadMore
        }}
      />
    </div>
  );
};

export const SimpleExample: Story = {
  args: {} as any,
  render: () => <SimpleInfiniteScrollDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Exemplo simplificado com configuração mínima para infinite scroll.'
      }
    }
  }
};