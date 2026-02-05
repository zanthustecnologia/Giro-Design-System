# 📋 ANÁLISE SIMPLIFICADA - Common Types Reutilizáveis

## ⚠️ PROBLEMA CRÍTICO

### 1. **Size** - INCONSISTÊNCIA 🔴

| Componente | Valores Atuais | Arquivo |
|------------|----------------|---------|
| Button | `'lg' \| 'sm'` | [Button.types.ts](../../packages/react/src/components/Button/Button.types.ts) |
| Avatar | `'small' \| 'large'` | [Avatar.types.ts](../../packages/react/src/components/Avatar/Avatar.types.ts) |
| Quantity | `'lg' \| 'sm'` | [Quantity.types.ts](../../packages/react/src/components/Quantity/Quantity.types.ts) |

**Solução:** Padronizar como `'sm' | 'lg'` em todos os componentes.

---

## 🎯 TYPES COMPARTILHADOS (Essenciais)

### 2. **ButtonVariant** ✅

Usado de forma consistente em 3+ componentes:

```typescript
type ButtonVariant = 'filled' | 'outlined' | 'text';
```

**Componentes que usam:**
- Button
- Filter  
- Drawer

---

### 3. **SemanticVariant** ✅

Valores de status/tipo semântico compartilhados:

```typescript
type SemanticVariant = 'neutral' | 'brand' | 'color' | 'success' | 'alert';
```

**Componentes que usam:**
- Chips: `'neutral' | 'brand' | 'color' | 'success' | 'alert'`
- Callout: `'neutral' | 'color' | 'brand' | 'alert' | 'success'`

---

### 4. **TooltipSide & TooltipAlign** ✅

Padrão Radix UI usado em múltiplos componentes:

```typescript
type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
type TooltipAlign = 'start' | 'center' | 'end';
```

**Componentes que usam:**
- Tooltip
- TextField
- Select

**Nota:** Padrão do Radix UI, garante consistência com a biblioteca.

---

### 5. **IconPosition** ✅ (não sera necessario pois o Button e o Chips o utilizam de maneiras diferentes)

```typescript
type IconPosition = 'left' | 'right';
```

**Componentes que usam:**
- Button: `iconPosition?: 'left' | 'right' | 'both'`
- Chips: `leftIcon`, `rightIcon` (ReactNode)

**Nota:** Button tem caso especial `'both'` que pode ser mantido localmente como extensão.

---

### 6. **Locale** ✅

```typescript
type Locale = 'pt-br' | 'en-us';
```

**Componentes que usam:**
- Calendar
- DatePicker
- Filter

---

### 7. **BaseComponentProps** ✅

Props presentes em 90% dos componentes:

```typescript
interface BaseComponentProps {
  /** ID único do componente */
  id?: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Define se o componente está desabilitado */
  disabled?: boolean;
}
```

**Benefício:** Reduz duplicação de documentação e garante consistência de naming.

---

## 📂 ESTRUTURA PROPOSTA (Simplificada)

```
packages/react/src/types/
├── scss.d.ts (existente)
├── index.ts (barrel export - atualizar)
└── common.types.ts (NOVO)
    ├── Size
    ├── ButtonVariant
    ├── SemanticVariant
    ├── TooltipSide
    ├── TooltipAlign
    ├── IconPosition
    ├── Locale
    └── BaseComponentProps
```

**Estratégia:** Um único arquivo `common.types.ts` com todos os types compartilhados.

---

## 📝 PLANO DE IMPLEMENTAÇÃO

### Fase 1: Criação dos Types (Sem Breaking Changes)
1. ✅ Criar arquivo `common.types.ts`
2. ✅ Exportar types em `index.ts`
3. ✅ Documentar cada type com JSDoc

