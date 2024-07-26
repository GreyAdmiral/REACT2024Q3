import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { Kinopoisk } from '@api/Kinopoisk';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setIsLoading, setMovies, setTotalPages } from '@store/slices/stateSlice';
import { setIsVisible } from '@store/slices/infoSlice';
import { Movie } from '@components/Movie/Movie';
import { Loader } from '@components/Loader/Loader';
import { CustomNotification } from '@components/CustomNotification/CustomNotification';
import { resetSelectedMoviesId } from '@store/slices/selectedSlice';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { MoviesProps } from '@typefiles/types';
import styles from './Movies.module.scss';
import { getCSVLine } from '@tools/getCSVLine';

interface MoviesArray {
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   isInfoVisible: boolean;
}

export const Movies: FC<MoviesArray> = ({ apiRef, isInfoVisible }) => {
   const { movies, isError } = useAppSelector((state) => state.state);
   const isLoading = useAppSelector((state) => state.state.isLoading);
   const selectedMoviesId = useAppSelector((state) => state.selected.selectedMoviesId);
   const { activePage, keywords } = useAppSelector((state) => state.state);
   const dispatch = useAppDispatch();
   const selectedSize = [...selectedMoviesId].length;

   function resetAllCheckBox(e: React.MouseEvent) {
      e.stopPropagation();
      dispatch(resetSelectedMoviesId());
   }

   function downloadSelectedInfo(e: React.MouseEvent) {
      e.stopPropagation();

      const text = selectedMoviesId.reduce((acc, it, idx, arr) => {
         let string = getCSVLine(it);

         if (idx !== arr.length - 1) {
            string += '\n';
         }

         return acc + string;
      }, '');

      const link = document.createElement('a');
      link.download = `${selectedMoviesId.length}_movies.csv`;
      link.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));

      link.click();
      URL.revokeObjectURL(link.href);
   }

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
                  <Movie key={movie.kinopoiskId} movie={movie} apiRef={apiRef} />
               ))}
            </>
         )}

         {isLoading && <Loader />}
         <CustomNotification isOpenNotification={!!selectedSize}>
            <div className={styles.notificationText}>{`Выбрано фильмов: ${selectedSize}`}</div>
            <div className={styles.notificationButtons}>
               <button className={styles.notificationButton} onClick={resetAllCheckBox}>
                  Сбросить выбор
               </button>
               <button className={styles.notificationButton} onClick={downloadSelectedInfo}>
                  Загрузить
               </button>
            </div>
         </CustomNotification>
      </section>
   );
};
