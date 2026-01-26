# Exemplos de Theming

Exemplos práticos de customização de tema para diferentes cenários.

---

## 🏢 Empresa A - Tema Padrão

**Cenário:** Empresa que usa o Design System sem customização.

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GiroThemeProvider } from '@giro-ds/react';
import '@giro-ds/tokens/build/css/tokens.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GiroThemeProvider>
      <App />
    </GiroThemeProvider>
  </React.StrictMode>
);
```

```tsx
// src/App.tsx
import { Button } from '@giro-ds/react';

function App() {
  return (
    <div>
      <h1>Bem-vindo à Empresa A</h1>
      <Button>Usar tema padrão</Button>
    </div>
  );
}

export default App;
```

---

## 🎨 Empresa B - Tema Customizado

**Cenário:** Empresa com branding próprio (cores customizadas).

```tsx
// src/theme/empresa-b-theme.ts
import type { GiroTheme } from '@giro-ds/react';

export const empresaBTheme: GiroTheme = {
  colors: {
    brand: {
      primary: {
        default: '#FF5733',  // Laranja vibrante
        dark: '#CC4522',
        medium: '#FF8866',
        light: '#FFB399'
      },
      secondary: {
        default: '#00C853',  // Verde
        dark: '#009624',
        medium: '#5FE085',
        light: '#B9F6CA'
      }
    }
  }
};
```

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GiroThemeProvider } from '@giro-ds/react';
import '@giro-ds/tokens/build/css/tokens.css';
import { empresaBTheme } from './theme/empresa-b-theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GiroThemeProvider theme={empresaBTheme}>
      <App />
    </GiroThemeProvider>
  </React.StrictMode>
);
```

---

## 🌓 Dark Mode com TypeScript

**Cenário:** Aplicação com suporte a dark mode usando temas TypeScript separados.

```tsx
// src/theme/custom-theme.ts
import type { GiroTheme } from '@giro-ds/react';

// Tema para light mode
export const lightTheme: GiroTheme = {
  colors: {
    brand: {
      primary: {
        default: '#FF5733',  // Laranja vibrante
        dark: '#CC4522',
        medium: '#FF8866',
        light: '#FFB399'
      },
      secondary: {
        default: '#00C853',  // Verde
        dark: '#009624',
        medium: '#5FE085',
        light: '#B9F6CA'
      }
    }
  }
};

// Tema para dark mode (tons mais escuros, neutral invertido)
export const darkTheme: GiroTheme = {
  colors: {
    brand: {
      primary: {
        default: '#CC4522',  // Laranja mais escuro
        dark: '#992F15',
        medium: '#FF5733',
        light: '#FF8866'
      },
      secondary: {
        default: '#00A844',  // Verde mais escuro
        dark: '#007830',
        medium: '#00C853',
        light: '#5FE085'
      }
    },
    neutral: {
      // Inverte low/high para dark mode
      low: {
        default: '#ffffff',  // Branco para texto
        dark: '#cfd0da',
        medium: '#88898c',
        light: '#505255'
      },
      high: {
        default: '#0a0a0a',  // Preto profundo para background
        dark: '#1a1a1a',
        medium: '#2a2a2a',
        light: '#3a3a3a'
      }
    }
  }
};
```

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GiroThemeProvider } from '@giro-ds/react';
import '@giro-ds/tokens/build/css/tokens.css';
import { lightTheme, darkTheme } from './theme/custom-theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GiroThemeProvider theme={lightTheme} darkTheme={darkTheme}>
      <App />
    </GiroThemeProvider>
  </React.StrictMode>
);
```

```tsx
// src/components/ThemeToggle.tsx
import { useGiroTheme } from '@giro-ds/react';

