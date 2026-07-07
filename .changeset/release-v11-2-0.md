---
"@giro-ds/react": minor
---

### Added

#### VerificationCode

Reescrito com o primitivo `unstable_OneTimePasswordField` do Radix UI. A nova API inclui `validationType` (substitui `inputType`), `value` e `defaultValue` para controle de estado, `autoSubmit` para submit automático ao completar, `onValueChange` e `onAutoSubmit` como callbacks (substituem `onComplete`), e `name`/`form` para integração nativa com formulários. Adiciona também `readOnly` para estado somente leitura.

#### FileUpload

Novo componente de upload de arquivos com suporte a clique e drag & drop. Suporta modo controlado (`value` + `onChange`) e não controlado. Exibe thumbnails para imagens e ícone de documento para demais tipos. Props de controle: `maxFileSize`, `maxFilesQuantity`, `accept`, `multiple`, `disabled`, `error`, `errorMessage` e `descriptionErrorMessage`. Mensagens de erro são geradas automaticamente para violações de tipo, tamanho e quantidade. Inclui gestão de memória via `URL.createObjectURL` / `URL.revokeObjectURL`.

#### Modal

Adiciona a prop `customHeight?: string`, que define a altura do modal via CSS variable `--modal-custom-height`. O comportamento padrão (`auto`) é mantido quando a prop não é informada.

#### VirtualKeyboard

Adiciona as props `onTypeChange` e `showTypeSwitchKey`. O callback `onTypeChange` é disparado sempre que o tipo do teclado muda (inclusive na montagem inicial), permitindo reagir à alternância entre `default` e `numeric`. A prop `showTypeSwitchKey`, quando `false`, remove a tecla de alternância do layout default (a tecla espaço cresce) e substitui `{abc}` por espaço em branco no layout numeric. O tipo `VirtualKeyboardType` passou a ser exportado pelo pacote.

### Changed

#### VerificationCode

Renomeia a API para alinhamento com Radix UI.

| Antes | Depois |
| --- | --- |
| `inputType` (tipo `InputType`) | `validationType` (tipo `OTPValidationType`) |
| `onComplete` | `onValueChange` / `onAutoSubmit` |

O spread de props arbitrárias (`[key: string]: any`) foi removido em favor de tipagem estrita.

#### VirtualKeyboard

Renomeia e ajusta a assinatura do callback de digitação para alinhamento com o padrão Radix UI.

| Antes | Depois |
| --- | --- |
| `onChange: (e: ChangeEvent) => void` | `onValueChange: (value: string) => void` |

#### TextField

`font-family` e `font-weight` passam a ser definidos no container raiz e herdados (`inherit`) pelo input, placeholder e helper text. O clear button teve o tamanho aumentado de `16px` para `30px` e recebeu efeito visual de hover.

#### TextArea

`font-family` e `font-weight` passam a ser definidos no container raiz e herdados (`inherit`) pelo textarea, placeholder, helper text e contador de caracteres.

#### Search

`font-family` passa a ser definido no container raiz e herdado (`inherit`) pelo input e placeholder. O clear button teve o tamanho aumentado de `16px` para `30px` e recebeu efeito visual de hover.

### Deprecated

#### VerificationCode (implementação anterior)

A implementação anterior foi movida para `src/components/.deprecated/VerificationCode` e não deve ser usada em novos projetos. Utilize o novo `VerificationCode` baseado em Radix UI.

### Fixed

#### Label

Ajustes de CSS para correção de layout e alinhamento visual.

#### TableV2

Ajustes de CSS para correção de layout.
