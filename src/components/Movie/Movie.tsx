import { FC, MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetFilmDescriptionMutation } from '@api/filmsApi';
import { CustomCheckBox } from '@components/CustomCheckBox/CustomCheckBox';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { getFilteredDescription } from '@tools/getFilteredDescription';
import { setIsVisible, setDetails, setIsLoading } from '@store/slices/infoSlice';
import { MovieProps } from '@typefiles/types';
import styles from './Movie.module.scss';

type Props = {
   movie: MovieProps;
};

const separator = ' / ';

export const Movie: FC<Props> = ({ movie }) => {
   const [, setSearchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const [getMovieDescription] = useGetFilmDescriptionMutation();

   function movieClickHandler(e: MouseEvent) {
      e.stopPropagation();

      setSearchParams({ info: '1', movie: movie.nameEn || movie.nameOriginal || 'not found' });
      dispatch(setIsLoading(true));
      dispatch(setIsVisible(true));

      getMovieDescription(movie.kinopoiskId).then(({ data }) => {
         dispatch(setDetails(getFilteredDescription(data)));
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
