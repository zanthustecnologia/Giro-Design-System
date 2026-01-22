# Theming - Giro Design System

Sistema de customização de tema para projetos consumidores do Giro Design System.

## 📋 Visão Geral

O sistema de theming permite que empresas consumidoras customizem cores, espaçamentos, tipografia e bordas do Design System sem modificar o código fonte. Funciona através de CSS Custom Properties injetadas em runtime via Provider React.

**Suporte atual:** React (Web)  
**Planejado:** Flutter e Compose (futuro)

---

## 🚀 Início Rápido

### Uso Padrão (sem customização)

```tsx
import { GiroThemeProvider } from '@giro-ds/react';
import '@giro-ds/tokens/build/css/tokens.css';

function App() {
  return (
    <GiroThemeProvider>
      <YourApp />
    </GiroThemeProvider>
  );
}
```

### Tema Customizado

```tsx
import { GiroThemeProvider } from '@giro-ds/react';
import type { GiroTheme } from '@giro-ds/react';
import '@giro-ds/tokens/build/css/tokens.css';

const empresaTheme: GiroTheme = {
  colors: {
    brand: {
      primary: {
        default: '#FF5733',
        dark: '#CC4522',
        medium: '#FF8866',
        light: '#FFB399'
      }
    }
  }
};

function App() {
  return (
    <GiroThemeProvider theme={empresaTheme}>
      <YourApp />
    </GiroThemeProvider>
  );
}
```

---

## 🎨 Customização de Cores

### Estrutura de Cores

```typescript
const customTheme: GiroTheme = {
  colors: {
    // Cores da marca
    brand: {
      primary: {
        default: '#3B45F2',    // Cor principal
        dark: '#0d1874',       // Versão escura
        medium: '#4f83fb',     // Versão média
        light: '#cadaff'       // Versão clara
      },
      secondary: {
        default: '#8cd92a',
        dark: '#3c7a2c',
        medium: '#d3ff9a',
        light: '#eeffd8'
      }
    },
    
    // Cores de feedback
    feedback: {
      alert: {
        default: '#e81e42',
        dark: '#b4052f',
        medium: '#ff7495',
        light: '#ffc7d8'
      },
      success: {
        default: '#0aed9b',
        dark: '#0ab16b',
        medium: '#6cf4c3',
        light: '#c1fae6'
      }
    },
    
    // Cores neutras
    neutral: {
      low: {
        default: '#111119',
        dark: '#505255',
        medium: '#88898c',
        light: '#b8b9be'
      },
      high: {
        default: '#ffffff',
        dark: '#cfd0da',
        medium: '#e8e8ee',
        light: '#f5f5fa'
      }
    }
  }
};
```

### Override Parcial

Você pode sobrescrever apenas as cores necessárias:

```typescript
const minimalTheme: GiroTheme = {
  colors: {
    brand: {
      primary: { 
        default: '#FF5733' // Apenas a cor principal
      }
    }
  }
};
```

---

## 🌓 Dark Mode

### Toggle Dark/Light

```tsx
import { useGiroTheme } from '@giro-ds/react';

function ThemeToggle() {
  const { mode, toggleMode } = useGiroTheme();
  
  return (
    <button onClick={toggleMode}>
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

### Modo Inicial

```tsx
<GiroThemeProvider mode="dark">
  <App />
</GiroThemeProvider>
```

### Persistência

Por padrão, o modo é persistido no `localStorage`. Para desabilitar:

```tsx
<GiroThemeProvider persistMode={false}>
  <App />
</GiroThemeProvider>
```

### Dark Mode via CSS

Para suportar dark mode, crie estilos específicos:

```css
/* styles/dark-theme.css */
[data-theme="dark"] {
  --color-neutral-low-default: #ffffff;
  --color-neutral-high-default: #111119;
  /* Inverta cores neutras conforme necessário */
}
```

---

## 📐 Outras Customizações

### Espaçamento

```typescript
const customTheme: GiroTheme = {
  spacing: {
    4: '0.25rem',
    8: '0.5rem',
    16: '1rem',
    // ...
  }
};
```

### Tipografia

```typescript
const customTheme: GiroTheme = {
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif'
    },
    fontSize: {
      12: '0.75rem',
      16: '1rem',
      24: '1.5rem',
      // ...
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700'
    }
  }
};
```

### Bordas

```typescript
const customTheme: GiroTheme = {
  border: {
    borderRadius: {
      4: '4px',
      8: '8px',
      pill: '999px',
      // ...
    },
    borderWidth: {
      1: '1px',
      2: '2px',
      // ...
    }
  }
};
```

---

## 🔧 API Reference

### GiroThemeProvider

**Props:**
- `theme?: GiroTheme` - Tema customizado (opcional)
- `mode?: 'light' | 'dark'` - Modo inicial (padrão: 'light')
- `persistMode?: boolean` - Persistir modo no localStorage (padrão: true)
- `storageKey?: string` - Chave do localStorage (padrão: 'giro-theme-mode')
- `children: ReactNode` - Componentes filhos

### useGiroTheme

**Retorna:**
- `theme: GiroTheme | null` - Tema atual
- `mode: 'light' | 'dark'` - Modo atual
- `setMode: (mode) => void` - Define modo
- `toggleMode: () => void` - Alterna entre light/dark

---

## ⚠️ Importante

1. **Sempre importe o CSS base:** `import '@giro-ds/tokens/build/css/tokens.css'`
2. **Provider deve envolver toda a aplicação**
3. **Valores customizados devem usar unidades CSS válidas**
4. **TypeScript fornece autocomplete para tokens disponíveis**

---

## 🔮 Futuro: Flutter e Compose

A arquitetura está preparada para suportar Flutter e Compose:

**Flutter (planejado):**
```dart
GiroTheme(
  theme: GiroThemeData(/* ... */),
  child: MyApp(),
)
```

**Compose (planejado):**
```kotlin
GiroTheme(
  colorScheme = GiroColorScheme(/* ... */),
  content = { MyApp() }
)
```