export function ThemeToggle() {
  const { mode, toggleMode } = useGiroTheme();
  
  return (
    <button
      onClick={toggleMode}
      style={{
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'var(--color-brand-primary-default)',
        color: '#fff',
      }}
    >
      {mode === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
    </button>
  );
}
```

---

## 🌓 Dark Mode com Toggle (CSS Alternativo)

**Cenário:** Aplicação com suporte a dark mode usando CSS para customização.

> **Nota:** Esta abordagem usa CSS para dark mode. Para maior type-safety e consistência, 
> recomendamos usar a abordagem TypeScript acima com `darkTheme` prop.

```tsx
// src/components/ThemeToggle.tsx
import { useGiroTheme } from '@giro-ds/react';

export function ThemeToggle() {
  const { mode, toggleMode } = useGiroTheme();
  
  return (
    <button
      onClick={toggleMode}
      style={{
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'var(--color-brand-primary-default)',
        color: 'var(--color-neutral-high-default)',
      }}
    >
      {mode === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
    </button>
  );
}
```

```tsx
// src/App.tsx
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from '@giro-ds/react';

function App() {
  return (
    <div style={{ padding: '24px' }}>
      <header>
        <ThemeToggle />
      </header>
      <main>
        <h1>Aplicação com Dark Mode</h1>
        <Button>Botão exemplo</Button>
      </main>
    </div>
  );
}

export default App;
```

```css
/* src/styles/dark-mode.css */
[data-theme="dark"] {
  /* Inverte cores neutras */
  --color-neutral-low-default: #ffffff;
  --color-neutral-low-dark: #cfd0da;
  --color-neutral-low-medium: #88898c;
  --color-neutral-low-light: #505255;
  
  --color-neutral-high-default: #111119;
  --color-neutral-high-dark: #505255;
  --color-neutral-high-medium: #88898c;
  --color-neutral-high-light: #b8b9be;
  
  /* Ajusta cores de marca se necessário */
  --color-brand-primary-default: #5865FF;
}
```

```tsx
// Importe o CSS dark mode no main.tsx
import './styles/dark-mode.css';
```

---

## 🏪 White-label - Múltiplas Marcas

**Cenário:** Aplicação que serve múltiplas marcas (SaaS white-label).

```tsx
// src/theme/brands.ts
import type { GiroTheme } from '@giro-ds/react';

export const brandThemes: Record<string, GiroTheme> = {
  marca1: {
    colors: {
      brand: {
        primary: { default: '#FF5733' },
        secondary: { default: '#00C853' }
      }
    }
  },
  marca2: {
    colors: {
      brand: {
        primary: { default: '#3B45F2' },
        secondary: { default: '#8cd92a' }
      }
    }
  },
  marca3: {
    colors: {
      brand: {
        primary: { default: '#9C27B0' },
        secondary: { default: '#FF9800' }
      }
    }
  }
};
```

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GiroThemeProvider } from '@giro-ds/react';
import '@giro-ds/tokens/build/css/tokens.css';
import { brandThemes } from './theme/brands';
import App from './App';

// Detecta marca via subdomain, query param, ou config
const getBrand = () => {
  const subdomain = window.location.hostname.split('.')[0];
  return subdomain in brandThemes ? subdomain : 'marca1';
};

const currentBrand = getBrand();
const currentTheme = brandThemes[currentBrand];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GiroThemeProvider theme={currentTheme}>
      <App />
    </GiroThemeProvider>
  </React.StrictMode>
);
```

---

## 🎨 Customização de Cores Completa

**Cenário:** Empresa que customiza todas as paletas de cores disponíveis.

> **⚠️ Importante:** Apenas cores são customizáveis via `GiroTheme`. 
> Outros tokens (typography, spacing, border) vêm automaticamente do pacote `@giro-ds/tokens` e não podem ser sobrescritos.

```tsx
// src/theme/custom-theme.ts
import type { GiroTheme } from '@giro-ds/react';

export const fullCustomTheme: GiroTheme = {
  colors: {
    brand: {
      primary: {
        default: '#2C3E50',
        dark: '#1a252f',
        medium: '#34495e',
        light: '#7f8c8d'
      },
      secondary: {
        default: '#E74C3C',
        dark: '#c0392b',
        medium: '#ec7063',
        light: '#f1948a'
      }
    },
    feedback: {
      alert: {
        default: '#E67E22',
        dark: '#d35400',
        medium: '#f39c12',
        light: '#f8c471'
      },
      success: {
        default: '#27AE60',
        dark: '#229954',
        medium: '#52be80',
        light: '#a9dfbf'
      }
    },
    neutral: {
      low: {
        default: '#0a0a0a',
        dark: '#1a1a1a',
        medium: '#505255',
        light: '#88898c'
      },
      high: {
        default: '#ffffff',
        dark: '#f5f5f5',
        medium: '#e0e0e0',
        light: '#cccccc'
      }
    }
  }
};
```

```tsx
// src/main.tsx
import { GiroThemeProvider } from '@giro-ds/react';
import { fullCustomTheme } from './theme/custom-theme';
import App from './App';

function Root() {
  return (
    <GiroThemeProvider theme={fullCustomTheme}>
      <App />
    </GiroThemeProvider>
  );
}
```

---

## 🧪 Ambiente de Desenvolvimento

**Cenário:** Testar diferentes temas durante desenvolvimento.

```tsx
// src/dev/ThemePlayground.tsx
import { useState } from 'react';
import { GiroThemeProvider } from '@giro-ds/react';
import type { GiroTheme } from '@giro-ds/react';
import { Button } from '@giro-ds/react';

const themes: Record<string, GiroTheme> = {
  default: {},
  orange: {
    colors: {
      brand: {
        primary: { default: '#FF5733' }
      }
    }
  },
  purple: {
    colors: {
      brand: {
        primary: { default: '#9C27B0' }
      }
    }
  }
};

export function ThemePlayground() {
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  
  return (
    <div>
      <select 
        value={selectedTheme} 
        onChange={(e) => setSelectedTheme(e.target.value)}
      >
        {Object.keys(themes).map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      
      <GiroThemeProvider theme={themes[selectedTheme]}>
        <div style={{ padding: '24px' }}>
          <h1>Preview do Tema</h1>
          <Button>Botão Primário</Button>
        </div>
      </GiroThemeProvider>
    </div>
  );
}
```

---

## 💡 Dicas

1. **TypeScript:** Use `GiroTheme` type para autocomplete das cores disponíveis
2. **Organização:** Crie arquivos separados para temas (`theme/`)
3. **Validação:** TypeScript valida automaticamente a estrutura de cores
4. **CSS Base:** Sempre importe `tokens.css` antes de customizar
5. **Performance:** Tema é aplicado uma vez no mount, sem overhead
6. **⚠️ Limitação:** Apenas cores são customizáveis. Typography, spacing e border vêm do `@giro-ds/tokens`
7. **CSS Variables:** Use `--color-brand-primary-default` nos seus componentes customizados
8. **Dark Mode:** Forneça `darkTheme` separado para ter cores diferentes em modo escuro
