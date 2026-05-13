import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:widgetbook/widgetbook.dart';

Widget _wrap(Widget child) {
  return Center(
    child: Padding(
      padding: const EdgeInsets.all(24.0),
      child: child,
    ),
  );
}

WidgetbookComponent textFieldStory() {
  return WidgetbookComponent(
    name: 'TextField',
    useCases: [
      WidgetbookUseCase(
        name: 'Default',
        builder: (context) {
          final label = context.knobs.string(
            label: 'Label',
            initialValue: 'Label',
          );
          final hintText = context.knobs.string(
            label: 'Placeholder',
            initialValue: 'Digite algo...',
          );
          final errorText = context.knobs.stringOrNull(
            label: 'Error Text',
            initialValue: null,
          );
          final helperText = context.knobs.stringOrNull(
            label: 'Helper Text',
            initialValue: 'Optional support text',
          );
          final required = context.knobs.boolean(
            label: 'Required',
            initialValue: false,
          );
          final enabled = context.knobs.boolean(
            label: 'Enabled',
            initialValue: true,
          );
          final obscureText = context.knobs.boolean(
            label: 'Obscure Text',
            initialValue: false,
          );
          final showSuffixIcon = context.knobs.boolean(
            label: 'Show Suffix Icon',
            initialValue: false,
          );

          return _wrap(
            GiroTextField(
              label: label,
              hintText: hintText,
              errorText: errorText,
              helperText: helperText,
              required: required,
              enabled: enabled,
              obscureText: obscureText,
              suffixIcon: showSuffixIcon
                  ? const Icon(FluentIcons.mail_16_regular)
                  : null,
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'TextField',
        builder: (context) => _wrap(
          const GiroTextField(
            label: 'Label',
            hintText: 'Placeholder',
            helperText: 'Optional support text',
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Obrigatório',
        builder: (context) => _wrap(
          const GiroTextField(
            label: 'Label',
            hintText: 'Placeholder',
            required: true,
            helperText: 'Optional support text',
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com Erro',
        builder: (context) => _wrap(
          const GiroTextField(
            label: 'Label',
            hintText: 'Placeholder',
            errorText: 'Mensagem de erro',
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Desabilitado',
        builder: (context) => _wrap(
          const GiroTextField(
            label: 'Label',
            hintText: 'Placeholder',
            helperText: 'Optional support text',
            enabled: false,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com Ícone de Sufixo',
        builder: (context) => _wrap(
          const GiroTextField(
            label: 'E-mail',
            hintText: 'exemplo@giro.com',
            suffixIcon: Icon(FluentIcons.mail_16_regular),
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Todas as variantes',
        builder: (context) => _wrap(
          Column(
            mainAxisSize: MainAxisSize.min,
            children: const [
              GiroTextField(
                label: 'Default',
                hintText: 'Placeholder',
                helperText: 'Optional support text',
              ),
              SizedBox(height: 16),
              GiroTextField(
                label: 'Obrigatório',
                hintText: 'Placeholder',
                required: true,
              ),
              SizedBox(height: 16),
              GiroTextField(
                label: 'Com Erro',
                hintText: 'Placeholder',
                errorText: 'Mensagem de erro',
              ),
              SizedBox(height: 16),
              GiroTextField(
                label: 'Desabilitado',
                hintText: 'Placeholder',
                enabled: false,
              ),
              SizedBox(height: 16),
              GiroTextField(
                label: 'E-mail',
                hintText: 'exemplo@giro.com',
                suffixIcon: Icon(FluentIcons.mail_16_regular),
              ),
            ],
          ),
        ),
      ),
    ],
  );
}
