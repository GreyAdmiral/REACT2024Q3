import { Component, ReactNode } from 'react';
import styles from './ErrorComponent.module.scss';

interface ErrorComponentProps {
   error: Error | null;
}

export class ErrorComponent extends Component<ErrorComponentProps> {
   render(): ReactNode {
      return (
         <div className={styles.error}>
            <span>{this.props.error ? `Ошибка: ${this.props.error.message}` : 'Неизвестная ошибка!'}</span>
         </div>
      );
   }
}
