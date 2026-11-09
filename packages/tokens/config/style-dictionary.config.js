import StyleDictionary from 'style-dictionary';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toCssVarName(path) {
  return path
    .split('.')
    .map((segment) => segment.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())
    .join('-');
}

function toCssValue(value, preserveReferences) {
  const rawValue = String(value);
  if (!preserveReferences) return rawValue;
  return rawValue.replace(/\{([^}]+)\}/g, (_, path) => `var(--${toCssVarName(path)})`);
}

function getLayerVariables(dictionary, layerPath, preserveReferences) {
  return dictionary.allTokens
    .filter((token) => token.filePath.includes(layerPath))
    .map((token) => {
      const sourceValue = preserveReferences ? (token.original?.value ?? token.value) : token.value;
      return `  --${token.name}: ${toCssValue(sourceValue, preserveReferences)};`;
    })
    .join('\n');
}

// ─── Formatos ────────────────────────────────────────────────────────────────

// Legado: todos os tokens resolvidos em arquivo único
StyleDictionary.registerFormat({
  name: 'css/legacy-tokens',
  format: function({ dictionary, options }) {
    const fontUrl = options.fontUrl;
    const header = [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */',
      `@import url("${fontUrl}");`
    ].join('\n');
    const variables = dictionary.allTokens.map(token => `  --${token.name}: ${token.value};`).join('\n');
    return `${header}\n:root {\n${variables}\n}\n`;
  }
});

// Tokens primitivos (core) com import da fonte
StyleDictionary.registerFormat({
  name: 'css/variables-with-font-import',
  format: function({ dictionary, options }) {
    const fontUrl = options.fontUrl;
    const header = [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */',
      `@import url("${fontUrl}");`
    ].join('\n');
    const variables = getLayerVariables(dictionary, 'src/core/', false);
    return `${header}\n:root {\n${variables}\n}\n`;
  }
});

// Tokens semânticos e de componentes com referências preservadas
StyleDictionary.registerFormat({
  name: 'css/variables-layer',
  format: function({ dictionary, options }) {
    const header = [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */'
    ].join('\n');
    const vars = getLayerVariables(dictionary, options.layerPath, true);
    return `${header}\n:root {\n${vars}\n}\n`;
  }
});

// Override de tema (ex: dark)
StyleDictionary.registerFormat({
  name: 'css/theme-override',
  format: function({ dictionary, options }) {
    const selector = options.selector || ':root';
    const header = [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */'
    ].join('\n');
    const vars = getLayerVariables(dictionary, options.layerPath, true);
    return `${header}\n${selector} {\n${vars}\n}\n`;
  }
});

// SCSS: variáveis filtradas por camada com valores resolvidos
StyleDictionary.registerFormat({
  name: 'scss/variables-layer',
  format: function({ dictionary, options }) {
    const header = '// Do not edit directly, this file was auto-generated.';
    const vars = dictionary.allTokens
      .filter((token) => token.filePath.includes(options.layerPath))
      .map((token) => `$${token.name}: ${token.value};`)
      .join('\n');
    return `${header}\n${vars}\n`;
  }
});

