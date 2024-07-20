import { FC, useEffect, useId, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Kinopoisk } from '@api/Kinopoisk';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setMovies, setTotalPages, setActivePage } from '@store/slices/stateSlice';
import { setIsVisible } from '@store/slices/infoSlice';
import { getFilteredFilms } from '@tools/getFilteredFilms';
import { AppRoutes } from '@router/routes';
import { MoviesProps } from '@typefiles/types';
import styles from './Pagination.module.scss';

interface PaginationProps {
   apiRef: React.MutableRefObject<InstanceType<typeof Kinopoisk>>;
   localStorageValue: string;
   setLocalStorageValue: React.Dispatch<React.SetStateAction<string>>;
}

const setActiveClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.paginationActive : undefined);

export const Pagination: FC<PaginationProps> = ({ apiRef, localStorageValue }) => {
   const id = useId();
   const navigate = useNavigate();
   const { number } = useParams();
   const [isPrevPageDisabled, setIsPrevPageDisabled] = useState<boolean>(false);
   const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(false);
   const totalPages = useAppSelector((state) => state.state.totalPages);
   const dispatch = useAppDispatch();

   function switchContent(pageNumber: number) {
      apiRef.current.getFilms({ activePage: pageNumber, keywords: localStorageValue }).then((data: MoviesProps) => {
         dispatch(setMovies(getFilteredFilms(data.items)));
         dispatch(setTotalPages(data.totalPages));
         dispatch(setActivePage(pageNumber));
      });
   }

   function prevButtonClick(e: React.MouseEvent) {
      e.stopPropagation();

      if (number && +number > 1) {
         dispatch(setIsVisible(false));
         navigate(`${AppRoutes.PAGE_ROUTE}/${+number - 1}`);
         switchContent(+number - 1);
      }
   }

   function nextButtonClick(e: React.MouseEvent) {
      e.stopPropagation();

      if (number && totalPages && +number < totalPages) {
         dispatch(setIsVisible(false));
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

      if (number && totalPages && +number === +totalPages) {
         setIsNextPageDisabled(true);
      } else {
         setIsNextPageDisabled(false);
      }
   }, [number, totalPages]);

   return totalPages ? (
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
                        dispatch(setIsVisible(false));
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
   ) : null;
};
