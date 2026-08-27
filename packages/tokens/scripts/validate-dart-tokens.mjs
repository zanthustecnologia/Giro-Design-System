import { readFile } from 'node:fs/promises';

const dartTokensUrl = new URL('../build/dart/tokens.dart', import.meta.url);
const source = await readFile(dartTokensUrl, 'utf8');

const declarations = new Map(
  [...source.matchAll(/static const (\w+) (\w+) = ([^;]+);/g)].map(
    ([, type, name, value]) => [name, { type, value: value.trim() }],
  ),
);

const errors = [];

if (declarations.size === 0) {
  errors.push('nenhum token Dart foi encontrado');
}

for (const [name, { type, value }] of declarations) {
  if (/^color/.test(name) && (type !== 'Color' || !/^Color\(0x[0-9A-F]{8}\)$/.test(value))) {
    errors.push(`${name} deveria ser um Color ARGB, mas recebeu: ${type} ${value}`);
  }

  if (/^(spacing|borderRadius|borderWidth|fontSize)/.test(name) && (type !== 'double' || !/^-?\d+(?:\.\d+)?$/.test(value))) {
    errors.push(`${name} deveria ser double, mas recebeu: ${type} ${value}`);
  }

  if (/^fontWeight/.test(name) && (type !== 'int' || !/^-?\d+$/.test(value))) {
    errors.push(`${name} deveria ser int, mas recebeu: ${type} ${value}`);
  }

  if (/^fontFamily/.test(name) && (type !== 'String' || !/^'[^']+'$/.test(value))) {
    errors.push(`${name} deveria ser String, mas recebeu: ${type} ${value}`);
  }

  if (/\b(?:NaN|undefined|null|\[object Object\])\b/.test(value) || /^['"]0['"]$/.test(value)) {
    errors.push(`${name} contém um valor inválido: ${value}`);
  }
}

const requiredTokens = [
  'colorBrandPrimaryDefault',
  'spacing4',
  'fontFamilyPrimary',
  'fontSize16',
  'fontWeightRegular',
];

for (const token of requiredTokens) {
  if (!declarations.has(token)) {
    errors.push(`token obrigatório ausente: ${token}`);
  }
}

if (errors.length > 0) {
  console.error(`Validação dos tokens Dart falhou:\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`Tokens Dart válidos: ${declarations.size} declarações verificadas.`);
}
