import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:widgetbook/widgetbook.dart';

const double _width = 480;

final _items = [
  GiroSelectItem(value: 'sp', label: 'Sao Paulo'),
  GiroSelectItem(value: 'rj', label: 'Rio de Janeiro'),
  GiroSelectItem(value: 'mg', label: 'Minas Gerais'),
  GiroSelectItem(value: 'rs', label: 'Rio Grande do Sul'),
  GiroSelectItem(value: 'ba', label: 'Bahia'),
];

final _itemsWithIcon = [
  GiroSelectItem(
    value: 'sp',
    label: 'Sao Paulo',
    subTitle: 'Sudeste',
    icon: const Icon(FluentIcons.location_16_regular),
  ),
  GiroSelectItem(
    value: 'rj',
    label: 'Rio de Janeiro',
    subTitle: 'Sudeste',
    icon: const Icon(FluentIcons.location_16_regular),
  ),
  GiroSelectItem(
    value: 'mg',
    label: 'Minas Gerais',
    subTitle: 'Sudeste',
    icon: const Icon(FluentIcons.location_16_regular),
  ),
  GiroSelectItem(
    value: 'rs',
    label: 'Rio Grande do Sul',
    subTitle: 'Sul',
    icon: const Icon(FluentIcons.location_16_regular),
  ),
  GiroSelectItem(
    value: 'ba',
    label: 'Bahia',
    subTitle: 'Nordeste',
    icon: const Icon(FluentIcons.location_16_regular),
  ),
];

final _checkboxItems = [
  GiroSelectItem(value: 'sp', label: 'Sao Paulo'),
  GiroSelectItem(value: 'rj', label: 'Rio de Janeiro'),
  GiroSelectItem(value: 'mg', label: 'Minas Gerais'),
  GiroSelectItem(value: 'rs', label: 'Rio Grande do Sul'),
  GiroSelectItem(value: 'ba', label: 'Bahia'),
];

Widget _wrap(Widget child) {
  return Center(
    child: Padding(
      padding: const EdgeInsets.all(24.0),
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
            initialValue: 'Estado',
          );
          final hintText = context.knobs.string(
            label: 'Placeholder',
            initialValue: 'Selecione...',
          );
          final errorText = context.knobs.stringOrNull(
            label: 'Error Text',
            initialValue: null,
          );
          final helperText = context.knobs.stringOrNull(
            label: 'Helper Text',
            initialValue: 'Texto de suporte',
          );
          final required = context.knobs.boolean(
            label: 'Required',
            initialValue: false,
          );
          final enabled = context.knobs.boolean(
            label: 'Enabled',
            initialValue: true,
          );
          final variant = context.knobs.list<GiroSelectVariant>(
            label: 'Variant',
            options: GiroSelectVariant.values,
            labelBuilder: (v) => v.name,
            initialOption: GiroSelectVariant.text,
          );

          return _wrap(
            GiroSelect<String>(
              variant: variant,
              label: label,
              hintText: hintText,
              errorText: errorText,
              helperText: helperText,
              required: required,
              enabled: enabled,
              items: variant == GiroSelectVariant.icon
                  ? _itemsWithIcon
                  : variant == GiroSelectVariant.checkbox
                      ? _checkboxItems
                      : _items,
              width: _width,
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Text',
        builder: (context) => _wrap(
          GiroSelect<String>(
            label: 'Estado',
            hintText: 'Selecione...',
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com Icone',
        builder: (context) => _wrap(
          GiroSelect<String>(
            variant: GiroSelectVariant.icon,
            label: 'Estado',
            hintText: 'Selecione...',
            items: _itemsWithIcon,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Multipla selecao',
        builder: (context) => _wrap(
          GiroSelect<String>(
            variant: GiroSelectVariant.checkbox,
            label: 'Estados',
            hintText: 'Selecione...',
            helperText: 'Voce pode selecionar mais de um',
            items: _checkboxItems,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Obrigatorio',
        builder: (context) => _wrap(
          GiroSelect<String>(
            label: 'Estado',
            hintText: 'Selecione...',
            required: true,
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com valor selecionado',
        builder: (context) => _wrap(
          GiroSelect<String>(
            label: 'Estado',
            hintText: 'Selecione...',
            initialSelections: const ['sp'],
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Com Erro',
        builder: (context) => _wrap(
          GiroSelect<String>(
            label: 'Estado',
            hintText: 'Selecione...',
            errorText: 'Selecione uma opcao valida',
            required: true,
            items: _items,
            width: _width,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Desabilitado',
        builder: (context) => _wrap(
          GiroSelect<String>(
            label: 'Estado',
            hintText: 'Selecione...',
            enabled: false,
            items: _items,
            width: _width,
          ),
        ),
      ),
    ],
  );
}
