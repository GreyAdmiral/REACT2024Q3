import { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Lib, Main } from '@pages/index';

export const AppRouter: FC = () => {
   return (
      <HashRouter>
         <Routes>
            <Route path={AppRoutes.HOME_ROUTE} element={<Main />} />
            <Route path={AppRoutes.NATIVE_ROUTE} element={<Main />} />
            <Route path={AppRoutes.LIB_ROUTE} element={<Lib />} />
            <Route path="*" element={<Main />} />
         </Routes>
      </HashRouter>
   );
};
