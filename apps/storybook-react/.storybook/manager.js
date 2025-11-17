// apps/storybook-react/.storybook/manager.ts
import { addons } from 'storybook/manager-api';
import { ZanthusTheme } from './theme';
import './manager.css'; // <--- importa o CSS

addons.setConfig({
  theme: ZanthusTheme,
});