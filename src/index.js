import React from 'react';
import ReactDOM from 'react-dom/client'; // бібліотека для рендерингу
import App  from 'components/App';
import './index.css'; // імпорт стилів

// рендеринг компонента App в DOM-елемент з id root
ReactDOM.createRoot(document.getElementById('root')).render(

  // використання StrictMode для відлагодження
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
