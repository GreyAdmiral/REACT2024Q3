import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { Kinopoisk } from '@api/Kinopoisk';
import { Movie } from '@components/Movie/Movie';
import { MovieInfoStruct, MovieProps } from '@typefiles/types';
import styles from './Movies.module.scss';

interface MoviesArray {
   movies: MovieProps[];
   isError: boolean;
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   switchInfoVisibleref: React.MutableRefObject<(info: MovieInfoStruct) => void>;
   isInfoVisible: boolean;
}

export const Movies: FC<MoviesArray> = ({ movies, isError, apiRef, switchInfoVisibleref, isInfoVisible }) => {
   useEffect(() => {
      if (isError) {
         throw Error('Тест ErrorBoundary!');
      }
   }, [isError]);

   return (
      <section className={classNames(styles.movies, { [styles.half]: isInfoVisible })}>
         {!movies.length && <span className={styles.moviesNotFound}>Ничего не найдено</span>}
         {movies.map((movie) => (
            <Movie key={movie.posterUrl} movie={movie} apiRef={apiRef} switchInfoVisibleref={switchInfoVisibleref} />
         ))}
      </section>
   );
};
