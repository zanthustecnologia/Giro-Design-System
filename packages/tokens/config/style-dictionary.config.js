module.exports = {
  source: ['src/**/*.tokens.json'], // usado como fallback, mas sobrescrito abaixo
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      source: [
        'src/colors/**/*.tokens.json',
        'src/spacing/**/*.tokens.json',
        'src/border/**/*.tokens.json',
        'src/typography/**/*.tokens.json'
      ],
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      source: [
        'src/colors/**/*.tokens.json',
        'src/spacing/**/*.tokens.json',
        'src/border/**/*.tokens.json',
        'src/typography/**/*.tokens.json'
      ],
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          options: { outputReferences: true }
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      source: [
        'src/colors/**/*.tokens.json',
        'src/spacing/**/*.tokens.json',
        'src/border/**/*.tokens.json',
        'src/typography/**/*.tokens.json'
      ],
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      source: [
        'src/colors/**/*.tokens.json',
        'src/spacing/**/*.tokens.json',
        'src/border/**/*.tokens.json',
        'src/typography/**/*.tokens.json'
      ],
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables'
        }
      ]
    },
    light: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      source: ['src/themes/light.tokens.json'],
      files: [
        {
          destination: 'tokens-light.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root, [data-theme="light"]'
          }
        }
      ]
    },
    dark: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      source: ['src/themes/dark.tokens.json'],
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: '[data-theme="dark"]'
          }
        }
      ]
    }
  }
};
