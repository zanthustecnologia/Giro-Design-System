# Semantic Colors

## Visão geral

A camada de semantic colors traduz a fundação cromática do design system em papéis de uso na interface. Ela existe para separar valor visual de intenção de uso.

No **core**, os tokens representam matéria-prima. Exemplos:

```
color.brand.primary.500
color.neutral.0
color.feedback.alert.100
```

Na camada **semantic**, os tokens representam papéis de interface. Exemplos:

```
color.background.default
color.surface.container
color.text.primary
color.border.default
color.interactive.primary.default
```

Essa separação reduz acoplamento, melhora manutenção, facilita temas e evita que componentes consumam diretamente tokens de base.

---

## Estrutura

```
semantic/
  color/
    background.json
    surface.json
    text.json
    icon.json
    border.json
    interactive.json
    focus.json
```

Cada arquivo representa uma família semântica de cor.

---

## Princípios

### 1. Semantic descreve papel, não valor

O token semântico deve responder *onde* a cor é usada, não qual é o valor hexadecimal nem qual é a posição tonal.

**Correto:**
```
color.text.primary
color.surface.container
color.interactive.primary.hover
```

**Incorreto:**
```
color.text.blue
color.surface.lightGray
color.button.primaryBlue
```

### 2. Semantic aponta para core

Sempre que possível, semantic deve usar alias para tokens do core.

**Exemplo:**
```json
{
  "color": {
    "text": {
      "primary": {
        "value": "{color.neutral.900}",
        "type": "color"
      }
    }
  }
}
```

### 3. Componentes não devem consumir core diretamente

Componentes devem consumir tokens semânticos ou, no estágio seguinte, tokens de componente.

**Correto:**
```
color.text.primary
color.border.default
color.interactive.primary.default
```

**Evitar:**
```
color.neutral.900
color.brand.primary.500
```

### 4. Semantic não deve inflar sem necessidade

Só devem existir tokens semânticos para papéis recorrentes e reconhecíveis.

---

## Relação entre core, semantic e component

```
core → semantic → component
```

| Camada        | Papel                               | Exemplos                                                |
| ------------- | ----------------------------------- | ------------------------------------------------------- |
| **Core**      | Fundação visual                     | `color.brand.primary.500`, `color.neutral.300`          |
| **Semantic**  | Papéis de uso na interface          | `color.background.default`, `color.text.primary`        |
| **Component** | Contratos locais de cada componente | `button.primary.background`, `input.border.focus`       |

---

## Famílias semânticas de cor

### Background

`background` representa o plano de fundo estrutural da interface.

**Uso típico:**
- Fundo de página
- Áreas estruturais amplas
- Contextos de marca ou feedback em nível estrutural

**Tokens:**
```
color.background.default
color.background.inverse
color.background.brand
color.background.brandSubtle
color.background.success
color.background.successSubtle
color.background.alert
color.background.alertSubtle
```

**Intenção de cada token:**

| Token           | Descrição                                              |
| --------------- | ------------------------------------------------------ |
| `default`       | Fundo base da interface                                |
| `inverse`       | Fundo invertido para contextos escuros                 |
| `brand`         | Fundo de marca em intensidade principal                |
| `brandSubtle`   | Fundo de marca suave                                   |
| `success`       | Fundo contextual positivo em intensidade principal     |
| `successSubtle` | Fundo contextual positivo suave                        |
| `alert`         | Fundo contextual de atenção em intensidade principal   |
| `alertSubtle`   | Fundo contextual de atenção suave                      |

**Exemplo:**
```json
{
  "color": {
    "background": {
      "default": {
        "value": "{color.neutral.0}",
        "type": "color"
      }
    }
  }
}
```

---

### Surface

`surface` representa camadas de conteúdo sobre o background.

**Uso típico:**
- Cards
- Painéis
- Drawers
- Modais
- Dropdowns
- Containers de conteúdo

**Tokens:**
```
color.surface.default
color.surface.container
color.surface.containerHigh
color.surface.inverse
color.surface.brandSubtle
color.surface.success
color.surface.alert
```

**Intenção de cada token:**

| Token           | Descrição                                                    |
| --------------- | ------------------------------------------------------------ |
| `default`       | Superfície base                                              |
| `container`     | Superfície contida com leve diferenciação em relação à base  |
| `containerHigh` | Superfície com maior destaque e diferenciação cromática      |
| `inverse`       | Superfície invertida                                         |
| `brandSubtle`   | Superfície suave ligada à marca                              |
| `success`       | Superfície suave de contexto positivo                        |
| `alert`         | Superfície suave de contexto de atenção                      |

