/** @type {import('storybook/react-vite').StorybookConfig} */
const config = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: [
    "../stories/**/*.mdx",
    "../../../packages/components-react/src/**/*.stories.@(js|jsx|tsx)",
  ]
  ,
  addons: []
};

export default config;