// Flutter/Dart
StyleDictionary.registerFormat({
  name: 'flutter/class-custom',
  format: function({ dictionary, options }) {
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
      "import 'dart:ui';",
      '',
      `class ${className} {`,
      `    ${className}._();`,
      ''
    ].join('\n');
    const tokens = dictionary.allTokens.map(token => {
      const name = token.name.charAt(0).toLowerCase() + token.name.slice(1);
      let value = token.value;
      let valueStr = String(value);
      if (valueStr === 'NaN' || valueStr === 'inherit') {
        value = 0.0;
      } else if (valueStr.includes(',') && !valueStr.startsWith('Color(')) {
        value = `'${valueStr.split(',')[0].trim().replace(/["']/g, '')}'`;
      } else if (name.includes('fontSize') && !isNaN(parseFloat(valueStr))) {
        const numValue = parseFloat(valueStr) / 16;
        value = Number.isInteger(numValue) ? `${numValue}.0` : numValue;
      } else if (!valueStr.startsWith('Color(') && !valueStr.includes("'") && !valueStr.includes('"')) {
        const cleaned = valueStr.replace(/px/g, '').replace(/%/g, '');
        if (!isNaN(parseFloat(cleaned)) && cleaned.trim() !== '') {
          const numValue = parseFloat(cleaned);
          if (name.includes('spacing') || name.includes('borderRadius') || name.includes('fontSize')) {
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

// ─── Transforms ──────────────────────────────────────────────────────────────

StyleDictionary.registerTransform({
  name: 'size/flutter',
  type: 'value',
  matcher: (token) => {
    const value = String(token.value);
    return (value.includes('px') || value.includes('%')) && !value.startsWith('#');
  },
  transform: (token) => {
    const value = String(token.value);
    const numericValue = parseFloat(value);
    if (value === 'inherit' || isNaN(numericValue)) return 0.0;
    return numericValue;
  }
});

StyleDictionary.registerTransform({
  name: 'color/flutter-hex',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transform: (token) => {
    const value = String(token.value).replace('#', '').toUpperCase();
    return `Color(0xFF${value})`;
  }
});

StyleDictionary.registerTransform({
  name: 'font/flutter',
  type: 'value',
  matcher: (token) => token.type === 'fontFamily' || token.path.includes('family'),
  transform: (token) => {
    const value = String(token.value);
    const cleaned = value.replace(/["']/g, '').split(',')[0].trim();
    return `'${cleaned}'`;
  }
});

StyleDictionary.registerTransformGroup({
  name: 'flutter-custom',
  transforms: ['attribute/cti', 'name/pascal', 'color/flutter-hex', 'size/flutter', 'font/flutter']
});

// ─── Config ──────────────────────────────────────────────────────────────────

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap';

const legacy = {
  source: [
    'src/border/**/*.json',
    'src/colors/**/*.json',
    'src/spacing/**/*.json',
    'src/typography/**/*.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [{
        destination: 'css/tokens.css',
        format: 'css/legacy-tokens',
        options: { fontUrl: FONT_URL }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{ destination: 'js/tokens.js', format: 'javascript/es6' }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/',
      files: [{ destination: 'scss/tokens.scss', format: 'scss/variables' }]
    },
    flutter: {
      transformGroup: 'flutter-custom',
      buildPath: 'build/',
      files: [{
        destination: 'dart/tokens.dart',
        format: 'flutter/class-custom',
        options: { className: 'GiroTokens' }
      }]
    }
  }
};

const base = {
  include: ['src/core/**/*.json'],
  source: [
    'src/semantic/**/*.json',
    'src/components/**/*.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [
        {
          destination: 'css/core.css',
          format: 'css/variables-with-font-import',
          options: { fontUrl: FONT_URL }
        },
        {
          destination: 'css/semantic.css',
          format: 'css/variables-layer',
          options: { layerPath: 'src/semantic/' }
        },
        {
          destination: 'css/components.css',
          format: 'css/variables-layer',
          options: { layerPath: 'src/components/' }
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/',
      files: [
        {
          destination: 'scss/core.scss',
          format: 'scss/variables-layer',
          options: { layerPath: 'src/core/' }
        },
        {
          destination: 'scss/semantic.scss',
          format: 'scss/variables-layer',
          options: { layerPath: 'src/semantic/' }
        },
        {
          destination: 'scss/components.scss',
          format: 'scss/variables-layer',
          options: { layerPath: 'src/components/' }
        }
      ]
    }
  }
};

const dark = {
  include: ['src/core/**/*.json'],
  source: ['src/themes/dark/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [{
        destination: 'css/themes/dark.css',
        format: 'css/theme-override',
        options: {
          selector: '[data-theme="dark"]',
          layerPath: 'src/themes/dark/'
        }
      }]
    }
  }
};

// ─── Build ───────────────────────────────────────────────────────────────────

await new StyleDictionary(legacy).buildAllPlatforms();
await new StyleDictionary(base).buildAllPlatforms();
await new StyleDictionary(dark).buildAllPlatforms();