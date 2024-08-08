import { Container } from '@components/Container/Container';
import { HeaderLink } from '@components/HeaderLink/HeaderLink';
import { ColorSchemeButton } from '@components/ColorSchemeButton/ColorSchemeButton';
import styles from './Header.module.scss';

export const Header = () => {
   return (
      <header className={styles.header}>
         <Container className={styles.header}>
            <div className={styles.header_body}>
               <h1 className={styles.header_title}>
                  <HeaderLink />
               </h1>
               <ColorSchemeButton />
            </div>
         </Container>
      </header>
   );
};
