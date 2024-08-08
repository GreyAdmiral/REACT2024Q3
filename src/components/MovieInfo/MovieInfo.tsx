'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useClickOutside } from '@hooks/useClickOutside';
import { setIsVisible, setDetails } from '@store/slices/infoSlice';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { Loader } from '@components/Loader/Loader';
import { isExists } from '@tools/isExist';
import { AppRoutes } from '@router/routes';
import styles from './MovieInfo.module.scss';

const defaultDetails = {
   nameRu: '',
   nameEn: '',
   nameOriginal: '',
   posterUrl: '',
   description: '',
   shortDescription: '',
   webUrl: '',
} as const;

const notFoundTitle = 'Не найдено';
const alternateText = 'Постер фильма';

export const MovieInfo = () => {
   const asideRef = useRef(null);
   const { nameRu, nameEn, nameOriginal, posterUrl, description, shortDescription, webUrl } = useAppSelector(
      (state) => state.info.details
   );
   const isLoading = useAppSelector((state) => state.info.isLoading);
   const activePage = useAppSelector((state) => state.state.activePage);
   const dispatch = useAppDispatch();
   const router = useRouter();
   const title = nameRu || nameEn || nameOriginal;
   const validatedTitle = isExists(title) ? title : notFoundTitle;
   const searchParams = useSearchParams();
   const outClick = () => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete('info');
      params.delete('movie');
      window.history.pushState(null, '', `?${params.toString()}`);

      dispatch(setIsVisible(false));
      dispatch(setDetails(defaultDetails));
      router.replace(`${AppRoutes.PAGE_ROUTE}/${activePage}`);
   };

   useClickOutside(asideRef, outClick);

   return (
      <aside ref={asideRef} className={classNames(styles.movie_info, { [styles.movie_info_center]: isLoading })}>
         {!isLoading && (
            <>
               <header className={styles.movie_info_header}>
                  <button className={styles.movie_info_close} onClick={outClick} title="Скрыть подробности">
                     {'>>>>>'}
                  </button>

                  <h2 className={styles.movie_info_title}>{validatedTitle}</h2>
               </header>

               <div className={styles.movie_info_image}>
                  <Image
                     src={posterUrl}
                     fill={true}
                     unoptimized={true}
                     placeholder="empty"
                     priority={true}
                     alt={validatedTitle || alternateText}
                  />
               </div>

               <div className={styles.movie_info_body}>
                  {(description || shortDescription) && (
                     <div className={styles.movie_info_text_row}>
                        <span>Описание: </span>
                        {description || shortDescription}
                     </div>
                  )}

                  <a className={styles.movie_info_url} href={webUrl} target="_blank" title="Найти на «Кинопоиск»">
                     Подробнее на «Кинопоиск»
                  </a>
               </div>
            </>
         )}

         {isLoading && <Loader />}
      </aside>
   );
};
