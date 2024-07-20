import { Details, MovieInfoStruct } from '@typefiles/types';

export function getFilteredDetails(object: MovieInfoStruct): Details {
   const { Title, Awards, Runtime, Plot, Poster } = object;
   return { Title, Awards, Runtime, Plot, Poster };
}
