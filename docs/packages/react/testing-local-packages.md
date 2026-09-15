# 🧪 Testando Pacotes Localmente

> Guia para testar mudanças no design system antes de publicar no NPM.

---

## 📦 Método: npm pack

Use este método para testar o pacote exatamente como será publicado no NPM.

### **1. Build e Empacotamento**

```powershell
# Na raiz do monorepo
cd c:\Users\felipe.falcone\Documents\Projects\design-system-monorepo

# Build do pacote React
pnpm --filter @giro-ds/react build

# Empacotar (gera arquivo .tgz)
cd packages\react
npm pack
```

Isso gera um arquivo: `giro-ds-react-X.X.X.tgz` dentro de `packages\react\`

---

### **2. Copiar para o Projeto Consumidor**

```powershell
# Criar pasta local-packages no projeto consumidor (se não existir)
mkdir [caminho-do-projeto-consumidor]\local-packages

# Copiar o arquivo .tgz
Copy-Item "C:\Users\felipe.falcone\Documents\Projects\design-system-monorepo\packages\react\giro-ds-react-X.X.X.tgz" -Destination "[caminho-do-projeto-consumidor]\local-packages\"
```

---

### **3. Instalar no Projeto Consumidor**

```powershell
# Navegar até o projeto consumidor
cd [caminho-do-projeto-consumidor]

# Instalar o pacote local
npm install .\local-packages\giro-ds-react-X.X.X.tgz
```

---

### **4. Testar as Mudanças**

Execute o projeto consumidor normalmente e teste as funcionalidades.

```powershell
npm start
```

---

### **5. Desfazer (após testes)**

```powershell
# No projeto consumidor
npm uninstall @giro-ds/react

# Reinstalar versão publicada no NPM
npm install @giro-ds/react

# Opcional: Limpar pasta local-packages
Remove-Item .\local-packages\giro-ds-react-*.tgz
```

---

## 🔄 Workflow Iterativo

Se precisar testar múltiplas vezes:

```powershell
# 1. Fazer mudanças no código do design system

# 2. Rebuild e empacotar
cd c:\Users\felipe.falcone\Documents\Projects\design-system-monorepo
pnpm --filter @giro-ds/react build
cd packages\react
npm pack

# 3. Copiar novamente
Copy-Item ".\giro-ds-react-X.X.X.tgz" -Destination "[caminho-do-projeto-consumidor]\local-packages\" -Force

# 4. Reinstalar no consumidor
cd [projeto-consumidor]
npm install .\local-packages\giro-ds-react-X.X.X.tgz
```

---

## ✅ Verificar se está usando o pacote local

Após instalar o `.tgz`, verifique se o projeto está realmente usando a versão local:

### **Opção 1: Verificar package.json**

Abra o `package.json` do projeto consumidor e procure por `@giro-ds/react`:

```json
{
  "dependencies": {
    "@giro-ds/react": "file:local-packages/giro-ds-react-1.0.0.tgz"
  }
}
```

Se aparecer `"file:local-packages/..."`, está usando a versão local! ✅

### **Opção 2: Verificar node_modules**

```powershell
# No projeto consumidor
Get-ChildItem node_modules\@giro-ds\react\package.json | Select-String "version"
```

Compare a versão com a do arquivo `.tgz`.

### **Opção 3: Adicionar console.log temporário**

No seu componente, adicione um console.log para confirmar:

```typescript
import { TableHeader } from '@giro-ds/react';

// Adicionar temporariamente
console.log('TableHeader component:', TableHeader);
```

Se aparecer o componente atualizado no console, está funcionando! ✅

### **Opção 4: Testar a funcionalidade nova**

A forma mais direta é testar a funcionalidade que você acabou de implementar:

1. No seu componente que usa o filtro de data (exemplo: `DataTable.tsx`)
2. Certifique-se de ter adicionado `onClear` no filtro:

```typescript
const filters = [
  {
    id: 'date-filter',
    buttonText: selectedDateObject
      ? selectedDateObject.toLocaleDateString('pt-BR')
      : 'Data',
    type: 'calendar' as any,
    selectedDate: selectedDateObject,
    onDateSelect: handleDateChange,
    onClear: handleClearDate, // ← Esta linha
  },
];
```

3. Execute o projeto e abra o calendário do filtro
4. Se aparecer o botão **"Limpar"** e funcionar, está usando a versão local! ✅

---

## ✅ Vantagens

- ✅ Testa o pacote exatamente como será publicado
- ✅ Identifica problemas de build/empacotamento
- ✅ Sem configurações adicionais necessárias
- ✅ Fácil de desfazer

---

## ⚠️ Lembre-se

- Sempre fazer **build** antes de empacotar
- Substituir `X.X.X` pela versão atual do pacote
- Verificar `package.json` após instalação para confirmar uso do arquivo local
- Reverter para versão NPM após testes finalizados
- **Não commitar** o `package.json` com referência ao arquivo local
