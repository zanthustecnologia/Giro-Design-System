# 📘 Guidelines para Desenvolvimento - Giovani

> Guia rápido para criar MRs com informações completas para code review e versionamento correto.

---

## 🎯 Objetivo

Quando você (Giovani) cria um MR, o Felipe precisa saber **rapidamente**:
1. O que mudou
2. Se quebra compatibilidade (breaking change)
3. Qual versão publicar no NPM (patch/minor/major)

**Sem essa informação clara, mudanças MAJOR podem ser publicadas como PATCH acidentalmente!**

---

## 📋 Workflow Completo

### 1️⃣ Durante o Desenvolvimento

```bash
# Crie sua branch
git checkout -b feat/radio-radix-migration

# Desenvolva normalmente
# ...faça suas mudanças...

# Antes de commitar, pergunte a si mesmo:
```

**🧠 PERGUNTAS-CHAVE:**

| Pergunta | Se SIM → | Se NÃO → |
|----------|----------|----------|
| Removi/renomeei alguma prop? | MAJOR 💥 | Continue... |
| Mudei o tipo de alguma prop? | MAJOR 💥 | Continue... |
| Mudei comportamento padrão? | MAJOR 💥 | Continue... |
| Adicionei nova prop/componente? | MINOR ✨ | Continue... |
| Apenas corrigi bug/typo/docs? | PATCH 🐛 | Done! |

---

### 2️⃣ Criando o Merge Request

**Use o template:** `.gitlab/merge_request_templates/component_change.md`

#### Como usar o template no GitLab:

1. Ao criar o MR, clique em "Choose a template"
2. Selecione `component_change`
3. Preencha TODAS as seções obrigatórias

#### ⚠️ Seções CRÍTICAS (não pule):

✅ **Tipo de Mudança** - Marque UMA opção (patch/minor/major)
✅ **Breaking Changes** - Se major, preencha a tabela
✅ **Componentes Afetados** - Marque quais componentes foram alterados
✅ **Checklist de Qualidade** - Garante que testes/build passam

---

### 3️⃣ Identificando MAJOR (Breaking Changes)

**🚨 É MAJOR quando:**

#### Exemplo 1: Mudou assinatura de prop
```tsx
// ❌ ANTES
onChange={(e) => console.log(e.target.value)}

// ✅ DEPOIS
onValueChange={(value) => console.log(value)}

// ☠️ MAJOR! A prop antiga não existe mais
```

#### Exemplo 2: Removeu prop
```tsx
// ❌ ANTES
<Radio checked={true} />

// ✅ DEPOIS
<Radio /> // checked não existe mais

// ☠️ MAJOR! Quebra código existente
```

#### Exemplo 3: Mudou tipo
```tsx
// ❌ ANTES
value: string

// ✅ DEPOIS
value: string | number

// ✅ MINOR - Retrocompatível (string ainda funciona)

// ---

// ❌ ANTES
value: string | number

// ✅ DEPOIS
value: string

// ☠️ MAJOR - Não é retrocompatível (number quebra)
```

#### Exemplo 4: Mudou comportamento padrão
```tsx
// ❌ ANTES
<Button /> // padrão: variant="primary"

// ✅ DEPOIS
<Button /> // padrão: variant="secondary"

// ☠️ MAJOR! Visual muda sem código mudar
```

**✅ É MINOR quando:**
- Adicionou prop nova (opcional)
- Adicionou novo componente
- Adicionou nova variante/opção

**✅ É PATCH quando:**
- Corrigiu bug
- Atualizou docs/README
- Refatorou código interno (sem API change)
- Fix de acessibilidade/a11y

---

### 4️⃣ Documentando Breaking Changes

Se identificou um MAJOR, preencha esta seção no MR:

```markdown
## 💥 Breaking Changes

### Props/APIs Removidas ou Alteradas

| Prop/API Antiga | Nova | Tipo Antigo | Tipo Novo | Motivo |
|-----------------|------|-------------|-----------|--------|
| `onChange` | `onValueChange` | `(e: ChangeEvent) => void` | `(value: string) => void` | Alinhamento com Radix UI |
| `checked` | - (removida) | `boolean` | - | Estado controlado pelo RadioGroup |

### 🔧 Exemplo de Migração

```tsx
// ❌ ANTES (v1.x)
<Radio 
  onChange={(e) => setValue(e.target.value)}
  checked={selected === 'option1'}
