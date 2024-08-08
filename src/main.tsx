import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from '@router/router';
import { Provider } from 'react-redux';
import store from './store';
import './scss/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <HashRouter>
            <AppRouter />
         </HashRouter>
      </Provider>
   </React.StrictMode>
);
