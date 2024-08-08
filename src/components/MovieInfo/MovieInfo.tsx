import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useClickOutside } from '@hooks/useClickOutside';
import { setIsVisible, setDetails } from '@store/slices/infoSlice';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { Loader } from '@components/Loader/Loader';
import { isExists } from '@tools/isExist';
import { AppRoutes } from '@router/routes';
import styles from './MovieInfo.module.scss';
import image from '@assets/images/loading.svg';

const defaultDetails = {
   nameRu: '',
   nameEn: '',
   nameOriginal: '',
   posterUrl: '',
   description: '',
   shortDescription: '',
   webUrl: '',
} as const;

const notFound = {
   title: 'Не найдено',
   image: image,
} as const;

export const MovieInfo = () => {
   const navigate = useNavigate();
   const asideRef = useRef(null);
   const { nameRu, nameEn, nameOriginal, posterUrl, description, shortDescription, webUrl } = useAppSelector(
      (state) => state.info.details
   );
   const isLoading = useAppSelector((state) => state.info.isLoading);
   const activePage = useAppSelector((state) => state.state.activePage);
   const dispatch = useAppDispatch();
   const title = nameRu || nameEn || nameOriginal;
   const validatedTitle = isExists(title) ? title : notFound.title;
   const outClick = () => {
      dispatch(setIsVisible(false));
      dispatch(setDetails(defaultDetails));
      navigate(`${AppRoutes.PAGE_ROUTE}/${activePage}`);
   };

   useClickOutside(asideRef, outClick);

   return (
      <aside ref={asideRef} className={classNames(styles.movieInfo, { [styles.movieInfoCenter]: isLoading })}>
         {!isLoading && (
            <>
               <header className={styles.movieInfoHeader}>
                  <button className={styles.movieInfoClose} onClick={outClick} title="Скрыть подробности">
                     {'>>>>>'}
                  </button>

                  <h2 className={styles.movieInfoTitle}>{validatedTitle}</h2>
               </header>

               <div className={styles.movieInfoImage}>
                  <img src={isExists(posterUrl) ? posterUrl : notFound.image} alt={validatedTitle} />
               </div>

               <div className={styles.movieInfoBody}>
                  {(description || shortDescription) && (
                     <div className={styles.movieInfoTextRow}>
                        <span>Описание: </span>
                        {description || shortDescription}
                     </div>
                  )}

                  <a className={styles.movieInfoUrl} href={webUrl} target="_blank" title="Найти на «Кинопоиск»">
                     Подробнее на «Кинопоиск»
                  </a>
               </div>
            </>
         )}

         {isLoading && <Loader />}
      </aside>
   );
};
