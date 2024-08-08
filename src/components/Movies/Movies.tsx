import { FC, MutableRefObject, useEffect, MouseEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetFilmsQuery } from '@api/filmsApi';
import classNames from 'classnames';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setMovies, setTotalPages } from '@store/slices/stateSlice';
import { setIsVisible } from '@store/slices/infoSlice';
import { Movie } from '@components/Movie/Movie';
import { Loader } from '@components/Loader/Loader';
import { CustomNotification } from '@components/CustomNotification/CustomNotification';
import { resetSelectedMoviesId } from '@store/slices/selectedSlice';
import { getCSVLine } from '@tools/getCSVLine';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import styles from './Movies.module.scss';

interface MoviesArray {
   isInfoVisible: boolean;
}

export const Movies: FC<MoviesArray> = ({ isInfoVisible }) => {
   const { activePage, keywords } = useAppSelector((state) => state.state);
   const { data = {}, isLoading, isSuccess } = useGetFilmsQuery({ activePage, keywords });
   const { movies, isError } = useAppSelector((state) => state.state);
   const selectedMoviesId = useAppSelector((state) => state.selected.selectedMoviesId);
   const dispatch = useAppDispatch();
   const selectedSize = [...selectedMoviesId].length;
   const header: MutableRefObject<HTMLTemplateElement> = useOutletContext();

   function resetAllCheckBox(e: MouseEvent) {
      e.stopPropagation();
      dispatch(resetSelectedMoviesId());
   }

   function downloadSelectedInfo(e: MouseEvent) {
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
      header.current.scrollIntoView(true);

      if (isSuccess) {
         const films = getFilteredFilms(data.items);

         dispatch(setMovies(films));
         dispatch(setTotalPages(data.totalPages));
      }

      return () => {
         window.scroll(0, 0);
      };
   }, [data.items, data.totalPages, dispatch, header, isSuccess]);

   return (
      <section
         className={classNames(styles.movies, { [styles.half]: isInfoVisible, [styles.moviesCenter]: isLoading })}
         data-page={activePage + keywords}
      >
         {!isLoading && (
            <>
               {!movies.length && <span className={styles.moviesNotFound}>Ничего не найдено</span>}
               {movies.map((movie) => (
                  <Movie key={movie.kinopoiskId} movie={movie} />
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
