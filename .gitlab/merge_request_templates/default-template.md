<!--
	Template de Merge Request - Mudanças em Componentes
	Use este template para facilitar o code review e garantir versionamento correto.
-->

## 📋 Descrição da Mudança

<!-- Descreva o que foi alterado/adicionado/removido -->

## 🎯 Tipo de Mudança

<!-- ⚠️ IMPORTANTE: Marque UMA opção. Isso define a versão que será publicada no NPM -->

- [ ] 🐛 **PATCH** - Bug fix, documentação, refatoração interna (v1.0.0 → v1.0.1)
- [ ] ✨ **MINOR** - Nova funcionalidade SEM quebrar compatibilidade (v1.0.0 → v1.1.0)
- [ ] 💥 **MAJOR** - Breaking change, API incompatível com versão anterior (v1.0.0 → v2.0.0)

---
## 💥 Breaking Changes? (Obrigatório se MAJOR)

<!-- Se marcou MAJOR acima, preencha esta seção. Caso contrário, delete. -->

### Props/APIs Removidas ou Alteradas

| **Componente** | **Prop/API Antiga** | **Nova**      | **Tipo Antigo**          | **Tipo Novo**           | **Motivo**               |
| -------------- | ------------------- | ------------- | ------------------------ | ----------------------- | ------------------------ |
|                | onChange            | onValueChange | (e: ChangeEvent) => void | (value: string) => void | Alinhamento com Radix UI |

---
## 📦 Componentes Afetados

<!-- Liste TODOS os componentes alterados neste MR -->

**Pacote:** `@giro-ds/react`

- ComponentExample

---
## ✅ Checklist de Qualidade

### Código

- [ ] Código segue os padrões do projeto (linter, prettier)
- [ ] Tipos TypeScript estão corretos
- [ ] Não há console.logs ou debuggers esquecidos
### Testes

- [ ] Testes unitários foram adicionados/atualizados
- [ ] Cobertura de testes não diminuiu
### Build

- [ ] Build está passando (`pnpm build`)
- [ ] Typecheck está passando (`pnpm typecheck`)  

---
## 📸 Screenshots/Vídeos (Opcional)

<!-- Se mudou visualmente, adicione prints/GIFs -->

---
## 📝 Notas para o Reviewer

<!--
	Informações extras para facilitar o code review.
	Exemplo: "Atenção especial na linha X", "Dúvida sobre abordagem Y"
-->