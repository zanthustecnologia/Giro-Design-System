# 🚀 Guia de Migração: v2.0.0 → v3.0.0

> [!important] Breaking Changes
> Esta versão contém **múltiplas mudanças incompatíveis** na API.
> Siga este guia cuidadosamente para migrar seu projeto.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Componentes Afetados](#-componentes-afetados)
- [Guias de Migração Detalhados](#-guias-de-migração-detalhados)
  - [DropdownMenu](#1️⃣-dropdownmenu)
  - [Switch](#2️⃣-switch)
  - [Button](#3️⃣-button)
  - [Select](#4️⃣-select)
  - [Table](#5️⃣-table)
- [Checklist de Migração](#-checklist-de-migração)
- [Troubleshooting](#-troubleshooting)

---

## 🔍 Visão Geral

### O que mudou?

A versão 3.0.0 traz melhorias significativas em **API, type-safety e experiência de desenvolvimento**:

- ✨ **Novas funcionalidades** em Table (seleção múltipla aprimorada)
- 🔧 **Refatorações** em DropdownMenu, Button e Select
- 🎯 **API simplificada** com remoção de props desnecessárias
- 🛡️ **Type-safety aprimorado** com suporte a genéricos

### Tempo estimado de migração

- **Projeto pequeno** (1-5 componentes): ~15-30 minutos
- **Projeto médio** (6-20 componentes): ~1-2 horas
- **Projeto grande** (20+ componentes): ~2-4 horas

---

## 📦 Componentes Afetados

| Componente | Tipo de Mudança | Impacto | Migração |
|------------|----------------|---------|----------|
| **DropdownMenu** | 💥 Breaking | Alto | Obrigatória |
| **Button** | 💥 Breaking | Médio | Obrigatória |
| **Select** | 💥 Breaking | Alto | Obrigatória |
| **Switch** | ✨ Minor | Baixo | Opcional |
| **Table** | ✨ Minor | Baixo | Opcional |

---

## 🛠️ Guias de Migração Detalhados

### 1️⃣ **DropdownMenu**

#### 💥 Breaking Changes

**Props removidas:**
- ❌ `enableIcon` (boolean)
- ❌ `enableSubText` (boolean)

#### 📖 Como migrar

##### **Antes (v2.0.0):**
```tsx
import { DropdownMenu } from '@giro-ds/react';

<DropdownMenu
  enableIcon={true}      // ❌ Removido
  enableSubText={true}   // ❌ Removido
  items={[
    { 
      label: 'Opção 1', 
      icon: <Icon />,
      subText: 'Descrição'
    }
  ]}
/>
```

##### **Depois (v3.0.0):**
```tsx
import { DropdownMenu } from '@giro-ds/react';

<DropdownMenu
  // ✅ Ícones e subtextos são automaticamente detectados
  items={[
    { 
      label: 'Opção 1',
      icon: <Icon />,      // ✅ Renderizado automaticamente se fornecido
      subText: 'Descrição' // ✅ Renderizado automaticamente se fornecido
    }
  ]}
/>
```

#### 🎯 Regra Simples

**Se o item tem `icon` ou `subText`, ele será renderizado automaticamente.**
- Não precisa mais de flags booleanas para controlar exibição
- API mais limpa e intuitiva

#### ⚠️ Pontos de Atenção

```tsx
// ❌ ANTES: Ícone presente mas desabilitado
<DropdownMenu
  enableIcon={false}
  items={[{ label: 'Item', icon: <Icon /> }]}
/>
// Resultado: Ícone NÃO era renderizado

// ✅ AGORA: Para não renderizar, simplesmente não passe o ícone
<DropdownMenu
  items={[{ label: 'Item' }]} // Sem ícone
/>
// Resultado: Sem ícone
```

---

### 2️⃣ **Switch**

#### ✨ Melhorias (Não Breaking)

**Props agora opcionais:**
- `defaultChecked` (antes: obrigatória, agora: opcional)
- `disabled` (antes: obrigatória, agora: opcional)

#### 📖 Como migrar

##### **Antes (v2.0.0):**
```tsx
import { Switch } from '@giro-ds/react';

// ❌ Era obrigado a passar sempre
<Switch 
  defaultChecked={false}
  disabled={false}
/>
```

##### **Depois (v3.0.0):**
```tsx
import { Switch } from '@giro-ds/react';

// ✅ Pode omitir (valores padrão aplicados)
<Switch />

// ✅ Ou passar explicitamente se necessário
<Switch defaultChecked={true} disabled={false} />
```

#### 🎯 Valores Padrão

- `defaultChecked`: `false` (se omitido)
- `disabled`: `false` (se omitido)

#### ⚡ Ação Necessária

**Nenhuma!** Código existente continua funcionando. Esta é uma melhoria retrocompatível.

---

### 3️⃣ **Button**

#### 💥 Breaking Changes

**Enum `iconPosition` alterado:**
- ❌ Removido: `'none'`
- ✅ Adicionado: `'both'`

#### 📖 Como migrar

##### **Antes (v2.0.0):**
```tsx
import { Button } from '@giro-ds/react';

<Button 
  iconPosition="none"  // ❌ Não existe mais
  label="Clique aqui"
/>
```

##### **Depois (v3.0.0):**
```tsx
import { Button } from '@giro-ds/react';

// ✅ Opção 1: Simplesmente omita a prop (padrão sem ícone)
<Button label="Clique aqui" />

// ✅ Opção 2: Use 'left' ou 'right' se tiver ícone
<Button 
  iconPosition="left"
  icon={<Icon />}
  label="Clique aqui"
/>

// ✅ Nova funcionalidade: Ícones em ambos os lados
<Button 
  iconPosition="both"
  icon={<IconLeft />}
  iconRight={<IconRight />}
  label="Clique aqui"
/>
```

#### 🔄 Tabela de Migração

| v2.0.0 | v3.0.0 | Ação |
|--------|--------|------|
| `iconPosition="none"` | Omitir prop | Remover a prop |
| `iconPosition="left"` | `iconPosition="left"` | Sem mudança |
| `iconPosition="right"` | `iconPosition="right"` | Sem mudança |
| ❌ N/A | `iconPosition="both"` | Nova opção! |

#### 🛠️ Script de Migração Automática (Regex)

**Buscar:**
```regex
iconPosition="none"
```

**Substituir por:**
```
(nada - apenas delete a linha)
```

#### ⚠️ Componentes Afetados Indiretamente

**Drawer:**
- Se você usa `<Drawer>`, ele também foi atualizado para usar corretamente o `onClick` do Button
- Nenhuma ação necessária no seu código

---

### 4️⃣ **Select**

#### 💥 Breaking Changes

**Prop renomeada e assinatura alterada:**
- ❌ Removido: `onChange`
- ✅ Adicionado: `onValueChange`

**Mudança de assinatura:**
```tsx
// ❌ v2.0.0
onChange: (e: ChangeEvent) => void

// ✅ v3.0.0
onValueChange: (value: string) => void
```

#### 📖 Como migrar

##### **Antes (v2.0.0):**
```tsx
import { Select } from '@giro-ds/react';

<Select
  options={[
    { value: 'op1', label: 'Opção 1' },
    { value: 'op2', label: 'Opção 2' },
  ]}
  onChange={(e) => {
    const value = e.target.value;  // ❌ Precisa extrair do event
    console.log(value);
  }}
/>
```

##### **Depois (v3.0.0):**
```tsx
import { Select } from '@giro-ds/react';

<Select
  options={[
    { value: 'op1', label: 'Opção 1' },
    { value: 'op2', label: 'Opção 2' },
  ]}
  onValueChange={(value) => {
    // ✅ Recebe o valor diretamente (string)
    console.log(value);
  }}
/>
```

#### 🎯 Vantagens da Nova API

- ✅ **Mais simples:** Recebe o valor diretamente, sem precisar extrair do event
- ✅ **Type-safe:** TypeScript sabe que `value` é uma string
- ✅ **Alinhamento com Radix UI:** Segue padrões modernos de componentes React

#### 🔄 Migração Passo a Passo

1. **Renomear a prop:**
   ```diff
   - onChange={(e) => ...}
   + onValueChange={(e) => ...}
   ```

2. **Remover extração do event:**
   ```diff
   - onValueChange={(e) => {
   -   const value = e.target.value;
   + onValueChange={(value) => {
       console.log(value);
     }}
   ```

3. **Simplificar o código:**
   ```diff
   - onValueChange={(e) => {
   -   const value = e.target.value;
   -   setFormData({ ...formData, select: value });
   + onValueChange={(value) => {
   +   setFormData({ ...formData, select: value });
     }}
   ```

#### 🛠️ Script de Migração Automática (Regex)

**Buscar:**
```regex
onChange=\{(\(e\)) => \{[\s\S]*?const value = e\.target\.value;([\s\S]*?)\}\}
```

**Substituir por:**
```tsx
onValueChange={(value) => {$2}}
```

> [!warning] Atenção
> Scripts automáticos podem não cobrir todos os casos.
> Sempre revise manualmente o código após aplicar.

---

### 5️⃣ **Table**

#### ✨ Novas Funcionalidades (Retrocompatível)

**Adições:**
- ✅ Estado indeterminado no checkbox "Selecionar Todos"
- ✅ Nova prop `disableSelectAll` em `rowSelection`
- ✅ Suporte a tipos genéricos `<Table<T>>`
- ✅ Documentação TypeScript aprimorada (JSDoc)

#### 📖 Como usar as novas funcionalidades

##### **1. Estado Indeterminado (Automático)**

```tsx
import { Table } from '@giro-ds/react';

<Table
  dataSource={users}
  columns={columns}
  rowSelection={{
    // ✅ Quando algumas (mas não todas) linhas estão selecionadas,
    // o checkbox "Selecionar Todos" fica indeterminado automaticamente
  }}
/>
```

##### **2. Desabilitar "Selecionar Todos"**

```tsx
<Table
  dataSource={users}
  columns={columns}
  rowSelection={{
    disableSelectAll: true, // ✅ Novo!
  }}
/>
```

##### **3. Type-Safety com Genéricos**

```tsx
import { Table } from '@giro-ds/react';

interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Autocomplete completo nas colunas!
<Table<User>
  dataSource={users}
  columns={[
    {
      key: 'name',     // ✅ TypeScript sugere: 'id' | 'name' | 'email'
      title: 'Nome',
      dataIndex: 'name' // ✅ TypeScript valida que existe em User
    }
  ]}
/>
```

#### ⚡ Ação Necessária

**Nenhuma!** Todas as mudanças são opcionais e retrocompatíveis.

---

## ✅ Checklist de Migração

### **1. Auditoria Inicial**

```bash
# Buscar componentes afetados no seu código
grep -r "DropdownMenu" src/
grep -r "enableIcon\|enableSubText" src/
grep -r "Button.*iconPosition.*none" src/
grep -r "Select.*onChange" src/
```

### **2. Componente por Componente**

- [ ] **DropdownMenu:**
  - [ ] Remover props `enableIcon` e `enableSubText`
  - [ ] Verificar que ícones/subtextos ainda aparecem corretamente

- [ ] **Button:**
  - [ ] Substituir `iconPosition="none"` (omitir a prop)
  - [ ] Testar layout dos botões sem ícones

- [ ] **Select:**
  - [ ] Renomear `onChange` → `onValueChange`
  - [ ] Ajustar handlers para receber `value` diretamente (não `e.target.value`)
  - [ ] Verificar lógica de formulários

- [ ] **Switch:**
  - [ ] (Opcional) Remover props `defaultChecked`/`disabled` se estavam com valores padrão

- [ ] **Table:**
  - [ ] (Opcional) Adicionar suporte a genéricos para type-safety
  - [ ] (Opcional) Testar nova funcionalidade `disableSelectAll`

### **3. Testes**

- [ ] Build está passando: `pnpm build`
- [ ] TypeScript está passando: `pnpm typecheck` (ou `tsc --noEmit`)
- [ ] Testes unitários: `pnpm test`
- [ ] Testes manuais de UI em desenvolvimento

### **4. Validação Visual**

- [ ] Todos os DropdownMenus exibem ícones/subtextos corretamente
- [ ] Botões sem ícones não quebram layout
- [ ] Selects disparam callbacks corretamente
- [ ] Tables com seleção múltipla funcionam

---

## 🐛 Troubleshooting

### **Erro: "Property 'enableIcon' does not exist"**

```
TS2322: Type '{ enableIcon: boolean; ... }' is not assignable to type 'DropdownMenuProps'.
  Property 'enableIcon' does not exist on type 'DropdownMenuProps'.
```

**Solução:**
```tsx
// ❌ Remova estas props
- enableIcon={true}
- enableSubText={false}
```

---

### **Erro: "Type 'none' is not assignable to type 'left' | 'right' | 'both'"**

```
TS2322: Type '"none"' is not assignable to type '"left" | "right" | "both"'.
```

**Solução:**
```tsx
// ❌ Antes
<Button iconPosition="none" />

// ✅ Depois (omita a prop)
<Button />
```

---

### **Erro: "Property 'onChange' does not exist on type 'SelectProps'"**

```
TS2322: Type '{ onChange: (e: ChangeEvent) => void; ... }' is not assignable to type 'SelectProps'.
  Property 'onChange' does not exist on type 'SelectProps'.
```

**Solução:**
```tsx
// ❌ Antes
<Select onChange={(e) => setValue(e.target.value)} />

// ✅ Depois
<Select onValueChange={(value) => setValue(value)} />
```

---

### **Ícones não aparecem no DropdownMenu**

**Possível causa:**
Você estava usando `enableIcon={false}` para controlar exibição.

**Solução:**
```tsx
// ❌ v2: Controle via flag
items={[
  { label: 'Item', icon: shouldShowIcon ? <Icon /> : null }
]}
enableIcon={true}

// ✅ v3: Controle diretamente no item
items={[
  { 
    label: 'Item', 
    icon: shouldShowIcon ? <Icon /> : undefined // ou omita a propriedade
  }
]}
```

---

### **Select não dispara callback**

**Possível causa:**
Ainda está usando `onChange` ao invés de `onValueChange`.

**Solução:**
```tsx
// ❌ Não funciona mais
<Select onChange={(e) => console.log(e)} />

// ✅ Use onValueChange
<Select onValueChange={(value) => console.log(value)} />
```

---

## 📚 Recursos Adicionais

- 📄 [Documentação Completa do Design System](../../README.md)
- 📄 [Guia de Versionamento](./versioning-and-publishing.md)
- 📄 [CHANGELOG v3.0.0](../../packages/react/CHANGELOG.md)
- 📄 [Storybook - Exemplos Atualizados](../../apps/storybook-react)

---

## 💬 Precisa de Ajuda?

- 🐛 **Reportar bug:** Abra uma issue no GitLab
- 💡 **Dúvidas:** Consulte a equipe do Design System
- 📖 **Documentação:** Verifique os stories do Storybook

---

## 📊 Resumo das Mudanças

| Componente | Mudança | Tipo | Migração |
|------------|---------|------|----------|
| DropdownMenu | Remover `enableIcon`, `enableSubText` | Breaking | Obrigatória |
| Button | `iconPosition="none"` → omitir prop | Breaking | Obrigatória |
| Select | `onChange` → `onValueChange` | Breaking | Obrigatória |
| Switch | Props opcionais | Feature | Opcional |
| Table | Novas funcionalidades | Feature | Opcional |

---

> [!info] Metadados
> **Versão:** v2.0.0 → v3.0.0  
> **Data:** Fevereiro 2026  
> **Mantido por:** Zanthus Design System Team  
> **Última atualização:** 03/02/2026
