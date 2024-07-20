import { createRef, FC, KeyboardEvent, useState } from 'react';
import { Kinopoisk } from '@api/Kinopoisk';
import classnames from 'classnames';
import { useReactPlaceholder } from '@hooks/useReactPlaceholder';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setMovies, setTotalPages, setIsError } from '@store/slices/stateSlice';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { MoviesProps } from '@typefiles/types';
import styles from './Searsh.module.scss';

interface SearchProps {
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   localStorageValue: string;
   setLocalStorageValue: React.Dispatch<React.SetStateAction<string>>;
}

const searchKeyCodes = ['Enter'];

export const Searsh: FC<SearchProps> = ({ apiRef, localStorageValue, setLocalStorageValue }) => {
   const activePage = useAppSelector((state) => state.state.activePage);
   const dispatch = useAppDispatch();

   const searchMaxLength = 55;
   const name = 'search';
   const [searchValue, setSearchValue] = useState(localStorageValue);
   const [placeholder, setPlaceholder] = useState<string>('Поиск');
   const searchRef = createRef<HTMLInputElement>();
   const searchButtonRef = createRef<HTMLButtonElement>();

   function search() {
      apiRef.current.getFilms({ activePage: activePage, keywords: searchValue }).then((data: MoviesProps) => {
         dispatch(setMovies(getFilteredFilms(data.items)));
         dispatch(setTotalPages(data.totalPages));
         setLocalStorageValue(searchValue);
      });

      (document.activeElement as HTMLTemplateElement).blur();
   }

   function dispatchError() {
      dispatch(setIsError(true));
   }

   function keyDown(e: KeyboardEvent) {
      e.stopPropagation();

      if (searchKeyCodes.includes(e.code)) {
         searchButtonRef.current?.click();
      }
   }

   useReactPlaceholder({ ref: searchRef, placeholder, setPlaceholder });

   return (
      <div className={styles.search} onKeyDown={keyDown}>
         <button
            type="button"
            className={classnames(styles.searchButton, styles.searchErrorButton)}
            onClick={dispatchError}
            ref={searchButtonRef}
         >
            Ошибка
         </button>

         <div className={styles.searchField}>
            <input
               ref={searchRef}
               type="text"
               name={name}
               placeholder={placeholder}
               maxLength={searchMaxLength}
               autoComplete="off"
               value={searchValue}
               onChange={(e) => {
                  setSearchValue(e.currentTarget.value);
               }}
            />
         </div>

         <button type="button" className={styles.searchButton} onClick={search} ref={searchButtonRef}>
            Найти
         </button>
      </div>
   );
};
