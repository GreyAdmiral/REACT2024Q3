import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { Kinopoisk } from '@api/Kinopoisk';
import { Movie } from '@components/Movie/Movie';
import { useAppSelector } from '@hooks/useAppSelector';
import styles from './Movies.module.scss';

interface MoviesArray {
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   isInfoVisible: boolean;
}

export const Movies: FC<MoviesArray> = ({ apiRef, isInfoVisible }) => {
   const { movies, isError } = useAppSelector((state) => state.state);

   useEffect(() => {
      if (isError) {
         throw Error('Тест ErrorBoundary!');
      }
   }, [isError]);

   return (
      <section className={classNames(styles.movies, { [styles.half]: isInfoVisible })}>
         {!movies.length && <span className={styles.moviesNotFound}>Ничего не найдено</span>}
         {movies.map((movie) => (
            <Movie key={movie.posterUrl} movie={movie} apiRef={apiRef} />
         ))}
      </section>
   );
};
