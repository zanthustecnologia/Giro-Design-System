import type { Meta, StoryFn } from '@storybook/react';
import { useState, useEffect } from 'react';
import MenuRadix from './MenuRadix';
import Button from '../Button';
import { MenuItemProps } from './MenuRadix.types';

const meta: Meta = {
  component: MenuRadix,
  title: 'Components/MenuRadix',
  parameters: {
    docs: {
      description: {
        component: 'Menu dropdown com suporte a busca local e via API.',
      },
    },
  },
};
export default meta;

// ✅ Mock de dados
const mockItems = [
  { id: '1', text: 'Item 1', subText: 'teste', value: '1' },
  { id: '2', text: 'Item 2', subText: 'teste', value: '2' },
  { id: '3', text: 'Item 3', value: '3' },
  { id: '4', text: 'Item 4', value: '4' },
  { id: '5', text: 'Item 5', value: '5' },
  {
    id: '6',
    text: 'Item 6',
    value: '6',
    children: [{ id: '6-1', text: 'Sub Item 1', value: '6-1' }],
  },
  {
    id: '7',
    text: 'Item 7',
    value: '7',
  },
];

// ✅ Mock de produtos para busca via API
const mockProducts = [
  { id: 1, name: 'Notebook Dell Inspiron', category: 'Eletrônicos', price: 3500 },
  { id: 2, name: 'Notebook Lenovo ThinkPad', category: 'Eletrônicos', price: 4200 },
  { id: 3, name: 'MacBook Pro 14"', category: 'Eletrônicos', price: 12000 },
  { id: 4, name: 'Mouse Logitech MX Master', category: 'Periféricos', price: 450 },
  { id: 5, name: 'Teclado Mecânico Keychron', category: 'Periféricos', price: 650 },
  { id: 6, name: 'Monitor LG UltraWide', category: 'Monitores', price: 2500 },
  { id: 7, name: 'Webcam Logitech C920', category: 'Periféricos', price: 380 },
  { id: 8, name: 'Headset HyperX Cloud', category: 'Áudio', price: 550 },
  { id: 9, name: 'SSD Samsung 1TB', category: 'Armazenamento', price: 600 },
  { id: 10, name: 'HD Externo Seagate 2TB', category: 'Armazenamento', price: 400 },
  { id: 11, name: 'Impressora HP LaserJet', category: 'Impressoras', price: 1800 },
  { id: 12, name: 'Scanner Epson', category: 'Scanners', price: 900 },
  { id: 13, name: 'Tablet Samsung Galaxy Tab', category: 'Tablets', price: 2200 },
  { id: 14, name: 'iPad Pro 12.9"', category: 'Tablets', price: 9500 },
  { id: 15, name: 'Câmera Canon EOS', category: 'Câmeras', price: 5500 },
];

// ===================================================
// 📖 Story 1: Busca Local (Padrão)
// ===================================================
export const Default: StoryFn = () => (
  <MenuRadix
    items={mockItems}
    onItemSelect={(e) => console.log('Item selecionado:', e)}
    search={true}
  >
    <Button>Open Menu</Button>
  </MenuRadix>
);

Default.parameters = {
  docs: {
    description: {
      story: 'Menu com busca local. Os items são filtrados no frontend conforme você digita.',
    },
  },
};

