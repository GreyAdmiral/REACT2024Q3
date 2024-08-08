import StoreProvider from '@/store/StoreProvider';
import { Container } from '@/components/Container/Container';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { FirstColorScheme } from '@/components/FirstColorScheme/FirstColorScheme';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import '../styles/scss/style.scss';

export const metadata: Metadata = {
   title: 'Неофициальный Кинопоиск',
   description: 'Неофициальный Кинопоиск',
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="ru">
         <body>
            <StoreProvider>
               <div id="root" className="wrapper">
                  <FirstColorScheme />
                  <Header />
                  <div className="main">
                     <Container className="main">
                        <div className="main__body">{children}</div>
                     </Container>
                  </div>
                  <Footer />
               </div>
            </StoreProvider>
         </body>
      </html>
   );
}
