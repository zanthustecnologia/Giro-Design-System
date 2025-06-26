module.exports = {
  // Source global para platforms que não definem source específico
  source: ['src/**/*.tokens.json'],
  
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          filter: (token) => !token.filePath.includes('themes'),
          options: { outputReferences: true }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          filter: (token) => !token.filePath.includes('themes'),
          options: { outputReferences: true }
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
          filter: (token) => !token.filePath.includes('themes')
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          filter: (token) => !token.filePath.includes('themes')
        }
      ]
    }
  }
};

module.exports = {
  source: ['src/themes/light.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens-light.css',
          format: 'css/variables',
          options: {
            selector: ':root, [data-theme="light"]',
            outputReferences: false
          }
        }
      ]
    }
  }
};

module.exports = {
  source: ['src/themes/dark.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: false
          }
        }
      ]
    }
  }
};