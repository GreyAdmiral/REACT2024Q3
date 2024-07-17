import { Container } from '@components/Container/Container';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@router/routes';
import styles from './Header.module.scss';

const headerTitle = 'Перейти на главную страницу';

export const Header = () => {
   return (
      <header className={styles.header}>
         <Container className={styles.header}>
            <div className={styles.headerBody}>
               <h1 className={styles.headerTitle}>
                  <Link to={AppRoutes.HOME_ROUTE} title={headerTitle}>
                     Неофициальный кинопоиск
                  </Link>
               </h1>
            </div>
         </Container>
      </header>
   );
};
