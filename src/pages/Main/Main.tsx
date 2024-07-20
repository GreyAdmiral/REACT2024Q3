import { useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Kinopoisk } from '@api/Kinopoisk';
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
   const apiRef = useRef<InstanceType<typeof Kinopoisk>>(new Kinopoisk());
   const { isVisible: isInfoVisible } = useAppSelector((state) => state.info);
   const isLoading = useAppSelector((state) => state.state.isLoading);
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
         <Searsh apiRef={apiRef} localStorageValue={localStorageValue} setLocalStorageValue={setLocalStorageValue} />
         <div className={styles.content}>
            <Movies apiRef={apiRef} isInfoVisible={isInfoVisible} />

            {isInfoVisible && <MovieInfo />}
         </div>

         {!isLoading && <Pagination />}
      </>
   );
};
