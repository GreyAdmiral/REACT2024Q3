export type MoviesProps = {
   total: number;
   totalPages: number;
   items: MovieProps[];
};

export type MovieProps = {
   kinopoiskId: string;
   imdbId: string | null;
   nameRu: string;
   nameEn: string;
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
   keywords: string;
   isLoading: boolean;
   isError: boolean;
};

type country = {
   country: string;
};

type genre = {
   genre: string;
};

export type MovieInfoStruct = {
   Title: string;
   Year: string;
   Rated: string;
   Released: string;
   Runtime: string;
   Genre: string;
   Director: string;
   Writer: string;
   Actors: string;
   Plot: string;
   Language: string;
   Country: string;
   Awards: string;
   Poster: string;
   Metascore: string;
   imdbRating: string;
   imdbVotes: string;
   imdbID: string;
   Type: string;
   DVD: string;
   BoxOffice: string;
   Production: string;
   Website: string;
   Response: string;
   Ratings: infoRaiting[];
   Error?: string;
};

type infoRaiting = {
   Source: string;
   Value: string;
};

export type Details = Pick<MovieInfoStruct, 'Title' | 'Awards' | 'Runtime' | 'Plot' | 'Poster'> & {
   Error?: '';
};

export type InfoState = {
   isVisible: boolean;
   isLoading: boolean;
   details: Details;
};

export type SchemeName = 'light' | 'dark';

export type SchemeState = {
   colorScheme: string;
};

export type SelectedMovie = {
   id: string;
   name: string;
   year: number;
   type: string;
   posterUrl: string;
   countries: string;
   genres: string;
};