/>

// ✅ DEPOIS (v2.x)
<Radio 
  items={[{value: 'option1', label: 'Opt 1'}]}
  onValueChange={(val) => setValue(val)}
  defaultValue="option1"
/>
```

### 🎯 Justificativa
Migração para Radix UI para melhor acessibilidade e manutenibilidade.
Segue padrão da indústria (usado por Vercel, Shopify, etc).
```

---

## 🧪 Antes de Marcar para Review

**Checklist rápido:**

```bash
# 1. Testes passando
pnpm test

# 2. Build funcionando
pnpm build

# 3. Typecheck ok
pnpm typecheck

# 4. Storybook renderizando
pnpm storybook:react
# Abra e teste visualmente seu componente
```

---

## 📊 Fluxograma de Decisão

```
Mudança feita
    ↓
Removi/renomeei prop? ──── SIM ──→ MAJOR 💥
    ↓ NÃO
Mudei tipo (incompatível)? ──── SIM ──→ MAJOR 💥
    ↓ NÃO
Mudei comportamento padrão? ──── SIM ──→ MAJOR 💥
    ↓ NÃO
Adicionei prop/componente? ──── SIM ──→ MINOR ✨
    ↓ NÃO
Apenas bug fix/docs? ──── SIM ──→ PATCH 🐛
```

---

## 💡 Dicas Práticas

### ✅ DO (Faça)
- Marque o tipo de mudança NO MR
- Documente o "antes/depois" com exemplos de código
- Teste localmente antes de marcar para review
- Avise no Slack/Teams se for breaking change
- Pergunte ao Felipe se tiver dúvida

### ❌ DON'T (Evite)
- Criar MR sem preencher o template
- Misturar MAJOR + MINOR no mesmo MR (separe!)
- Assumir que "é só minor" sem verificar
- Esquecer de rodar testes/build antes do MR

---

## 🚨 Casos Especiais

### Caso 1: "Atualizei dependência do Radix"
```bash
# De: @radix-ui/react-radio@1.1.0
# Para: @radix-ui/react-radio@2.0.0

# ⚠️ Verifique se a API do Radix mudou
# Se mudou e afeta nosso componente → MAJOR
# Se não afeta → PATCH
```

### Caso 2: "Mudei CSS/styles internos"
```bash
# Mudou visual SEM mudar API?
# → PATCH (se é bug fix)
# → MINOR (se é melhoria)

# Mudou className exportado que dev usa?
# → MAJOR (quebra customizações)
```

### Caso 3: "Migrei componente pra Radix"
```bash
# Quase sempre é MAJOR
# Motivo: API do Radix é diferente do nativo

# Exemplo: onChange → onValueChange
```

---

## 📞 Quando Pedir Ajuda

**Pergunte ao Felipe antes de criar o MR se:**
- Não tem certeza se é major/minor/patch
- Breaking change é muito complexa
- Mudança afeta múltiplos componentes
- Não sabe como documentar a migração

**Melhor gastar 5min alinhando do que publicar versão errada!**

---

## 📚 Referências Rápidas

- [Semantic Versioning](https://semver.org/lang/pt-BR/) - Regras oficiais
- [Radix UI Docs](https://www.radix-ui.com/primitives) - Referência
- [Template de MR](../.gitlab/merge_request_templates/component_change.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Guidelines gerais

---

## 🎯 TL;DR (Resumo)

1. **Mudou API?** → MAJOR 💥
2. **Adicionou feature?** → MINOR ✨
3. **Bug fix/docs?** → PATCH 🐛
4. **Use o template do MR SEMPRE**
5. **Documente exemplos antes/depois**
6. **Na dúvida, pergunte ao Felipe**

**Meta:** Felipe deve saber o tipo de versão só de olhar o MR, sem ter que investigar o código.
