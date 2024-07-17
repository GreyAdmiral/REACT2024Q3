import { Component, ReactNode } from 'react';
import { MovieProps } from '@typefiles/types';
import styles from './Movie.module.scss';

type Props = {
   movie: MovieProps;
};

const separator = ' / ';

export class Movie extends Component<Props> {
   constructor(props: Props) {
      super(props);
   }

   render(): ReactNode {
      const { movie } = this.props;
      return (
         <article className={styles.movie}>
            <div className={styles.movieHeader}>
               <h2 className={styles.movieTitle}>{movie.nameRu || movie.nameEn || movie.nameOriginal}</h2>

               <div className={styles.movieRating}>
                  {movie.ratingKinopoisk && (
                     <span className={styles.movieRatingKip}>{`kp ${movie.ratingKinopoisk || 0}`}</span>
                  )}
                  {movie.ratingImdb && (
                     <span className={styles.movieRatingImdb}>{`imdb ${movie.ratingImdb || 0}`}</span>
                  )}
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

                  <div className={styles.movieTextBody}>
                     Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Послушавшись,
                     однажды подпоясал даже залетают путь первую. Семь диких по всей продолжил всеми необходимыми даже
                     ее раз составитель лучше имеет подпоясал повстречался не снова, себя осталось. Буквоград она моей
                     взгляд послушавшись даже страна дороге что вершину если наш вскоре приставка коварных маленький,
                     вопрос одна семь скатился океана переписали диких безорфографичный за рыбными домах сих оксмокс!
                     Курсивных которой знаках вершину даже, они которое жаренные?
                  </div>
               </div>
            </div>
         </article>
      );
   }
}
