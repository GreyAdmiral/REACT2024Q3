import { useEffect, useId, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage } from '@store/slices/stateSlice';
import { setIsVisible } from '@store/slices/infoSlice';
import { AppRoutes } from '@router/routes';
import styles from './Pagination.module.scss';

const setActiveClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.paginationActive : undefined);

export const Pagination = () => {
   const id = useId();
   const navigate = useNavigate();
   const { number } = useParams();
   const [isPrevPageDisabled, setIsPrevPageDisabled] = useState<boolean>(false);
   const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(false);
   const totalPages = useAppSelector((state) => state.state.totalPages);
   const dispatch = useAppDispatch();

   function switchContent(pageNumber: number) {
      dispatch(setIsVisible(false));
      dispatch(setActivePage(pageNumber));
   }

   function prevButtonClick(e: React.MouseEvent) {
      e.stopPropagation();

      if (number && +number > 1) {
         navigate(`${AppRoutes.PAGE_ROUTE}/${+number - 1}`);
         switchContent(+number - 1);
      }
   }

   function nextButtonClick(e: React.MouseEvent) {
      e.stopPropagation();

      if (number && totalPages && +number < totalPages) {
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
