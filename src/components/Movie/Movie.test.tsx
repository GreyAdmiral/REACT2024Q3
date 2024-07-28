import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Movie } from './Movie';
import { Kinopoisk } from '@api/Kinopoisk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';

const movie = {
   kinopoiskId: '5260016',
   imdbId: null,
   nameRu: 'Test Movie',
   nameEn: '',
   nameOriginal: '',
   countries: [
      {
         country: '',
      },
   ],
   genres: [
      {
         genre: '',
      },
   ],
   ratingKinopoisk: 1.2,
   ratingImdb: null,
   year: 1234,
   type: '',
   posterUrl: '',
   posterUrlPreview: '',
};

class FakeKinopoisk extends Kinopoisk {}

const apiClass = {
   current: new FakeKinopoisk(),
};

describe('Тесты компонента с фильмом', () => {
   beforeEach(() => {
      render(
         <Provider store={store}>
            <Router>
               <Movie movie={movie} apiRef={apiClass} />
            </Router>
         </Provider>
      );
   });

   test('Рендер', async () => {
      expect(screen.getByTitle('Посмотреть подробности')).toBeInTheDocument();
   });
});
