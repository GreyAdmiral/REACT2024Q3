import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from '@router/router';
import './scss/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <HashRouter>
         <AppRouter />
      </HashRouter>
   </React.StrictMode>
);