// ===================================================
// 🔍 Story 2: Busca via API (Mock Simulado)
// ===================================================
export const ApiSearch: StoryFn = () => {
  const [items, setItems] = useState<MenuItemProps[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ✅ Carregar items iniciais ao montar
  useEffect(() => {
    loadInitialItems();
  }, []);

  // ✅ Simular carregamento inicial
  const loadInitialItems = async () => {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Retorna primeiros 10 items
    const initialItems = mockProducts.slice(0, 10).map((product) => ({
      id: String(product.id),
      text: product.name,
      subText: `${product.category} - R$ ${product.price}`,
      value: String(product.id),
    }));

    setItems(initialItems);
  };

  // ✅ Função de busca via API (simulada)
  const handleApiSearch = async (searchTerm: string) => {
    console.log('🔍 Buscando:', searchTerm || '(busca vazia)');
    setIsSearching(true);

    // Simula delay de API (300-800ms)
    await new Promise((resolve) => 
      setTimeout(resolve, Math.random() * 500 + 300)
    );

    try {
      if (searchTerm === '') {
        // Busca vazia = recarregar items iniciais
        await loadInitialItems();
      } else {
        // Buscar produtos que correspondem ao termo
        const normalized = searchTerm.toLowerCase();
        const filtered = mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(normalized) ||
            product.category.toLowerCase().includes(normalized)
        );

        console.log(`✅ Encontrados: ${filtered.length} items`);

        const searchResults = filtered.map((product) => ({
          id: String(product.id),
          text: product.name,
          subText: `${product.category} - R$ ${product.price}`,
          value: String(product.id),
        }));

        setItems(searchResults);
      }
    } catch (error) {
      console.error('❌ Erro na busca:', error);
      setItems([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
        <strong>💡 Como usar:</strong>
        <ol style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
          <li>Abra o menu</li>
          <li>Digite no campo de busca (ex: "notebook", "mouse", "logitech")</li>
          <li>Pressione <kbd>Enter</kbd> para buscar</li>
          <li>Aguarde o loading (300-800ms simulado)</li>
          <li>Veja os resultados filtrados</li>
        </ol>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
          🔍 Experimente buscar: "notebook", "logitech", "samsung", "eletrônicos"
        </p>
      </div>

      <MenuRadix
        items={items}
        search
        enableApiSearch // ✅ Ativar busca via API
        onApiSearch={handleApiSearch}
        isSearching={isSearching}
        minSearchLength={2}
        emptySearchMessage="Nenhum produto encontrado. Tente outro termo."
        onItemSelect={(item) => console.log('✅ Produto selecionado:', item)}
      >
        <Button>Produtos ({items.length})</Button>
      </MenuRadix>
    </div>
  );
};

ApiSearch.parameters = {
  docs: {
    description: {
      story: `
**Busca via API Simulada**

Esta story simula uma busca em API real com as seguintes características:

- ✅ Carregamento inicial (primeiros 10 items)
- ✅ Debounce de 300ms (evita chamadas excessivas)
- ✅ Busca ao pressionar Enter
- ✅ Loading state durante busca
- ✅ Recarrega items ao limpar busca
- ✅ Mínimo de 2 caracteres para buscar
- ✅ Delay simulado (300-800ms) para simular latência de rede

**Abra o Console** para ver os logs das buscas!
      `,
    },
  },
};

// ===================================================
// 🌐 Story 3: Busca via API Real (Fetch)
// ===================================================
export const ApiSearchReal: StoryFn = () => {
  const [items, setItems] = useState<MenuItemProps[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Carregar users iniciais
  useEffect(() => {
    loadInitialUsers();
  }, []);

  const loadInitialUsers = async () => {
    try {
      setIsSearching(true);
      setError(null);

      // API pública gratuita: JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const userItems = users.map((user: any) => ({
        id: String(user.id),
        text: user.name,
        subText: user.email,
        value: String(user.id),
      }));

      setItems(userItems);
      console.log('✅ Carregados:', userItems.length, 'usuários');
    } catch (err: any) {
      console.error('❌ Erro ao carregar:', err);
      setError(err.message);
      setItems([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleApiSearch = async (searchTerm: string) => {
    console.log('🔍 Buscando usuário:', searchTerm || '(todos)');
    setIsSearching(true);
    setError(null);

    try {
      if (searchTerm === '') {
        // Recarregar todos
        await loadInitialUsers();
      } else {
        // Buscar por nome
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const normalized = searchTerm.toLowerCase();
        const filtered = users.filter(
          (user: any) =>
            user.name.toLowerCase().includes(normalized) ||
            user.email.toLowerCase().includes(normalized) ||
            user.username.toLowerCase().includes(normalized)
        );

        console.log(`✅ Encontrados: ${filtered.length} usuários`);

        const userItems = filtered.map((user: any) => ({
          id: String(user.id),
          text: user.name,
          subText: user.email,
          value: String(user.id),
        }));

        setItems(userItems);
      }
    } catch (err: any) {
      console.error('❌ Erro na busca:', err);
      setError(err.message);
      setItems([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', background: '#e3f2fd', borderRadius: '8px' }}>
        <strong>🌐 API Real:</strong> JSONPlaceholder
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
          Esta story usa a API <code>jsonplaceholder.typicode.com</code> para buscar usuários reais.
          <br />
          Experimente buscar: "Leanne", "Ervin", "bret", "sincere"
        </p>
      </div>

      {error && (
        <div style={{ padding: '12px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '16px' }}>
          ❌ Erro: {error}
        </div>
      )}

      <MenuRadix
        items={items}
        search
        enableApiSearch
        onApiSearch={handleApiSearch}
        isSearching={isSearching}
        minSearchLength={2}
        emptySearchMessage="Nenhum usuário encontrado"
        onItemSelect={(item) => {
          console.log('✅ Usuário selecionado:', item);
          alert(`Selecionado: ${item.text}\nEmail: ${item.subText}`);
        }}
      >
        <Button>
          {isSearching ? 'Carregando...' : `Usuários (${items.length})`}
        </Button>
      </MenuRadix>
    </div>
  );
};

ApiSearchReal.parameters = {
  docs: {
    description: {
      story: `
**Busca em API Real**

Esta story faz requisições reais para a API pública JSONPlaceholder.

**Features:**
- 🌐 API externa real
- 👥 Busca de usuários por nome, email ou username
- 🔄 Carregamento assíncrono
- ⚠️ Error handling
- 🔔 Alerta ao selecionar usuário

**Abra o Network Tab** do DevTools para ver as requisições HTTP!
      `,
    },
  },
};

// ===================================================
// ♾️ Story 4: API Search + Infinite Scroll
// ===================================================
export const ApiSearchWithInfiniteScroll: StoryFn = () => {
  const [items, setItems] = useState<MenuItemProps[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  useEffect(() => {
    loadInitialItems();
  }, []);

  const loadInitialItems = async () => {
    const pageSize = 5;
    const initialItems = mockProducts.slice(0, pageSize).map((product) => ({
      id: String(product.id),
      text: product.name,
      subText: `${product.category} - R$ ${product.price}`,
      value: String(product.id),
    }));

    setItems(initialItems);
    setPage(1);
    setHasMore(mockProducts.length > pageSize);
  };

  const handleApiSearch = async (searchTerm: string) => {
    console.log('🔍 Buscando:', searchTerm || '(todos)');
    setIsSearching(true);
    setCurrentSearchTerm(searchTerm);
    setPage(1);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      if (searchTerm === '') {
        await loadInitialItems();
      } else {
        const normalized = searchTerm.toLowerCase();
        const filtered = mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(normalized) ||
            product.category.toLowerCase().includes(normalized)
        );

        const pageSize = 5;
        const results = filtered.slice(0, pageSize).map((product) => ({
          id: String(product.id),
          text: product.name,
          subText: `${product.category} - R$ ${product.price}`,
          value: String(product.id),
        }));

        setItems(results);
        setHasMore(filtered.length > pageSize);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleScrollEnd = async () => {
    if (!hasMore || isLoadingMore) return;

    console.log('📜 Carregando mais items...');
    setIsLoadingMore(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const normalized = currentSearchTerm.toLowerCase();
      const source = currentSearchTerm
        ? mockProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(normalized) ||
              product.category.toLowerCase().includes(normalized)
          )
        : mockProducts;

      const pageSize = 5;
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      const moreItems = source.slice(startIndex, endIndex);

      if (moreItems.length === 0) {
        setHasMore(false);
        return;
      }

      const newItems = moreItems.map((product) => ({
        id: String(product.id),
        text: product.name,
        subText: `${product.category} - R$ ${product.price}`,
        value: String(product.id),
      }));

      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setHasMore(endIndex < source.length);

      console.log(`✅ Carregados mais ${newItems.length} items`);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', padding: '12px', background: '#f3e5f5', borderRadius: '8px' }}>
        <strong>♾️ API Search + Infinite Scroll</strong>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
          Busca via API com carregamento infinito ao scrollar.
          <br />
          Scroll até o final para carregar mais items (5 por página).
        </p>
      </div>

      <MenuRadix
        items={items}
        search
        enableApiSearch
        onApiSearch={handleApiSearch}
        isSearching={isSearching}
        enableInfiniteScroll
        onScrollEnd={handleScrollEnd}
        isLoadingMore={isLoadingMore}
        minSearchLength={2}
        emptySearchMessage="Nenhum produto encontrado"
        onItemSelect={(item) => console.log('✅ Selecionado:', item)}
      >
        <Button>
          Produtos ({items.length}){!hasMore && ' - Todos carregados'}
        </Button>
      </MenuRadix>
    </div>
  );
};

ApiSearchWithInfiniteScroll.parameters = {
  docs: {
    description: {
      story: `
**API Search + Infinite Scroll**

Combina busca via API com scroll infinito.

**Como funciona:**
1. Carrega 5 items iniciais
2. Ao scrollar até o final, carrega mais 5
3. Busca também respeita paginação
4. Quando não houver mais items, mostra "Todos carregados"

**Recursos:**
- ✅ Carregamento paginado (5 items por vez)
- ✅ Scroll infinito
- ✅ Loading state durante scroll
- ✅ Busca compatível com paginação
      `,
    },
  },
};