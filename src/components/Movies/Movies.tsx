import { Component, ReactNode } from 'react';
import { Movie } from '@components/Movie/Movie';
import { MovieProps } from '@typefiles/types';
import styles from './Movies.module.scss';

interface MoviesArray extends React.PropsWithChildren {
   movies: MovieProps[];
   isError: boolean;
}

export class Movies extends Component<MoviesArray> {
   constructor(props: MoviesArray) {
      super(props);
   }

   componentDidUpdate(): void {
      if (this.props.isError) {
         throw Error('Тест ErrorBoundary!');
      }
   }

   render(): ReactNode {
      const { movies } = this.props;
      return (
         <section className={styles.movies}>
            {!movies.length && <span className={styles.moviesNotFound}>Ничего не найдено</span>}
            {movies.map((movie) => (
               <Movie key={movie.posterUrl} movie={movie} />
            ))}
         </section>
      );
   }
}
