import { FC, PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './CustomNotification.module.scss';

interface CustomNotificationProps {
   isOpenNotification: boolean;
}

export const CustomNotification: FC<PropsWithChildren & CustomNotificationProps> = ({
   isOpenNotification,
   children,
}) => {
   const notificationRef = useRef(null);
   const notificationRoot = useMemo(() => {
      const element = document.createElement('div');

      element.classList.add(styles.notification);
      return element;
   }, []);

   useEffect(() => {
      if (isOpenNotification) {
         document.body.append(notificationRoot);
      }

      return () => {
         if (isOpenNotification) {
            notificationRoot.remove();
         }
      };
   });

   if (isOpenNotification) {
      return createPortal(
         <div className={styles.notification_body} ref={notificationRef}>
            {children}
         </div>,
         notificationRoot
      );
   }

   return null;
};
