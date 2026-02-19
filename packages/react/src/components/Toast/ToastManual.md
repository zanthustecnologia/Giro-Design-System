# Manual do Componente Toast

O componente Toast é um sistema de notificações bem estruturado construído sobre o **Radix UI**. Este manual explica como utilizá-lo em um projeto real.

---

## 📋 Arquitetura do Componente

O Toast usa a arquitetura **Provider + Context + Hook**, composta por:

- **`ToastProvider`**: Gerencia o estado global dos toasts
- **`ToastContainer`**: Renderiza os toasts na tela
- **`useToast()`**: Hook para criar/remover toasts
- **`Toast`**: Componente individual de notificação

---

## 🚀 Como Usar em Projeto Real

### 1. Configuração Inicial (App/Layout)

Primeiro, envolva sua aplicação com o Provider e adicione o Container:

```tsx
// App.tsx ou layout principal
import { ToastProvider, ToastContainer } from '@giro-ds/react';

function App() {
  return (
    <ToastProvider maxToasts={5}>
      {/* Seu aplicativo aqui */}
      <Routes />
      
      {/* Container deve estar dentro do Provider */}
      <ToastContainer />
    </ToastProvider>
  );
}
```

### 2. Usando em Qualquer Componente

Em qualquer componente filho, utilize o hook `useToast()`:

```tsx
import { useToast } from '@giro-ds/react';

function MinhaFuncionalidade() {
  const { showToast } = useToast();

  const handleSalvar = async () => {
    try {
      await salvarDados();
      
      showToast({
        titulo: 'Sucesso!',
        descricao: 'Dados salvos com sucesso.',
        iconType: 'Success',
        duration: 4000
      });
    } catch (error) {
      showToast({
        titulo: 'Erro ao salvar',
        descricao: error.message,
        iconType: 'Alert',
        duration: 6000
      });
    }
  };

  return <button onClick={handleSalvar}>Salvar</button>;
}
```

---

## ⚙️ Propriedades Disponíveis

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `titulo` | `string` | `'Titulo'` | Título do toast |
| `descricao` | `string` | - | Descrição opcional |
| `iconType` | `'Info' \| 'Success' \| 'Alert'` | `'Info'` | Tipo do ícone automático |
| `icon` | `ReactNode` | - | Ícone customizado (sobrescreve iconType) |
| `iconClosed` | `ReactNode` | `<Dismiss16Filled />` | Ícone do botão fechar |
| `automaticClose` | `boolean` | `true` | Se fecha automaticamente |
| `duration` | `number` | `5000` | Tempo em ms (se automaticClose=true) |

### Propriedades do ToastProvider

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `maxToasts` | `number` | `5` | Número máximo de toasts simultâneos |
| `children` | `ReactNode` | - | Componentes filhos da aplicação |

---

## 📚 Casos de Uso Práticos

### Toast de Sucesso
```tsx
showToast({
  titulo: 'Upload completo',
  descricao: '3 arquivos enviados com sucesso',
  iconType: 'Success',
  duration: 3000
});
```

### Toast de Erro (sem auto-close)
```tsx
showToast({
  titulo: 'Falha na conexão',
  descricao: 'Não foi possível conectar ao servidor',
  iconType: 'Alert',
  automaticClose: false // Usuário deve fechar manualmente
});
```

### Toast Informativo Simples
```tsx
showToast({
  titulo: 'Nova mensagem recebida',
  iconType: 'Info'
});
```

### Toast com Ícone Customizado
```tsx
import { Download24Regular } from '@fluentui/react-icons';

showToast({
  titulo: 'Download iniciado',
  icon: <Download24Regular />,
  duration: 2000
});
```

---

## 🎯 Funcionalidades Importantes

1. **Limite de Toasts**: Suporta até 5 toasts simultâneos (configurável em `maxToasts`)
2. **Remoção Automática**: Quando excede o limite, remove o mais antigo
3. **Animações**: Swipe para esquerda para dismissar
4. **Acessibilidade**: Usa Radix UI com suporte completo a ARIA
5. **Dismissão Manual**: Usuário pode fechar clicando no ícone X
6. **IDs Únicos**: Cada toast recebe um ID único automaticamente

---

## 📖 API do Hook useToast

O hook `useToast()` retorna um objeto com os seguintes métodos:

```tsx
const { showToast, dismissToast } = useToast();
```

