import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@components/Container/Container';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { useFastLocalStorage } from '@hooks/useFastLocalStorage';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setColorScheme } from '@store/slices/colorSchemeSlice';
import styles from './Layot.module.scss';

export const Layot = () => {
   const [saveScheme] = useFastLocalStorage('userScheme');
   const isAutoDark = useMediaQuery('(prefers-color-scheme: dark)');
   const dispatch = useAppDispatch();

   useEffect(() => {
      const schemeName = `${saveScheme ? saveScheme : isAutoDark ? 'dark' : 'light'}`;
      dispatch(setColorScheme(schemeName));
      document.body.className = schemeName;
   }, [dispatch, isAutoDark, saveScheme]);

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
