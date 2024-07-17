import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '@hooks/useClickOutside';
import { AppRoutes } from '@router/routes';
import { isExists } from '@tools/isExist';
import { MovieInfoStruct } from '@typefiles/types';
import styles from './MovieInfo.module.scss';
import image from '@assets/images/loading.svg';

interface MovieInfoProps {
   info: MovieInfoStruct | undefined;
   setIsInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
   activePage: number;
}

const notFound = {
   title: 'Не найдено',
   image: image,
} as const;

export const MovieInfo: FC<MovieInfoProps> = ({ info, setIsInfoVisible, activePage }) => {
   const asideRef = useRef(null);
   const navigate = useNavigate();
   const outClick = () => {
      setIsInfoVisible(false);
      navigate(`${AppRoutes.PAGE_ROUTE}/${activePage}`);
   };

   const infoArray = [
      {
         param: info?.Awards,
         text: 'Награды: ',
      },
      {
         param: info?.Runtime,
         text: 'Продолжительность: ',
      },
      {
         param: info?.Plot,
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
                  setIsInfoVisible(false);
               }}
            >
               {'>>>>>'}
            </button>
            <h2 className={styles.movieInfoTitle}>
               {isExists(info?.Title) ? info?.Title : info?.Error || notFound.title}
            </h2>
         </header>

         <div className={styles.movieInfoImage}>
            <img src={isExists(info?.Poster) ? info?.Poster : notFound.image} alt={info?.Title} />
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
