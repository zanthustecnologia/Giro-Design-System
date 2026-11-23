---
"@giro-ds/react": patch
---

Corrige o keyboard trap do `DatePicker`: `Tab`/`Shift+Tab` deixam de ser bloqueados no campo de data e fecham o calendário ao sair do campo. Atalhos com `Ctrl`/`Cmd` (colar, copiar, recortar, selecionar tudo) e as teclas `Home`/`End` também passam a funcionar. O valor colado continua passando pela máscara de data.
