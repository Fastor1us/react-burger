import React from 'react';
import { createRoot } from 'react-dom/client';

import './normalize.css';

import App from './components/app/app';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