> A gramática de surface é próxima da lógica de containers e camadas usada em design systems maduros. O objetivo é organizar hierarquia de conteúdo por camada visual, não por componente.

---

### Text

`text` representa o conteúdo textual da interface.

**Uso típico:**
- Body text
- Labels
- Placeholders
- Estados textuais contextuais
- Texto sobre fundos específicos

**Tokens:**
```
color.text.primary
color.text.secondary
color.text.placeholder
color.text.disabled
color.text.inverse
color.text.brand
color.text.onBrand
color.text.success
color.text.onSuccess
color.text.alert
color.text.onAlert
```

**Intenção de cada token:**

| Token         | Descrição                                  |
| ------------- | ------------------------------------------ |
| `primary`     | Texto principal                            |
| `secondary`   | Texto secundário                           |
| `placeholder` | Texto transitório, auxiliar ou placeholder |
| `disabled`    | Texto indisponível                         |
| `inverse`     | Texto sobre superfícies escuras/invertidas |
| `brand`       | Texto que usa a cor principal da marca     |
| `onBrand`     | Texto sobre fundo de marca                 |
| `success`     | Texto contextual positivo                  |
| `onSuccess`   | Texto sobre fundo de sucesso               |
| `alert`       | Texto contextual de atenção                |
| `onAlert`     | Texto sobre fundo de alerta                |

---

### Icon

`icon` espelha a hierarquia de `text`.

**Uso típico:**
- Ícones de ação
- Ícones contextuais
- Ícones em contextos invertidos
- Ícones sobre fundos de marca ou feedback

**Tokens:**
```
color.icon.primary
color.icon.secondary
color.icon.placeholder
color.icon.disabled
color.icon.inverse
color.icon.brand
color.icon.onBrand
color.icon.success
color.icon.onSuccess
color.icon.alert
color.icon.onAlert
```

> Sempre que possível, a hierarquia de ícones deve acompanhar a hierarquia de texto.

---

### Border

`border` representa contornos e separações estruturais.

**Uso típico:**
- Bordas padrão
- Divisórias
- Contornos suaves e fortes
- Estados contextuais

**Tokens:**
```
color.border.subtle
color.border.default
color.border.strong
color.border.disabled
color.border.inverse
color.border.brand
color.border.success
color.border.alert
```

**Intenção de cada token:**

| Token      | Descrição                       |
| ---------- | ------------------------------- |
| `subtle`   | Borda muito leve                |
| `default`  | Borda padrão                    |
| `strong`   | Borda mais evidente             |
| `disabled` | Borda de indisponibilidade      |
| `inverse`  | Borda para contexto invertido   |
| `brand`    | Borda ligada à marca            |
| `success`  | Borda contextual positiva       |
| `alert`    | Borda contextual de atenção     |

> Foco não deve ser tratado dentro de `border`. Foco tem família própria.

---

### Interactive

`interactive` representa cor de ação e seus estados.

**Uso típico:**
- Botões
- Links com estilo de ação
- Estados de hover e pressed
- Ações primárias e secundárias

**Tokens:**
```
color.interactive.primary.default
color.interactive.primary.hover
color.interactive.primary.pressed
color.interactive.primary.disabled
color.interactive.secondary.default
color.interactive.secondary.hover
color.interactive.secondary.pressed
color.interactive.secondary.disabled
```

**Intenção de cada token:**

| Token       | Descrição                    |
| ----------- | ---------------------------- |
| `primary`   | Ação principal da interface  |
| `secondary` | Ação complementar            |
| `hover`     | Estado de passagem de cursor |
| `pressed`   | Estado pressionado ou ativo  |
| `disabled`  | Estado indisponível          |

> No Giro, a ação secundária pode usar `brand.secondary` porque essa cor já faz parte da lógica da identidade visual. Essa decisão é aceitável, desde que permaneça consistente em todo o sistema.

---

### Focus

`focus` representa foco visível.

**Uso típico:**
- Foco de teclado
- Foco de inputs e botões
- Foco em contexto invertido

**Tokens:**
```
color.focus.ring
color.focus.ringInverse
```

**Intenção de cada token:**

| Token         | Descrição                                 |
| ------------- | ----------------------------------------- |
| `ring`        | Indicador padrão de foco                  |
| `ringInverse` | Indicador de foco para contexto invertido |

> Foco é um papel próprio de acessibilidade. Não deve ser tratado como simples variação de `border`.

