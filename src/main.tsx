import React from 'react';
import { createRoot } from 'react-dom/client';

import 'common/utils/i18n';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
