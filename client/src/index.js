import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// For custom fonts (add to index.css or here)
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);