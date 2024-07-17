import { Container } from '@components/Container/Container';
import styles from './Footer.module.scss';

export const Footer = () => {
   return (
      <footer className={styles.footer}>
         <Container className={styles.footer}>
            <div className={styles.footerBody}></div>
         </Container>
      </footer>
   );
};
