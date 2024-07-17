import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Kinopoisk } from '@api/Kinopoisk';
import { Movies } from '@components/Movies/Movies';
import { Searsh } from '@components/Search/Searsh';
import { Pagination } from '@components/Pagination/Pagination';
import { MovieInfo } from '@components/MovieInfo/MovieInfo';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { MovieInfoStruct, MoviesProps, MoviesState } from '@typefiles/types';
import styles from './Main.module.scss';

export const Main = () => {
   const { number } = useParams();
   const [state, setState] = useState<MoviesState>({
      activePage: Number(number),
      movies: [],
      totalPages: null,
      isError: false,
   });
   const apiRef = useRef<InstanceType<typeof Kinopoisk>>(new Kinopoisk());
   const [localStorageValue, setLocalStorageValue] = useLocalStorage('keywords');
   const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
   const [movieInfo, setMovieInfo] = useState<MovieInfoStruct>();

   const switchInfoVisible = (info: MovieInfoStruct) => {
      setIsInfoVisible(true);
      setMovieInfo(info);
   };

   const switchInfoVisibleref = useRef<(info: MovieInfoStruct) => void>(switchInfoVisible);

   useEffect(() => {
      apiRef.current
         .getFilms({ activePage: state.activePage, keywords: localStorageValue })
         .then((data: MoviesProps) => {
            setState({ ...state, movies: getFilteredFilms(data.items), totalPages: data.totalPages });
         });
      // eslint-disable-next-line react-compiler/react-compiler
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <Searsh
            setSearch={setState}
            state={state}
            apiRef={apiRef}
            localStorageValue={localStorageValue}
            setLocalStorageValue={setLocalStorageValue}
         />
         <div className={styles.content}>
            <Movies
               movies={state.movies}
               isError={state.isError}
               apiRef={apiRef}
               switchInfoVisibleref={switchInfoVisibleref}
               isInfoVisible={isInfoVisible}
            />
            {isInfoVisible && (
               <MovieInfo info={movieInfo} setIsInfoVisible={setIsInfoVisible} activePage={state.activePage} />
            )}
         </div>
         {state.totalPages && (
            <Pagination
               totalPages={state.totalPages}
               setState={setState}
               state={state}
               apiRef={apiRef}
               localStorageValue={localStorageValue}
               setLocalStorageValue={setLocalStorageValue}
               setIsInfoVisible={setIsInfoVisible}
            />
         )}
      </>
   );
};
