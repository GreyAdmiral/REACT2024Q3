'use client';
import { useEffect } from 'react';
import { useFastLocalStorage } from '@/hooks/useFastLocalStorage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setColorScheme } from '@/store/slices/colorSchemeSlice';

export const FirstColorScheme = () => {
   const [saveScheme] = useFastLocalStorage('userScheme');
   const isAutoDark = useMediaQuery('(prefers-color-scheme: dark)');
   const dispatch = useAppDispatch();

   useEffect(() => {
      const schemeName = `${saveScheme ? saveScheme : isAutoDark ? 'dark' : 'light'}`;
      dispatch(setColorScheme(schemeName));
      document.documentElement.dataset.theme = schemeName;
   }, [dispatch, isAutoDark, saveScheme]);

   return null;
};
