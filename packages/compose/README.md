# Giro Compose Library

Biblioteca Compose Multiplatform do design system, organizada para ser consumida por apps Android e Desktop/Linux desde agora, e pronta para receber tokens do DS posteriormente sem quebrar a API publica.

## Objetivo

Esta biblioteca nao existe para demonstrar componentes. Ela existe para ser a camada real de interface do DS em Compose:

- wrappers proprios do sistema sobre Material 3;
- API estavel para consumo pelos produtos;
- separacao clara entre biblioteca e showcase;
- base compartilhada para Android, Desktop/Linux e Web;
- caminho direto para inserir tokens, temas e semantica do DS depois.

## Targets

- `androidTarget()`
- `jvm("desktop")`
- `wasmJs`

## Estrutura

```text
packages/compose/
├── build.gradle.kts
├── gradle.properties
├── settings.gradle.kts
├── README.md
└── lib/
    ├── build.gradle.kts
    └── src/
        ├── commonMain/kotlin/com/zanthus/components/
        │   ├── app_bar/
        │   ├── badges/
        │   ├── bottom_sheet/
        │   ├── buttons/
        │   ├── cards/
        │   ├── chips/
        │   ├── dialogs/
        │   ├── dividers/
        │   ├── drawer/
        │   ├── fab/
        │   ├── icon_buttons/
        │   ├── list_item/
        │   ├── navigation_bar/
        │   ├── navigation_rail/
        │   ├── progress/
        │   ├── scaffold/
        │   ├── selection_controls/
        │   ├── slider/
        │   ├── snackbar/
        │   ├── tabs/
        │   ├── text_field/
        │   ├── theme/
        │   └── types/
        └── androidMain/AndroidManifest.xml
```

## Cobertura Atual

Os wrappers reais ja implementados nesta primeira base incluem:

- Actions: filled, outlined e text buttons; FAB small/default/large/extended; icon buttons
- Communication: alert dialog, snackbar host e progress indicators
- Containment: cards, modal drawer e modal bottom sheet
- Navigation: top app bars, bottom app bar, navigation bar, navigation rail e tabs
- Selection: chips, checkbox, radio, switch, slider e range slider
- Input: text field e outlined text field
- Data display: list item e badges
- Layout: scaffold e theme base

## Exemplo de Uso

```kotlin
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.zanthus.components.GiroFilledButton
import com.zanthus.components.GiroOutlinedTextField
import com.zanthus.components.GiroTheme

@Composable
fun AccountScreen() {
    GiroTheme {
        GiroFilledButton(onClick = {}) {
            Text("Salvar")
        }
    }
}
```

## Decisao de Arquitetura

Os componentes seguem a estrategia correta para um DS:

- o app consumidor importa `Giro*` em vez de usar Material 3 direto;
- a biblioteca encapsula o comportamento nativo do Compose;
- tokens entram depois na implementacao interna, nao no app consumidor;
- o showcase consome apenas a API publica desta lib.

## Tokens Depois

Os tokens ainda nao foram conectados. O `GiroTheme` atual e propositalmente simples para manter a biblioteca funcional enquanto a estrutura da API e do catalogo e consolidada.

Quando os tokens entrarem, o ponto principal de integracao sera:

- `theme/giro_theme.kt`
- futuros objetos/token mappers por categoria
- defaults semanticos dos componentes `Giro*`

## Como Evoluir

Proximos grupos naturais para expandir a biblioteca:

- menu e dropdown
- date picker e time picker
- tooltip
- search patterns
- componentes compostos do produto

## Publicacao e Consumo

Hoje o showcase referencia a biblioteca como modulo local. Para publicar para outros apps Compose, mantenha `group` e `version` em `lib/build.gradle.kts` e adicione o fluxo de publish que fizer sentido para o repositrio.
