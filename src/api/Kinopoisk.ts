import { getErrorInfo } from '@tools/getErrorInfo';

export class Kinopoisk {
   protected url: string;
   protected key: string;
   protected header: {
      method: string;
      headers: Record<string, string>;
   };

   constructor() {
      this.url = import.meta.env.VITE_API_URL;
      this.key = import.meta.env.VITE_API_KEY;
      this.header = {
         method: 'GET',
         headers: {
            'X-API-KEY': this.key,
            'Content-Type': 'application/json',
         },
      };
   }

   async getFilms(activePage: number, keywords: string = '') {
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
}
