import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '@hooks/useClickOutside';
import { setIsVisible, setDetails } from '@store/slices/infoSlice';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { isExists } from '@tools/isExist';
import { AppRoutes } from '@router/routes';
import styles from './MovieInfo.module.scss';
import image from '@assets/images/loading.svg';

const defaultDetails = {
   Title: '',
   Runtime: '',
   Plot: '',
   Awards: '',
   Poster: '',
} as const;

const notFound = {
   title: 'Не найдено',
   image: image,
} as const;

export const MovieInfo = () => {
   const navigate = useNavigate();
   const asideRef = useRef(null);
   const { Title, Awards, Runtime, Plot, Poster, Error } = useAppSelector((state) => state.info.details);
   const activePage = useAppSelector((state) => state.state.activePage);
   const dispatch = useAppDispatch();
   const outClick = () => {
      dispatch(setIsVisible(false));
      dispatch(setDetails(defaultDetails));
      navigate(`${AppRoutes.PAGE_ROUTE}/${activePage}`);
   };

   const infoArray = [
      {
         param: Awards,
         text: 'Награды: ',
      },
      {
         param: Runtime,
         text: 'Продолжительность: ',
      },
      {
         param: Plot,
         text: 'Описание: ',
      },
   ].filter((obj) => isExists(obj.param));

   useClickOutside(asideRef, outClick);

   return (
      <aside ref={asideRef} className={styles.movieInfo}>
         <header className={styles.movieInfoHeader}>
            <button
               className={styles.movieInfoClose}
               onClick={() => {
                  dispatch(setIsVisible(false));
               }}
            >
               {'>>>>>'}
            </button>
            <h2 className={styles.movieInfoTitle}>{isExists(Title) ? Title : Error || notFound.title}</h2>
         </header>

         <div className={styles.movieInfoImage}>
            <img src={isExists(Poster) ? Poster : notFound.image} alt={Title} />
         </div>

         <div className={styles.movieInfoBody}>
            {infoArray.map((obj) => (
               <div key={obj.param} className={styles.movieInfoTextRow}>
                  <span>{obj.text}</span>
                  {obj.param}
               </div>
            ))}
         </div>
      </aside>
   );
};
