import { NavLink } from 'react-router-dom';
import { AppRoutes, ROUTES_TRANSLATOR } from '@router/routes';
import styles from './main.module.scss';

const links = Object.entries(AppRoutes).filter(([, v]) => v !== AppRoutes.HOME_ROUTE);
const title = 'Ссылки:';

export const Main = () => {
   return (
      <section className={styles.main}>
         <h1 className={styles.mainTitle}>{title}</h1>

         <nav>
            <ul className={styles.mainList}>
               {links.map(([k, v]) => {
                  return (
                     <li key={v} className={styles.mainListItem}>
                        <NavLink to={v}>{ROUTES_TRANSLATOR[k]}</NavLink>
                     </li>
                  );
               })}
            </ul>
         </nav>
      </section>
   );
};
