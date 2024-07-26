import { MovieProps, SelectedMovie } from '@typefiles/types';

export function getSelectedInfo(movie: MovieProps): SelectedMovie {
   const separator = ' / ';

   return {
      id: movie.kinopoiskId,
      name: movie.nameRu || movie.nameEn || movie.nameOriginal,
      year: movie.year,
      type: movie.type,
      posterUrl: movie.posterUrl,
      countries: movie.countries.map((country) => country.country).join(separator),
      genres: movie.genres.map((genre) => genre.genre).join(separator),
   };
}
