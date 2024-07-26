import { FC, MutableRefObject, MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Kinopoisk } from '@api/Kinopoisk';
import { CustomCheckBox } from '@components/CustomCheckBox/CustomCheckBox';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { getFilteredDetails } from '@tools/getFilteredDetails';
import { setIsVisible, setDetails, setIsLoading } from '@store/slices/infoSlice';
import { MovieInfoStruct, MovieProps } from '@typefiles/types';
import styles from './Movie.module.scss';

type Props = {
   movie: MovieProps;
   apiRef: MutableRefObject<InstanceType<typeof Kinopoisk>>;
};

const separator = ' / ';

export const Movie: FC<Props> = ({ movie, apiRef }) => {
   const [, setSearchParams] = useSearchParams();
   const dispatch = useAppDispatch();

   function movieClickHandler(e: MouseEvent) {
      e.stopPropagation();

      setSearchParams({ info: '1', movie: movie.nameOriginal || 'not found' });
      dispatch(setIsLoading(true));
      dispatch(setIsVisible(true));

      apiRef.current.getFilmInfo(movie.nameOriginal || movie.nameEn || movie.nameRu).then((data: MovieInfoStruct) => {
         dispatch(setDetails(getFilteredDetails(data)));
         dispatch(setIsLoading(false));
      });
   }

   return (
      <article
         className={styles.movie}
         onClick={movieClickHandler}
         id={movie.kinopoiskId}
         title="Посмотреть подробности"
      >
         <div className={styles.movieHeader}>
            <h2 className={styles.movieTitle}>{movie.nameRu || movie.nameEn || movie.nameOriginal}</h2>

            <div className={styles.movieRating}>
               {movie.ratingKinopoisk && (
                  <span className={styles.movieRatingKip}>{`kp ${movie.ratingKinopoisk || 0}`}</span>
               )}
               {movie.ratingImdb && <span className={styles.movieRatingImdb}>{`imdb ${movie.ratingImdb || 0}`}</span>}
            </div>
         </div>

         <div className={styles.movieBody}>
            <div className={styles.movieImage}>
               <img src={movie.posterUrlPreview} alt={movie.nameOriginal} />
            </div>

            <div className={styles.movieText}>
               <div className={styles.movieTextTitle}>
                  <div className={styles.movieTextRow}>
                     <span>Год выпуска: </span>
                     {movie.year}
                  </div>

                  <div className={styles.movieTextRow}>
                     <span>Страна: </span>
                     {movie.countries.map((country) => country.country).join(separator)}
                  </div>

                  <div className={styles.movieTextRow}>
                     <span>Жанр: </span>
                     {movie.genres.map((genre) => genre.genre).join(separator)}
                  </div>

                  <div className={styles.movieTextRow}>
                     <span>Тип: </span>
                     {movie.type}
                  </div>
               </div>
            </div>

            <CustomCheckBox movie={movie} />
         </div>
      </article>
   );
};
