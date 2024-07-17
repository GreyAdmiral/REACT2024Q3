import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layot } from '@components/Layot/Layot';
import { UndefinedPage } from '@components/UndefinedPage/UndefinedPage';
import { Main } from '@pages/Main/Main';
import { AppRoutes } from './routes';

export const AppRouter: FC = () => {
   return (
      <Routes>
         <Route path={AppRoutes.HOME_ROUTE} element={<Layot />}>
            <Route index element={<Navigate to={`${AppRoutes.PAGE_ROUTE}/1`} />} />
            <Route path={`${AppRoutes.PAGE_ROUTE}/:number`} element={<Main />} />
            <Route path={`${AppRoutes.INFO_ROUTE}/:title`} element={<Main />} />
            <Route path="*" element={<UndefinedPage />} />
         </Route>
      </Routes>
   );
};