---

## Regras de uso

### Quando usar `background`

**Use para:**
- Plano de fundo de página
- Seções estruturais amplas
- Contextos de marca ou feedback em nível estrutural

**Não use para:**
- Cards, modais, drawers, containers de conteúdo, painéis internos

### Quando usar `surface`

**Use para:**
- Cards, painéis, drawers, modais, agrupamentos internos, containers de conteúdo

### Quando usar `text` e `icon`

- Use `primary` e `secondary` como hierarquia padrão
- Use `inverse` sempre que o contexto exigir contraste sobre fundo escuro
- Use `onBrand`, `onSuccess` e `onAlert` para conteúdo sobre superfícies contextuais

### Quando usar `border`

- Use `subtle`, `default` e `strong` conforme o grau de presença visual necessário
- Use `brand`, `success` e `alert` apenas quando a borda tiver papel contextual claro

### Quando usar `interactive`

- Use `interactive.primary.*` para ação dominante
- Use `interactive.secondary.*` para ação complementar
- Nunca use cor de ação diretamente a partir do core dentro de componentes

### Quando usar `focus`

- Use `focus.ring` e `focus.ringInverse` para todo foco visível
- Não crie indicadores de foco arbitrários por componente

---

## Regras de consistência

### 1. Semantic color não deve refletir componente

**Evitar:**
```
color.button.primary
color.card.background
color.input.border
```

**Correto:**
```
color.interactive.primary.default
color.surface.container
color.border.default
```

### 2. Semantic color não deve usar nomes cromáticos

**Evitar:**
```
color.text.blue
color.border.gray
color.background.red
```

**Correto:**
```
color.text.primary
color.border.subtle
color.background.alert
```

### 3. Semantic color deve ser estável mesmo se o core mudar

Se a marca mudar ou se o tema evoluir, os componentes continuam consumindo semantic colors.

### 4. Semantic color não deve inflar

Cada token precisa representar um papel recorrente e reconhecível. Se o papel não for claro, o token provavelmente não deve existir.

---

## Exemplos práticos

### Exemplo 1 — Página com card

| Elemento      | Token                      |
| ------------- | -------------------------- |
| Página        | `color.background.default` |
| Card          | `color.surface.default`    |
| Título        | `color.text.primary`       |
| Descrição     | `color.text.secondary`     |
| Borda do card | `color.border.subtle`      |

### Exemplo 2 — Banner de sucesso

| Elemento         | Token                            |
| ---------------- | -------------------------------- |
| Fundo estrutural | `color.background.successSubtle` |
| Ícone            | `color.icon.success`             |
| Título           | `color.text.success`             |
| Descrição        | `color.text.secondary`           |

### Exemplo 3 — Botão primário

| Estado  | Token                               |
| ------- | ----------------------------------- |
| Default | `color.interactive.primary.default` |
| Hover   | `color.interactive.primary.hover`   |
| Pressed | `color.interactive.primary.pressed` |
| Texto   | `color.text.onBrand`                |

### Exemplo 4 — Modal em contexto escuro

| Elemento   | Token                     |
| ---------- | ------------------------- |
| Superfície | `color.surface.inverse`   |
| Texto      | `color.text.inverse`      |
| Borda      | `color.border.inverse`    |
| Foco       | `color.focus.ringInverse` |

---

## Critérios para evolução

Ao adicionar novos semantic colors, valide sempre:

- [ ] O papel é recorrente?
- [ ] Ele é diferente de um papel já existente?
- [ ] Ele representa intenção de uso, não componente?
- [ ] Ele aponta para core?
- [ ] Ele melhora tema, manutenção ou clareza?

Se a resposta for **não** para a maior parte desses pontos, o token provavelmente não deve entrar.

---

## Estado atual recomendado

```
semantic/
  color/
    background.json
    surface.json
    text.json
    icon.json
    border.json
    interactive.json
    focus.json
```

Esse conjunto é suficiente para:
- Desacoplar componentes do core
- Estruturar temas com mais segurança
- Criar contratos cromáticos consistentes
- Alinhar o sistema a padrões amplamente reconhecidos

---

## Conclusão

A camada de semantic colors é o vocabulário funcional da cor no design system. Ela transforma a paleta base em papéis claros de interface e permite que o sistema cresça sem depender diretamente de valores físicos.

No Giro, essa camada deve ser:

- **Clara**
- **Estável**
- **Contida**
- **Previsível**
- **Próxima do mercado**