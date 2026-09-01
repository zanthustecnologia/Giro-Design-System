import { readFileSync } from 'node:fs';

const outputPath = new URL('../build/dart/tokens.dart', import.meta.url);
const source = readFileSync(outputPath, 'utf8');
const declarations = source.match(/static const (?:Color|double|int|String) \w+ = .+;/g) ?? [];

if (!source.includes('class GiroTokens')) {
  throw new Error('A saída Dart não contém a classe GiroTokens.');
}

if (declarations.length < 50) {
  throw new Error(`A saída Dart contém apenas ${declarations.length} tokens tipados.`);
}

if (/static const \w+ = ['"]0['"];/m.test(source)) {
  throw new Error('A saída Dart contém tokens sem tipo convertidos para a string "0".');
}

if (!/static const Color \w+ = Color\(0x[0-9A-F]{8}\);/m.test(source)) {
  throw new Error('A saída Dart não contém tokens de cor válidos.');
}

if (!/static const double \w+ = \d+(?:\.\d+)?;/m.test(source)) {
  throw new Error('A saída Dart não contém tokens dimensionais válidos.');
}

console.log(`Validated ${declarations.length} typed Dart token declarations.`);
