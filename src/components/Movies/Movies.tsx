'use client';
import { FC, useEffect } from 'react';
import { useGetFilmsQuery } from '@services/filmsApi';
import classNames from 'classnames';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setMovies, setTotalPages } from '@store/slices/stateSlice';
import { setIsVisible } from '@store/slices/infoSlice';
import { Movie } from '@components/Movie/Movie';
import { CustomNotification } from '@components/CustomNotification/CustomNotification';
import { resetSelectedMoviesId } from '@store/slices/selectedSlice';
import { getCSVLine } from '@tools/getCSVLine';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { downloadCSV } from '@/tools/downloadCSV';
import styles from './Movies.module.scss';
import type { MouseEventHandler } from 'react';

interface MoviesArray {
   isInfoVisible: boolean;
}

export const Movies: FC<MoviesArray> = ({ isInfoVisible }) => {
   const { keywords, activePage } = useAppSelector((state) => state.state);
   const { data = {}, isSuccess } = useGetFilmsQuery({ activePage, keywords });
   const { movies, isError } = useAppSelector((state) => state.state);
   const selectedMoviesId = useAppSelector((state) => state.selected.selectedMoviesId);
   const dispatch = useAppDispatch();
   const selectedSize = [...selectedMoviesId].length;

   const resetAllCheckBox = function (e) {
      e.stopPropagation();
      dispatch(resetSelectedMoviesId());
   } as MouseEventHandler<HTMLButtonElement>;

   const downloadSelectedInfo = function (e) {
      e.stopPropagation();

      const text = selectedMoviesId.reduce((acc: string, it: any, idx: number, arr: string | any[]) => {
         let string = getCSVLine(it);

         if (idx !== arr.length - 1) {
            string += '\n';
         }

         return acc + string;
      }, '');

      downloadCSV(text, `${selectedMoviesId.length}_movies`);
   } as MouseEventHandler<HTMLButtonElement>;

   useEffect(() => {
      if (isError) {
         throw Error('Тест обработки ошибок!');
      } else {
         dispatch(setIsVisible(false));
      }
   }, [dispatch, isError]);

   useEffect(() => {
      if (isSuccess) {
         const films = getFilteredFilms(data.items);

         dispatch(setMovies(films));
         dispatch(setTotalPages(data.totalPages));
      }
   }, [data.items, data.totalPages, dispatch, isSuccess]);

   return (
      <section
         className={classNames(styles.movies, { [styles.half]: isInfoVisible })}
         data-page={activePage + keywords}
      >
         {keywords && !movies.length && <span className={styles.movies_not_found}>Ничего не найдено</span>}
         {movies.map((movie) => (
            <Movie key={movie.kinopoiskId} movie={movie} />
         ))}

         <CustomNotification isOpenNotification={!!selectedSize}>
            <div className={styles.notification_text}>{`Выбрано фильмов: ${selectedSize}`}</div>
            <div className={styles.notification_buttons}>
               <button className={styles.notification_button} onClick={resetAllCheckBox}>
                  Сбросить выбор
               </button>

               <button className={styles.notification_button} onClick={downloadSelectedInfo}>
                  Загрузить
               </button>
            </div>
         </CustomNotification>
      </section>
   );
};
