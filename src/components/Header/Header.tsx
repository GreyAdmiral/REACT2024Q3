import { Container } from '@components/Container/Container';
import { Link } from 'react-router-dom';
import { ColorSchemeButton } from '@components/ColorSchemeButton/ColorSchemeButton';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage } from '@store/slices/stateSlice';
import { AppRoutes } from '@router/routes';
import styles from './Header.module.scss';

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
                  <Link
                     to={AppRoutes.HOME_ROUTE}
                     className={styles.headerTitleLink}
                     title={headerTitle}
                     onClick={clickHandler}
                  >
                     Неофициальный кинопоиск
                  </Link>
               </h1>
               <ColorSchemeButton />
            </div>
         </Container>
      </header>
   );
};
