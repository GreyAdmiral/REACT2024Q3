'use client';
import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setActivePage, setKeywords } from '@/store/slices/stateSlice';
import { Searsh } from '@/components/Search/Searsh';
import { Movies } from '@/components/Movies/Movies';
import { MovieInfo } from '@/components/MovieInfo/MovieInfo';
import { Pagination } from '@/components/Pagination/Pagination';
import styles from './page.module.scss';
import { useQueryParams } from '@/hooks/useQueryParams';

type Props = {
   params: {
      id: string;
   };
};

export default function MoviesPage({ params: { id } }: Props) {
   const { isVisible: isInfoVisible } = useAppSelector((state) => state.info);
   const { movies } = useAppSelector((state) => state.state);
   const dispatch = useAppDispatch();
   const [localStorageValue, setLocalStorageValue] = useLocalStorage('keywords');

   useQueryParams('keywords', localStorageValue);

   useEffect(() => {
      dispatch(setActivePage(Number(id) || 1));
      dispatch(setKeywords(localStorageValue));
   }, [dispatch, localStorageValue, id]);

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
}
