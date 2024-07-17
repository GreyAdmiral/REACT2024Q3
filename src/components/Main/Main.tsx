import { Component, PropsWithChildren, ReactNode } from 'react';
import { Container } from '@components/Container/Container';
import { Movies } from '@components/Movies/Movies';
import { Searsh } from '@components/Search/Searsh';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Kinopoisk } from '@api/Kinopoisk';
import { getLocalStorageKeywords } from '@tools/getLocalStorageKeywords';
import { MoviesProps, MoviesState } from '@typefiles/types';
import styles from './Main.module.scss';

const api = new Kinopoisk();

export class Main extends Component<PropsWithChildren, MoviesState> {
   constructor(props: PropsWithChildren) {
      super(props);
      this.state = {
         activePage: 1,
         movies: [],
         totalPages: null,
         isError: false,
      };
   }

   componentDidMount(): void {
      const keywords = getLocalStorageKeywords();

      api.getFilms(this.state.activePage, keywords).then((data: MoviesProps) => {
         this.setState({ movies: data.items });
      });
   }

   render(): ReactNode {
      return (
         <div className={styles.main}>
            <Container className={styles.main}>
               <div className={styles.mainBody}>
                  <ErrorBoundary>
                     <Searsh setSearch={this.setState.bind(this)} state={this.state} api={api} />
                     <Movies movies={this.state.movies} isError={this.state.isError} />
                  </ErrorBoundary>
               </div>
            </Container>
         </div>
      );
   }
}
