# 🧪 Testes do Componente Quantity

Este diretório contém uma suíte completa de testes para o componente **Quantity**, cobrindo funcionalidade, acessibilidade, casos extremos e regressão visual.

## 📁 Estrutura dos Testes

```
__tests__/
├── Quantity.test.tsx                    # Testes principais (existente)
├── Quantity.accessibility.test.tsx      # Testes de acessibilidade WCAG 2.1 AA
├── Quantity.edge-cases.test.tsx        # Casos extremos e performance  
├── Quantity.visual.test.tsx            # Testes visuais e CSS
└── README.md                           # Este arquivo
```

## 🚀 Como Executar

### Todos os testes
```bash
npm test Quantity
```

### Teste específico
```bash
npm test Quantity.accessibility.test.tsx
npm test Quantity.edge-cases.test.tsx
npm test Quantity.visual.test.tsx
```

### Com coverage
```bash
npm test Quantity -- --coverage
```

### Watch mode (desenvolvimento)
```bash
npm test Quantity -- --watch
```

## 📊 Cobertura dos Testes

### 🎯 **Quantity.test.tsx** (Testes Principais)
- ✅ Renderização básica
- ✅ Modo controlado vs não controlado
- ✅ Incremento/decremento
- ✅ Validação de entrada
- ✅ Estados disabled
- ✅ Valores decimais
- ✅ Steps customizados
- ✅ Navegação por teclado

### ♿ **Quantity.accessibility.test.tsx** (Acessibilidade)
- ✅ ARIA attributes (role="spinbutton", aria-valuenow, etc.)
- ✅ Labels descritivos para screen readers
- ✅ Navegação por teclado (Tab, Arrow keys)
- ✅ Focus management e indicadores visuais
- ✅ Estados disabled comunicados corretamente
- ✅ Estrutura HTML semântica
- ✅ Touch targets adequados (mobile)
- ✅ Alto contraste e reduced motion

### 🧪 **Quantity.edge-cases.test.tsx** (Casos Extremos)
- ✅ Valores extremos (9999, decimais de alta precisão)
- ✅ Props malformadas (undefined, null, negativos)
- ✅ Performance com cliques rápidos
- ✅ Race conditions (teclado + mouse simultâneos)
- ✅ Validação de entrada complexa (paste, múltiplos pontos)
- ✅ Floating point precision
- ✅ Integração com formulários
- ✅ Internacionalização (locales diferentes)

### 🎨 **Quantity.visual.test.tsx** (Visual & CSS)
- ✅ Classes CSS corretas aplicadas
- ✅ Estados visuais (hover, focus, disabled)
- ✅ Layout e estrutura HTML
- ✅ Responsividade simulada
- ✅ Temas e customização
- ✅ Snapshots para regressão visual
- ✅ Propriedades dos botões
- ✅ Transições e animações

## 🔧 Dependências de Teste

### Já Configuradas
- `@testing-library/react` - Testes de componentes React
- `@testing-library/user-event` - Simulação de interações do usuário  
- `@testing-library/jest-dom` - Matchers customizados
- `jest` - Framework de testes

### Opcionais (para melhorar cobertura)
```bash
# Para testes de acessibilidade automatizados
npm install --save-dev jest-axe

# Para testes visuais de regressão
npm install --save-dev @storybook/test-runner
npm install --save-dev puppeteer

# Para análise de performance
npm install --save-dev @testing-library/jest-dom
```

## 🎯 Exemplo de Saída dos Testes

```bash
PASS  src/Quantity/__tests__/Quantity.test.tsx
PASS  src/Quantity/__tests__/Quantity.accessibility.test.tsx  
PASS  src/Quantity/__tests__/Quantity.edge-cases.test.tsx
PASS  src/Quantity/__tests__/Quantity.visual.test.tsx

Test Suites: 4 passed, 4 total
Tests:       87 passed, 87 total
Snapshots:   4 passed, 4 total
Time:        3.847 s
```

## ⚡ Quick Start para Novos Testes

### Teste de Funcionalidade
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quantity from '../Quantity';

it('deve fazer algo específico', async () => {
  const user = userEvent.setup();
  render(<Quantity defaultValue={0} />);
  
  // Suas asserções aqui
  expect(screen.getByRole('spinbutton')).toBeInTheDocument();
});
```

### Teste de Acessibilidade
```tsx
it('deve ter ARIA attribute correto', () => {
  render(<Quantity defaultValue={5} />);
  
  const input = screen.getByRole('spinbutton');
  expect(input).toHaveAttribute('aria-valuenow', '5');
});
```

### Teste de Edge Case
```tsx
it('deve lidar com valor extremo', async () => {
  const onChange = jest.fn();
  render(<Quantity defaultValue={9999} onChange={onChange} />);
  
  // Teste do comportamento em caso extremo
});
```

## 🐛 Troubleshooting

### Testes falhando?
1. **Mock issues**: Verifique se os mocks dos ícones e Button estão corretos
2. **Timing issues**: Use `waitFor` para operações assíncronas
3. **User events**: Use `userEvent.setup()` antes de interações

### Coverage baixo?
1. Execute `npm test -- --coverage --collectCoverageFrom="src/Quantity/**/*.{ts,tsx}"`
2. Abra `coverage/lcov-report/index.html` no browser
3. Identifique linhas não cobertas e adicione testes

### Performance lenta?
1. Use `--maxWorkers=4` para paralelizar
2. Execute apenas testes específicos durante desenvolvimento
3. Considere usar `--detectOpenHandles` para debugging

## 📈 Melhorias Futuras

- [ ] Adicionar `jest-axe` para testes automatizados de acessibilidade
- [ ] Configurar visual regression testing com Chromatic/Percy
- [ ] Adicionar testes de performance com React DevTools Profiler
- [ ] Implementar testes E2E com Playwright
- [ ] Configurar testes de compatibilidade cross-browser

## 🤝 Contribuindo

Ao adicionar novos testes:
1. Siga os padrões existentes de nomenclatura
2. Adicione descrições claras com emojis
3. Agrupe testes relacionados em `describe` blocks
4. Use mocks consistentes
5. Documente casos complexos

---

**📝 Mantido por**: Design System Team  
**🔄 Última atualização**: Agosto 2025
