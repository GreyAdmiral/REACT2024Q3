import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { Kinopoisk } from '@api/Kinopoisk';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setIsLoading, setMovies, setTotalPages } from '@store/slices/stateSlice';
import { setIsVisible } from '@store/slices/infoSlice';
import { Movie } from '@components/Movie/Movie';
import { Loader } from '@components/Loader/Loader';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { MoviesProps } from '@typefiles/types';
import styles from './Movies.module.scss';

interface MoviesArray {
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   isInfoVisible: boolean;
}

export const Movies: FC<MoviesArray> = ({ apiRef, isInfoVisible }) => {
   const { movies, isError } = useAppSelector((state) => state.state);
   const isLoading = useAppSelector((state) => state.state.isLoading);
   const { activePage, keywords } = useAppSelector((state) => state.state);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (isError) {
         throw Error('Тест ErrorBoundary!');
      } else {
         dispatch(setIsVisible(false));
      }
   }, [dispatch, isError]);

   useEffect(() => {
      dispatch(setIsLoading(true));

      apiRef.current.getFilms({ activePage: activePage, keywords: keywords }).then((data: MoviesProps) => {
         dispatch(setMovies(getFilteredFilms(data.items)));
         dispatch(setTotalPages(data.totalPages));
         dispatch(setIsLoading(false));
      });
   }, [activePage, apiRef, dispatch, keywords]);

   return (
      <section
         className={classNames(styles.movies, { [styles.half]: isInfoVisible, [styles.moviesCenter]: isLoading })}
      >
         {!isLoading && (
            <>
               {!movies.length && <span className={styles.moviesNotFound}>Ничего не найдено</span>}
               {movies.map((movie) => (
                  <Movie key={movie.posterUrl} movie={movie} apiRef={apiRef} />
               ))}
            </>
         )}

         {isLoading && <Loader />}
      </section>
   );
};
