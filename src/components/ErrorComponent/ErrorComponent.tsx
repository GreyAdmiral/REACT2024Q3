import { FC } from 'react';
import styles from './ErrorComponent.module.scss';

interface ErrorComponentProps {
   error: Error | null;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
   return (
      <div className={styles.error}>
         <span>{error ? `Ошибка: ${error.message}` : 'Неизвестная ошибка!'}</span>
      </div>
   );
};