### Fase 2: Migração Gradual (Componente por Componente)
1. 🔄 Atualizar Avatar: `'small' | 'large'` → `Size`
2. 🔄 Atualizar Button: usar `Size`, `ButtonVariant`, `IconPosition`
3. 🔄 Atualizar Quantity: usar `Size`
4. 🔄 Atualizar Chips: usar `SemanticVariant`
5. 🔄 Atualizar Callout: usar `SemanticVariant`
6. 🔄 Atualizar Tooltip: usar `TooltipSide`, `TooltipAlign`
7. 🔄 Atualizar TextField: usar `TooltipSide`, `TooltipAlign`
8. 🔄 Atualizar Select: usar `TooltipSide`, `TooltipAlign`
9. 🔄 Atualizar Calendar: usar `Locale`
10. 🔄 Atualizar DatePicker: usar `Locale`
11. 🔄 Atualizar Filter: usar `ButtonVariant`, `Locale`
12. 🔄 Atualizar Drawer: usar `ButtonVariant`

### Fase 3: Validação
1. ✅ Verificar erros de TypeScript
2. ✅ Executar testes existentes
3. ✅ Validar builds

---

## 📊 MÉTRICAS

### Situação Atual
- **Types Duplicados:** ~15
- **Inconsistências:** 1 crítica (Size)
- **Componentes com types locais:** 25+

### Após Implementação
- **Types Compartilhados:** 8
- **Inconsistências:** 0
- **Redução de duplicação:** ~60%
- **Breaking Changes:** 0 (apenas refatoração interna)

---

## 🎯 BENEFÍCIOS

### Técnicos
- ✅ **Fonte única de verdade** para types compartilhados
- ✅ **Zero duplicação** de definições
- ✅ **Consistência garantida** através do sistema de tipos
- ✅ **Autocomplete melhorado** no IDE

### Manutenibilidade
- ✅ **Simplicidade (KISS)** - um arquivo, fácil de encontrar
- ✅ **DRY** - Don't Repeat Yourself
- ✅ **Prevenção de erros** - impossível criar valores divergentes

### Developer Experience
- ✅ **Documentação centralizada** via JSDoc
- ✅ **Menos decisões** - padrões claros e definidos
- ✅ **Onboarding facilitado** - novos devs sabem onde buscar types

---

## ⚠️ AVISOS IMPORTANTES

### Seguindo as Regras do Projeto

De acordo com [rules.md](./guides/rules.md):

1. **Escopo Fechado:** ✅ Apenas refatoração de types, zero novas funcionalidades
2. **Preservação de Recursos:** ✅ Nenhuma funcionalidade será removida
3. **Zero Regressão:** ✅ Apenas mudanças internas de tipos
4. **CSS Intocável:** ✅ Nenhuma alteração em estilos
5. **Sem Novas Dependências:** ✅ Usa apenas TypeScript nativo

### Breaking Changes
**NENHUM** - Esta é uma refatoração puramente interna. A API pública dos componentes permanece idêntica.

**Exemplo:**
```typescript
// ANTES (Avatar.types.ts)
size?: 'small' | 'large'

// DEPOIS (Avatar.types.ts)
size?: Size // onde Size = 'sm' | 'lg'
```

**Impacto para consumidores:** O componente Avatar precisará ajustar a prop de `'small'` para `'sm'` e `'large'` para `'lg'` nas futuras versões.

---

## 📅 TIMELINE ESTIMADO

| Fase | Duração Estimada | Status |
|------|------------------|--------|
| Fase 1: Criação dos types | 15 min | ⏸️ Aguardando aprovação |
| Fase 2: Migração de componentes | 1-2h | ⏸️ Aguardando aprovação |
| Fase 3: Validação e testes | 30 min | ⏸️ Aguardando aprovação |
| **TOTAL** | **~2-3h** | - |

---

## ✅ CHECKLIST DE EXECUÇÃO

- [ ] Criar `common.types.ts`
- [ ] Atualizar `index.ts` com exports
- [ ] Migrar componentes (12 componentes)
- [ ] Executar `pnpm type-check` (se disponível)
- [ ] Executar testes
- [ ] Validar build
- [ ] Atualizar Storybook (se necessário)
- [ ] Documentar mudanças no CHANGELOG

---

## 🚀 PRÓXIMOS PASSOS

**Aguardando aprovação para:**
1. Criar `common.types.ts` com os 8 types definidos
2. Atualizar exports em `index.ts`
3. Iniciar migração dos componentes (em ordem de criticidade)

---

**Documento gerado em:** 05/02/2026  
**Autor:** GitHub Copilot  
**Status:** 📋 Análise Completa - Aguardando Aprovação
