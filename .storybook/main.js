/** @type { import('@storybook/react-vite').StorybookConfig } */

const config = {
  stories: [
    "../packages/docs/storybook/stories/**/*.mdx",
    "../packages/components/**/*.stories.@(js|jsx|tsx)"
    // "..//**/*.stories.@(js|jsx|mjs|ts|tsx)",
    
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  }
};
export default config;