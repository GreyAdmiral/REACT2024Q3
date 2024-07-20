import { Container } from '@components/Container/Container';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@router/routes';
import styles from './Header.module.scss';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage } from '@store/slices/stateSlice';

const headerTitle = 'Перейти на главную страницу';

export const Header = () => {
   const dispatch = useAppDispatch();

   function clickHandler() {
      dispatch(setActivePage(1));
   }
   return (
      <header className={styles.header}>
         <Container className={styles.header}>
            <div className={styles.headerBody}>
               <h1 className={styles.headerTitle}>
                  <Link to={AppRoutes.HOME_ROUTE} title={headerTitle} onClick={clickHandler}>
                     Неофициальный кинопоиск
                  </Link>
               </h1>
            </div>
         </Container>
      </header>
   );
};
