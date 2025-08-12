const path = require("node:path");

/** @type { import('@storybook/react-vite').StorybookConfig } */
module.exports = {
  stories: [
    // Caminho absoluto corrigido para componentes
    "../../packages/components-react/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    // Caminho para stories locais
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/**/*.mdx",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@chromatic-com/storybook",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  async viteFinal(cfg) {
    cfg.resolve ??= {};
    cfg.optimizeDeps ??= {};
    cfg.ssr ??= {};

    cfg.resolve.dedupe = Array.from(new Set([...(cfg.resolve.dedupe ?? []), "react", "react-dom"]));
    cfg.resolve.alias = { ...(cfg.resolve.alias ?? {}), "react-dom/client": require.resolve("react-dom/client") };
    cfg.optimizeDeps.include = Array.from(new Set([...(cfg.optimizeDeps.include ?? []), "react", "react-dom", "react-dom/client"]));
    cfg.optimizeDeps.exclude = Array.from(new Set([...(cfg.optimizeDeps.exclude ?? []), "@fluentui/react-icons", "react-router"]));
    cfg.ssr.noExternal = Array.from(new Set([...(Array.isArray(cfg.ssr.noExternal) ? cfg.ssr.noExternal : []), "@fluentui/react-icons", "react-router"]));
    return cfg;
  },
};