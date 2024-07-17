import { Component, ReactNode } from 'react';
import { Container } from '@components/Container/Container';
import styles from './Footer.module.scss';

export class Footer extends Component {
   render(): ReactNode {
      return (
         <footer className={styles.footer}>
            <Container className={styles.footer}>
               <div className={styles.footerBody}></div>
            </Container>
         </footer>
      );
   }
}
