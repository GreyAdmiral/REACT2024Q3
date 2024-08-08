'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage } from '@store/slices/stateSlice';
import { setIsVisible } from '@store/slices/infoSlice';
import { AppRoutes } from '@router/routes';
import styles from './Pagination.module.scss';
import type { MouseEvent } from 'react';

export const Pagination = () => {
   const id = useId();
   const { id: number } = useParams();
   const router = useRouter();
   const [isPrevPageDisabled, setIsPrevPageDisabled] = useState<boolean>(false);
   const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(false);
   const totalPages = useAppSelector((state) => state.state.totalPages);
   const dispatch = useAppDispatch();

   function switchContent(pageNumber: number) {
      dispatch(setIsVisible(false));
      dispatch(setActivePage(pageNumber));
   }

   function prevButtonClick(e: MouseEvent) {
      e.stopPropagation();

      if (number && +number > 1) {
         router.replace(`${AppRoutes.PAGE_ROUTE}/${+number - 1}`);
         switchContent(+number - 1);
      }
   }

   function nextButtonClick(e: MouseEvent) {
      e.stopPropagation();

      if (number && totalPages && +number < totalPages) {
         router.replace(`${AppRoutes.PAGE_ROUTE}/${+number + 1}`);
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
         <button className={styles.pagination_item} disabled={isPrevPageDisabled} onClick={prevButtonClick}>
            ◄
         </button>

         <ul>
            {Array.from({ length: totalPages }).map((_, ind) => (
               <li key={`${id}-${ind}`} className={styles.pagination_item}>
                  <Link
                     href={`${AppRoutes.PAGE_ROUTE}/${ind + 1}`}
                     className={classNames({ [styles.pagination_active]: ind + 1 === +number })}
                     tabIndex={ind + 1 === +number ? -1 : undefined}
                     onClick={(e) => {
                        e.stopPropagation();
                        switchContent(ind + 1);
                     }}
                  >
                     {ind + 1}
                  </Link>
               </li>
            ))}
         </ul>

         <button className={styles.pagination_item} disabled={isNextPageDisabled} onClick={nextButtonClick}>
            ►
         </button>
      </div>
   ) : null;
};
