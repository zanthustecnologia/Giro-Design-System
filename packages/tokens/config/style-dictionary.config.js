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
    }
  }
};