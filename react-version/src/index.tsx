import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); // null이 안되도록 HTMLElement만 되게 단언
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
