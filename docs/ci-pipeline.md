# Pipeline de qualidade

O gate unificado do Giro valida as partes publicáveis e demonstráveis do design system sem realizar deploy:

- geração e consistência dos tokens;
- tipos, testes e build da biblioteca React;
- build estático do Storybook;
- análise do pacote Flutter;
- análise e smoke test do Widgetbook.

## Execução local

```bash
pnpm check
```

Os grupos também podem ser executados separadamente:

```bash
pnpm check:tokens
pnpm check:react
pnpm check:storybook
pnpm check:flutter
```

## GitLab CI

O arquivo `.gitlab-ci.yml` divide o gate em quatro jobs:

1. `tokens` valida a geração e falha se os artefatos versionados estiverem desatualizados;
2. `react` executa typecheck, os testes em modo não interativo e o build da biblioteca;
3. `flutter` analisa Flutter e Widgetbook e executa o smoke test;
4. `storybook` confirma que a documentação gera um build estático.

Nenhum artefato é publicado e não há etapa de deploy.

## Política temporária do Hub

`apps/hub/**` está deliberadamente fora do pipeline enquanto o produto estiver em desenvolvimento. O Hub:

- não é instalado como workspace do pnpm;
- não é analisado ou compilado pelos jobs;
- não gera artefato;
- não é publicado ou implantado;
- não dispara jobs quando é a única área alterada.

Sua entrada futura no gate deve ser uma mudança explícita no workspace, nos scripts e nas regras do GitLab CI.
