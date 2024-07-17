import { Outlet } from 'react-router-dom';
import { Container } from '@components/Container/Container';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import styles from './Layot.module.scss';

export const Layot = () => {
   return (
      <>
         <Header />
         <div className={styles.main}>
            <Container className={styles.main}>
               <div className={styles.mainBody}>
                  <ErrorBoundary>
                     <Outlet />
                  </ErrorBoundary>
               </div>
            </Container>
         </div>
         <Footer />
      </>
   );
};
