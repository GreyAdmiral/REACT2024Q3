import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Kinopoisk } from '@api/Kinopoisk';
import { Movies } from '@components/Movies/Movies';
import { Searsh } from '@components/Search/Searsh';
import { Pagination } from '@components/Pagination/Pagination';
import { MovieInfo } from '@components/MovieInfo/MovieInfo';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage, setMovies, setTotalPages } from '@store/slices/stateSlice';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { MoviesProps } from '@typefiles/types';
import styles from './Main.module.scss';

export const Main = () => {
   const { number } = useParams();
   const apiRef = useRef<InstanceType<typeof Kinopoisk>>(new Kinopoisk());
   const { activePage, totalPages } = useAppSelector((state) => state.state);
   const { isVisible: isInfoVisible } = useAppSelector((state) => state.info);
   const dispatch = useAppDispatch();
   const [localStorageValue, setLocalStorageValue] = useLocalStorage('keywords');

   useEffect(() => {
      dispatch(setActivePage(Number(number)));
   }, [dispatch, number]);

   useEffect(() => {
      apiRef.current.getFilms({ activePage: activePage, keywords: localStorageValue }).then((data: MoviesProps) => {
         dispatch(setMovies(getFilteredFilms(data.items)));
         dispatch(setTotalPages(data.totalPages));
      });
   }, [activePage, dispatch, localStorageValue]);

   return (
      <>
         <Searsh apiRef={apiRef} localStorageValue={localStorageValue} setLocalStorageValue={setLocalStorageValue} />
         <div className={styles.content}>
            <Movies apiRef={apiRef} isInfoVisible={isInfoVisible} />

            {isInfoVisible && <MovieInfo />}
         </div>
         {totalPages && (
            <Pagination
               apiRef={apiRef}
               localStorageValue={localStorageValue}
               setLocalStorageValue={setLocalStorageValue}
            />
         )}
      </>
   );
};
