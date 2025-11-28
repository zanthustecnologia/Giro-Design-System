import type { Config } from 'jest';

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js"
  },

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", {
      presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript"
      ]
    }]
  },
  testMatch: ["**/__tests__/**/*.(spec|test).[jt]s?(x)"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(.*\\.mjs$))"
  ]
};

export default config;