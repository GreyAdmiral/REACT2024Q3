'use client';
import { useSearchParams } from 'next/navigation';
import { FC, MouseEvent } from 'react';
import { useGetFilmDescriptionMutation } from '@services/filmApi';
import Image from 'next/image';
import { CustomCheckBox } from '@components/CustomCheckBox/CustomCheckBox';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { getFilteredDescription } from '@tools/getFilteredDescription';
import { setIsVisible, setDetails, setIsLoading } from '@store/slices/infoSlice';
import type { MovieProps } from '@typesfolder/types';
import styles from './Movie.module.scss';

type Props = {
   movie: MovieProps;
};

const separator = ' / ';
const alternateText = 'Постер фильма';

export const Movie: FC<Props> = ({ movie }) => {
   const dispatch = useAppDispatch();
   const [getMovieDescription] = useGetFilmDescriptionMutation();
   const searchParams = useSearchParams();

   function movieClickHandler(e: MouseEvent) {
      e.stopPropagation();
      const params = new URLSearchParams(searchParams.toString());

      params.set('info', String(1));
      params.set('movie', movie.nameEn || movie.nameOriginal || encodeURIComponent(movie.nameRu) || 'not found');
      window.history.pushState(null, '', `?${params.toString()}`);

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
         <div className={styles.movie_header}>
            <h2 className={styles.movie_title}>{movie.nameRu || movie.nameEn || movie.nameOriginal}</h2>

            <div className={styles.movie_rating}>
               {movie.ratingKinopoisk && (
                  <span className={styles.movie_rating_kip}>{`kp ${movie.ratingKinopoisk || 0}`}</span>
               )}
               {movie.ratingImdb && <span className={styles.movie_rating_imdb}>{`imdb ${movie.ratingImdb || 0}`}</span>}
            </div>
         </div>

         <div className={styles.movie_body}>
            <div className={styles.movie_image}>
               <Image
                  src={movie.posterUrlPreview}
                  fill={true}
                  unoptimized={true}
                  placeholder="empty"
                  loading="lazy"
                  alt={movie.nameOriginal || alternateText}
               />
            </div>

            <div className={styles.movie_text}>
               <div className={styles.movie_text_title}>
                  <div className={styles.movie_text_row}>
                     <span>Год выпуска: </span>
                     {movie.year}
                  </div>

                  <div className={styles.movie_text_row}>
                     <span>Страна: </span>
                     {movie.countries.map((country) => country.country).join(separator)}
                  </div>

                  <div className={styles.movie_text_row}>
                     <span>Жанр: </span>
                     {movie.genres.map((genre) => genre.genre).join(separator)}
                  </div>

                  <div className={styles.movie_text_row}>
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
