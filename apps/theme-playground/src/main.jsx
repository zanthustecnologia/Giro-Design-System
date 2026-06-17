import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import '../../../packages/tokens/build-next/css/core.css';
import '../../../packages/tokens/build-next/css/semantic.css';
import '../../../packages/tokens/build-next/css/components.css';
import '../../../packages/tokens/build-next/css/themes/dark.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);