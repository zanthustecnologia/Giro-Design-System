# Template de Changeset

## Como criar um changeset

Execute: `pnpm changeset`

---

## Regras

- Idioma: português
- Um changeset = um componente ou escopo
- Sem emojis, sem prefixos de commit (`feat:`, `fix:`), sem hashes
- Destaque o componente em negrito: `**NomeComponente**:`
- Sub-listas: no máximo 2 níveis de indentação

---

## Patch — bug fix ou melhoria pequena

```markdown
**NomeComponente**: Corrige [problema específico]
```

Para múltiplas correções no mesmo escopo:

```markdown
**NomeComponente**: Corrige [problema A] e [problema B]
- Detalhe adicional se necessário
- Outro detalhe
```

---

## Minor — nova feature, sem breaking change

```markdown
**NomeComponente**: Adiciona [funcionalidade]
- Detalhe 1
- Detalhe 2
```

---

## Major — breaking change

```markdown
**NomeComponente**: [Descrição objetiva da mudança]
- **Removido**: [o que foi removido]
- **Alterado**: [antes] → [depois]
- **Como migrar**:
  ```tsx
  // Antes
  <Componente propAntiga={value} />

  // Depois
  <Componente propNova={value} />
  ```
```

> Para múltiplos componentes quebrando na mesma versão, crie um changeset separado por componente.

---

## Checklist

- [ ] Um único componente ou escopo por changeset?
- [ ] Escrito em português?
- [ ] Sem emojis e sem prefixos de commit?
- [ ] Breaking change com exemplo de migração?
