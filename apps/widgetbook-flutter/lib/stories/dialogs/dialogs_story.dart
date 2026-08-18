import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent dialogsStory() {
  return WidgetbookComponent(
    name: 'Dialogs',
    useCases: [
      WidgetbookUseCase(
        name: 'Default',
        builder: (context) {
          final title = context.knobs.string(
            label: 'Title',
            initialValue: 'Título do dialog',
          );
          final bodyContent = context.knobs.string(
            label: 'Body Content',
            initialValue: 'Mensagem do dialog',
          );
          final textPrimaryAction = context.knobs.string(
            label: 'Primary Action',
            initialValue: 'Confirmar',
          );
          final textSecondaryAction = context.knobs.stringOrNull(
            label: 'Secondary Action',
            initialValue: 'Cancelar',
          );

          return Center(
            child: GiroButton.filled(
              text: 'Abrir Dialog',
              onPressed: () {
                showGiroDialog<void>(
                  context: context,
                  title: title,
                  bodyContent: bodyContent,
                  textPrimaryAction: textPrimaryAction,
                  textSecondaryAction: textSecondaryAction,
                );
              },
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Ação única',
        builder: (context) {
          return Center(
            child: GiroButton.filled(
              text: 'Abrir Dialog',
              onPressed: () {
                showGiroDialog<void>(
                  context: context,
                  title: 'Título do dialog',
                  bodyContent: 'Mensagem do dialog',
                  textPrimaryAction: 'Ok',
                );
              },
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Duas ações',
        builder: (context) {
          return Center(
            child: GiroButton.filled(
              text: 'Abrir Dialog',
              onPressed: () {
                showGiroDialog<void>(
                  context: context,
                  title: 'Confirmar ação',
                  bodyContent:
                      'Tem certeza que deseja continuar? Esta ação não pode ser desfeita.',
                  textPrimaryAction: 'Confirmar',
                  textSecondaryAction: 'Cancelar',
                );
              },
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Conteúdo longo',
        builder: (context) {
          return Center(
            child: GiroButton.filled(
              text: 'Abrir Dialog',
              onPressed: () {
                showGiroDialog<void>(
                  context: context,
                  title: 'Termos de uso',
                  bodyContent:
                      'Ao continuar, você concorda com os termos de uso e política de '
                      'privacidade da plataforma. Leia atentamente antes de prosseguir. '
                      'O uso indevido das informações pode resultar na suspensão da sua conta.',
                  textPrimaryAction: 'Aceitar',
                  textSecondaryAction: 'Recusar',
                );
              },
            ),
          );
        },
      ),
    ],
  );
}

