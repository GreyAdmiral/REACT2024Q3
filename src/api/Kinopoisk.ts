import { getErrorInfo } from '@tools/getErrorInfo';

type GetFilmsArguments = {
   activePage?: number;
   keywords?: string;
};

export class Kinopoisk {
   protected url: string;
   protected key: string;
   protected infoUrl: string;
   protected infoKey: string;
   protected header: {
      method: string;
      headers: Record<string, string>;
   };

   constructor() {
      this.url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
      this.infoUrl = 'http://www.omdbapi.com';
      this.key = import.meta.env.VITE_API_KEY;
      this.infoKey = import.meta.env.VITE_INFO_API_KEY;
      this.header = {
         method: 'GET',
         headers: {
            'X-API-KEY': this.key,
            'Content-Type': 'application/json',
         },
      };
   }

   async getFilms(options: GetFilmsArguments) {
      const defaultOptions = {
         activePage: 1,
         keywords: '',
      };

      Object.assign(defaultOptions, options);
      const { activePage, keywords } = defaultOptions;

      let url = `${this.url}?page=${activePage}`;

      if (keywords) {
         url += `&keyword=${encodeURIComponent(keywords)}`;
      }

      try {
         const request = await fetch(url, this.header);

         if (!request.ok) {
            throw Error(`${getErrorInfo(request.status)} Status Code: ${request.status}`);
         }

         const films = await request.json();
         return films;
      } catch (err) {
         console.error(err);
      }
   }

   async getFilmInfo(movieName: string) {
      const url = `${this.infoUrl}/?apikey=${this.infoKey}&i=tt3896198&t=${encodeURIComponent(movieName)}`;

      try {
         const request = await fetch(url);

         if (!request.ok) {
            throw Error(`${getErrorInfo(request.status)} Status Code: ${request.status}`);
         }

         const filmInfo = await request.json();
         return filmInfo;
      } catch (err) {
         console.error(err);
      }
   }
}
