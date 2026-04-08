# Template de Changeset

## Como criar um changeset

Execute: `pnpm changeset`

Ao escrever a mensagem do changeset, siga o template abaixo.

---

## 📝 Regras de Escrita

- ✅ **Idioma:** Sempre em português
- ❌ **Sem emojis:** Nunca use emojis (🎉, 💥, ✨, etc)
- ❌ **Sem hashes:** Nunca inclua códigos de commit
- ❌ **Sem UPPERCASE excessivo:** Use capitalização normal
- ❌ **Sem prefixos de commit:** Nunca use "feat:", "fix:", "refactor:", "docs:"
- ✅ **Use negrito:** Para destacar componentes/features: `**NomeComponente**:`
- ✅ **Use listas:** Organize mudanças com `-` e sub-listas quando necessário

---

## 📋 Templates por Tipo de Mudança

### **Patch Changes** (bug fixes, pequenas melhorias)

```markdown
**NomeComponente**: Corrige [problema específico]
```

**Exemplos:**
```markdown
**TextField**: Corrige erro ao digitar valores numéricos
**Select**: Resolve problema de navegação por teclado
**Table**: Ajusta comportamento do "selecionar todos" para respeitar checkboxes desabilitados
```

---

### **Minor Changes** (novas features, não-breaking)

```markdown
**NomeFeature**: Adiciona [nova funcionalidade] com suporte a [detalhe]
```

**Exemplos:**
```markdown
**Button**: Adiciona tooltip automático para modo iconOnly com novas props
**Sistema de Classes Utilitárias**: Adiciona sistema abrangente de classes utilitárias com suporte responsivo
**TextArea**: Novo componente com suporte completo a formulários (label, validação, contador de caracteres)
```

---

### **Major Changes** (breaking changes)

```markdown
**NomeComponente**: [Descrição da mudança quebrada]
- **Removido**: Props/features removidas
- **Alterado**: O que foi modificado (prop antiga → nova)
- **Por quê**: Justificativa técnica/UX
- **Como migrar**: Instruções com exemplos de código
```

**Exemplo:**
```markdown
**Calendar**: Migrado para react-day-picker v9
- **Removido**: Exports de tipos internos (DayItem, EmptyItem, CalendarItem, YearItem)
- **Alterado**: Prop `selectedDate` → `selected`, prop `currentDate` agora é opcional
- **Por quê**: Alinhamento com biblioteca padrão da comunidade e melhor manutenibilidade
- **Como migrar**:
  ```tsx
  // Antes
  <Calendar selectedDate={date} currentDate={new Date()} />
  
  // Depois
  <Calendar selected={date} />
  ```
```

---

## 🎯 Estrutura Completa para Major Changes

Quando houver múltiplas breaking changes, agrupe por componente:

```markdown
**BREAKING CHANGE**: [Título resumido da release]
- **Componente1**: Mudança específica
  - **Removido**: Lista de remoções
  - **Alterado**: Lista de alterações
  - **Como migrar**: Exemplo de código
- **Componente2**: Outra mudança
  - Detalhes...
- **Novidades**: (se aplicável)
  - **ComponenteNovo**: Descrição do novo componente
```

---

## ✅ Checklist Antes de Commitar

- [ ] Escrevi em português?
- [ ] Removi todos os emojis?
- [ ] Removi prefixos como "feat:", "fix:"?
- [ ] Destaquei componentes com **negrito**?
- [ ] Adicionei exemplos de código para breaking changes?
- [ ] A descrição está clara e objetiva?

---

## 📚 Referência

Veja o CHANGELOG.md do pacote @giro-ds/react versão 5.0.0 como exemplo de boa formatação.
