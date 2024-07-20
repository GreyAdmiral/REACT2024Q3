import { createRef, FC, KeyboardEvent, useState } from 'react';
import { Kinopoisk } from '@api/Kinopoisk';
import classnames from 'classnames';
import { useReactPlaceholder } from '@hooks/useReactPlaceholder';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setIsError } from '@store/slices/stateSlice';
import styles from './Searsh.module.scss';

interface SearchProps {
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   localStorageValue: string;
   setLocalStorageValue: React.Dispatch<React.SetStateAction<string>>;
}

const searchKeyCodes = ['Enter'];

export const Searsh: FC<SearchProps> = ({ localStorageValue, setLocalStorageValue }) => {
   const dispatch = useAppDispatch();
   const searchMaxLength = 55;
   const name = 'search';
   const [searchValue, setSearchValue] = useState(localStorageValue);
   const [placeholder, setPlaceholder] = useState<string>('Поиск');
   const searchRef = createRef<HTMLInputElement>();
   const searchButtonRef = createRef<HTMLButtonElement>();

   function search() {
      setLocalStorageValue(searchValue);
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
