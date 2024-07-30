import { describe, expect, test } from 'vitest';
import { getCSVLine } from './getCSVLine';
import { getErrorInfo } from './getErrorInfo';
import { getSchemeIconId } from './getSchemeIconId';
import { getSelectedInfo } from './getSelectedInfo';
import { isExists } from './isExist';
import { MovieProps, SchemeName, SelectedMovie } from '@typefiles/types';

describe('Тесты вспомогательных функций', () => {
   test('Тест функции getCSVLine', () => {
      const movie: SelectedMovie = {
         id: 'abc',
         name: 'Lorem ipsum',
         year: 1234,
         type: 'film',
         posterUrl: '',
         countries: 'Russia',
         genres: 'Horror',
      };

      const expectedCSVLine = `"${movie.id}","${movie.name}","${movie.year}","${movie.type}","${movie.posterUrl}","${movie.countries}","${movie.genres}"`;
      const result = getCSVLine(movie);

      expect(result).toEqual(expectedCSVLine);
   });

   test('Тест функции getErrorInfo', () => {
      expect(getErrorInfo(401)).toBe('Wrong token.');
      expect(getErrorInfo(402)).toBe('Request limit exceeded.');
      expect(getErrorInfo(403)).toBe('Request limit exceeded.');
      expect(getErrorInfo(404)).toBe('Request limit exceeded.');
      expect(getErrorInfo(429)).toBe('Too many requests.');
      expect(getErrorInfo(500)).toBe('Looks like there was a problem.');
      expect(getErrorInfo('default')).toBe('Looks like there was a problem.');
   });

   test('Тест функции getSchemeIconId', () => {
      expect(getSchemeIconId('light' as SchemeName)).toBe('dark');
      expect(getSchemeIconId('dark' as SchemeName)).toBe('light');
      expect(getSchemeIconId('unknown' as SchemeName)).toBe('light');
      expect(getSchemeIconId('' as SchemeName)).toBe('light');
   });

   test('Тест функции getSelectedInfo', () => {
      const movie = {
         kinopoiskId: '12345',
         imdbId: null,
         nameRu: 'Название на русском',
         nameEn: 'Название на английском',
         nameOriginal: 'Оригинальное название',
         year: 2023,
         type: 'movie',
         posterUrl: 'poster.jpg',
         posterUrlPreview: 'poster.jpg',
         ratingKinopoisk: null,
         ratingImdb: null,
         countries: [{ country: 'Россия' }, { country: 'США' }],
         genres: [{ genre: 'Драма' }, { genre: 'Комедия' }],
      };

      const expectedResult = {
         id: '12345',
         name: 'Название на русском',
         year: 2023,
         type: 'movie',
         posterUrl: 'poster.jpg',
         countries: 'Россия / США',
         genres: 'Драма / Комедия',
      };
      const result = getSelectedInfo(movie as MovieProps);

      expect(result).toEqual(expectedResult);
   });

   test('Тест функции isExists', () => {
      expect(isExists('hello')).toBeTruthy();
      expect(isExists('')).toBeFalsy();
      expect(isExists('N/A')).toBeFalsy();
      expect(isExists(undefined)).toBeFalsy();
      expect(isExists('false')).toBeTruthy();
   });
});
