# Giro Compose Catalog

Aplicacao de documentacao e showcase da biblioteca Compose Multiplatform do design system.

## O Que Este App Faz

Este app existe para o design e a engenharia visualizarem os componentes reais da biblioteca em tempo real, sem depender de um app de produto especifico.

Ele nao contem implementacoes paralelas dos componentes. O catalogo consome apenas `packages/compose/lib`.

## Targets

- Android
- Desktop/Linux via JVM
- Web via `wasmJs`

## Estrutura

```text
apps/showcase-compose/
├── build.gradle.kts
├── gradle.properties
├── settings.gradle.kts
├── README.md
└── app/
    ├── build.gradle.kts
    └── src/
        ├── commonMain/kotlin/com/zanthus/showcase/compose/
        │   ├── model/
        │   ├── stories/
        │   │   ├── actions/
        │   │   ├── communication/
        │   │   ├── containment/
        │   │   ├── data_display/
        │   │   ├── input/
        │   │   ├── navigation/
        │   │   └── selection/
        │   └── App.kt
        ├── androidMain/
        ├── desktopMain/
        └── wasmJsMain/
└── showkase/
    └── src/main/
```

## Como Rodar

Os comandos abaixo usam o wrapper Gradle incluido no projeto:

```bash
# Android
gradlew.bat :app:installDebug

# Desktop/Linux
gradlew.bat :app:run

# Web/Wasm
gradlew.bat :app:wasmJsBrowserDevelopmentRun
```

Na raiz do monorepo, no Windows, voce tambem pode subir o catalogo web com:

```bash
pnpm run dev:showcase:compose
```

## Como O Catalogo Esta Organizado

Cada categoria do catalogo possui stories que usam a API publica do DS:

- Actions
- Communication
- Containment
- Navigation
- Selection
- Input
- Data Display

O diretório tambem inclui um modulo Android `showkase/` para browse nativo via Showkase, enquanto `app/` cobre Android, Desktop/Linux e Web.

## Fluxo Esperado de Trabalho

1. Design ou engenharia ajusta um componente em `packages/compose/lib`.
2. O catalogo recompila consumindo a mesma API.
3. O resultado pode ser validado em Android, Desktop ou Web.
4. Quando os tokens forem conectados, a visualizacao muda em tempo real sem alterar as stories.

## Por Que Esta Separacao Importa

Sem essa separacao, o showcase vira uma segunda implementacao. Com essa estrutura:

- a biblioteca continua sendo consumivel por qualquer app Compose;
- o catalogo vira apenas documentacao executavel;
- o design consegue validar mudancas sem depender de um produto final.