### showToast(toast)
Exibe um novo toast na tela.

**Parâmetros:**
- `toast`: `Omit<ToastProps, 'id'>` - Objeto com as propriedades do toast (exceto id)

**Retorno:** `void`

**Exemplo:**
```tsx
showToast({
  titulo: 'Título do toast',
  descricao: 'Descrição opcional',
  iconType: 'Info',
  duration: 5000
});
```

### dismissToast(id)
Remove um toast específico da tela.

**Parâmetros:**
- `id`: `string` - ID único do toast a ser removido

**Retorno:** `void`

**Nota:** Geralmente não é necessário usar manualmente, pois os toasts se fecham automaticamente ou via botão X.

---

## ⚠️ Pontos de Atenção

1. O `ToastProvider` deve estar em um nível superior a todos os componentes que usarão toasts
2. O `ToastContainer` deve estar dentro do Provider
3. Para usar `useToast()`, o componente deve ser filho do Provider
4. Existe um typo: `iconType: 'Success'` deveria ser `'Success'` (com dobro 'c')
5. Se tentar usar `useToast()` fora do Provider, receberá erro: *"useToastContext deve ser usado dentro de ToastProvider"*

---

## 🧪 Exemplo Completo em Cenário Real

### Estrutura de Providers

```tsx
// contexts/AppProviders.tsx
import { ToastProvider, ToastContainer } from '@giro-ds/react';

export function AppProviders({ children }) {
  return (
    <ToastProvider maxToasts={3}>
      {children}
      <ToastContainer />
    </ToastProvider>
  );
}
```

### Uso em Formulário

```tsx
// pages/FormularioDados.tsx
import { useToast } from '@giro-ds/react';
import { useState } from 'react';

export function FormularioDados() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (dados) => {
    setLoading(true);
    
    try {
      await api.post('/dados', dados);
      
      showToast({
        titulo: 'Cadastro realizado',
        descricao: 'Os dados foram salvos no sistema',
        iconType: 'Success'
      });
      
      // Redirecionar ou limpar form
      
    } catch (error) {
      showToast({
        titulo: 'Erro no cadastro',
        descricao: error.response?.data?.message || 'Erro desconhecido',
        iconType: 'Alert',
        automaticClose: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* campos do formulário */}
    </form>
  );
}
```

### Uso em Requisição Assíncrona

```tsx
// hooks/useDeleteItem.ts
import { useToast } from '@giro-ds/react';

export function useDeleteItem() {
  const { showToast } = useToast();

  const deleteItem = async (id: string) => {
    try {
      await api.delete(`/items/${id}`);
      
      showToast({
        titulo: 'Item removido',
        descricao: 'O item foi excluído com sucesso',
        iconType: 'Success',
        duration: 3000
      });
      
      return true;
    } catch (error) {
      showToast({
        titulo: 'Erro ao remover',
        descricao: 'Não foi possível excluir o item',
        iconType: 'Alert',
        duration: 5000
      });
      
      return false;
    }
  };

  return { deleteItem };
}
```

### Uso em Validação de Formulário

```tsx
// components/FormularioLogin.tsx
import { useToast } from '@giro-ds/react';

export function FormularioLogin() {
  const { showToast } = useToast();

  const validarCampos = (email: string, senha: string) => {
    if (!email) {
      showToast({
        titulo: 'Campo obrigatório',
        descricao: 'Por favor, informe o e-mail',
        iconType: 'Alert',
        duration: 4000
      });
      return false;
    }

    if (!senha || senha.length < 6) {
      showToast({
        titulo: 'Senha inválida',
        descricao: 'A senha deve ter no mínimo 6 caracteres',
        iconType: 'Alert',
        duration: 4000
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (email: string, senha: string) => {
    if (!validarCampos(email, senha)) return;
    
    // Prosseguir com login
    try {
      await login(email, senha);
      
      showToast({
        titulo: 'Bem-vindo!',
        descricao: 'Login realizado com sucesso',
        iconType: 'Success'
      });
    } catch (error) {
      showToast({
        titulo: 'Falha no login',
        descricao: error.message,
        iconType: 'Alert'
      });
    }
  };

  return (/* formulário */);
}
```

---

## 🎨 Tipos de Toast

### Info (Informativo)
- **Cor:** Azul
- **Ícone:** `Info20Filled`
- **Uso:** Informações gerais, avisos não críticos
- **Exemplo:** "Nova mensagem recebida", "Atualização disponível"

