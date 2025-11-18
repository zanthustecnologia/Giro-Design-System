// apps/storybook-react/.storybook/manager.ts
import { addons } from 'storybook/manager-api';
import { ZanthusTheme } from './theme';
import './manager.scss'; // <--- importa o SCSS

addons.setConfig({
  theme: ZanthusTheme,
});