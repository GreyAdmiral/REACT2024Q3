import { FC, useEffect, useId, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Kinopoisk } from '@api/Kinopoisk';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { AppRoutes } from '@router/routes';
import { MoviesProps, MoviesState } from '@typefiles/types';
import styles from './Pagination.module.scss';

type StateArgument = MoviesState | ((state: MoviesState) => MoviesState);

interface PaginationProps {
   totalPages: number;
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   state: MoviesState;
   setState: (state: StateArgument) => void;
   localStorageValue: string;
   setLocalStorageValue: React.Dispatch<React.SetStateAction<string>>;
   setIsInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const setActiveClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.paginationActive : undefined);

export const Pagination: FC<PaginationProps> = ({
   totalPages,
   apiRef,
   state,
   setState,
   localStorageValue,
   setIsInfoVisible,
}) => {
   const id = useId();
   const navigate = useNavigate();
   const { number } = useParams();
   const [isPrevPageDisabled, setIsPrevPageDisabled] = useState<boolean>(false);
   const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(false);

   function switchContent(pageNumber: number) {
      apiRef.current.getFilms({ activePage: pageNumber, keywords: localStorageValue }).then((data: MoviesProps) => {
         setState({
            ...state,
            movies: getFilteredFilms(data.items),
            totalPages: data.totalPages,
            activePage: pageNumber,
         });
      });
   }

   function prevButtonClick(e: React.MouseEvent) {
      e.stopPropagation();

      if (number && +number > 1) {
         setIsInfoVisible(false);
         navigate(`${AppRoutes.PAGE_ROUTE}/${+number - 1}`);
         switchContent(+number - 1);
      }
   }

   function nextButtonClick(e: React.MouseEvent) {
      e.stopPropagation();

      if (number && +number < totalPages) {
         setIsInfoVisible(false);
         navigate(`${AppRoutes.PAGE_ROUTE}/${+number + 1}`);
         switchContent(+number + 1);
      }
   }

   useEffect(() => {
      if (number && +number - 1 === 0) {
         setIsPrevPageDisabled(true);
      } else {
         setIsPrevPageDisabled(false);
      }

      if (number && +number === +totalPages) {
         setIsNextPageDisabled(true);
      } else {
         setIsNextPageDisabled(false);
      }
   }, [number, totalPages]);

   return (
      <div className={styles.pagination}>
         <button className={styles.paginationItem} disabled={isPrevPageDisabled} onClick={prevButtonClick}>
            ◄
         </button>

         <ul>
            {Array.from({ length: totalPages }).map((_, ind) => (
               <li key={`${id}-${ind}`} className={styles.paginationItem}>
                  <NavLink
                     to={`${AppRoutes.PAGE_ROUTE}/${ind + 1}`}
                     className={setActiveClass}
                     onClick={(e) => {
                        e.stopPropagation();
                        setIsInfoVisible(false);
                        switchContent(ind + 1);
                     }}
                  >
                     {ind + 1}
                  </NavLink>
               </li>
            ))}
         </ul>

         <button className={styles.paginationItem} disabled={isNextPageDisabled} onClick={nextButtonClick}>
            ►
         </button>
      </div>
   );
};
