import { useAppSelector } from '@hooks/useAppSelector';
import { useFastLocalStorage } from '@hooks/useFastLocalStorage';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setColorScheme } from '@store/slices/colorSchemeSlice';
import { getSchemeIconId } from '@tools/getSchemeIconId';
import { SchemeName } from '@typefiles/types';
import styles from './ColorSchemeButton.module.scss';
import sprite from '@assets/sprite.svg';

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
         className={styles.schemeButton}
         onClick={writeSchemeName}
         title={`Выбрать ${schemeName == 'light' ? 'тёмную' : 'светлую'} тему`}
         aria-label={`Выбрать ${schemeName == 'light' ? 'тёмную' : 'светлую'} тему`}
      >
         <svg>
            <use xlinkHref={`${sprite}#${getSchemeIconId(schemeName as SchemeName)}`} />
         </svg>
      </button>
   );
};
