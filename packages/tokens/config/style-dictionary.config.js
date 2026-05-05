import StyleDictionary from 'style-dictionary';

// formato personalizado para CSS que inclui automaticamente o @import da fonte
StyleDictionary.registerFormat({
  name: 'css/variables-with-font-import',
  format: function({ dictionary, options }) {
    const fontUrl = options.fontUrl
    
    const header = [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */',
      `@import url("${fontUrl}");`
    ].join('\n');

    const variables = dictionary.allTokens.map(token => {
      return `  --${token.name}: ${token.value};`;
    }).join('\n');

    return `${header}\n:root {\n${variables}\n}\n`;
  }
});

// Formato customizado para Flutter/Dart que remove unidades
StyleDictionary.registerFormat({
  name: 'flutter/class-custom',
  format: function({ dictionary, options, file }) {
    const className = options.className || 'Tokens';
    
    const header = [
      '',
      '//',
      `// dart/tokens.dart`,
      '//',
      '',
      '// Do not edit directly, this file was auto-generated.',
      '',
      '',
      '',
      'import \'dart:ui\';',
      '',
      `class ${className} {`,
      `    ${className}._();`,
      ''
    ].join('\n');

    const tokens = dictionary.allTokens.map(token => {
      const name = token.name.charAt(0).toLowerCase() + token.name.slice(1);
      let value = token.value;
      
      // Pós-processa valores
      let valueStr = String(value);
      
      // Trata inherit
      if (valueStr === 'NaN' || valueStr === 'inherit') {
        value = 0.0;
      }
      // Corrige fontFamily (tem vírgula mas não é Color)
      else if (valueStr.includes(',') && !valueStr.startsWith('Color(')) {
        value = `'${valueStr.split(',')[0].trim().replace(/["']/g, '')}'`;
      }
      // Corrige fontSize (foi multiplicado por 16 pelo transform do Flutter)
      else if (name.includes('fontSize') && !isNaN(parseFloat(valueStr))) {
        const numValue = parseFloat(valueStr) / 16;
        value = Number.isInteger(numValue) ? `${numValue}.0` : numValue;
      }
      // Remove px e % (mas mantém Color() e strings com aspas)
      else if (!valueStr.startsWith('Color(') && !valueStr.includes("'") && !valueStr.includes('"')) {
        const cleaned = valueStr.replace(/px/g, '').replace(/%/g, '');
        // Se virou número, converte
        if (!isNaN(parseFloat(cleaned)) && cleaned.trim() !== '') {
          const numValue = parseFloat(cleaned);
          // Spacing, borderRadius, fontSize e borderWidth precisam ser double
          if (name.includes('spacing') || name.includes('borderRadius') || name.includes('fontSize') || name.includes('borderWidth')) {
            value = Number.isInteger(numValue) ? `${numValue}.0` : numValue;
          } else {
            value = numValue;
          }
        }
      }
      
      return `    static const ${name} = ${value};`;
    }).join('\n');

    return `${header}${tokens}\n}\n`;
  }
});

// Transformador customizado para remover unidades (px, %, etc) e retornar número
StyleDictionary.registerTransform({
  name: 'size/flutter',
  type: 'value',
  matcher: (token) => {
    const value = String(token.value);
    // Aplica APENAS se o valor tem px ou % 
    return (value.includes('px') || value.includes('%')) && !value.startsWith('#');
  },
  transform: (token) => {
    const value = String(token.value);
    // Remove px, %, e outras unidades, mantém apenas o número
    const numericValue = parseFloat(value);
    
    // Trata casos especiais
    if (value === 'inherit' || isNaN(numericValue)) {
      return 0.0;
    }
    
    // Retorna como número (sem aspas) para Dart
    return numericValue;
  }
});

// Transformador customizado para cores Flutter
StyleDictionary.registerTransform({
  name: 'color/flutter-hex',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transform: (token) => {
    const value = String(token.value).replace('#', '').toUpperCase();
    return `Color(0xFF${value})`;
  }
});

// Transformador customizado para font family
StyleDictionary.registerTransform({
  name: 'font/flutter',
  type: 'value',
  matcher: (token) => token.type === 'fontFamily' || token.path.includes('family'),
  transform: (token) => {
    const value = String(token.value);
    // Remove aspas duplas extras e fallbacks CSS, retorna com aspas simples
    const cleaned = value.replace(/["']/g, '').split(',')[0].trim();
    return `'${cleaned}'`;
  }
});

// Registrar transformGroup customizado para Flutter  
StyleDictionary.registerTransformGroup({
  name: 'flutter-custom',
  transforms: [
    'attribute/cti',
    'name/pascal',
    'color/flutter-hex',
    'size/flutter',
    'font/flutter'
  ]
});

export default {
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [{
        destination: 'css/tokens.css',
        format: 'css/variables-with-font-import',
        options: {
          outputReferences: false,
          fontUrl: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap'
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{
        destination: 'js/tokens.js',
        format: 'javascript/es6'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/',
      files: [{
        destination: 'scss/tokens.scss',
        format: 'scss/variables'
      }]
    },
    flutter: {
      transformGroup: 'flutter',
      buildPath: 'build/',
      files: [{
        destination: 'dart/tokens.dart',
        format: 'flutter/class-custom',
        options: {
          className: 'GiroTokens'
        }
      }]
    }
  }
};