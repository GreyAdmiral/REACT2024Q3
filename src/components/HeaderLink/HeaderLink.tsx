'use client';
import Link from 'next/link';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setActivePage } from '@store/slices/stateSlice';
import { AppRoutes } from '@/router/routes';
import styles from './HeaderLink.module.scss';

const headerTitle = 'Перейти на главную страницу';

export const HeaderLink = () => {
   const dispatch = useAppDispatch();

   function clickHandler() {
      dispatch(setActivePage(1));
   }

   return (
      <Link href={AppRoutes.HOME_ROUTE} className={styles.header_title_link} title={headerTitle} onClick={clickHandler}>
         Неофициальный кинопоиск
      </Link>
   );
};
