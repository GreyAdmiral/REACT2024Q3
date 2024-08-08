'use client';
import { useAppSelector } from '@hooks/useAppSelector';
import { useFastLocalStorage } from '@hooks/useFastLocalStorage';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setColorScheme } from '@store/slices/colorSchemeSlice';
import { getSchemeIconId } from '@tools/getSchemeIconId';
import { SchemeName } from '@typesfolder/types';
import styles from './ColorSchemeButton.module.scss';

export const ColorSchemeButton = () => {
   const schemeName = useAppSelector((state) => state.scheme.colorScheme);
   const [, setSaveScheme] = useFastLocalStorage('userScheme');
   const dispatch = useAppDispatch();

   function writeSchemeName() {
      const newSchemeName = schemeName === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = newSchemeName;
      dispatch(setColorScheme(newSchemeName));
      setSaveScheme(newSchemeName);
      (document.activeElement as HTMLTemplateElement).blur();
   }

   return (
      <button
         type="button"
         className={styles.scheme_button}
         onClick={writeSchemeName}
         title={`Выбрать ${schemeName == 'light' ? 'тёмную' : 'светлую'} тему`}
         aria-label={`Выбрать ${schemeName == 'light' ? 'тёмную' : 'светлую'} тему`}
      >
         <svg>
            <use xlinkHref={`/images/sprite.svg#${getSchemeIconId(schemeName as SchemeName)}`} />
         </svg>
      </button>
   );
};
