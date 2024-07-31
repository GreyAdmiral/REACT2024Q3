import { getErrorInfo } from '@tools/getErrorInfo';

type GetFilmsArguments = {
   activePage?: number;
   keywords?: string;
};

export class Kinopoisk {
   protected url: string;
   protected key: string;
   protected header: {
      method: string;
      headers: Record<string, string>;
   };

   constructor() {
      this.url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
      this.key = import.meta.env.VITE_API_KEY;
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

   async getFilmDescription(id: string) {
      const url = `${this.url}/${id}`;

      try {
         const request = await fetch(url, this.header);

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
