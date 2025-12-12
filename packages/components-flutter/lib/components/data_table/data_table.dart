export 'package:flutter/material.dart' show DataTable, DataColumn, DataRow, DataCell;

/// Material 3 DataTable
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// DataTable(
///   columns: [
///     DataColumn(label: Text('Name')),
///     DataColumn(label: Text('Age')),
///   ],
///   rows: [
///     DataRow(cells: [
///       DataCell(Text('John')),
///       DataCell(Text('30')),
///     ]),
///   ],
/// )
/// ```
