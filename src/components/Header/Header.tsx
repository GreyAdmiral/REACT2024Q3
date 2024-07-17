import { Component, ReactNode } from 'react';
import { Container } from '@components/Container/Container';
import styles from './Header.module.scss';

export class Header extends Component {
   render(): ReactNode {
      return (
         <header className={styles.header}>
            <Container className={styles.header}>
               <div className={styles.headerBody}>
                  <h1 className={styles.headerTitle}>Неофициальный кинопоиск</h1>
               </div>
            </Container>
         </header>
      );
   }
}
