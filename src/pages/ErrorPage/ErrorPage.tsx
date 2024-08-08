import { FC } from 'react';
import styles from './ErrorPage.module.scss';

interface ErrorComponentProps {
   error: Error | null;
}

export const ErrorPage: FC<ErrorComponentProps> = ({ error }) => {
   return (
      <div className={styles.error}>
         <p>{error ? `Ошибка: ${error.message}` : 'Неизвестная ошибка!'}</p>
      </div>
   );
};
