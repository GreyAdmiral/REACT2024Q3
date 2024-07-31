import { FC, MutableRefObject } from 'react';
import { Container } from '@components/Container/Container';
import { Link } from 'react-router-dom';
import { ColorSchemeButton } from '@components/ColorSchemeButton/ColorSchemeButton';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage } from '@store/slices/stateSlice';
import { AppRoutes } from '@router/routes';
import styles from './Header.module.scss';

const headerTitle = 'Перейти на главную страницу';

interface HeaderProps {
   headerRef: MutableRefObject<HTMLTemplateElement | null>;
}

export const Header: FC<HeaderProps> = ({ headerRef }) => {
   const dispatch = useAppDispatch();

   function clickHandler() {
      dispatch(setActivePage(1));
   }
   return (
      <header className={styles.header} ref={headerRef}>
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
