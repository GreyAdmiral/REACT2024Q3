import { Component, createRef, KeyboardEvent, PropsWithChildren, ReactNode } from 'react';
import { Kinopoisk } from '@api/Kinopoisk';
import classnames from 'classnames';
import { MoviesState, MoviesProps } from '@typefiles/types';
import styles from './Searsh.module.scss';

type StateArgument = MoviesState | ((state: MoviesState) => MoviesState);

interface SearchProps extends PropsWithChildren {
   state: MoviesState;
   setSearch: (state: StateArgument) => void;
   api: InstanceType<typeof Kinopoisk>;
}

const searchKeyCodes = ['Enter'];

export class Searsh extends Component<SearchProps> {
   protected searchMaxLength: number;
   protected name: string;
   protected placeholder: string;
   searchRef = createRef<HTMLInputElement>();
   searchButtonRef = createRef<HTMLButtonElement>();

   constructor(props: SearchProps) {
      super(props);
      this.searchMaxLength = 55;
      this.placeholder = 'Поиск';
      this.name = 'search';
      this.keyDown = this.keyDown.bind(this);
      this.search = this.search.bind(this);
      this.dispatchError = this.dispatchError.bind(this);
   }

   search() {
      const { setSearch, state, api } = this.props;
      const value = this.searchRef.current?.value;

      api.getFilms(state.activePage, value || '').then((data: MoviesProps) => {
         setSearch({ ...state, movies: data.items });

         if (value) {
            localStorage.setItem('keywords', value);
         } else {
            localStorage.removeItem('keywords');
         }
      });

      if (this.searchRef.current) {
         this.searchRef.current.value = '';
      }

      (document.activeElement as HTMLTemplateElement).blur();
   }

   dispatchError() {
      const { setSearch, state } = this.props;

      setSearch({ ...state, isError: true });
   }

   keyDown(e: KeyboardEvent) {
      e.stopPropagation();

      if (searchKeyCodes.includes(e.code)) {
         this.searchButtonRef.current?.click();
      }
   }

   render(): ReactNode {
      return (
         <div className={styles.search} onKeyDown={this.keyDown}>
            <button
               type="button"
               className={classnames(styles.searchButton, styles.searchErrorButton)}
               onClick={this.dispatchError}
               ref={this.searchButtonRef}
            >
               Ошибка
            </button>

            <div className={styles.searchField}>
               <input
                  ref={this.searchRef}
                  type="text"
                  name={this.name}
                  placeholder={this.placeholder}
                  maxLength={this.searchMaxLength}
                  autoComplete="off"
               />
            </div>

            <button type="button" className={styles.searchButton} onClick={this.search} ref={this.searchButtonRef}>
               Найти
            </button>
         </div>
      );
   }
}
