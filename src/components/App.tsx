import { Component, ReactNode } from 'react';
import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';

export class App extends Component {
   render(): ReactNode {
      return (
         <>
            <Header />
            <Main />
            <Footer />
         </>
      );
   }
}
