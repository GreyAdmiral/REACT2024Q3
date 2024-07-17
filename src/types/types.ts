export type MoviesProps = {
   total: number;
   totalPages: number;
   items: MovieProps[];
};

export type MovieProps = {
   kinopoiskId: string;
   imdbId: string | null;
   nameRu: string | null;
   nameEn: string | null;
   nameOriginal: string;
   ratingKinopoisk: number | null;
   ratingImdb: number | null;
   year: number;
   type: string;
   posterUrl: string;
   posterUrlPreview: string;
   countries: country[];
   genres: genre[];
};

export type MoviesState = {
   activePage: number;
   movies: MovieProps[];
   totalPages: number | null;
   isError: boolean;
};

type country = {
   country: string;
};

type genre = {
   genre: string;
};
