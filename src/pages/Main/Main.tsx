import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Movies } from '@components/Movies/Movies';
import { Searsh } from '@components/Search/Searsh';
import { Pagination } from '@components/Pagination/Pagination';
import { MovieInfo } from '@components/MovieInfo/MovieInfo';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage, setKeywords } from '@store/slices/stateSlice';
import styles from './Main.module.scss';

export const Main = () => {
   const { number } = useParams();
   const { isVisible: isInfoVisible } = useAppSelector((state) => state.info);
   const { movies } = useAppSelector((state) => state.state);
   const dispatch = useAppDispatch();
   const [localStorageValue, setLocalStorageValue] = useLocalStorage('keywords');
   const [, setSearchParams] = useSearchParams();

   useEffect(() => {
      dispatch(setActivePage(Number(number)));
      dispatch(setKeywords(localStorageValue));

      if (localStorageValue) {
         setSearchParams({ search: '1', keywords: localStorageValue });
      } else {
         setSearchParams('');
      }
   }, [dispatch, localStorageValue, number, setSearchParams]);

   return (
      <>
         <Searsh localStorageValue={localStorageValue} setLocalStorageValue={setLocalStorageValue} />
         <div className={styles.content}>
            <Movies isInfoVisible={isInfoVisible} />

            {isInfoVisible && <MovieInfo />}
         </div>

         {movies.length && <Pagination />}
      </>
   );
};