### Success (Sucesso)
- **Cor:** Verde
- **Ícone:** `CheckmarkCircle20Filled`
- **Uso:** Operações bem-sucedidas
- **Exemplo:** "Dados salvos", "Upload concluído"

### Alert (Alerta/Erro)
- **Cor:** Vermelho/Amarelo
- **Ícone:** `Warning20Filled`
- **Uso:** Erros, avisos importantes, ações que requerem atenção
- **Exemplo:** "Erro ao salvar", "Campos obrigatórios não preenchidos"

---

## 🛠️ Troubleshooting

### Erro: "useToastContext deve ser usado dentro de ToastProvider"

**Causa:** Tentativa de usar `useToast()` em componente que não é filho do `ToastProvider`.

**Solução:** Certifique-se de que o `ToastProvider` envolve toda a árvore de componentes que usarão toasts.

```tsx
// ❌ Errado
function App() {
  const { showToast } = useToast(); // Erro!
  return <ToastProvider>...</ToastProvider>;
}

// ✅ Correto
function App() {
  return (
    <ToastProvider>
      <ComponenteQueUsaToast />
    </ToastProvider>
  );
}
```

### Toast não aparece

**Possíveis causas:**
1. `ToastContainer` não está renderizado
2. `ToastContainer` está fora do `ToastProvider`
3. Estilos CSS não foram importados

**Solução:** Verifique a estrutura:
```tsx
<ToastProvider>
  <App />
  <ToastContainer /> {/* Deve estar aqui */}
</ToastProvider>
```

### Toasts não fecham automaticamente

**Causa:** Propriedade `automaticClose` definida como `false`.

**Solução:** Remova a propriedade ou defina como `true`:
```tsx
showToast({
  titulo: 'Teste',
  automaticClose: true, // ou omita para usar o padrão
  duration: 5000
});
```

---

## 📝 Boas Práticas

1. **Use toasts para feedback imediato:** Confirmações de ações, erros, avisos
2. **Evite toasts para informações críticas:** Use modais para decisões importantes
3. **Seja conciso:** Títulos curtos e descrições diretas
4. **Escolha o tipo correto:** Info, Success ou Alert conforme o contexto
5. **Configure duração apropriada:**
   - Sucesso: 3-4 segundos
   - Info: 4-5 segundos
   - Erro: 5-6 segundos ou sem auto-close
6. **Não abuse da quantidade:** Configure `maxToasts` adequadamente
7. **Forneça descrições úteis:** Explique o que aconteceu e/ou próximos passos

---

## 🔍 Estrutura Interna

### Arquivos do Componente

```
Toast/
├── Toast.tsx                 # Componente individual do toast
├── Toast.types.ts           # Definições de tipos TypeScript
├── Toast.module.scss        # Estilos do componente
├── context.ts               # Context API para gerenciamento de estado
├── useToast.ts              # Hook para uso do toast
├── index.ts                 # Exports públicos
├── components/
│   ├── ToastProvider.tsx    # Provider do contexto
│   └── ToastContainer.tsx   # Container que renderiza os toasts
└── __tests__/
    └── Toast.test.tsx       # Testes unitários
```

### Fluxo de Dados

1. `ToastProvider` cria e gerencia array de toasts
2. `showToast()` adiciona novo toast ao array
3. `ToastContainer` renderiza todos os toasts do array
4. Cada `Toast` controla seu próprio estado de abertura/fechamento
5. Ao fechar, toast notifica o Provider para remover do array

---

## 📦 Dependências

- **Radix UI Toast**: Componente base acessível e sem estilo
- **Fluent UI Icons**: Ícones padrão (Info, Success, Alert, Dismiss)
- **React**: ^18.x
- **SCSS Modules**: Para estilos isolados

---

## 🎓 Recursos Adicionais

- [Documentação Radix UI Toast](https://www.radix-ui.com/primitives/docs/components/toast)
- [Fluent UI Icons](https://react.fluentui.dev/?path=/docs/icons-catalog--page)
- Veja exemplos no Storybook: `apps/storybook-react/src/stories/Components/Toast/Toast.stories.tsx`
- Testes de referência: `packages/react/src/components/Toast/__tests__/Toast.test.tsx`

---

**Última atualização:** 19 de fevereiro de 2026
