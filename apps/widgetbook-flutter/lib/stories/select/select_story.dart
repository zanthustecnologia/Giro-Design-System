import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

const _items = [
  GiroSelectItem(value: 'one', label: 'Option One'),
  GiroSelectItem(value: 'two', label: 'Option Two'),
  GiroSelectItem(value: 'three', label: 'Option Three'),
  GiroSelectItem(value: 'four', label: 'Option Four'),
  GiroSelectItem(value: 'five', label: 'Option Five'),
];

const double _width = 480;

Widget _wrap(Widget child) {
  return Center(
    child: Padding(
      padding: const EdgeInsets.all(24),
      child: child,
    ),
  );
}

WidgetbookComponent selectStory() {
  return WidgetbookComponent(
    name: 'Select',
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
            initialValue: 'Selecione uma opção',
          );
          final helperText = context.knobs.stringOrNull(
            label: 'Helper Text',
            initialValue: 'Optional support text',
          );
          final errorText = context.knobs.stringOrNull(
            label: 'Error Text',
            initialValue: null,
          );
          final required = context.knobs.boolean(
            label: 'Required',
            initialValue: false,
          );
          final enabled = context.knobs.boolean(
            label: 'Enabled',
            initialValue: true,
          );

          return _wrap(
            GiroSelect(
              label: label,
              hintText: hintText,
              helperText: helperText,
              errorText: errorText,
              required: required,
              enabled: enabled,
              items: _items,
              width: _width,
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Select',
        builder: (context) => _wrap(
          const GiroSelect(
            label: 'Label',
            hintText: 'Selecione uma opção',
            helperText: 'Optional support text',
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Obrigatório',
        builder: (context) => _wrap(
          const GiroSelect(
            label: 'Label',
            hintText: 'Selecione uma opção',
            required: true,
            helperText: 'Optional support text',
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com valor selecionado',
        builder: (context) => _wrap(
          const GiroSelect(
            label: 'Label',
            initialSelection: 'two',
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com Erro',
        builder: (context) => _wrap(
          const GiroSelect(
            label: 'Label',
            hintText: 'Selecione uma opção',
            errorText: 'Mensagem de erro',
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Desabilitado',
        builder: (context) => _wrap(
          const GiroSelect(
            label: 'Label',
            hintText: 'Selecione uma opção',
            helperText: 'Optional support text',
            enabled: false,
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com busca',
        builder: (context) => _wrap(
          const GiroSelect(
            label: 'Label',
            hintText: 'Buscar...',
            enableSearch: true,
            items: _items,
            width: _width,
          ),
        ),
      ),
    ],
  );
}
